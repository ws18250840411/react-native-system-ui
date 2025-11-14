import { Platform } from 'react-native'
import type { ViewStyle } from 'react-native'

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '')
  const expand = normalized.length === 3
    ? normalized.split('').map(char => char + char).join('')
    : normalized
  if (expand.length < 6) {
    return hex
  }

  const bigint = parseInt(expand.slice(0, 6), 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  const clampedAlpha = Math.max(0, Math.min(1, alpha))
  return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`
}

const ensureRgbaColor = (color: string, alpha: number) => {
  const trimmed = color.trim().toLowerCase()
  if (trimmed.startsWith('#')) {
    return hexToRgba(trimmed, alpha)
  }
  if (trimmed.startsWith('rgba')) {
    return color
  }
  if (trimmed.startsWith('rgb(')) {
    return color.replace(/rgb\(([^)]*)\)/i, (_, inner) => `rgba(${inner}, ${alpha})`)
  }
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

export const createPlatformShadow = (config: ShadowConfig): ViewStyle => {
  const nativeShadow: ViewStyle = {
    shadowColor: config.color,
    shadowOpacity: config.opacity,
    shadowRadius: config.radius,
    shadowOffset: { width: config.offsetX ?? 0, height: config.offsetY },
    ...(config.elevation !== undefined ? { elevation: config.elevation } : null),
  }

  if (Platform.OS !== 'web') {
    return nativeShadow
  }

  const blur = Math.max(config.radius * 1.5, config.radius)
  const boxShadowColor = ensureRgbaColor(config.color, config.opacity)
  return {
    boxShadow: `${config.offsetX ?? 0}px ${config.offsetY}px ${blur}px ${boxShadowColor}`,
  }
}

export default createPlatformShadow
