import { z } from 'zod'

import { authSchema } from '../lib/schemas.js'
import { supabase } from '../lib/supabase.js'
import { ApiError } from '../utils/ApiError.js'

export const authService = {
  async signUp(credentials: z.infer<typeof authSchema>) {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      throw new Error(error.message)
    }
    return data
  },

  async signIn(credentials: z.infer<typeof authSchema>) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new ApiError(401, 'Invalid login credentials')
      }
      throw new Error(error.message)
    }

    if (!data.session) {
      throw new ApiError(401, 'Could not sign in')
    }

    return data
  },
}
