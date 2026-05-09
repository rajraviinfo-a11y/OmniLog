import { useState, useEffect, useCallback } from 'react';
import { Expense } from '@omnilog/shared';
import { getExpenses } from '../api/expenseApi';
import { useAppContext } from '../context/AppProvider';

export const useExpenses = () => {
  const { householdId } = useAppContext();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getExpenses(householdId);
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  }, [householdId]);

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  return { expenses, loading, error, refreshExpenses };
};
