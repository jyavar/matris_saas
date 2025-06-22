import { Router } from 'express'
import { getHealth } from '../controllers/health.controller.js'

const healthRoutes = Router()

healthRoutes.get('/', getHealth)

export default healthRoutes 