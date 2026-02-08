import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveExpenses, getExpenses } from '../storage/expenseStorage';
import { Expense } from '../types/Expense';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CategorySelector from '../components/CategorySelector';
import { AppButton } from '../components/AppButton';

type Props = NativeStackScreenProps<any>;

export default function AddExpenseScreen({ navigation }: Props) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [customCategory, setCustomCategory] = useState('');
  const [note, setNote] = useState('');

  const saveHandler = async () => {
    if (!amount) {
      Alert.alert('Missing Amount', 'Please enter the expense amount.');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: Number(amount),
      category: category === 'Other' ? customCategory || 'Other' : category,
      note,
      date: new Date().toISOString(),
    };

    const existing = await getExpenses();
    await saveExpenses([newExpense, ...existing]);

    navigation.goBack();
  };

  const handleCategorySelect = (cat: string) => {
    if (category == 'Other') {
      setCustomCategory(cat);
    } else {
      setCategory(cat);
      setCustomCategory('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>

      <TextInput
        placeholder="Amount"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <CategorySelector selected={category} onSelect={handleCategorySelect} />

      <TextInput
        placeholder="Note (optional)"
        value={note}
        placeholderTextColor="#999"
        onChangeText={setNote}
        style={styles.input}
      />

      <AppButton title="Save" onPress={saveHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    color: '#000',
  },
});
