import { Request, Response, NextFunction } from 'express';

class ErrorHandler {
  static handleValidationError(error: any, res: Response) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err: any) => err.message);
      return res.status(400).json({ errors: messages });
    }
    if(error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ message: `Valor inválido para o(s) campo(s) ${error.fields}` });
    }
    if(error.name === 'SequelizeDatabaseError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export default ErrorHandler;