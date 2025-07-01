// Servicio base para Launchboard

export interface Widget {
  id: string
  type: string
  data: object
}

export interface Dashboard {
  id: string
  name: string
  widgets: Widget[]
}

export class LaunchboardService {
  private dashboards: Dashboard[] = [
    {
      id: 'dashboard-1',
      name: 'Main Dashboard',
      widgets: [
        { id: 'widget-1', type: 'chart', data: { value: 42 } },
        { id: 'widget-2', type: 'table', data: { rows: [] } },
      ],
    },
  ]

  async getDashboards(): Promise<Dashboard[]> {
    return this.dashboards
  }

  async getDashboardById(id: string): Promise<Dashboard | null> {
    return this.dashboards.find((d) => d.id === id) || null
  }

  async createDashboard(data: { name: string; widgets: Widget[] }): Promise<Dashboard> {
    const newDashboard: Dashboard = {
      id: `dashboard-${Date.now()}`,
      name: data.name,
      widgets: data.widgets,
    }
    this.dashboards.push(newDashboard)
    return newDashboard
  }

  async updateDashboard(id: string, data: Partial<{ name: string; widgets: Widget[] }>): Promise<Dashboard | null> {
    const dashboard = this.dashboards.find((d) => d.id === id)
    if (!dashboard) return null
    if (data.name) dashboard.name = data.name
    if (data.widgets) dashboard.widgets = data.widgets
    return dashboard
  }

  async deleteDashboard(id: string): Promise<boolean> {
    const idx = this.dashboards.findIndex((d) => d.id === id)
    if (idx === -1) return false
    this.dashboards.splice(idx, 1)
    return true
  }
}

export const launchboardService = new LaunchboardService() 