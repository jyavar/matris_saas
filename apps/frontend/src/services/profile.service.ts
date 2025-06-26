export type UserProfile = {
  id: string
  avatarUrl?: string
  fullName?: string
  username: string
}

export async function getProfile(userId: string): Promise<UserProfile> {
  // TODO: Reemplazar por fetch real a backend/supabase
  return {
    id: userId,
    avatarUrl: '',
    fullName: 'Demo User',
    username: 'demo',
  }
}

export async function updateProfile(
  userId: string,
  data: Partial<UserProfile>,
): Promise<UserProfile> {
  // TODO: Reemplazar por update real
  return {
    id: userId,
    ...data,
    username: data.username || 'demo',
  }
}
