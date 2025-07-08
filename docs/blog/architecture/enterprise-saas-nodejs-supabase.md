# Building Enterprise SaaS with Node.js and Supabase: A Complete Architecture Guide

*Published: [Date] | Author: [Your Name] | Category: Architecture & Design*

## Introduction

Building enterprise-grade SaaS applications requires careful consideration of architecture, scalability, security, and maintainability. In this article, I'll share the architecture patterns and lessons learned from building STRATO Core OS™, a modular SaaS platform using Node.js and Supabase.

## Why Node.js + Supabase for Enterprise SaaS?

### Node.js Advantages
- **Performance**: Non-blocking I/O for high concurrency
- **Ecosystem**: Rich package ecosystem for enterprise features
- **TypeScript**: Strong typing for maintainable code
- **Microservices**: Easy to break into smaller services
- **Developer Experience**: Excellent tooling and debugging

### Supabase Advantages
- **PostgreSQL**: Enterprise-grade database with advanced features
- **Real-time**: Built-in subscriptions and real-time updates
- **Auth**: Production-ready authentication and authorization
- **Edge Functions**: Serverless compute at the edge
- **Row Level Security**: Fine-grained data access control

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React/Next)  │◄──►│   (Node.js)     │◄──►│   (Supabase)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│   AI Agents     │◄─────────────┘
                        │   (Runtime)     │
                        └─────────────────┘
```

## Core Architecture Principles

### 1. Modular Monorepo Structure
```
strato-core/
├── apps/
│   ├── backend/          # Node.js API
│   ├── frontend/         # React application
│   └── web/             # Next.js landing
├── packages/
│   ├── db-types/        # Shared database types
│   ├── utils/           # Common utilities
│   └── eslint-config/   # Shared linting rules
└── supabase/            # Database migrations
```

### 2. Service-Oriented Design
Each feature is a self-contained service:

```typescript
// services/auth.service.ts
export class AuthService {
  async authenticateUser(token: string): Promise<User> {
    // Authentication logic
  }
  
  async createUser(userData: CreateUserDto): Promise<User> {
    // User creation logic
  }
}

// services/billing.service.ts
export class BillingService {
  async createSubscription(userId: string, plan: Plan): Promise<Subscription> {
    // Billing logic
  }
}
```

### 3. Controller-Service Pattern
Separate HTTP concerns from business logic:

```typescript
// controllers/auth.controller.ts
export class AuthController {
  constructor(private authService: AuthService) {}
  
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await this.authService.authenticateUser(email, password)
      
      res.json({
        success: true,
        data: user,
        token: generateJWT(user)
      })
    } catch (error) {
      handleError(res, error)
    }
  }
}
```

## Database Design with Supabase

### 1. Schema Design
```sql
-- users table with RLS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### 2. Type Safety with Generated Types
```typescript
// types/supabase.types.ts
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
```

### 3. Database Service Layer
```typescript
// services/supabase.service.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase.types'

export class SupabaseService {
  private client
  
  constructor() {
    this.client = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    )
  }
  
  async getUserById(id: string) {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
      
    if (error) throw new Error(error.message)
    return data
  }
  
  async createUser(userData: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await this.client
      .from('users')
      .insert(userData)
      .select()
      .single()
      
    if (error) throw new Error(error.message)
    return data
  }
}
```

## Authentication & Authorization

### 1. JWT-Based Authentication
```typescript
// middleware/auth.middleware.ts
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    req.user = decoded
    
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
```

### 2. Role-Based Access Control
```typescript
// middleware/rbac.middleware.ts
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' })
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }
    
    next()
  }
}

// Usage
app.get('/api/admin/users', 
  authMiddleware, 
  requireRole(['admin']), 
  adminController.getUsers
)
```

## API Design Patterns

### 1. RESTful Endpoints
```typescript
// routes/users.routes.ts
export const userRoutes = {
  // GET /api/users - List users (with pagination)
  list: async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query
    const users = await userService.listUsers({
      page: Number(page),
      limit: Number(limit)
    })
    
    res.json({
      success: true,
      data: users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: users.length
      }
    })
  },
  
  // POST /api/users - Create user
  create: async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body)
    res.status(201).json({
      success: true,
      data: user
    })
  },
  
  // GET /api/users/:id - Get user by ID
  getById: async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id)
    res.json({
      success: true,
      data: user
    })
  }
}
```

### 2. Error Handling
```typescript
// middleware/errorHandler.middleware.ts
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', error)
  
  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: error.details
    })
  }
  
  if (error instanceof AuthError) {
    return res.status(401).json({
      success: false,
      error: 'Authentication failed'
    })
  }
  
  // Default error
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  })
}
```

## Testing Strategy

### 1. Unit Tests
```typescript
// tests/services/auth.service.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthService } from '../../services/auth.service'

describe('AuthService', () => {
  let authService: AuthService
  let mockSupabase: any
  
  beforeEach(() => {
    mockSupabase = {
      auth: {
        signInWithPassword: vi.fn()
      }
    }
    
    vi.mock('@supabase/supabase-js', () => ({
      createClient: () => mockSupabase
    }))
    
    authService = new AuthService()
  })
  
  it('should authenticate user with valid credentials', async () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    mockSupabase.auth.signInWithPassword.mockResolvedValue({
      data: { user: mockUser },
      error: null
    })
    
    const result = await authService.authenticateUser('test@example.com', 'password')
    
    expect(result).toEqual(mockUser)
    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password'
    })
  })
})
```

### 2. Integration Tests
```typescript
// tests/integration/auth.test.ts
import request from 'supertest'
import { app } from '../../src/app'

describe('Auth API', () => {
  it('should register new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      full_name: 'Test User'
    }
    
    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
    
    expect(response.status).toBe(201)
    expect(response.body.success).toBe(true)
    expect(response.body.data.email).toBe(userData.email)
  })
})
```

## Performance Optimization

### 1. Database Indexing
```sql
-- Indexes for common queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

### 2. Caching Strategy
```typescript
// services/cache.service.ts
import Redis from 'ioredis'

export class CacheService {
  private redis: Redis
  
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL)
  }
  
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key)
    return data ? JSON.parse(data) : null
  }
  
  async set(key: string, value: any, ttl = 3600): Promise<void> {
    await this.redis.setex(key, ttl, JSON.stringify(value))
  }
}
```

### 3. Connection Pooling
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
  {
    db: {
      schema: 'public'
    },
    auth: {
      persistSession: false // For server-side usage
    }
  }
)
```

## Security Best Practices

### 1. Environment Variables
```bash
# .env.example
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
OPENAI_API_KEY=your_openai_key
```

### 2. Input Validation
```typescript
// lib/schemas.ts
import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(2).max(100)
})

export const updateUserSchema = z.object({
  full_name: z.string().min(2).max(100).optional(),
  avatar_url: z.string().url().optional()
})
```

### 3. Rate Limiting
```typescript
// middleware/rateLimit.middleware.ts
import rateLimit from 'express-rate-limit'

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts'
})
```

## Deployment & DevOps

### 1. Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

### 2. Environment Configuration
```typescript
// config/env.schema.ts
import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
  SUPABASE_URL: z.string().url(),
  SUPABASE_KEY: z.string(),
  JWT_SECRET: z.string().min(32)
})

export const env = envSchema.parse(process.env)
```

## Monitoring & Observability

### 1. Structured Logging
```typescript
// lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

// Usage
logger.info({ userId: '123', action: 'login' }, 'User logged in')
logger.error({ error: 'Database connection failed' }, 'Service error')
```

### 2. Health Checks
```typescript
// routes/health.routes.ts
export const healthRoutes = {
  check: async (req: Request, res: Response) => {
    try {
      // Check database connection
      await supabase.from('users').select('count').limit(1)
      
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      })
    } catch (error) {
      res.status(503).json({
        status: 'unhealthy',
        error: error.message
      })
    }
  }
}
```

## Lessons Learned

### 1. Start Simple, Scale Gradually
- Begin with a monolithic structure
- Extract services as you grow
- Don't over-engineer early

### 2. Type Safety is Crucial
- Use TypeScript from day one
- Generate types from your database schema
- Validate all inputs and outputs

### 3. Testing is an Investment
- Write tests as you develop features
- Focus on integration tests for critical paths
- Use mocks for external dependencies

### 4. Security First
- Implement authentication early
- Use Row Level Security in Supabase
- Validate and sanitize all inputs

### 5. Monitor Everything
- Log all important events
- Set up alerts for errors
- Track performance metrics

## Conclusion

Building enterprise SaaS with Node.js and Supabase provides a powerful, scalable foundation. The key is to:

1. **Design for scale** from the beginning
2. **Prioritize security** and type safety
3. **Invest in testing** and monitoring
4. **Use proven patterns** and best practices
5. **Iterate and improve** continuously

The architecture patterns shared in this article have been battle-tested in production with STRATO Core OS™, serving thousands of users with high reliability and performance.

---

*What architecture patterns have you found most effective for enterprise SaaS? Share your experiences in the comments below.*

**Follow me on [Twitter](https://twitter.com/yourusername) and [LinkedIn](https://linkedin.com/in/yourusername) for more insights on building scalable SaaS applications.** 