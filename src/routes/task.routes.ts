import { Router } from 'express';
import TaskController from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Gerenciamento de tarefas
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Criar uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - dueDate
 *               - status
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da tarefa
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa
 *               dueDate:
 *                 type: string
 *                 description: Data de vencimento da tarefa
 *               status:
 *                 type: string
 *                 description: Status da tarefa
 *               userId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID da tarefa criada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, TaskController.create);
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar todas as tarefas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tarefas recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: ID da tarefa
 *                     example: 1
 *                   title:
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */ 
router.get('/', authMiddleware, TaskController.getAll);
/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Listar tarefa por ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path

 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Tarefa recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID da tarefa
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', authMiddleware, TaskController.getById);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualizar tarefa por ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da tarefa
 *               description:
 *                 type: string
 *                 description: Descrição da tarefa
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID da tarefa atualizada
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, TaskController.update);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deletar tarefa por ID
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */ 
router.delete('/:id', authMiddleware, TaskController.delete);
/**
 * @swagger
 * /tasks/{id}/complete:
 *   post:
 *     summary: Marcar tarefa como concluída
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Tarefa marcada como concluída com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:id/complete', authMiddleware, TaskController.complete);
/**
 * @swagger
 * /tasks/{id}/attach-user:
 *   post:
 *     summary: Atribuir usuário à tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: number
 *     responses: 
 *       200:
 *         description: Usuário atribuído à tarefa com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor  
 */
router.post('/:id/attach-user', authMiddleware, TaskController.attachUser);


export default router;