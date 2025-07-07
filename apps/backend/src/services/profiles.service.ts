
import { ApiError } from '../utils/ApiError.js'

export type ProfileDTO = {
  id: string
  username?: string | null
  full_name?: string | null
  avatar_url?: string | null
  tenant_id?: string | null
  email?: string | null
  updated_at?: string | null
}

function isProfileDTO(obj: unknown): obj is ProfileDTO {
  return (
    typeof obj === 'object' && obj !== null && 'id' in obj && 'username' in obj
  )
}

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || ''
const PROFILES_ENDPOINT = `${SUPABASE_URL}/rest/v1/profiles`

async function fetchProfiles(
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<ProfileDTO[]> {
  const url = new URL(PROFILES_ENDPOINT)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.append(key, String(value))
  })
  const res = await fetch(url.toString(), {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  })
  if (!res.ok) throw new ApiError(res.status, await res.text())
  const data = (await res.json()) as unknown[]
  return data.filter(isProfileDTO)
}

export const profilesService = {
  async getAllProfiles(tenantId: string) {
    return fetchProfiles({ tenant_id: tenantId })
  },

  async getProfileById(id: string, tenantId: string) {
    const profiles = await fetchProfiles({ id, tenant_id: tenantId })
    return profiles[0] || null
  },

  async createProfile(profile: ProfileDTO) {
    const res = await fetch(PROFILES_ENDPOINT, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(profile),
    })
    if (!res.ok) throw new ApiError(res.status, await res.text())
    const data = (await res.json()) as unknown[]
    const profiles = data.filter(isProfileDTO)
    return profiles[0] || null
  },

  async updateProfile(
    id: string,
    tenantId: string,
    profile: Partial<ProfileDTO>,
  ) {
    const res = await fetch(
      `${PROFILES_ENDPOINT}?id=eq.${id}&tenant_id=eq.${tenantId}`,
      {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(profile),
      },
    )
    if (!res.ok) throw new ApiError(res.status, await res.text())
    const data = (await res.json()) as unknown[]
    const profiles = data.filter(isProfileDTO)
    return profiles[0] || null
  },

  async deleteProfile(id: string, tenantId: string) {
    const res = await fetch(
      `${PROFILES_ENDPOINT}?id=eq.${id}&tenant_id=eq.${tenantId}`,
      {
        method: 'DELETE',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: 'return=representation',
        },
      },
    )
    if (!res.ok) throw new ApiError(res.status, await res.text())
    const data = (await res.json()) as unknown[]
    const profiles = data.filter(isProfileDTO)
    if (!profiles.length) throw new ApiError('Profile not found', 404)
    return profiles[0]
  },
}
