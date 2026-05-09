import { useState, useEffect, useCallback } from 'react';
import { DietLog } from '@omnilog/shared';
import { getDietLogs } from '../api/dietApi';
import { useAppContext } from '../context/AppProvider';

export const useDiet = () => {
  const { userId } = useAppContext();
  const [logs, setLogs] = useState<DietLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshDiet = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDietLogs(userId);
      setLogs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load diet logs');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refreshDiet();
  }, [refreshDiet]);

  return { logs, loading, error, refreshDiet };
};
