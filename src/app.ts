import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import sequelize from './database';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';
import { setupSwagger } from './swagger';



const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

setupSwagger(app);

sequelize
  .sync()
  .then(() => {
    console.log('Banco sincronizado');
  })
  .catch((err) => console.error('Erro ao sincronizar banco', err));



  export default app;