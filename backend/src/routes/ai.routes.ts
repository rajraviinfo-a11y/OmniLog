import { Router } from 'express';
import { AiController } from '../controllers/ai.controller';

const router = Router();

router.post('/parse', AiController.parseInput);

export default router;
