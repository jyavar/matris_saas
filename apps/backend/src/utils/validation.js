/**
 * Basic validation utilities for JavaScript compatibility
 */

/**
 * Validate email format
 */
function isValidEmail(email) {
  if (typeof email !== 'string' || !email) return false
  // More strict email validation for tests
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  // Additional checks for invalid patterns
  if (email.includes('..')) return false // No consecutive dots
  if (email.startsWith('.') || email.endsWith('.')) return false // No dots at start/end
  if (email.startsWith('@') || email.endsWith('@')) return false // No @ at start/end
  if (email.indexOf('@') !== email.lastIndexOf('@')) return false // Only one @
  
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8) {
    return { valid: false, reason: 'too_short' }
  }
  
  // Check in specific order for consistent test results
  if (!/[A-Z]/.test(password)) {
    return { valid: false, reason: 'no_uppercase' }
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, reason: 'no_lowercase' }
  }
  
  if (!/\d/.test(password)) {
    return { valid: false, reason: 'no_number' }
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, reason: 'no_special' }
  }
  
  return { valid: true, reason: 'strong' }
}

/**
 * Validate URL format
 */
function isValidURL(url) {
  if (typeof url !== 'string' || !url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Format date consistently for tests
 */
function formatDate(date) {
  if (!(date instanceof Date)) return null
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'UTC' // Ensure consistent timezone for tests
  })
}

/**
 * Calculate days difference
 */
function daysDifference(date1, date2) {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) return null
  const diffTime = Math.abs(date2 - date1)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

module.exports = {
  isValidEmail,
  validatePassword,
  isValidURL,
  formatDate,
  daysDifference
} 