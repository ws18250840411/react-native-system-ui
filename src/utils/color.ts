import { clamp01 } from './number'

export type RgbTuple = readonly [number, number, number]

const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export const hexToRgb = (input: string): RgbTuple | null => {
  if (!hexRegex.test(input)) return null
  const normalized =
    input.length === 4
      ? `#${input[1]}${input[1]}${input[2]}${input[2]}${input[3]}${input[3]}`
      : input
  const intVal = parseInt(normalized.slice(1), 16)
  const r = (intVal >> 16) & 255
  const g = (intVal >> 8) & 255
  const b = intVal & 255
  return [r, g, b]
}

const parseRgbChannels = (input: string): RgbTuple | null => {
  const match = input.match(/^rgba?\(([^)]*)\)$/i)
  if (!match) return null
  const parts = match[1]
    .split(',')
    .map(part => part.trim())
    .slice(0, 3)
  const numeric = parts.map(value => Number(value))
  if (!numeric.every(channel => Number.isFinite(channel))) return null
  return [numeric[0], numeric[1], numeric[2]]
}

export const withAlpha = (color: string, alpha: number) => {
  const clamped = clamp01(alpha)
  const trimmed = color?.trim?.() ?? ''
  if (!trimmed) return color

  if (trimmed.startsWith('#')) {
    const rgb = hexToRgb(trimmed)
    return rgb ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${clamped})` : color
  }

  const rgb = parseRgbChannels(trimmed)
  if (rgb) return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${clamped})`

  return trimmed
}

export const ensureRgba = (color: string, alpha: number) => {
  const trimmed = color.trim().toLowerCase()
  if (trimmed.startsWith('rgba')) return color
  return withAlpha(color, alpha)
}

const gradientColorRegex = /(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))/i

export const extractFirstColorToken = (input?: string | null) => {
  if (!input) return undefined
  const match = input.match(gradientColorRegex)
  return match ? match[0] : undefined
}
