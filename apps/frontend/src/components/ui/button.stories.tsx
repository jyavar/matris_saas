import type { Meta, StoryObj } from '@storybook/react'

import Button from './button.js'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Default Button',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'default',
  },
}

export const Themed: Story = {
  args: {
    children: 'Dark Button',
    variant: 'primary',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
