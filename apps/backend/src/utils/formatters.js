/**
 * Utility functions for formatting data
 * This file is in JavaScript for test compatibility
 */

/**
 * Format currency value
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = 'USD') {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00'
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

/**
 * Format date to string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @returns {string} Formatted date string
 */
function formatDate(date, locale = 'en-US') {
  if (!date) {
    return ''
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date'
  }
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

/**
 * Calculate percentage
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {number} Percentage value
 */
function calculatePercentage(value, total, decimals = 2) {
  if (typeof value !== 'number' || typeof total !== 'number' || total === 0) {
    return 0
  }
  
  const percentage = (value / total) * 100
  return Math.round(percentage * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

module.exports = {
  formatCurrency,
  formatDate,
  calculatePercentage
} 