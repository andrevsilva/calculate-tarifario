import { describe, it, expect } from 'vitest'
import {
  calculateExtraGuestFee,
  calculateDiscount
} from '../utils/pricing/rules'

describe('pricing rules', () => {
  it('should not charge extra guests if within capacity', () => {
    const result = calculateExtraGuestFee(2, 2, 3)
    expect(result).toBe(0)
  })

  it('should charge extra guests correctly', () => {
    const result = calculateExtraGuestFee(4, 2, 2)
    expect(result).toBeGreaterThan(0)
  })

  it('should not apply discount for short stays', () => {
    const result = calculateDiscount(1000, 5)
    expect(result).toBe(0)
  })

  it('should apply discount for long stays', () => {
    const result = calculateDiscount(1000, 8)
    expect(result).toBeGreaterThan(0)
  })
})
