export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export const clamp01 = (value: number) => clamp(value, 0, 1)

export const parseNumberLike = (value: unknown, fallback?: number) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

export const parseNumber = (value: unknown, fallback = 0) =>
  parseNumberLike(value, fallback) ?? fallback

export const parsePercentage = (percentage: unknown) => {
  if (typeof percentage === 'number') return percentage
  if (typeof percentage === 'string') {
    const normalized = percentage.trim().replace('%', '')
    const parsed = Number(normalized)
    return Number.isNaN(parsed) ? 0 : parsed
  }
  return 0
}

export const isNumericLike = (value: unknown): value is number | string =>
  typeof value === 'number' ||
  (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value)))

export const addNumber = (num1: number, num2: number) => {
  const cardinal = 10 ** 10
  return Math.round((num1 + num2) * cardinal) / cardinal
}

export const formatNumber = (
  value: number,
  integer: boolean,
  decimalLength?: number
) => {
  let next = value
  if (integer) next = Math.trunc(next)
  if (decimalLength !== undefined) {
    const factor = 10 ** decimalLength
    next = Math.round(next * factor) / factor
  }
  return next
}

export const numberToString = (
  value: number | null | undefined,
  decimalLength?: number
) => {
  if (value === null || value === undefined || !Number.isFinite(value)) return ''
  if (decimalLength !== undefined) return value.toFixed(decimalLength)
  return String(value)
}

export const parseDecimalLength = (value: number | string | undefined) => {
  if (value === undefined) return undefined
  const parsed =
    typeof value === 'number' ? value : Number.parseInt(value, 10)
  if (!Number.isFinite(parsed)) return undefined
  return Math.max(0, Math.floor(parsed))
}

export const clampValue = (value: number, min?: number, max?: number) => {
  let next = value
  if (typeof min === 'number' && Number.isFinite(min)) {
    next = Math.max(next, min)
  }
  if (typeof max === 'number' && Number.isFinite(max)) {
    next = Math.min(next, max)
  }
  return next
}
