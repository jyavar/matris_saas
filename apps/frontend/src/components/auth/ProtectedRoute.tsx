import React from "react"
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext.js'

type ProtectedRouteProps = {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading session...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}
