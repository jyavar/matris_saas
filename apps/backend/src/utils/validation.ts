import { randomBytes } from 'crypto'

/**
 * Valida formato de email usando regex estándar
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Valida fuerza de contraseña 
 * Requiere: mínimo 8 caracteres, al menos 1 número, 1 letra minúscula, 1 mayúscula
 */
export function validatePassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false
  
  // Mínimo 8 caracteres
  if (password.length < 8) return false
  
  // Al menos una letra minúscula
  if (!/[a-z]/.test(password)) return false
  
  // Al menos una letra mayúscula  
  if (!/[A-Z]/.test(password)) return false
  
  // Al menos un número
  if (!/\d/.test(password)) return false
  
  return true
}

/**
 * Genera token aleatorio hexadecimal de 32 caracteres
 */
export function generateToken(length: number = 16): string {
  return randomBytes(length).toString('hex')
}

/**
 * Valida fuerza de contraseña con detalles del motivo de fallo
 */
export function validatePasswordStrength(password: string): { valid: boolean; reason: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, reason: 'empty' }
  }
  
  if (password.length < 8) {
    return { valid: false, reason: 'too_short' }
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, reason: 'no_lowercase' }
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, reason: 'no_uppercase' }
  }
  
  if (!/\d/.test(password)) {
    return { valid: false, reason: 'no_number' }
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, reason: 'no_special' }
  }
  
  return { valid: true, reason: 'strong' }
} 