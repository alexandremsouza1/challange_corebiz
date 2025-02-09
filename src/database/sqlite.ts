import { Sequelize } from 'sequelize';
import path from 'path';

const databasePath = path.resolve(__dirname, '../../database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: databasePath,
});

export default sequelize;
