import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext.js'
import { supabase } from '../services/supabase.js'

export const ProfilePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error)
    } else {
      navigate('/login')
    }
  }

  if (!user) {
    return <div>Loading user profile...</div>
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, {user.email}!</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}
