-- supabase/migrations/20250624000400_add_launchboard_tables.sql
-- Description: Crea las tablas para el sistema de launchboard (dashboards y widgets)

-- Tabla de dashboards
CREATE TABLE dashboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  is_default boolean NOT NULL DEFAULT false,
  layout jsonb DEFAULT '{}',
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Tabla de widgets
CREATE TABLE widgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id uuid REFERENCES dashboards(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  position jsonb NOT NULL DEFAULT '{}',
  size jsonb NOT NULL DEFAULT '{}',
  config jsonb DEFAULT '{}',
  data jsonb DEFAULT '{}',
  refresh_interval integer DEFAULT 300, -- segundos
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Tabla de widget types (tipos de widgets disponibles)
CREATE TABLE widget_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  display_name text NOT NULL,
  description text,
  icon text,
  category text NOT NULL DEFAULT 'general',
  config_schema jsonb DEFAULT '{}',
  is_system boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Índices para performance
CREATE INDEX idx_dashboards_user_id ON dashboards(user_id);
CREATE INDEX idx_dashboards_tenant_id ON dashboards(tenant_id);
CREATE INDEX idx_dashboards_is_default ON dashboards(is_default);
CREATE INDEX idx_widgets_dashboard_id ON widgets(dashboard_id);
CREATE INDEX idx_widgets_type ON widgets(type);
CREATE INDEX idx_widgets_is_active ON widgets(is_active);
CREATE INDEX idx_widget_types_category ON widget_types(category);

-- RLS (Row Level Security)
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE widget_types ENABLE ROW LEVEL SECURITY;

-- Políticas para dashboards
CREATE POLICY "Users can view their own dashboards" ON dashboards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own dashboards" ON dashboards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dashboards" ON dashboards
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own dashboards" ON dashboards
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para widgets
CREATE POLICY "Users can view widgets from their dashboards" ON widgets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = widgets.dashboard_id 
      AND dashboards.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create widgets in their dashboards" ON widgets
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = widgets.dashboard_id 
      AND dashboards.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update widgets in their dashboards" ON widgets
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = widgets.dashboard_id 
      AND dashboards.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete widgets in their dashboards" ON widgets
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM dashboards 
      WHERE dashboards.id = widgets.dashboard_id 
      AND dashboards.user_id = auth.uid()
    )
  );

-- Políticas para widget_types (lectura pública)
CREATE POLICY "Anyone can view widget types" ON widget_types
  FOR SELECT USING (true);

-- Insertar tipos de widgets básicos
INSERT INTO widget_types (name, display_name, description, category, config_schema) VALUES
('chart', 'Chart', 'Display data as charts and graphs', 'visualization', '{"type": "object", "properties": {"chartType": {"type": "string", "enum": ["line", "bar", "pie", "doughnut"]}, "dataSource": {"type": "string"}}}'),
('table', 'Table', 'Display data in a table format', 'data', '{"type": "object", "properties": {"columns": {"type": "array"}, "dataSource": {"type": "string"}}}'),
('metric', 'Metric', 'Display a single key metric', 'kpi', '{"type": "object", "properties": {"value": {"type": "string"}, "label": {"type": "string"}, "format": {"type": "string"}}}'),
('text', 'Text', 'Display text content', 'content', '{"type": "object", "properties": {"content": {"type": "string"}, "format": {"type": "string", "enum": ["markdown", "html", "plain"]}}}'),
('iframe', 'Iframe', 'Embed external content', 'integration', '{"type": "object", "properties": {"url": {"type": "string"}, "height": {"type": "number"}}}'); 