import type { Meta, StoryObj } from '@storybook/react'

import ProfileCard from './ProfileCard.js'

const meta: Meta<typeof ProfileCard> = {
  title: 'UI/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ProfileCard>

export const Default: Story = {
  args: {
    username: 'janedoe',
    fullName: 'Jane Doe',
    avatarUrl: '/avatar.jpg',
  },
}

export const NoAvatar: Story = {
  args: {
    username: 'janedoe',
    fullName: 'Jane Doe',
  },
}

export const Themed: Story = {
  args: {
    username: 'janedoe',
    fullName: 'Jane Doe',
    avatarUrl: '/avatar.jpg',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
