import { Platform, StyleSheet, type ViewStyle } from 'react-native'

export const getHairlineWidth = () => Platform.OS === 'web' ? 1 : StyleSheet.hairlineWidth

export interface HairlineBorderOptions {
  color?: string
  position?: 'top' | 'right' | 'bottom' | 'left' | 'all'
  enabled?: boolean
}

export const createHairlineBorder = ({
  color,
  position = 'all',
  enabled = true,
}: HairlineBorderOptions = {}): ViewStyle => {
  if (!enabled) return {}

  const width = getHairlineWidth()
  const key = position === 'all' ? 'border' : `border${position[0].toUpperCase()}${position.slice(1)}`

  return {
    [`${key}Width`]: width,
    ...(color && { [`${key}Color`]: color }),
  } as ViewStyle
}

export const createHairlineBorderTop = (color?: string) => createHairlineBorder({ color, position: 'top' })
export const createHairlineBorderRight = (color?: string) => createHairlineBorder({ color, position: 'right' })
export const createHairlineBorderBottom = (color?: string) => createHairlineBorder({ color, position: 'bottom' })
export const createHairlineBorderLeft = (color?: string) => createHairlineBorder({ color, position: 'left' })

export interface HairlineViewOptions extends HairlineBorderOptions {
  left?: number
  right?: number
  top?: number
  bottom?: number
  width?: number
}

export const createHairlineView = ({
  left,
  right,
  top,
  bottom,
  width,
  color,
  position = 'bottom',
}: HairlineViewOptions = {}): ViewStyle => {
  const isWeb = Platform.OS === 'web'
  const borderWidth = width ?? (isWeb ? 1 : StyleSheet.hairlineWidth)

  const style: ViewStyle = {
    position: 'absolute',
    pointerEvents: 'none',
    left,
    right,
    top,
    bottom,
  }

  if (position !== 'all') {
    const s = style as unknown as Record<string, unknown>
    if (s[position] === undefined) s[position] = 0
  }

  const key = position === 'all' ? 'border' : `border${position[0].toUpperCase()}${position.slice(1)}`
  const mutableStyle = style as unknown as Record<string, unknown>
  mutableStyle[`${key}Width`] = borderWidth
  if (color) mutableStyle[`${key}Color`] = color

  if (isWeb && (!width || width === 1 || width === StyleSheet.hairlineWidth)) {
    const scales: Record<
      Exclude<HairlineBorderOptions['position'], undefined>,
      { scaleX?: number; scaleY?: number; scale?: number }
    > = {
      top: { scaleY: 0.5 },
      bottom: { scaleY: 0.5 },
      left: { scaleX: 0.5 },
      right: { scaleX: 0.5 },
      all: { scale: 0.5 },
    }
    if (scales[position]) {
      style.transform = [
        scales[position] as unknown as Exclude<NonNullable<ViewStyle['transform']>, string>[number],
      ]
    }
  }

  return style
}
