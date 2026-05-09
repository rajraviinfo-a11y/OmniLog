import { Router } from 'express';
import { ExpenseController } from '../controllers/expense.controller';

const router = Router();

router.get('/:householdId', ExpenseController.getExpenses);
router.post('/', ExpenseController.addExpense);

export default router;
