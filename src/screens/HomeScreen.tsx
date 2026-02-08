import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { Expense } from '../types/Expense';
import { getExpenses, saveExpenses } from '../storage/expenseStorage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ExpenseItem from '../components/ExpenseItem';
import { AppButton } from '../components/AppButton';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<any>;

export default function HomeScreen({ navigation }: Props) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const loadExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadExpenses);
    return unsubscribe;
  }, [navigation]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const deleteExpense = async (id: string) => {
    const updated = expenses.filter(e => e.id !== id);
    setExpenses(updated);
    await saveExpenses(updated);
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container]}>
        <Text style={styles.title}>All Expenses</Text>

        <Text style={styles.total}>₹ {total}</Text>

        <FlatList
          data={expenses}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>No expenses yet</Text>}
          renderItem={({ item }) => (
            <ExpenseItem expense={item} onDelete={deleteExpense} />
          )}
        />

        <AppButton
          title="Add Expense"
          onPress={() => navigation.navigate('Add')}
        />
      </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, marginBottom: 16 },
  total: { fontSize: 32, marginBottom: 16 },
  item: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
