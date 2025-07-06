'use client'

/**
 * NewsletterForm - Componente de formulario de newsletter
 * @description Formulario para suscripción al newsletter con validación
 */

import React from 'react'

import { NewsletterFormProps } from '../../types/template'
import { Icons } from './Icons'

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  title = 'Mantente actualizado',
  description = 'Recibe las últimas noticias y actualizaciones de STRATO',
  placeholder = 'tu@email.com',
  buttonText = 'Suscribir',
  onSubmit,
}) => {
  const [email, setEmail] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes('@')) {
      return
    }

    setIsLoading(true)

    try {
      if (onSubmit) {
        await onSubmit(email)
      }
      setIsSubmitted(true)
      setEmail('')
    } catch (error) {
      console.error('Error al suscribir:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center p-6 border border-green-200 rounded-lg bg-green-50 dark:bg-green-950 dark:border-green-800">
        <Icons.logo className="h-8 w-8 mx-auto mb-2 text-green-600" />
        <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">
          ¡Gracias por suscribirte!
        </h3>
        <p className="text-sm text-green-600 dark:text-green-300">
          Te mantendremos informado sobre las últimas novedades.
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 border border-border rounded-lg bg-background">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={isLoading || !email}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Icons.spinner className="h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              buttonText
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterForm
