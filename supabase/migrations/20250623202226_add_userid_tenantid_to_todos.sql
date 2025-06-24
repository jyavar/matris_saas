-- Agrega user_id y tenant_id a la tabla todos
alter table todos add column user_id uuid not null;
alter table todos add column tenant_id uuid not null;

-- Índices para performance
create index if not exists todos_user_id_idx on todos(user_id);
create index if not exists todos_tenant_id_idx on todos(tenant_id); 