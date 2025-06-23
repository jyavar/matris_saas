import { z } from 'zod'

import { createUsersSchema } from '../controllers/users.controller.js' // Assuming this schema exists
import { supabase } from '../lib/supabase.js'

export const authService = {
  async signUp(credentials: z.infer<typeof createUsersSchema>) {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password, // This needs to be added to your Zod schema
      options: {
        data: {
          username: credentials.username,
        },
      },
    })

    if (error) {
      throw new Error(error.message)
    }
    return data
  },

  async signIn(credentials: z.infer<typeof createUsersSchema>) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password, // This needs to be added to your Zod schema
    })

    if (error) {
      throw new Error(error.message)
    }
    return data
  },
}
