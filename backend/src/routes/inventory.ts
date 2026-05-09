import { Router } from 'express';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
const router = Router();

// Get household inventory
router.get('/:householdId', async (req, res) => {
  const { householdId } = req.params;
  // TODO: Fetch inventory using Prisma
  res.json({ message: `Fetching inventory for household: ${householdId}` });
});

// Add new inventory item
router.post('/', async (req, res) => {
  const { householdId, itemName, quantity, unit } = req.body;
  // TODO: Add inventory using Prisma
  res.json({ message: 'Added new inventory item' });
});

export default router;
