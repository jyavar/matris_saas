import type { Meta, StoryObj } from '@storybook/react'

import AnalyticsPanel from './AnalyticsPanel.js'

const meta: Meta<typeof AnalyticsPanel> = {
  title: 'UI/AnalyticsPanel',
  component: AnalyticsPanel,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof AnalyticsPanel>

export const Default: Story = {
  args: {
    metrics: [
      { label: 'Usuarios', value: 100 },
      { label: 'Ingresos', value: '$5000' },
    ],
  },
}

export const Themed: Story = {
  args: {
    metrics: [
      { label: 'Usuarios', value: 100 },
      { label: 'Ingresos', value: '$5000' },
    ],
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
