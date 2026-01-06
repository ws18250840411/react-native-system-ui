export const padZero = (value: number | string, length = 2) => {
  const str = String(value)
  return str.length >= length ? str : `${'0'.repeat(length - str.length)}${str}`
}

export const times = (count: number, iteratee: (index: number) => string) => {
  return Array.from({ length: count }, (_, index) => iteratee(index))
}

export const getTrueValue = (value?: string) => {
  if (!value) return 0
  const parsed = parseInt(value, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

export const getMonthEndDay = (year: number, month: number) => {
  return 32 - new Date(year, month - 1, 32).getDate()
}

export const isValidDate = (value: unknown): value is Date => {
  return value instanceof Date && !Number.isNaN(value.getTime())
}

