import { Router } from 'express'

import { usersController } from '../controllers/users.controller.js'

const router = Router()

router.get('/', usersController.getAllUserss)
router.get('/:id', usersController.getUsersById)
router.post('/', usersController.createUsers)
router.patch('/:id', usersController.updateUsers)
router.delete('/:id', usersController.deleteUsers)

export default router
