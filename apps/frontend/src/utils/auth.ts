// Helper mínimo de autenticación para STRATO ML Frontend
export function isAuthenticated(): boolean {
  // Simulación: siempre autenticado
  return true
}

export function getUser() {
  return { id: 'demo-user', email: 'demo@strato.com', role: 'ml_user' }
}

export function getSessionToken(): string {
  // Simulación: token de sesión para build
  return 'demo-session-token'
} 