import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableStateCallbackType,
  type GestureResponderEvent,
} from 'react-native'

import type { RateProps } from './types'
import { useRateTokens } from './tokens'

const DEFAULT_CHARACTER = '★'

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export const Rate: React.FC<RateProps> = props => {
  const tokens = useRateTokens()
  const {
    value: valueProp,
    defaultValue = 0,
    count = tokens.defaults.count,
    allowHalf = tokens.defaults.allowHalf,
    size = tokens.defaults.size,
    gutter = tokens.defaults.gutter,
    color,
    voidColor,
    disabledColor,
    icon,
    voidIcon,
    character,
    disabled = false,
    readOnly = false,
    touchable = tokens.defaults.touchable,
    onChange,
    onIconPress,
    iconStyle,
    itemStyle,
    style,
    ...rest
  } = props

  const [internalValue, setInternalValue] = React.useState<number>(
    valueProp ?? defaultValue ?? 0,
  )
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp ?? 0 : internalValue

  const effectiveColor = color ?? tokens.colors.active
  const effectiveVoidColor = voidColor ?? tokens.colors.inactive
  const effectiveDisabledColor = disabledColor ?? tokens.colors.disabled

  const handleValueChange = React.useCallback(
    (next: number) => {
      if (!isControlled) {
        setInternalValue(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  const evaluatePress = (index: number, event?: GestureResponderEvent) => {
    if (disabled || readOnly || !touchable) return
    const baseScore = index + 1
    let nextScore = baseScore

    if (allowHalf && event?.nativeEvent) {
      const { locationX } = event.nativeEvent
      if (locationX <= size / 2) {
        nextScore = baseScore - 0.5
      }
    }

    nextScore = clamp(nextScore, allowHalf ? 0.5 : 1, count)
    if (nextScore !== value) {
      handleValueChange(nextScore)
    }
    onIconPress?.(nextScore)
  }

  const renderIconNode = (renderValue: React.ReactNode, tintColor: string) => {
    if (React.isValidElement(renderValue)) {
      return React.cloneElement(renderValue, {
        style: [
          (renderValue.props as any)?.style,
          iconStyle,
          { color: tintColor, fontSize: size },
        ],
      })
    }
    return (
      <Text style={[styles.character, iconStyle, { color: tintColor, fontSize: size }]}>
        {(renderValue ?? DEFAULT_CHARACTER) as React.ReactNode}
      </Text>
    )
  }

  const resolvedActiveIcon = icon ?? character ?? DEFAULT_CHARACTER
  const resolvedVoidIcon = voidIcon ?? character ?? DEFAULT_CHARACTER

  const renderItem = (index: number) => {
    const score = index + 1
    const fill = clamp(value - index, 0, 1)
    const activeColor = disabled ? effectiveDisabledColor : effectiveColor
    const voidTint = disabled ? effectiveDisabledColor : effectiveVoidColor

    const pressableStyle = ({ pressed }: PressableStateCallbackType) => [
      styles.item,
      { marginRight: index === count - 1 ? 0 : gutter },
      itemStyle,
      pressed && !disabled && !readOnly ? { opacity: 0.75 } : null,
    ]

    const iconContent = (
      <View style={[styles.iconBox, { width: size, height: size }]}>
        {renderIconNode(resolvedVoidIcon, voidTint)}
        {fill > 0 ? (
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFill,
              styles.fill,
              { width: fill * size },
            ]}
          >
            {renderIconNode(resolvedActiveIcon, activeColor)}
          </View>
        ) : null}
      </View>
    )

    const interactive = !disabled && !readOnly && touchable

    if (!interactive) {
      return (
        <View
          key={score}
          style={[styles.item, { marginRight: index === count - 1 ? 0 : gutter }, itemStyle]}
          accessibilityRole="image"
          accessibilityLabel={`评分 ${score}`}
        >
          {iconContent}
        </View>
      )
    }

    return (
      <Pressable
        key={score}
        accessibilityRole="button"
        accessibilityLabel={`评${allowHalf ? '半' : ''}分 ${score}`}
        onPress={event => evaluatePress(index, event)}
        style={pressableStyle}
      >
        {iconContent}
      </Pressable>
    )
  }

  return (
    <View {...rest} style={[styles.container, style]} accessibilityRole="radiogroup">
      {Array.from({ length: count }).map((_, index) => renderItem(index))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  character: {
    includeFontPadding: false,
  },
  fill: {
    overflow: 'hidden',
  },
})

Rate.displayName = 'Rate'

export default Rate
