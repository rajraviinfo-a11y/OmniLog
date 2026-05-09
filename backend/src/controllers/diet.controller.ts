import { Request, Response } from 'express';
import { DietService } from '../services/diet.service';

export class DietController {
  static async getTodayLogs(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const logs = await DietService.getTodayLogs(userId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch diet logs' });
    }
  }

  static async addLog(req: Request, res: Response) {
    try {
      const log = await DietService.addLog(req.body);
      res.status(201).json(log);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add diet log' });
    }
  }
}
