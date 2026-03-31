import { validateBooking } from './validations'
import { parseDate, getNights } from './dateUtils'
import {
  calculateDailyTotal,
  calculateExtraGuestFee,
  calculateDiscount
} from './rules'

/**
 * @param {Object} input
 * @param {Array} accommodations
 */
export function calculateTarifario(input, accommodations) {
  const { accommodation, checkIn, checkOut, adults } = input

  const config = accommodations.find((a) => a.id === accommodation)

  const validationError = validateBooking(input, config)

  if (validationError) {
    return typeof validationError === 'string'
      ? { success: false, error: validationError }
      : { success: false, ...validationError }
  }

  const checkInDate = parseDate(checkIn)
  const checkOutDate = parseDate(checkOut)

  const nights = getNights(checkInDate, checkOutDate)

  const { totalDaily, weekendExtra } = calculateDailyTotal(
    config,
    checkInDate,
    nights
  )

  const extraGuestFee = calculateExtraGuestFee(adults, config.capacity, nights)

  const subtotal = totalDaily + config.cleaning_fee + extraGuestFee

  const discount = calculateDiscount(subtotal, nights)

  const total = subtotal - discount

  return {
    success: true,
    data: {
      accommodation: config.name,
      nights,
      totalDaily,
      cleaningFee: config.cleaning_fee,
      extraGuestFee,
      weekendExtra,
      discount,
      total
    }
  }
}
