import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '../types/Expense';

const STORAGE_KEY = 'EXPENSES';

export const getExpenses = async (): Promise<Expense[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveExpenses = async (expenses: Expense[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};
