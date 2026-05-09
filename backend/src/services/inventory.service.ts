import { PrismaClient } from '@prisma/client';
import { InventoryItem } from '@omnilog/shared';

const prisma = new PrismaClient();

export class InventoryService {
  static async getHouseholdInventory(householdId: string): Promise<InventoryItem[]> {
    const items = await prisma.inventory.findMany({
      where: { household_id: householdId },
      orderBy: { item_name: 'asc' },
    });
    // Cast to shared interface
    return items as unknown as InventoryItem[];
  }

  static async addOrUpdateItem(data: {
    householdId: string;
    itemName: string;
    quantity: number;
    unit: string;
    category?: string;
  }): Promise<InventoryItem> {
    const existing = await prisma.inventory.findFirst({
      where: { household_id: data.householdId, item_name: data.itemName }
    });

    if (existing) {
      const updated = await prisma.inventory.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + data.quantity,
          last_restocked: new Date()
        }
      });
      return updated as unknown as InventoryItem;
    } else {
      const newItem = await prisma.inventory.create({
        data: {
          household_id: data.householdId,
          item_name: data.itemName,
          quantity: data.quantity,
          unit: data.unit,
          category: data.category || 'General'
        }
      });
      return newItem as unknown as InventoryItem;
    }
  }
}
