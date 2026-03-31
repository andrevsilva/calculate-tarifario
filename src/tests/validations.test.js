import { describe, it, expect } from 'vitest'
import { validateBooking } from '../utils/pricing/validations'

const accommodationConfig = {
  id: 'suite',
  name: 'Suite Jardim',
  min_nights: 2
}

describe('validateBooking', () => {
  it('should return errorInvalidAccommodation if config is missing', () => {
    const result = validateBooking(
      { accommodation: 'suite', checkIn: '2026-04-07', checkOut: '2026-04-09' },
      null
    )

    expect(result).toBe('errorInvalidAccommodation')
  })

  it('should return errorPastDate if check-in is before today', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const checkIn = yesterday.toISOString().split('T')[0]
    const checkOut = new Date().toISOString().split('T')[0]

    const result = validateBooking(
      { accommodation: 'suite', checkIn, checkOut },
      accommodationConfig
    )

    expect(result).toBe('errorPastDate')
  })

  it('should return errorInvalidDate if check-out is before check-in', () => {
    const result = validateBooking(
      { accommodation: 'suite', checkIn: '2026-04-10', checkOut: '2026-04-09' },
      accommodationConfig
    )

    expect(result).toBe('errorInvalidDate')
  })

  it('should return errorMinNights if nights are less than minimum', () => {
    const result = validateBooking(
      { accommodation: 'suite', checkIn: '2026-04-07', checkOut: '2026-04-08' },
      accommodationConfig
    )

    expect(result).toEqual({ error: 'errorMinNights', count: 2 })
  })

  it('should return null if booking is valid', () => {
    const result = validateBooking(
      { accommodation: 'suite', checkIn: '2026-04-07', checkOut: '2026-04-09' },
      accommodationConfig
    )

    expect(result).toBeNull()
  })
})
