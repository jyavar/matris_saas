import { Router } from 'express'

import { usersController } from '../controllers/users.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

// Protect all routes in this file
router.use(authMiddleware)

router.get('/me', usersController.getMe)
router.get('/', usersController.getAllUserss)
router.get('/:id', usersController.getUsersById)
router.post('/', usersController.createUsers)
router.patch('/:id', usersController.updateUsers)
router.delete('/:id', usersController.deleteUsers)

export default router
