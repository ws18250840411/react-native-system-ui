import React, { useMemo } from 'react'
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { createHairlineView } from '../utils/hairline'
import { isNumber } from '../utils/validate'

export interface UseHairlineOptions {
  
  show?: boolean
  
  containerStyle?: StyleProp<ViewStyle>
  
  color: string
  
  width: number
  
  defaultPaddingHorizontal?: number
}


export const useHairline = ({
  show = true,
  containerStyle,
  color,
  width,
  defaultPaddingHorizontal = 0,
}: UseHairlineOptions) => {
  return useMemo(() => {
    if (!show) return null

    const flattened = StyleSheet.flatten(containerStyle) as
      | {
        paddingHorizontal?: unknown
        paddingLeft?: unknown
        paddingRight?: unknown
        paddingStart?: unknown
        paddingEnd?: unknown
      }
      | null
    const paddingHorizontal = isNumber(flattened?.paddingHorizontal)
      ? flattened.paddingHorizontal
      : undefined

    const resolveInset = (primary?: unknown, secondary?: unknown) =>
      isNumber(primary)
        ? primary
        : isNumber(secondary)
          ? secondary
          : isNumber(paddingHorizontal)
            ? paddingHorizontal
            : defaultPaddingHorizontal

    const resolvedPadding = {
      left: resolveInset(flattened?.paddingLeft, flattened?.paddingStart),
      right: resolveInset(flattened?.paddingRight, flattened?.paddingEnd),
    }

    return (
      <View
        style={[
          styles.hairline,
          createHairlineView({
            position: 'bottom',
            color,
            left: resolvedPadding.left,
            right: resolvedPadding.right,
            enabled: width > 0,
            width,
          }),
        ]}
      />
    )
  }, [show, containerStyle, color, width, defaultPaddingHorizontal])
}

const styles = StyleSheet.create({
  hairline: {
    position: 'absolute',
    bottom: 0,
  },
})
