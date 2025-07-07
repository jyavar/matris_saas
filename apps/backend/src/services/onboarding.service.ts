import { z } from 'zod'

import logger from './logger.service.js'
import { ApiError } from '../utils/ApiError.js'

export const onboardingSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

export interface Onboarding {
  user_id: string
  email: string
  tenant_id: string
  welcome_sent: boolean
  setup_complete: boolean
  created_at: string
}

export interface StartOnboardingData {
  email: string
}

export interface CompleteOnboardingData {
  user_id: string
}

class OnboardingService {
  private onboardings: Onboarding[] = []

  async getOnboarding(user_id: string): Promise<Onboarding | null> {
    return this.onboardings.find((o) => o.user_id === user_id) || null
  }

  async startOnboarding(data: StartOnboardingData): Promise<Onboarding> {
    if (!data.email) throw new ApiError('Email is required', 400)
    const onboarding: Onboarding = {
      user_id: `user-${Date.now()}`,
      email: data.email,
      tenant_id: `tenant-${Date.now()}`,
      welcome_sent: true,
      setup_complete: false,
      created_at: new Date().toISOString(),
    }
    this.onboardings.push(onboarding)
    logger.info({ userId: onboarding.user_id }, 'Onboarding started')
    return onboarding
  }

  async completeOnboarding(data: CompleteOnboardingData): Promise<Onboarding> {
    if (!data.user_id) throw new ApiError('user_id is required', 400)
    const onboarding = this.onboardings.find((o) => o.user_id === data.user_id)
    if (!onboarding) throw new ApiError('Onboarding not found', 404)
    onboarding.setup_complete = true
    logger.info({ userId: onboarding.user_id }, 'Onboarding completed')
    return onboarding
  }
}

export const onboardingService = new OnboardingService()
