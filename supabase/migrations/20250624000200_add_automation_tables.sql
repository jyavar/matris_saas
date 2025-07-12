-- supabase/migrations/20250624000200_add_automation_tables.sql
-- Description: Crea las tablas para el sistema de automatización (workflows y jobs)

-- Tabla de workflows
CREATE TABLE workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'inactive', 'draft')),
  steps jsonb NOT NULL DEFAULT '[]',
  schedule jsonb NOT NULL DEFAULT '{}',
  created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Tabla de jobs (ejecuciones de workflows)
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id uuid REFERENCES workflows(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'paused')),
  started_at timestamptz,
  completed_at timestamptz,
  result jsonb,
  error text,
  data jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Índices para performance
CREATE INDEX idx_workflows_created_by ON workflows(created_by);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_jobs_workflow_id ON jobs(workflow_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at);

-- RLS (Row Level Security)
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Políticas para workflows
CREATE POLICY "Users can view their own workflows" ON workflows
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create their own workflows" ON workflows
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own workflows" ON workflows
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own workflows" ON workflows
  FOR DELETE USING (auth.uid() = created_by);

-- Políticas para jobs
CREATE POLICY "Users can view jobs from their workflows" ON jobs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workflows 
      WHERE workflows.id = jobs.workflow_id 
      AND workflows.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can create jobs for their workflows" ON jobs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM workflows 
      WHERE workflows.id = jobs.workflow_id 
      AND workflows.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can update jobs from their workflows" ON jobs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM workflows 
      WHERE workflows.id = jobs.workflow_id 
      AND workflows.created_by = auth.uid()
    )
  ); 