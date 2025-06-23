-- supabase/migrations/20250624000100_add_tenants_and_tenant_id.sql
-- Description: Crea la tabla tenants y asocia profiles a tenants (multi-tenancy base)

-- Tabla de tenants
create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz default now() not null
);

-- Agregar tenant_id a profiles
alter table profiles add column tenant_id uuid references tenants(id); 