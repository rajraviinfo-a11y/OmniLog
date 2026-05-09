import { Router } from 'express';
import { DietController } from '../controllers/diet.controller';

const router = Router();

router.get('/:userId/today', DietController.getTodayLogs);
router.post('/', DietController.addLog);

export default router;
