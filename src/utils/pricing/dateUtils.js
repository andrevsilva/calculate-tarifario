export function parseDate(dateStr) {
  if (!dateStr) return null

  const [year, month, day] = dateStr.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export function getNights(checkInDate, checkOutDate) {
  const diffTime = checkOutDate - checkInDate
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function isWeekend(date) {
  const day = date.getDay()
  return day === 0 || day === 6
}
