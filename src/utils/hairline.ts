import { Platform, StyleSheet, type ViewStyle } from 'react-native'

const isWeb = Platform.OS === 'web'
export const getHairlineWidth = () => StyleSheet.hairlineWidth
export type HairlinePosition = 'top' | 'right' | 'bottom' | 'left' | 'all'
export interface HairlineViewOptions { color?: string; position?: HairlinePosition; enabled?: boolean; left?: number; right?: number; top?: number; bottom?: number; width?: number; borderRadius?: number }

const ORIGINS: Record<string, string> = { top: 'center top', bottom: 'center bottom', left: 'left center', right: 'right center' }
const SCALES: Record<string, { scaleX?: number; scaleY?: number }> = { top: { scaleY: 0.5 }, bottom: { scaleY: 0.5 }, left: { scaleX: 0.5 }, right: { scaleX: 0.5 } }

export const createHairlineView = ({ left, right, top, bottom, width, color, position = 'bottom', enabled = true, borderRadius }: HairlineViewOptions = {}): ViewStyle => {
  if (!enabled) return {}
  if (position === 'all') {
    const bw = width ?? (isWeb ? 1 : StyleSheet.hairlineWidth)
    if (isWeb && bw > 0 && bw <= 1)
      return { position: 'absolute', top: 0, left: 0, width: '200%', height: '200%', borderWidth: 1, ...(color && { borderColor: color }), ...(borderRadius != null && { borderRadius: borderRadius * 2 }), transform: [{ scale: 0.5 }], transformOrigin: 'left top', pointerEvents: 'none' } as ViewStyle
    return { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderWidth: bw, ...(color && { borderColor: color }), ...(borderRadius != null && { borderRadius }), pointerEvents: 'none' } as ViewStyle
  }
  const bw = width ?? (isWeb ? 1 : StyleSheet.hairlineWidth); const s: Record<string, unknown> = { position: 'absolute', pointerEvents: 'none', left, right, top, bottom }; if (s[position] === undefined) s[position] = 0
  const k = `border${position[0].toUpperCase()}${position.slice(1)}`; s[`${k}Width`] = bw; if (color) s[`${k}Color`] = color
  if (isWeb && bw > 0 && bw <= 1) { s[`${k}Width`] = 1; s.transform = [SCALES[position]]; s.transformOrigin = ORIGINS[position] }; return s as ViewStyle
}
