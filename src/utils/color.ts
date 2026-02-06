import { clamp01 } from './number'

export type RgbTuple = readonly [number, number, number]

const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export const hexToRgb = (input: string): RgbTuple | null => {
  if (!HEX_RE.test(input)) return null
  const h = input.length === 4 ? `#${input[1]}${input[1]}${input[2]}${input[2]}${input[3]}${input[3]}` : input
  const v = parseInt(h.slice(1), 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}

const parseRgb = (input: string): RgbTuple | null => {
  const m = input.match(/^rgba?\(([^)]*)\)$/i)
  if (!m) return null
  const n = m[1].split(',').map(s => Number(s.trim()))
  return n.length >= 3 && n.every(Number.isFinite) ? [n[0], n[1], n[2]] : null
}

export const withAlpha = (color: string, alpha: number) => {
  const a = clamp01(alpha)
  const t = color?.trim?.() ?? ''
  if (!t) return color
  if (t.startsWith('#')) {
    const rgb = hexToRgb(t)
    return rgb ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})` : color
  }
  const rgb = parseRgb(t)
  return rgb ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})` : t
}

export const ensureRgba = (color: string, alpha: number) =>
  color.trim().toLowerCase().startsWith('rgba') ? color : withAlpha(color, alpha)

const GRADIENT_RE = /(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))/i

export const extractFirstColorToken = (input?: string | null) =>
  input ? input.match(GRADIENT_RE)?.[0] : undefined
