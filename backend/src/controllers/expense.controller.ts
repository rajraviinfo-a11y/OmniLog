import { Request, Response } from 'express';
import { ExpenseService } from '../services/expense.service';

export class ExpenseController {
  static async getExpenses(req: Request, res: Response) {
    try {
      const { householdId } = req.params;
      const expenses = await ExpenseService.getHouseholdExpenses(householdId);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  }

  static async addExpense(req: Request, res: Response) {
    try {
      const expense = await ExpenseService.addExpense(req.body);
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add expense' });
    }
  }
}
