import React from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';

export default function ExpenseItem({
  expense,
  onDelete,
}: {
  expense: any;
  onDelete: (id: string) => void;
}) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.amount}>₹{expense.amount}</Text>
        <Text>{expense.category}</Text>

        {expense.note ? <Text style={styles.note}>{expense.note}</Text> : null}
      </View>
      <Pressable
        hitSlop={12}
        onPress={() => onDelete(expense.id)}
        style={({ pressed }) => pressed && { opacity: 0.6 }}
      >
        <Text style={styles.delete}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#555',
  },
  note: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
    fontStyle: 'italic',
  },
  delete: {
    color: 'red',
    fontSize: 14,
  },
});
