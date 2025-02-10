import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import { TaskStatus } from '../enums/status.enum';

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public dueDate!: Date;
  public status!: TaskStatus;
  public userId!: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TaskStatus)),
      allowNull: false,
      defaultValue: TaskStatus.PENDING,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'tasks',
  }
);

export default Task;