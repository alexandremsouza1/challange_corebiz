import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVariables = ['DB_NAME', 'DB_USER', 'DB_PASS', 'DB_HOST'];
requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`A variável de ambiente ${variable} não está definida`);
  }
});

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);

export default sequelize;
