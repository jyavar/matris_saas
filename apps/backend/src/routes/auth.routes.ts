import { Router } from 'express'

import { authController } from '../controllers/auth.controller.js'

const router = Router()

router.get('/', authController.getAllAuths)
router.get('/:id', authController.getAuthById)
router.post('/', authController.createAuth)
router.patch('/:id', authController.updateAuth)
router.delete('/:id', authController.deleteAuth)

export default router
