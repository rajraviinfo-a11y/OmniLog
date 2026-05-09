import { PrismaClient } from '@prisma/client';
import { DietLog } from '@omnilog/shared';

const prisma = new PrismaClient();

export class DietService {
  static async getTodayLogs(userId: string): Promise<DietLog[]> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const logs = await prisma.dietLog.findMany({
      where: { 
        user_id: userId,
        timestamp: { gte: startOfToday }
      },
      orderBy: { timestamp: 'desc' }
    });
    return logs as unknown as DietLog[];
  }

  static async addLog(data: {
    userId: string;
    mealName: string;
    calories?: number;
    macros?: any;
  }): Promise<DietLog> {
    const newLog = await prisma.dietLog.create({
      data: {
        user_id: data.userId,
        meal_name: data.mealName,
        calories: data.calories,
        macros: data.macros ? JSON.stringify(data.macros) : null,
      }
    });
    return newLog as unknown as DietLog;
  }
}
