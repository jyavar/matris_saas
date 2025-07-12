import { z } from 'zod'

import { supabase } from '../lib/supabase.js'
import { ApiError } from '../utils/ApiError.js'
import logger from './logger.service.js'

export const onboardingSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

export interface Onboarding {
  id: string
  user_id: string
  email: string
  name?: string
  tenant_id: string
  step: 'welcome' | 'profile' | 'preferences' | 'verification' | 'complete'
  welcome_sent: boolean
  setup_complete: boolean
  preferences?: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface StartOnboardingData {
  email: string
  name?: string
}

export interface UpdateOnboardingData {
  step?: Onboarding['step']
  name?: string
  preferences?: Record<string, unknown>
}

export interface CompleteOnboardingData {
  user_id: string
  preferences?: Record<string, unknown>
}

export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
  required: boolean
}

export interface OnboardingProgress {
  current_step: Onboarding['step']
  total_steps: number
  completed_steps: number
  steps: OnboardingStep[]
}

class OnboardingService {
  /**
   * Obtiene el onboarding de un usuario
   */
  async getOnboarding(user_id: string): Promise<Onboarding | null> {
    try {
      const { data, error } = await supabase
        .from('onboardings')
        .select('*')
        .eq('user_id', user_id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // No encontrado
        }
        logger.error({ error, user_id }, 'Error fetching onboarding')
        throw new ApiError('Failed to fetch onboarding', 500)
      }

      return data
    } catch (error) {
      logger.error({ error, user_id }, 'Error in getOnboarding')
      throw error
    }
  }

  /**
   * Inicia el proceso de onboarding
   */
  async startOnboarding(data: StartOnboardingData): Promise<Onboarding> {
    try {
      // Validar datos requeridos
      if (!data.email) {
        throw new ApiError('Email is required', 400)
      }

      // Verificar si ya existe un onboarding para este email
      const existingOnboarding = await this.getOnboardingByEmail(data.email)
      if (existingOnboarding) {
        throw new ApiError('Onboarding already exists for this email', 400)
      }

      // Generar user_id temporal (se actualizará cuando el usuario se registre)
      const tempUserId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      const onboarding: Omit<Onboarding, 'id' | 'created_at' | 'updated_at'> = {
        user_id: tempUserId,
        email: data.email,
        name: data.name,
        tenant_id: `tenant-${Date.now()}`,
        step: 'welcome',
        welcome_sent: false,
        setup_complete: false,
        preferences: {},
      }

      const { data: createdOnboarding, error } = await supabase
        .from('onboardings')
        .insert(onboarding)
        .select()
        .single()

      if (error) {
        logger.error({ error }, 'Error creating onboarding')
        throw new ApiError('Failed to create onboarding', 500)
      }

      // Enviar email de bienvenida
      await this.sendWelcomeEmail(data.email, data.name)

      logger.info(
        { onboardingId: createdOnboarding.id, email: data.email },
        'Onboarding started successfully',
      )
      return createdOnboarding
    } catch (error) {
      logger.error({ error }, 'Error in startOnboarding')
      throw error
    }
  }

  /**
   * Actualiza el onboarding
   */
  async updateOnboarding(
    user_id: string,
    updateData: UpdateOnboardingData,
  ): Promise<Onboarding | null> {
    try {
      // Verificar que el onboarding existe
      const existingOnboarding = await this.getOnboarding(user_id)
      if (!existingOnboarding) {
        return null
      }

      // Preparar datos de actualización
      const updatePayload: Partial<Onboarding> = {
        updated_at: new Date().toISOString(),
      }

      if (updateData.step !== undefined) updatePayload.step = updateData.step
      if (updateData.name !== undefined) updatePayload.name = updateData.name
      if (updateData.preferences !== undefined) {
        updatePayload.preferences = {
          ...existingOnboarding.preferences,
          ...updateData.preferences,
        }
      }

      const { data, error } = await supabase
        .from('onboardings')
        .update(updatePayload)
        .eq('user_id', user_id)
        .select()
        .single()

      if (error) {
        logger.error({ error, user_id, updateData }, 'Error updating onboarding')
        throw new ApiError('Failed to update onboarding', 500)
      }

      logger.info({ user_id, step: updateData.step }, 'Onboarding updated successfully')
      return data
    } catch (error) {
      logger.error({ error, user_id, updateData }, 'Error in updateOnboarding')
      throw error
    }
  }

  /**
   * Completa el onboarding
   */
  async completeOnboarding(data: CompleteOnboardingData): Promise<Onboarding | null> {
    try {
      if (!data.user_id) {
        throw new ApiError('user_id is required', 400)
      }

      const onboarding = await this.getOnboarding(data.user_id)
      if (!onboarding) {
        throw new ApiError('Onboarding not found', 404)
      }

      // Actualizar onboarding como completado
      const updatePayload: Partial<Onboarding> = {
        step: 'complete',
        setup_complete: true,
        updated_at: new Date().toISOString(),
      }

      if (data.preferences) {
        updatePayload.preferences = {
          ...onboarding.preferences,
          ...data.preferences,
        }
      }

      const { data: updatedOnboarding, error } = await supabase
        .from('onboardings')
        .update(updatePayload)
        .eq('user_id', data.user_id)
        .select()
        .single()

      if (error) {
        logger.error({ error, user_id: data.user_id }, 'Error completing onboarding')
        throw new ApiError('Failed to complete onboarding', 500)
      }

      // Enviar email de bienvenida final
      await this.sendCompletionEmail(onboarding.email, onboarding.name)

      logger.info({ user_id: data.user_id }, 'Onboarding completed successfully')
      return updatedOnboarding
    } catch (error) {
      logger.error({ error, user_id: data.user_id }, 'Error in completeOnboarding')
      throw error
    }
  }

  /**
   * Obtiene el progreso del onboarding
   */
  async getOnboardingProgress(user_id: string): Promise<OnboardingProgress | null> {
    try {
      const onboarding = await this.getOnboarding(user_id)
      if (!onboarding) {
        return null
      }

      const steps: OnboardingStep[] = [
        {
          id: 'welcome',
          title: 'Bienvenido',
          description: 'Configuración inicial',
          completed: onboarding.step !== 'welcome',
          required: true,
        },
        {
          id: 'profile',
          title: 'Perfil',
          description: 'Información personal',
          completed: ['profile', 'preferences', 'verification', 'complete'].includes(
            onboarding.step,
          ),
          required: true,
        },
        {
          id: 'preferences',
          title: 'Preferencias',
          description: 'Configuración de preferencias',
          completed: ['preferences', 'verification', 'complete'].includes(onboarding.step),
          required: false,
        },
        {
          id: 'verification',
          title: 'Verificación',
          description: 'Verificar cuenta',
          completed: ['verification', 'complete'].includes(onboarding.step),
          required: true,
        },
        {
          id: 'complete',
          title: 'Completado',
          description: 'Onboarding finalizado',
          completed: onboarding.step === 'complete',
          required: true,
        },
      ]

      const completedSteps = steps.filter((step) => step.completed).length

      return {
        current_step: onboarding.step,
        total_steps: steps.length,
        completed_steps: completedSteps,
        steps,
      }
    } catch (error) {
      logger.error({ error, user_id }, 'Error in getOnboardingProgress')
      throw error
    }
  }

  /**
   * Obtiene onboarding por email
   */
  async getOnboardingByEmail(email: string): Promise<Onboarding | null> {
    try {
      const { data, error } = await supabase
        .from('onboardings')
        .select('*')
        .eq('email', email)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return null // No encontrado
        }
        logger.error({ error, email }, 'Error fetching onboarding by email')
        throw new ApiError('Failed to fetch onboarding by email', 500)
      }

      return data
    } catch (error) {
      logger.error({ error, email }, 'Error in getOnboardingByEmail')
      throw error
    }
  }

  /**
   * Envía email de bienvenida
   */
  private async sendWelcomeEmail(email: string, name?: string): Promise<void> {
    try {
      // Aquí se integraría con el servicio de email (Resend)
      logger.info({ email, name }, 'Welcome email sent')
      
      // Actualizar estado de welcome_sent
      await supabase
        .from('onboardings')
        .update({ welcome_sent: true })
        .eq('email', email)
    } catch (error) {
      logger.error({ error, email }, 'Error sending welcome email')
      // No lanzar error para no interrumpir el flujo
    }
  }

  /**
   * Envía email de completado
   */
  private async sendCompletionEmail(email: string, name?: string): Promise<void> {
    try {
      // Aquí se integraría con el servicio de email (Resend)
      logger.info({ email, name }, 'Completion email sent')
    } catch (error) {
      logger.error({ error, email }, 'Error sending completion email')
      // No lanzar error para no interrumpir el flujo
    }
  }

  /**
   * Elimina onboarding (para casos de cancelación)
   */
  async deleteOnboarding(user_id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('onboardings').delete().eq('user_id', user_id)

      if (error) {
        logger.error({ error, user_id }, 'Error deleting onboarding')
        throw new ApiError('Failed to delete onboarding', 500)
      }

      logger.info({ user_id }, 'Onboarding deleted successfully')
      return true
    } catch (error) {
      logger.error({ error, user_id }, 'Error in deleteOnboarding')
      throw error
    }
  }

  /**
   * Obtiene estadísticas de onboarding
   */
  async getOnboardingStats(): Promise<{
    total: number
    completed: number
    in_progress: number
    abandoned: number
  }> {
    try {
      const { data, error } = await supabase
        .from('onboardings')
        .select('step, setup_complete')

      if (error) {
        logger.error({ error }, 'Error fetching onboarding stats')
        throw new ApiError('Failed to fetch onboarding stats', 500)
      }

      const total = data?.length || 0
      const completed = data?.filter((o) => o.setup_complete).length || 0
      const in_progress = data?.filter((o) => !o.setup_complete && o.step !== 'welcome').length || 0
      const abandoned = data?.filter((o) => !o.setup_complete && o.step === 'welcome').length || 0

      return {
        total,
        completed,
        in_progress,
        abandoned,
      }
    } catch (error) {
      logger.error({ error }, 'Error in getOnboardingStats')
      throw error
    }
  }
}

export const onboardingService = new OnboardingService()
