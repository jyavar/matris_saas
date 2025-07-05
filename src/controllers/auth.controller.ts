import { IncomingMessage, ServerResponse } from 'http'
import { z } from 'zod'

import { authService } from '../services/auth.service'
import { logAction } from '../services/logger.service'
import type { AuthenticatedUser, RequestBody } from '../types/express/index.d'
import { ApiError } from '../utils/ApiError'

// ... existing code ... 