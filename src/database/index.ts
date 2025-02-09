import { Sequelize } from 'sequelize';
import mysqlConfig from './mysql';
import sqliteConfig from './sqlite';

if (!process.env.DB_CONNECTION) {
  throw new Error('DB_CONNECTION não está definida nas variáveis de ambiente');
}

let sequelize: Sequelize;

switch (process.env.DB_CONNECTION.toLowerCase()) {
  case 'mysql':
    sequelize = mysqlConfig;
    break;
  case 'sqlite':
    sequelize = sqliteConfig;
    break;
  default:
    throw new Error(`Conexão "${process.env.DB_CONNECTION}" não suportada`);
}

export default sequelize;