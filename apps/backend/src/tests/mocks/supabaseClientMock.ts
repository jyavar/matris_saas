import { vi } from 'vitest'

// Utilidad para simular errores
function errorResult(message: string, code: string | number) {
  return { data: null, error: { message, code } }
}

// Datos simulados
const analyticsData = [
  { id: 1, event_name: 'test_event', user_id: 1, payload: {}, created_at: new Date().toISOString() },
  { id: 2, event_name: 'page_view', user_id: 1, payload: {}, created_at: new Date().toISOString() },
]
const pricingPlans = [
  { id: 'free', name: 'Free', price: 0, features: ['basic'] },
  { id: 'pro', name: 'Pro', price: 20, features: ['basic', 'advanced'] },
  { id: 'enterprise', name: 'Enterprise', price: 100, features: ['basic', 'advanced', 'premium'] },
]
const profilesData = [
  { id: 1, user_id: 'test-user-id', email: 'test@example.com', full_name: 'Test User', created_at: new Date().toISOString() },
]
const campaignsData = [
  { id: 1, title: 'Test Campaign', description: 'Test Description', budget: 1000, user_id: 'test-user-id', created_at: new Date().toISOString() },
]

// Estado interno para simular inserts/updates
let _analytics = [...analyticsData]
let _plans = [...pricingPlans]
let _profiles = [...profilesData]
let _campaigns = [...campaignsData]

function resetMockData() {
  _analytics = [...analyticsData]
  _plans = [...pricingPlans]
  _profiles = [...profilesData]
  _campaigns = [...campaignsData]
}

function createChainableMock(table: string, data: any[], error: any = null) {
  let _data = [...data]
  let _error = error
  let _limit = 10
  let _offset = 0
  let _orderBy = 'created_at'
  let _orderDirection = 'desc'
  
  const chain = {
    select: vi.fn().mockImplementation((fields = '*') => {
      return chain
    }),
    insert: vi.fn().mockImplementation((rows) => {
      if (rows && rows[0]) {
        const newRow = { 
          id: Date.now(), 
          created_at: new Date().toISOString(),
          ...rows[0] 
        }
        
        // Simular errores específicos
        if (rows[0].event_name === 'fail' || rows[0].title === 'fail') {
          _error = { message: 'Invalid data', code: 400 }
          _data = null
        } else {
          switch (table) {
            case 'analytics':
              _analytics.push(newRow)
              break
            case 'campaigns':
              _campaigns.push(newRow)
              break
            case 'profiles':
              _profiles.push(newRow)
              break
          }
          _data = [newRow]
          _error = null
        }
      }
      return chain
    }),
    update: vi.fn().mockImplementation((updates) => {
      if (updates.title === 'fail' || updates.event_name === 'fail') {
        _error = { message: 'Update failed', code: 400 }
        _data = null
      } else {
        // Simular actualización
        _data = _data.map(row => ({ ...row, ...updates, updated_at: new Date().toISOString() }))
        _error = null
      }
      return chain
    }),
    delete: vi.fn().mockImplementation(() => {
      _data = []
      _error = null
      return {
        neq: vi.fn().mockImplementation((field, value) => {
          _data = _data.filter((row: any) => row[field] !== value)
          return chain
        }),
        eq: vi.fn().mockImplementation((field, value) => {
          if (value === 'fail' || value === 9999) {
            _error = { message: 'Not found', code: 404 }
            _data = null
          } else {
            _data = _data.filter((row: any) => row[field] === value)
            _error = null
          }
          return chain
        }),
        then: vi.fn().mockImplementation((resolve) => {
          resolve({ data: _data, error: _error })
          return chain
        }),
        catch: vi.fn().mockReturnThis(),
        finally: vi.fn().mockReturnThis(),
      }
    }),
    gt: vi.fn().mockImplementation((field, value) => {
      _data = _data.filter((row: any) => row[field] > value)
      return chain
    }),
    gte: vi.fn().mockImplementation((field, value) => {
      _data = _data.filter((row: any) => row[field] >= value)
      return chain
    }),
    lt: vi.fn().mockImplementation((field, value) => {
      _data = _data.filter((row: any) => row[field] < value)
      return chain
    }),
    lte: vi.fn().mockImplementation((field, value) => {
      _data = _data.filter((row: any) => row[field] <= value)
      return chain
    }),
    like: vi.fn().mockImplementation((field, value) => {
      _data = _data.filter((row: any) => row[field]?.includes(value.replace('%', '')))
      return chain
    }),
    ilike: vi.fn().mockImplementation((field, value) => {
      _data = _data.filter((row: any) => row[field]?.toLowerCase().includes(value.replace('%', '').toLowerCase()))
      return chain
    }),
    in: vi.fn().mockImplementation((field, values) => {
      _data = _data.filter((row: any) => values.includes(row[field]))
      return chain
    }),
    order: vi.fn().mockImplementation((field, direction = 'asc') => {
      _orderBy = field
      _orderDirection = direction
      return chain
    }),
    limit: vi.fn().mockImplementation((count) => {
      _limit = count
      return chain
    }),
    range: vi.fn().mockImplementation((from, to) => {
      _offset = from
      _limit = to - from + 1
      return chain
    }),
    single: vi.fn().mockImplementation(() => {
      if (_data.length === 0) {
        _error = { message: 'No rows returned', code: 404 }
        return chain
      }
      _data = [_data[0]]
      return chain
    }),
    then: vi.fn().mockImplementation((resolve) => {
      // Aplicar ordenamiento y paginación
      let result = [..._data]
      
      if (_orderBy) {
        result.sort((a, b) => {
          const aVal = a[_orderBy]
          const bVal = b[_orderBy]
          if (_orderDirection === 'desc') {
            return bVal > aVal ? 1 : -1
          }
          return aVal > bVal ? 1 : -1
        })
      }
      
      if (_limit) {
        result = result.slice(_offset, _offset + _limit)
      }
      
      resolve({ data: result, error: _error })
      return chain
    }),
    catch: vi.fn().mockReturnThis(),
    finally: vi.fn().mockReturnThis(),
  }
  return chain
}

export const supabaseMock = {
  from: vi.fn().mockImplementation((table: string) => {
    switch (table) {
      case 'analytics':
        return createChainableMock('analytics', _analytics)
      case 'plans':
        return createChainableMock('plans', _plans)
      case 'profiles':
        return createChainableMock('profiles', _profiles)
      case 'campaigns':
        return createChainableMock('campaigns', _campaigns)
      default:
        return createChainableMock(table, [])
    }
  }),
  auth: {
    getUser: vi.fn().mockImplementation(({ token }) => {
      if (!token || token === 'invalid') {
        return Promise.resolve(errorResult('Invalid token', 401))
      }
      return Promise.resolve({ 
        data: { user: { id: 'test-user-id', email: 'test@example.com' } }, 
        error: null 
      })
    }),
    signInWithPassword: vi.fn().mockImplementation(({ email, password }) => {
      if (email === 'fail@example.com' || password === 'wrong') {
        return Promise.resolve(errorResult('Invalid credentials', 401))
      }
      return Promise.resolve({
        data: { 
          user: { id: 'test-user-id', email },
          session: { access_token: 'valid-token' }
        },
        error: null
      })
    }),
    signUp: vi.fn().mockImplementation(({ email, password }) => {
      if (email === 'fail@example.com') {
        return Promise.resolve(errorResult('Email already exists', 400))
      }
      return Promise.resolve({
        data: { 
          user: { id: 'new-user-id', email },
          session: { access_token: 'valid-token' }
        },
        error: null
      })
    }),
  },
  __reset: resetMockData,
} 