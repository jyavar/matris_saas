import { Router } from 'express'

import { todoController } from '../controllers/todo.controller.js'

const router = Router()

router.get('/', todoController.getAllTodos)
router.get('/:id', todoController.getTodoById)
router.post('/', todoController.createTodo)
router.patch('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

export default router
