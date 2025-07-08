import { todoController } from '../controllers/todo.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { handleAsync } from '../middleware/errorHandler.middleware.js'
import type { RouteDefinition } from '../types/express/index.js'

// Definición de rutas para Node.js puro
export const todoRoutes: RouteDefinition[] = [
  {
    method: 'GET',
    path: '/',
    middlewares: [authMiddleware],
    handler: handleAsync(todoController.getAllTodos),
  },
  {
    method: 'POST',
    path: '/',
    middlewares: [authMiddleware],
    handler: handleAsync(todoController.createTodo),
  },
  {
    method: 'GET',
    path: '/:id',
    middlewares: [authMiddleware],
    handler: handleAsync(todoController.getTodoById),
  },
  {
    method: 'PATCH',
    path: '/:id',
    middlewares: [authMiddleware],
    handler: handleAsync(todoController.updateTodo),
  },
  {
    method: 'DELETE',
    path: '/:id',
    middlewares: [authMiddleware],
    handler: handleAsync(todoController.deleteTodo),
  },
]
