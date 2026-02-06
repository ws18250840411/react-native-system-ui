import { Platform, type ViewStyle } from 'react-native'

const toRgba = (color: string, alpha: number) => {
  const t = color.trim()
  if (t.startsWith('#')) {
    const h = t.replace('#', '')
    const e = h.length === 3 ? h.split('').map(c => c + c).join('') : h
    if (e.length < 6) return color
    const n = parseInt(e.slice(0, 6), 16)
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${Math.max(0, Math.min(1, alpha))})`
  }
  if (t.startsWith('rgba')) return color
  if (t.startsWith('rgb(')) return color.replace(/rgb\(([^)]*)\)/i, (_, i) => `rgba(${i}, ${alpha})`)
  return color
}

interface ShadowConfig {
  color: string
  opacity: number
  radius: number
  offsetY: number
  offsetX?: number
  elevation?: number
}

export const createPlatformShadow = ({ color, opacity, radius, offsetY, offsetX = 0, elevation }: ShadowConfig): ViewStyle => {
  if (Platform.OS !== 'web')
    return {
      shadowColor: color, shadowOpacity: opacity, shadowRadius: radius,
      shadowOffset: { width: offsetX, height: offsetY },
      ...(elevation !== undefined && { elevation }),
    }
  return { boxShadow: `${offsetX}px ${offsetY}px ${radius * 1.5}px ${toRgba(color, opacity)}` }
}

export default createPlatformShadow
