import { Request, Response, NextFunction } from 'express';
import Task from '../models/task.model';
import { TaskStatus } from '../enums/status.enum';
import ErrorHandler from '../middlewares/error.handler';


class TaskController {


  static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, description, dueDate, status, userId } = req.body;
      const task = await Task.create({ title, description, dueDate, status, userId });
      res.status(201).json(task);
    } catch (error) {
      ErrorHandler.handleValidationError(error, res);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, dueDate, userId } = req.query;
      const whereClause: any = {};

      if (status) {
        whereClause.status = status;
      }

      if (dueDate) {
        whereClause.dueDate = dueDate;
      }

      if (userId) {
        whereClause.userId = userId;
      }

      const tasks = await Task.findAll({ where: whereClause });
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, dueDate, status } = req.body;
      const task = await Task.findByPk(id);
      if (!task) {
        res.status(404).json({ message: 'Tarefa não encontrada' });
        return;
      }
      task.title = title;
      task.description = description;

      task.dueDate = dueDate;
      task.status = status;
      await task.save();
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
      if (!task) {
        res.status(404).json({ message: 'Tarefa não encontrada' });
        return;
      }
      await task.destroy();
      res.json({ message: 'Tarefa deletada com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  static async complete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const task = await Task.findByPk(id);
      if (!task) {
        res.status(404).json({ message: 'Tarefa não encontrada' });
        return;
      }
      task.status = TaskStatus.COMPLETED;
      await task.save();
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async attachUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      const task = await Task.findByPk(id);
      if (!task) {
        res.status(404).json({ message: 'Tarefa não encontrada' });
        return;
      }
      task.userId = userId;
      await task.save();
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
}



export default TaskController;