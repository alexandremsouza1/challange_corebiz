import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

// Rota de login
router.post('/login', AuthController.login);

export default router;