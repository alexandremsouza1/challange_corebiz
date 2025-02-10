import { Router } from 'express';
import TaskController from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();


router.post('/create', authMiddleware, TaskController.create);
router.get('/', authMiddleware, TaskController.getAll);

router.get('/:id', authMiddleware, TaskController.getById);
router.put('/:id', authMiddleware, TaskController.update);
router.delete('/:id', authMiddleware, TaskController.delete);
router.post('/:id/complete', authMiddleware, TaskController.complete);
router.post('/:id/attach-user', authMiddleware, TaskController.attachUser);

export default router;