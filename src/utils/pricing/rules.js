import { PRICING_RULES } from './constants'
import { isWeekend } from './dateUtils'

export function calculateDailyTotal(config, checkInDate, nights) {
  let totalDaily = 0
  let weekendExtra = 0

  for (let i = 0; i < nights; i++) {
    const currentDate = new Date(
      checkInDate.getFullYear(),
      checkInDate.getMonth(),
      checkInDate.getDate() + i
    )

    const isWeekendDay = isWeekend(currentDate)

    let dailyRate = config.daily_rate

    if (isWeekendDay) {
      const extra = dailyRate * PRICING_RULES.WEEKEND_EXTRA
      weekendExtra += extra
      dailyRate += extra
    }

    totalDaily += dailyRate
  }

  return { totalDaily, weekendExtra }
}

export function calculateExtraGuestFee(adults, capacity, nights) {
  if (adults <= capacity) return 0

  const extraGuests = adults - capacity
  return extraGuests * PRICING_RULES.EXTRA_GUEST_FEE * nights
}

export function calculateDiscount(subtotal, nights) {
  if (nights <= 7) return 0

  return subtotal * PRICING_RULES.LONG_STAY_DISCOUNT
}
