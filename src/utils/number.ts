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
