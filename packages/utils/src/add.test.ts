import { describe, expect, it } from 'vitest'

import { add } from './add'

describe('add function', () => {
  it('should return the sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('should return the sum of a positive and a negative number', () => {
    expect(add(5, -3)).toBe(2)
  })

  it('should return zero when adding a number and its inverse', () => {
    expect(add(10, -10)).toBe(0)
  })

  it('should handle zero correctly', () => {
    expect(add(0, 5)).toBe(5)
    expect(add(5, 0)).toBe(5)
    expect(add(0, 0)).toBe(0)
  })
})
