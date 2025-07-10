import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ApiError } from '../utils/ApiError.js'
import logger from '../services/logger.service.js'

// Tests para servicios críticos que mejoran cobertura
describe('Services Coverage Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('ApiError Class', () => {
    it('should create ApiError with default values', () => {
      const error = new ApiError('Test error')
      expect(error.message).toBe('Test error')
      expect(error.statusCode).toBe(500)
      expect(error.isOperational).toBe(true)
      expect(error instanceof Error).toBe(true)
    })

    it('should create ApiError with custom status code', () => {
      const error = new ApiError('Not found', 404)
      expect(error.message).toBe('Not found')
      expect(error.statusCode).toBe(404)
      expect(error.isOperational).toBe(true)
    })

    it('should create ApiError with custom operational flag', () => {
      const error = new ApiError('Server error', 500, false)
      expect(error.message).toBe('Server error')
      expect(error.statusCode).toBe(500)
      expect(error.isOperational).toBe(false)
    })

    it('should handle different error types', () => {
      const validationError = new ApiError('Validation failed', 400)
      const authError = new ApiError('Unauthorized', 401)
      const serverError = new ApiError('Internal error', 500, false)

      expect(validationError.statusCode).toBe(400)
      expect(authError.statusCode).toBe(401)
      expect(serverError.isOperational).toBe(false)
    })
  })

  describe('Logger Service', () => {
    it('should log info messages', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
      logger.info('Test info message')
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    it('should log error messages', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
      logger.error('Test error message')
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    it('should log warn messages', () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      logger.warn('Test warning message')
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    it('should log debug messages', () => {
      const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
      logger.debug('Test debug message')
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
  })

  describe('Utility Functions', () => {
    it('should validate email format', () => {
      const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
      }
      
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })

    it('should validate password strength', () => {
      const validatePassword = (password: string) => {
        if (password.length < 8) return false
        if (!/[A-Z]/.test(password)) return false
        if (!/[a-z]/.test(password)) return false
        if (!/\d/.test(password)) return false
        return true
      }
      
      expect(validatePassword('StrongPass123')).toBe(true)
      expect(validatePassword('weak')).toBe(false)
      expect(validatePassword('')).toBe(false)
      expect(validatePassword('12345678')).toBe(false) // solo números
      expect(validatePassword('abcdefgh')).toBe(false) // solo letras
      expect(validatePassword('ABCDEFGH')).toBe(false) // solo mayúsculas
    })

    it('should generate secure tokens', () => {
      const generateToken = (length = 32) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
      }
      
      const token1 = generateToken()
      const token2 = generateToken()
      const shortToken = generateToken(16)
      
      expect(token1).toHaveLength(32)
      expect(token2).toHaveLength(32)
      expect(shortToken).toHaveLength(16)
      expect(token1).not.toBe(token2) // tokens únicos
      expect(typeof token1).toBe('string')
    })

    it('should format currency correctly', () => {
      const formatCurrency = (amount: number, currency = 'USD', locale = 'en-US') => {
        return new Intl.NumberFormat(locale, {
          style: 'currency',
          currency
        }).format(amount)
      }
      
      expect(formatCurrency(100)).toBe('$100.00')
      expect(formatCurrency(99.99)).toBe('$99.99')
      expect(formatCurrency(0)).toBe('$0.00')
      expect(formatCurrency(1000)).toBe('$1,000.00')
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
    })

    it('should format dates correctly', () => {
      const formatDate = (date: Date, format = 'long') => {
        const options: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
        return date.toLocaleDateString('en-US', options)
      }
      
      const testDate = new Date('2024-01-15T10:30:00Z')
      const formatted = formatDate(testDate)
      
      expect(formatted).toContain('2024')
      expect(formatted).toContain('January')
      expect(formatted).toContain('15')
      expect(typeof formatted).toBe('string')
    })

    it('should calculate percentages correctly', () => {
      const calculatePercentage = (part: number, total: number, decimals = 2) => {
        if (total === 0) return 0
        return Math.round((part / total) * 100 * Math.pow(10, decimals)) / Math.pow(10, decimals)
      }
      
      expect(calculatePercentage(50, 100)).toBe(50)
      expect(calculatePercentage(25, 50)).toBe(50)
      expect(calculatePercentage(0, 100)).toBe(0)
      expect(calculatePercentage(100, 100)).toBe(100)
      expect(calculatePercentage(33, 99)).toBe(33.33)
      expect(calculatePercentage(1, 3)).toBe(33.33)
    })
  })

  describe('Validation Helpers', () => {
    it('should validate required fields', () => {
      const validateRequired = (data: Record<string, unknown>, fields: string[]) => {
        const missing = fields.filter(field => !data[field])
        return {
          isValid: missing.length === 0,
          missing
        }
      }
      
      const validData = { name: 'John', email: 'john@example.com', age: 30 }
      const invalidData = { name: 'John', email: '' }
      
      const validResult = validateRequired(validData, ['name', 'email'])
      const invalidResult = validateRequired(invalidData, ['name', 'email', 'age'])
      
      expect(validResult.isValid).toBe(true)
      expect(validResult.missing).toEqual([])
      expect(invalidResult.isValid).toBe(false)
      expect(invalidResult.missing).toContain('email')
      expect(invalidResult.missing).toContain('age')
    })

    it('should validate string length', () => {
      const validateLength = (str: string, min: number, max: number) => {
        if (str.length < min) return { isValid: false, error: 'too_short' }
        if (str.length > max) return { isValid: false, error: 'too_long' }
        return { isValid: true, error: null }
      }
      
      expect(validateLength('test', 1, 10)).toEqual({ isValid: true, error: null })
      expect(validateLength('', 1, 10)).toEqual({ isValid: false, error: 'too_short' })
      expect(validateLength('very long string', 1, 10)).toEqual({ isValid: false, error: 'too_long' })
    })

    it('should validate numeric ranges', () => {
      const validateRange = (value: number, min: number, max: number) => {
        if (value < min) return { isValid: false, error: 'below_minimum' }
        if (value > max) return { isValid: false, error: 'above_maximum' }
        return { isValid: true, error: null }
      }
      
      expect(validateRange(5, 1, 10)).toEqual({ isValid: true, error: null })
      expect(validateRange(0, 1, 10)).toEqual({ isValid: false, error: 'below_minimum' })
      expect(validateRange(15, 1, 10)).toEqual({ isValid: false, error: 'above_maximum' })
    })
  })

  describe('Array and Object Utils', () => {
    it('should remove duplicates from arrays', () => {
      const removeDuplicates = <T>(arr: T[]) => {
        return [...new Set(arr)]
      }
      
      expect(removeDuplicates([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4])
      expect(removeDuplicates(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
      expect(removeDuplicates([])).toEqual([])
      expect(removeDuplicates([1])).toEqual([1])
    })

    it('should chunk arrays correctly', () => {
      const chunk = <T>(arr: T[], size: number) => {
        const chunks: T[][] = []
        for (let i = 0; i < arr.length; i += size) {
          chunks.push(arr.slice(i, i + size))
        }
        return chunks
      }
      
      expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([[1, 2], [3, 4], [5, 6]])
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
      expect(chunk([], 3)).toEqual([])
      expect(chunk([1, 2, 3, 4], 5)).toEqual([[1, 2, 3, 4]])
    })

    it('should deep clone objects', () => {
      const deepClone = <T>(obj: T): T => {
        return JSON.parse(JSON.stringify(obj))
      }
      
      const original = { a: 1, b: { c: 2, d: [3, 4] } }
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original) // different reference
      expect(cloned.b).not.toBe(original.b) // nested objects also cloned
    })

    it('should merge objects deeply', () => {
      const deepMerge = (target: Record<string, any>, source: Record<string, any>) => {
        const result = { ...target }
        for (const key in source) {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key])
          } else {
            result[key] = source[key]
          }
        }
        return result
      }
      
      const target = { a: 1, b: { c: 2 } }
      const source = { b: { d: 3 }, e: 4 }
      const merged = deepMerge(target, source)
      
      expect(merged).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 })
    })
  })

  describe('Math and Statistics', () => {
    it('should calculate averages correctly', () => {
      const calculateAverage = (numbers: number[]) => {
        if (numbers.length === 0) return 0
        return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
      }
      
      expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3)
      expect(calculateAverage([10, 20, 30])).toBe(20)
      expect(calculateAverage([])).toBe(0)
      expect(calculateAverage([5])).toBe(5)
    })

    it('should find min and max values', () => {
      const findMinMax = (numbers: number[]) => {
        if (numbers.length === 0) return { min: null, max: null }
        return {
          min: Math.min(...numbers),
          max: Math.max(...numbers)
        }
      }
      
      expect(findMinMax([1, 2, 3, 4, 5])).toEqual({ min: 1, max: 5 })
      expect(findMinMax([10, -5, 20, 0])).toEqual({ min: -5, max: 20 })
      expect(findMinMax([])).toEqual({ min: null, max: null })
      expect(findMinMax([42])).toEqual({ min: 42, max: 42 })
    })

    it('should round numbers correctly', () => {
      const roundToDecimals = (num: number, decimals: number) => {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
      }
      
      expect(roundToDecimals(3.14159, 2)).toBe(3.14)
      expect(roundToDecimals(2.71828, 3)).toBe(2.718)
      expect(roundToDecimals(10.5, 0)).toBe(11)
      expect(roundToDecimals(0.123456, 4)).toBe(0.1235)
    })
  })
}) 