// Core utilities
export { ApiError } from './ApiError.js'
export { enforceExactShape } from './enforceExactShape.js'

// Response helpers
export {
  sendConflict,
  sendCreated,
  sendError,
  sendForbidden,
  sendNoContent,
  sendNotFound,
  sendPaginated,
  sendSuccess,
  sendTooManyRequests,
  sendUnauthorized,
  sendValidationError,
} from './response.helper.js'

// Request helpers
export {
  getFilterParams,
  getPaginationParams,
  getSortParams,
  getTenantFromRequest,
  getUserFromRequest,
  hasPermission,
  hasRole,
  isAuthenticated,
  parseBody,
  parseParams,
  parseQuery,
  sanitizeInput,
} from './request.helper.js'

// Validation helpers
export {
  commonSchemas,
  isValidDate,
  isValidEmail,
  isValidPhone,
  isValidURL,
  isValidUUID,
  safeValidate,
  sanitizeBoolean,
  sanitizeNumber,
  sanitizeString,
  validateArray,
  validateDateRange,
  validateEnum,
  validateObject,
  validatePagination,
  validateRequired,
} from './validation.helper.js'

// Logging helpers
export {
  businessLog,
  dbLog,
  debugLog,
  log,
  LogLevel,
  performanceLog,
  requestLog,
  securityLog,
} from './logging.helper.js'

// General helpers
export {
  capitalize,
  chunk,
  debounce,
  deepClone,
  deepMerge,
  escapeHtml,
  formatDate,
  generateRandomString,
  generateUUID,
  getCurrentISOString,
  getCurrentTimestamp,
  groupBy,
  hashString,
  omit,
  parseDate,
  pick,
  retry,
  sleep,
  stripHtml,
  throttle,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  truncate,
  unique,
} from './general.helper.js'
