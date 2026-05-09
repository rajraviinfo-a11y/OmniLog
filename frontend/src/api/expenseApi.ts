import { Expense } from '@omnilog/shared';

const API_URL = '/api/expenses';

export const getExpenses = async (householdId: string): Promise<Expense[]> => {
  const res = await fetch(`${API_URL}/${householdId}`);
  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
};

export const addExpense = async (data: any): Promise<Expense> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add expense');
  return res.json();
};
