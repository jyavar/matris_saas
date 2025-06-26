import type { Meta, StoryObj } from '@storybook/react'

import Card from './card.js'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: <div>Contenido por defecto</div>,
  },
}

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <h3>Header</h3>
        <div>Contenido con header</div>
      </>
    ),
  },
}

export const Themed: Story = {
  args: {
    children: <div>Card en modo oscuro</div>,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
