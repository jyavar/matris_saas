'use client'

import React, { createContext, useContext, useEffect, useReducer } from 'react'

import {
  AuthContextType,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '@/types/auth'

interface AuthAction {
  type: 'SET_LOADING' | 'SET_USER' | 'SET_ERROR' | 'CLEAR_ERROR' | 'LOGOUT'
  payload?: User | string | boolean
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload as boolean }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload as User,
        loading: false,
        error: null,
      }
    case 'SET_ERROR':
      return { ...state, error: action.payload as string, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null }
    default:
      return state
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Simular verificación de sesión al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // TODO: Implementar verificación real con Supabase
        const token = localStorage.getItem('auth_token')
        if (token) {
          // Verificar token con backend
          // const user = await verifyToken(token)
          // dispatch({ type: 'SET_USER', payload: user })
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })

      // TODO: Implementar login real con backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      localStorage.setItem('auth_token', data.token)
      dispatch({ type: 'SET_USER', payload: data.user })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Login failed',
      })
    }
  }

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })

      // TODO: Implementar registro real con backend
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      localStorage.setItem('auth_token', data.token)
      dispatch({ type: 'SET_USER', payload: data.user })
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Registration failed',
      })
    }
  }

  const logout = async (): Promise<void> => {
    try {
      localStorage.removeItem('auth_token')
      dispatch({ type: 'LOGOUT' })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
