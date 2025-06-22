import { describe, expect, it } from 'vitest'

import { subtract } from './subtract'

describe('subtract', () => {
  it('should subtract two positive numbers correctly', () => {
    expect(subtract(5, 2)).toBe(3)
  })

  it('should result in a negative number if the second number is larger', () => {
    expect(subtract(2, 5)).toBe(-3)
  })

  it('should return the number itself when subtracting zero', () => {
    expect(subtract(10, 0)).toBe(10)
  })

  it('should handle subtraction with a negative number', () => {
    expect(subtract(5, -2)).toBe(7)
  })
})
