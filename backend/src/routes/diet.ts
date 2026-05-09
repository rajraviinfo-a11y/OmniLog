import { Router } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
const router = Router();

// Get diet logs for user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  // TODO: Fetch diet logs using Prisma
  res.json({ message: `Fetching diet logs for user: ${userId}` });
});

// Add new diet log
router.post('/', async (req, res) => {
  const { userId, mealName, calories, macros } = req.body;
  // TODO: Add diet log using Prisma
  res.json({ message: 'Added new diet log' });
});

export default router;
