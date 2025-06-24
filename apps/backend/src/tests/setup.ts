import { createClient } from '@supabase/supabase-js'
import { afterEach, beforeEach } from 'vitest'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// Limpia tablas críticas antes de cada test para evitar colisiones
beforeEach(async () => {
  await supabase.from('todos').delete().neq('id', '')
  await supabase.from('profiles').delete().neq('id', '')
  // Si tienes más tablas, agrégalas aquí
})

afterEach(async () => {
  // Opcional: limpieza extra si es necesario
})

// Puedes exportar utilidades aquí para usarlas en los tests
export { supabase }
