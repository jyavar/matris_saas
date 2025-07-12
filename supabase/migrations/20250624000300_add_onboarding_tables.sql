-- supabase/migrations/20250624000300_add_onboarding_tables.sql
-- Description: Crea las tablas para el sistema de onboarding

-- Tabla de onboarding
CREATE TABLE onboardings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text,
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  step text NOT NULL DEFAULT 'welcome' CHECK (step IN ('welcome', 'profile', 'preferences', 'verification', 'complete')),
  welcome_sent boolean NOT NULL DEFAULT false,
  setup_complete boolean NOT NULL DEFAULT false,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id),
  UNIQUE(email)
);

-- Índices para performance
CREATE INDEX idx_onboardings_user_id ON onboardings(user_id);
CREATE INDEX idx_onboardings_email ON onboardings(email);
CREATE INDEX idx_onboardings_tenant_id ON onboardings(tenant_id);
CREATE INDEX idx_onboardings_step ON onboardings(step);
CREATE INDEX idx_onboardings_setup_complete ON onboardings(setup_complete);

-- RLS (Row Level Security)
ALTER TABLE onboardings ENABLE ROW LEVEL SECURITY;

-- Políticas para onboarding
CREATE POLICY "Users can view their own onboarding" ON onboardings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own onboarding" ON onboardings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding" ON onboardings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own onboarding" ON onboardings
  FOR DELETE USING (auth.uid() = user_id);

-- Política para admins (pueden ver todos los onboardings)
CREATE POLICY "Admins can view all onboardings" ON onboardings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  ); 