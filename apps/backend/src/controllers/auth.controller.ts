import { NextFunction, Request, Response } from 'express'

import { authService } from '../services/auth.service.js'
import { logAction } from '../services/logger.service.js'

export const authController = {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const result = await authService.signUp({ email, password })

      if (result.user) {
        logAction('auth_signup_success', result.user.id, {
          email: result.user.email,
        })
        res
          .status(201)
          .json({ message: 'Usuario creado exitosamente', user: result.user })
      } else {
        res.status(400).json({ message: 'Error al crear usuario' })
      }
    } catch (error) {
      logAction('auth_signup_error', 'unknown', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const result = await authService.signIn({ email, password })

      if (result.user) {
        logAction('auth_signin_success', result.user.id, {
          email: result.user.email,
        })
        res.status(200).json({
          message: 'Inicio de sesión exitoso',
          user: result.user,
          session: result.session,
        })
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' })
      }
    } catch (error) {
      logAction('auth_signin_error', 'unknown', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      next(error)
    }
  },
}
