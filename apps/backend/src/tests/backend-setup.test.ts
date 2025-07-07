import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'
import { PostHog } from 'posthog-node'
import { Resend } from 'resend'
import Stripe from 'stripe'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Test funcional que demuestra que el sistema de testing funciona
describe('Backend Testing Setup', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should have environment variables set correctly', () => {
    expect(process.env.NODE_ENV).toBe('test')
    expect(process.env.SUPABASE_URL).toBe('https://test.supabase.co')
    expect(process.env.STRIPE_SECRET_KEY).toBe('sk_test_123')
    expect(process.env.OPENAI_API_KEY).toBe('sk-test-123')
  })

  it('should mock Supabase client correctly', async () => {
    const supabase = createClient('https://test.supabase.co', 'test-key')

    // Test auth methods
    const signInResult = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password',
    })

    expect(signInResult.data?.user?.id).toBe('test-user')
    expect(signInResult.error).toBeNull()

    // Test database methods
    const selectResult = await supabase.from('test_table').select().eq('id', 1)

    expect(selectResult.data).toEqual([{ id: 1 }])
    expect(selectResult.error).toBeNull()
  })

  it('should mock Stripe correctly', async () => {
    const stripe = new Stripe('sk_test_123')

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
    })

    expect(paymentIntent.id).toBe('pi_test_123')
  })

  it('should mock OpenAI correctly', async () => {
    const openai = new OpenAI({ apiKey: 'sk-test-123' })

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
    })

    expect(completion.choices[0].message.content).toBe('Test response')
  })

  it('should mock Resend correctly', async () => {
    const resend = new Resend('test-resend-key')

    const emailResult = await resend.emails.send({
      from: 'test@example.com',
      to: 'user@example.com',
      subject: 'Test',
      html: '<p>Test</p>',
    })

    expect(emailResult.data?.id).toBe('test-email-id')
  })

  it('should mock PostHog correctly', () => {
    const posthog = new PostHog('test-posthog-key')

    expect(posthog.capture).toBeDefined()
    expect(posthog.identify).toBeDefined()
  })

  it('should mock fetch global correctly', () => {
    expect(global.fetch).toBeDefined()
    expect(typeof global.fetch).toBe('function')
  })

  it('should mock console methods correctly', () => {
    console.log('test')
    console.error('test error')

    expect(console.log).toHaveBeenCalledWith('test')
    expect(console.error).toHaveBeenCalledWith('test error')
  })
})
