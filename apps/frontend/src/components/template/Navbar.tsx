/**
 * Navbar - Barra de navegación principal del template
 * @description Componente de navegación responsive con menú móvil y enlaces principales
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '../../lib/utils'
import {
  MobileLinkProps,
  NavbarProps,
  NavigationLink,
} from '../../types/template'
import { Icons } from './Icons'

const defaultLinks: NavigationLink[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
  },
  {
    href: '/agents',
    label: 'Agentes',
  },
  {
    href: '/modules',
    label: 'Módulos',
  },
  {
    href: '/docs',
    label: 'Documentación',
  },
]

function MobileLink({
  href,
  label,
  className,
  onClick,
  ...props
}: MobileLinkProps): JSX.Element {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'w-min whitespace-nowrap text-foreground text-sm py-2',
        className,
      )}
      {...props}
    >
      {label}
    </Link>
  )
}

export const Navbar: React.FC<NavbarProps> = ({
  links = defaultLinks,
  showGithubButton = true,
  showSocialButtons = true,
}) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 backdrop-blur-md bg-background/70 px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex h-14 items-center w-full justify-between z-50 relative">
          {/* Desktop Navigation */}
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Icons.logo className="h-6 w-6" />
              <span className="font-bold">STRATO</span>
            </Link>
            <nav
              aria-label="Main navigation"
              className="flex items-center gap-4 text-[13.5px] xl:gap-5"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.external && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': `${link.label} (opens in new tab)`,
                  })}
                  className={cn(
                    'transition-colors text-muted-foreground hover:text-foreground font-normal',
                    pathname?.startsWith(link.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex gap-3">
            <button
              aria-label="Open main menu"
              aria-controls="mobile-navigation"
              className="flex items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icons.menu />
              <span className="sr-only">Toggle Menu</span>
            </button>
            <Link href="/">
              <Icons.logo className="h-6 w-6" />
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 text-sm font-light">
            {showGithubButton && (
              <Link
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[30px] px-2 py-1 rounded border hover:bg-accent"
              >
                <Icons.gitHub className="h-4 w-4" />
              </Link>
            )}
            {showSocialButtons && (
              <Link
                href="https://twitter.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[30px] px-2 py-1 rounded border hover:bg-accent"
              >
                <Icons.twitter />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border">
            <nav className="flex flex-col p-4 space-y-2">
              {links.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
