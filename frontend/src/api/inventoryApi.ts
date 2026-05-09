import { InventoryItem } from '@omnilog/shared';

const API_URL = '/api/inventory';

export const getInventory = async (householdId: string): Promise<InventoryItem[]> => {
  const res = await fetch(`${API_URL}/${householdId}`);
  if (!res.ok) throw new Error('Failed to fetch inventory');
  return res.json();
};

export const addInventoryItem = async (data: any): Promise<InventoryItem> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add inventory');
  return res.json();
};
