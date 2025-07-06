/**
 * BaseLayout - Layout base para páginas del template
 * @description Layout principal que incluye configuración de tema, fuentes y estructura base
 */

import React from 'react'

import { BaseLayoutProps } from '../../types/template'

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return <div className="min-h-screen bg-background font-sans">{children}</div>
}

export default BaseLayout
