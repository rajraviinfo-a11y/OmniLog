import { Router } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
const router = Router();

// Get household expenses
router.get('/:householdId', async (req, res) => {
  const { householdId } = req.params;
  // TODO: Fetch expenses using Prisma
  res.json({ message: `Fetching expenses for household: ${householdId}` });
});

// Add new expense
router.post('/', async (req, res) => {
  const { householdId, userId, amount, category, description } = req.body;
  // TODO: Add expense using Prisma
  res.json({ message: 'Added new expense' });
});

export default router;
