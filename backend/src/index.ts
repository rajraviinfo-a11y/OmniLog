import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

import inventoryRoutes from './routes/inventory.routes';
import expensesRoutes from './routes/expenses.routes';
import dietRoutes from './routes/diet.routes';
import aiRoutes from './routes/ai.routes';

app.use('/api/inventory', inventoryRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/diet', dietRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'OmniLog Backend is running!' });
});

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
