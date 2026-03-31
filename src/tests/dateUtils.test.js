import { describe, it, expect } from 'vitest'
import { parseDate } from '../utils/pricing/dateUtils'

describe('date utils', () => {
  it('should parse date correctly without timezone issues', () => {
    const date = parseDate('2026-04-06')

    expect(date.getDate()).toBe(6)
  })
})
