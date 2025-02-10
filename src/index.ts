import 'dotenv/config';
import express from 'express';
import sequelize from './database';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Banco sincronizado');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('Erro ao sincronizar banco', err));



  export default app;