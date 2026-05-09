import { Request, Response } from 'express';
import { AiService } from '../services/ai.service';

export class AiController {
  static async parseInput(req: Request, res: Response) {
    try {
      const { input, userId, householdId } = req.body;
      if (!input || !userId || !householdId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const result = await AiService.parseAndExecute(input, userId, householdId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to process AI input' });
    }
  }
}
