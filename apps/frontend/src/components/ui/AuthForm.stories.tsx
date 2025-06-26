import type { Meta, StoryObj } from '@storybook/react'

import AuthForm from './AuthForm.js'

const meta: Meta<typeof AuthForm> = {
  title: 'UI/AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof AuthForm>

export const Login: Story = {
  args: {
    title: 'Login',
    onSubmit: () => {},
  },
}

export const Register: Story = {
  args: {
    title: 'Register',
    onSubmit: () => {},
  },
}

export const Themed: Story = {
  args: {
    title: 'Login',
    onSubmit: () => {},
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
