import type { Meta, StoryObj } from '@storybook/react'

import Input from './input.js'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    placeholder: 'Escribe algo...',
  },
}

export const Password: Story = {
  args: {
    placeholder: 'Contraseña',
    type: 'password',
  },
}

export const Themed: Story = {
  args: {
    placeholder: 'Modo oscuro',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
