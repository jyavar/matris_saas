import { Router } from 'express'
import {
  testErrorHandling,
  testNotFound,
} from '../controllers/dev.controller.js'

const devRoutes = Router()

devRoutes.get('/error', testErrorHandling)
devRoutes.get('/not-found', testNotFound)

export default devRoutes 