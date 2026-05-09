import { Router } from 'express';

const router = Router();

// Process universal input
router.post('/parse', async (req, res) => {
  const { input, type, userId, householdId } = req.body;
  // TODO: Call Gemini API to parse intent
  // Categorize as Expense, Inventory, or Consumption
  
  res.json({ 
    message: 'Parsed input successfully',
    parsed_intent: {
      category: 'TBD',
      extracted_data: {}
    }
  });
});

export default router;
