import type { Meta, StoryObj } from '@storybook/react'

import UserBadge from './UserBadge.js'

const meta: Meta<typeof UserBadge> = {
  title: 'UI/UserBadge',
  component: UserBadge,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof UserBadge>

export const Offline: Story = {
  args: {
    username: 'janedoe',
    status: 'offline',
  },
}

export const Online: Story = {
  args: {
    username: 'janedoe',
    status: 'online',
  },
}

export const Themed: Story = {
  args: {
    username: 'janedoe',
    status: 'online',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
