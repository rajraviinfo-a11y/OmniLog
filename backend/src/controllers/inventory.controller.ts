import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service';

export class InventoryController {
  static async getInventory(req: Request, res: Response) {
    try {
      const { householdId } = req.params;
      const inventory = await InventoryService.getHouseholdInventory(householdId);
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inventory' });
    }
  }

  static async addItem(req: Request, res: Response) {
    try {
      const item = await InventoryService.addOrUpdateItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add inventory' });
    }
  }
}
