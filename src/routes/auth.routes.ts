import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação e gerenciamento de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *     responses:
 *       200:
 *         description: Usuário registrado com sucesso
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 id:
 *                   type: number
 *                   description: ID do usuário
 *                 username:
 *                   type: string
 *                   description: Nome de usuário
 *                 email:
 *                   type: string
 *                   description: Email do usuário
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/register',authMiddleware, AuthController.register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome de usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */

router.post('/login', AuthController.login);
//router.post('/logout', AuthController.logout);

/**
 * @swagger
 * /auth/list:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Auth]
 */
router.get('/list',authMiddleware, AuthController.list);


export default router;