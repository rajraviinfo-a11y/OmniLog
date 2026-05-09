import { useState, useEffect, useCallback } from 'react';
import { InventoryItem } from '@omnilog/shared';
import { getInventory } from '../api/inventoryApi';
import { useAppContext } from '../context/AppProvider';

export const useInventory = () => {
  const { householdId } = useAppContext();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshInventory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getInventory(householdId);
      setInventory(data);
      setError(null);
    } catch (err) {
      setError('Failed to load inventory');
    } finally {
      setLoading(false);
    }
  }, [householdId]);

  useEffect(() => {
    refreshInventory();
  }, [refreshInventory]);

  return { inventory, loading, error, refreshInventory };
};
