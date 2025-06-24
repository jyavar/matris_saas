-- supabase/migrations/20250624001000_enable_rls_and_policy_profiles.sql
-- Description: Habilita RLS y política de aislamiento multi-tenant en profiles

-- Habilitar RLS
alter table profiles enable row level security;

-- Política: solo puede ver/editar perfiles de su tenant
create policy "Profiles: tenant isolation"
  on profiles
  for all
  using (tenant_id = (auth.jwt() ->> 'tenant_id')::uuid); 