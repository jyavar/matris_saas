import { User as SupabaseUser } from '@supabase/supabase-js'

declare global {
  namespace Express {
    interface User extends SupabaseUser {
      tenant_id: string
    }
  }
}
