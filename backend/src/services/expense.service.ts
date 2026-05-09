import { PrismaClient } from '@prisma/client';
import { Expense } from '@omnilog/shared';

const prisma = new PrismaClient();

export class ExpenseService {
  static async getHouseholdExpenses(householdId: string): Promise<Expense[]> {
    const expenses = await prisma.expense.findMany({
      where: { household_id: householdId },
      orderBy: { timestamp: 'desc' },
      include: {
        user: {
          select: { name: true }
        }
      }
    });
    return expenses as unknown as Expense[];
  }

  static async addExpense(data: {
    householdId: string;
    userId: string;
    amount: number;
    category: string;
    description?: string;
  }): Promise<Expense> {
    const newExpense = await prisma.expense.create({
      data: {
        household_id: data.householdId,
        user_id: data.userId,
        amount: data.amount,
        category: data.category,
        description: data.description,
      }
    });
    return newExpense as unknown as Expense;
  }
}
