import { DietLog } from '@omnilog/shared';

const API_URL = '/api/diet';

export const getDietLogs = async (userId: string): Promise<DietLog[]> => {
  const res = await fetch(`${API_URL}/${userId}/today`);
  if (!res.ok) throw new Error('Failed to fetch diet logs');
  return res.json();
};

export const addDietLog = async (data: any): Promise<DietLog> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add diet log');
  return res.json();
};
