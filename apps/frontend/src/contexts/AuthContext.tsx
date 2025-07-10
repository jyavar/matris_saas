'use client'

import React, { createContext, useContext, useEffect, useReducer } from 'react'

import {
  AuthContextType,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
  User,
} from '@/types/auth'
import {
  signInWithEmail,
  signUpWithEmail,
  signOut,
  getCurrentUser,
  getCurrentSession,
  SupabaseUser,
} from '@/lib/supabase'

interface AuthAction {
  type: 'SET_LOADING' | 'SET_USER' | 'SET_ERROR' | 'CLEAR_ERROR' | 'LOGOUT'
  payload?: User | string | boolean
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
}

// Helper para convertir SupabaseUser a User
const mapSupabaseUserToUser = (supabaseUser: SupabaseUser): User => ({
  id: supabaseUser.id,
  email: supabaseUser.email,
  name: supabaseUser.user_metadata?.name,
  avatar_url: supabaseUser.user_metadata?.avatar_url,
  created_at: supabaseUser.created_at,
  updated_at: supabaseUser.updated_at,
})

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

  // Verificación de sesión al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getCurrentSession()
        if (session) {
          const user = await getCurrentUser()
          if (user) {
            dispatch({ type: 'SET_USER', payload: mapSupabaseUserToUser(user) })
          }
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

      const { data, error } = await signInWithEmail(credentials.email, credentials.password)

      if (error) {
        throw new Error(error.message)
      }

      if (data.user) {
        dispatch({ type: 'SET_USER', payload: mapSupabaseUserToUser(data.user) })
      }
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

      const { data, error } = await signUpWithEmail(
        credentials.email,
        credentials.password,
        credentials.name ? { name: credentials.name } : undefined
      )

      if (error) {
        throw new Error(error.message)
      }

      if (data.user) {
        dispatch({ type: 'SET_USER', payload: mapSupabaseUserToUser(data.user) })
      }
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Registration failed',
      })
    }
  }

  const logout = async (): Promise<void> => {
    try {
      const { error } = await signOut()
      if (error) {
        console.error('Logout error:', error.message)
      }
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
