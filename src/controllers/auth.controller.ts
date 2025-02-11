import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import ErrorHandler from '../middlewares/error.handler';

const secretKey = process.env.JWT_SECRET || 'mySecretKey';

class AuthController {

  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password,email } = req.body;
  
      if (!username || !password) {
        res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
        return;
      }
  
      const existingUser = await User.findOne({ where: { username } });
  
      if (existingUser) {
        res.status(400).json({ message: 'Usuário já existe' });
        return;
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      console.log('Dados para criação:', { username, password: hashedPassword ,email});
  
      const newUser = await User.create({ username, password: hashedPassword ,email});
  
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username },
        secretKey,
        { expiresIn: '1h' }
      );
  
      res.json({ ...newUser.toJSON(), token });
    } catch (error) {
      console.error('Erro ao registrar o usuário:',error);
      ErrorHandler.handleValidationError(error, res);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
  

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      ErrorHandler.handleValidationError(error, res);
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      ErrorHandler.handleValidationError(error, res);
    }
  }
}

export default AuthController;