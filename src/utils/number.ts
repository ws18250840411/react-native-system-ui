import { isFiniteNumber, isNumber, isString } from './validate'
export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
export const clamp01 = (value: number) => clamp(value, 0, 1)
export const parseNumberLike = (value: unknown, fallback?: number) => {
  if (isFiniteNumber(value)) return value
  if (isString(value)) { const n = Number.parseFloat(value); return Number.isFinite(n) ? n : fallback }
  return fallback
}
export const parseNumber = (value: unknown, fallback = 0) => parseNumberLike(value, fallback) ?? fallback
export const parsePercentage = (value: unknown) => {
  if (isNumber(value)) return value
  if (isString(value)) { const n = Number(value.trim().replace('%', '')); return Number.isNaN(n) ? 0 : n }
  return 0
}
export const isNumericLike = (value: unknown): value is number | string =>
  isNumber(value) || (isString(value) && value.trim() !== '' && !Number.isNaN(Number(value)))
export const addNumber = (a: number, b: number) => {
  const c = 10 ** 10
  return Math.round((a + b) * c) / c
}
export const formatNumber = (value: number, integer: boolean, decimalLength?: number) => {
  let n = integer ? Math.trunc(value) : value
  if (decimalLength !== undefined) { const f = 10 ** decimalLength; n = Math.round(n * f) / f }
  return n
}
export const numberToString = (value: number | null | undefined, decimalLength?: number) => {
  if (value === null || value === undefined || !Number.isFinite(value)) return ''
  return decimalLength !== undefined ? value.toFixed(decimalLength) : String(value)
}
export const parseDecimalLength = (value: number | string | undefined) => {
  if (value === undefined) return undefined
  const n = isNumber(value) ? value : Number.parseInt(value, 10)
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : undefined
}
export const clampValue = (value: number, min?: number, max?: number) => {
  let n = value
  if (isFiniteNumber(min)) n = Math.max(n, min)
  if (isFiniteNumber(max)) n = Math.min(n, max)
  return n
}
