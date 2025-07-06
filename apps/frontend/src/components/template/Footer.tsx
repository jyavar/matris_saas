/**
 * Footer - Pie de página del template
 * @description Componente de footer con enlaces, newsletter y información de la empresa
 */

import Link from 'next/link'
import React from 'react'

import { FooterProps } from '../../types/template'
import { Icons } from './Icons'

interface LinkType {
  href: string
  label: string
  external?: boolean
}

interface LinkSectionProps {
  title: string
  links: LinkType[]
}

const CURRENT_YEAR = new Date().getFullYear()

const LinkSection: React.FC<LinkSectionProps> = ({ title, links }) => {
  return (
    <nav aria-label={title}>
      <div className="flex flex-col md:text-sm">
        <h3 className="font-medium text-foreground mb-6">{title}</h3>
        <ul className="space-y-3 text-muted-foreground">
          {links.map(({ href, label, external }) => (
            <li key={href}>
              <Link
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

const defaultFooterSections: { title: string; links: LinkType[] }[] = [
  {
    title: 'Productos',
    links: [
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/agents', label: 'Agentes' },
      { href: '/modules', label: 'Módulos' },
      { href: '/docs', label: 'Documentación' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { href: '/tos', label: 'Términos de Servicio' },
      { href: '/privacy-policy', label: 'Política de Privacidad' },
      { href: '/docs', label: 'Documentación' },
    ],
  },
  {
    title: 'Comunidad',
    links: [
      {
        href: 'https://discord.gg/your-server',
        label: 'Discord',
        external: true,
      },
      {
        href: 'https://twitter.com/your-handle',
        label: 'Twitter',
        external: true,
      },
      { href: '/newsletter', label: 'Newsletter' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { href: '/about', label: 'Acerca de' },
      { href: '/contact', label: 'Contacto' },
    ],
  },
]

export const Footer: React.FC<FooterProps> = ({
  showNewsletter = true,
  showSocialLinks = true,
}) => {
  return (
    <footer className="border-t border-border/50 w-full" aria-label="Footer">
      <div className="px-6 lg:px-8 pb-12 pt-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <Icons.logo className="h-8 w-8" />
              <span className="font-bold text-xl">STRATO</span>
            </div>
            <p className="md:text-sm text-muted-foreground">
              Framework SaaS enterprise-grade para desarrollo moderno
            </p>
            {showNewsletter && (
              <div className="mt-4">
                <p className="md:text-sm text-muted-foreground mb-2">
                  Suscríbete a nuestro newsletter
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="px-3 py-2 border border-border rounded-md bg-background text-sm"
                  />
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90">
                    Suscribir
                  </button>
                </div>
              </div>
            )}
            {showSocialLinks && (
              <div className="flex gap-2 mt-4">
                <Link
                  href="https://github.com/your-repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border rounded-md hover:bg-accent"
                >
                  <Icons.gitHub className="h-4 w-4" />
                </Link>
                <Link
                  href="https://twitter.com/your-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-border rounded-md hover:bg-accent"
                >
                  <Icons.twitter className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full md:w-auto">
            {defaultFooterSections.map((section) => (
              <LinkSection
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-10">
          © {CURRENT_YEAR} STRATO Core OS™. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
