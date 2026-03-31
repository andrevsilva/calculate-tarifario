export function validateBooking({ accommodation, checkIn, checkOut }, config) {
  if (!config) {
    return 'errorInvalidAccommodation'
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)

  if (checkInDate < today) {
    return 'errorPastDate'
  }

  const diffTime = checkOutDate - checkInDate
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (nights <= 0) {
    return 'errorInvalidDate'
  }

  if (nights < config.min_nights) {
    return { error: 'errorMinNights', count: config.min_nights }
  }

  return null
}
