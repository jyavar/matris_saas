import { Router } from 'express'

import { profilesController } from '../controllers/profiles.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

// Protect all routes in this file
router.use(authMiddleware)

router.get('/me', profilesController.getMe)
router.get('/', profilesController.getAllProfiles)
router.get('/:id', profilesController.getProfileById)
router.post('/', profilesController.createProfile)
router.patch('/:id', profilesController.updateProfile)
router.delete('/:id', profilesController.deleteProfile)

export default router
