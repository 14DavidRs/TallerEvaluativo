import 'dotenv/config';
import express from 'express';
const app = express();

app.use(express.json());

// Rutas
import tasksRoutes from './routes/tasks.routes.js';

app.use('/tasks', tasksRoutes);

app.get('/', (req, res) => {
  res.send('API running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
