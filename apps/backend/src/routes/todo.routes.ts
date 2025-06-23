import { Router } from 'express'

import { todoController } from '../controllers/todo.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', authMiddleware, todoController.getAllTodos)
router.get('/:id', authMiddleware, todoController.getTodoById)
router.post('/', authMiddleware, todoController.createTodo)
router.patch('/:id', authMiddleware, todoController.updateTodo)
router.delete('/:id', authMiddleware, todoController.deleteTodo)

export default router
