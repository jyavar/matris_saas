#!/usr/bin/env ts-node
import 'dotenv/config'

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    'Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY',
  )
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function seed() {
  console.log('🌱 Iniciando seeding de base de datos...')

  // 1. Insertar roles (si aplica)
  // Si tienes una tabla roles, descomenta y ajusta:
  // await supabase.from('roles').upsert([
  //   { name: 'admin' },
  //   { name: 'user' },
  // ])

  // 2. Insertar usuario admin de prueba en profiles
  const adminProfile = {
    id: '00000000-0000-0000-0000-000000000001',
    username: 'admin',
    full_name: 'Administrador',
    avatar_url: null,
  }
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert([adminProfile])
  if (profileError) {
    console.error('Error insertando admin profile:', profileError)
  } else {
    console.log('✔️  Perfil admin insertado/actualizado')
  }

  // 3. (Opcional) Insertar más datos seed aquí

  console.log('✅ Seeding completado.')
}

seed().catch((err) => {
  console.error('Error en el seeding:', err)
  process.exit(1)
})
