import './App.css'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './components/auth/ProtectedRoute.js'
import { useAuth } from './contexts/AuthContext.js'
import { HomePage } from './pages/HomePage.js'
import { LoginPage } from './pages/LoginPage.js'
import { ProfilePage } from './pages/ProfilePage.js'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading application...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/profile" /> : <LoginPage />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
