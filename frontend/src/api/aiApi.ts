const API_URL = '/api/ai';

export const parseAIInput = async (data: { input: string; userId: string; householdId: string }) => {
  const res = await fetch(`${API_URL}/parse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to parse AI input');
  return res.json();
};
