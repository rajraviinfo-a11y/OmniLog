import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller';

const router = Router();

router.get('/:householdId', InventoryController.getInventory);
router.post('/', InventoryController.addItem);

export default router;
