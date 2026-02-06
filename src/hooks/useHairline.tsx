import React, { useMemo } from 'react'
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
import { createHairlineView } from '../utils/hairline'
import { isNumber } from '../utils/validate'

export interface UseHairlineOptions {
  show?: boolean
  containerStyle?: StyleProp<ViewStyle>
  color: string
  width: number
  defaultPaddingHorizontal?: number
}

export const useHairline = ({ show = true, containerStyle, color, width, defaultPaddingHorizontal = 0 }: UseHairlineOptions) =>
  useMemo(() => {
    if (!show) return null
    const f = StyleSheet.flatten(containerStyle) as
      | { paddingHorizontal?: unknown; paddingLeft?: unknown; paddingRight?: unknown; paddingStart?: unknown; paddingEnd?: unknown }
      | null
    const ph = isNumber(f?.paddingHorizontal) ? f.paddingHorizontal : undefined
    const resolve = (a?: unknown, b?: unknown) =>
      isNumber(a) ? a : isNumber(b) ? b : isNumber(ph) ? ph : defaultPaddingHorizontal
    return (
      <View
        style={createHairlineView({
          position: 'bottom', color,
          left: resolve(f?.paddingLeft, f?.paddingStart),
          right: resolve(f?.paddingRight, f?.paddingEnd),
          enabled: width > 0, width,
        })}
      />
    )
  }, [show, containerStyle, color, width, defaultPaddingHorizontal])
