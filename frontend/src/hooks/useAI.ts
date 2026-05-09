import { useState } from 'react';
import { parseAIInput } from '../api/aiApi';
import { useAppContext } from '../context/AppProvider';

export const useAI = () => {
  const { userId, householdId } = useAppContext();
  const [processing, setProcessing] = useState(false);

  const submitInput = async (input: string) => {
    setProcessing(true);
    try {
      const result = await parseAIInput({ input, userId, householdId });
      return result;
    } catch (err) {
      console.error('Failed to process AI input', err);
      throw err;
    } finally {
      setProcessing(false);
    }
  };

  return { processing, submitInput };
};
