import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import inventoryRoutes from './routes/inventory';
import expensesRoutes from './routes/expenses';
import dietRoutes from './routes/diet';
import aiRoutes from './routes/ai';

app.use('/api/inventory', inventoryRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OmniLog Backend is running!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
