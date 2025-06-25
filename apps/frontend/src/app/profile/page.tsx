'use client'

import { useRouter } from 'next/navigation'

import { useAuth } from '../../contexts/AuthContext.js'
import { supabase } from '../../services/supabase.js'

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error logging out:', error)
    } else {
      router.push('/login')
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
