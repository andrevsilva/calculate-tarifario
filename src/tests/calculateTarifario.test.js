import { describe, it, expect } from 'vitest'
import { calculateTarifario } from '../utils/pricing/calculateTarifario'

const accommodations = [
  {
    id: 'suite',
    name: 'Suite Jardim',
    daily_rate: 300,
    min_nights: 2,
    cleaning_fee: 80,
    capacity: 2
  }
]

describe('calculateTarifario', () => {
  it('should calculate total for valid stay', () => {
    const result = calculateTarifario(
      {
        accommodation: 'suite',
        checkIn: '2026-04-07',
        checkOut: '2026-04-09',
        adults: 2
      },
      accommodations
    )

    expect(result.success).toBe(true)
    expect(result.data.nights).toBe(2)
    expect(result.data.total).toBeGreaterThan(0)
  })

  it('should return error for invalid date range', () => {
    const result = calculateTarifario(
      {
        accommodation: 'suite',
        checkIn: '2026-04-10',
        checkOut: '2026-04-09',
        adults: 2
      },
      accommodations
    )

    expect(result.success).toBe(false)
  })

  it('should enforce minimum nights', () => {
    const result = calculateTarifario(
      {
        accommodation: 'suite',
        checkIn: '2026-04-07',
        checkOut: '2026-04-08',
        adults: 2
      },
      accommodations
    )

    expect(result.success).toBe(false)
  })

  it('should apply weekend extra', () => {
    const result = calculateTarifario(
      {
        accommodation: 'suite',
        checkIn: '2026-04-10',
        checkOut: '2026-04-13',
        adults: 2
      },
      accommodations
    )

    expect(result.data.weekendExtra).toBeGreaterThan(0)
  })

  it('should apply long stay discount', () => {
    const result = calculateTarifario(
      {
        accommodation: 'suite',
        checkIn: '2026-04-01',
        checkOut: '2026-04-10',
        adults: 2
      },
      accommodations
    )

    expect(result.data.discount).toBeGreaterThan(0)
  })

  it('should charge extra guests', () => {
    const result = calculateTarifario(
      {
        accommodation: 'suite',
        checkIn: '2026-04-07',
        checkOut: '2026-04-09',
        adults: 4
      },
      accommodations
    )

    expect(result.data.extraGuestFee).toBeGreaterThan(0)
  })

  it('should return error for invalid accommodation', () => {
    const result = calculateTarifario(
      {
        accommodation: 'invalid',
        checkIn: '2026-04-07',
        checkOut: '2026-04-09',
        adults: 2
      },
      accommodations
    )

    expect(result.success).toBe(false)
  })
})
