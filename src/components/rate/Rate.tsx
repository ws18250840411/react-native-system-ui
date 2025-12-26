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
import { useControllableValue } from '../../hooks'

const DEFAULT_CHARACTER = '★'

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const parseNumber = (value: number | string | undefined, fallback: number) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

export const Rate: React.FC<RateProps> = props => {
  const tokens = useRateTokens()
  const {
    count: countProp = tokens.defaults.count,
    allowHalf = tokens.defaults.allowHalf,
    size: sizeProp = tokens.defaults.size,
    gutter: gutterProp = tokens.defaults.gutter,
    color,
    voidColor,
    disabledColor,
    icon,
    voidIcon,
    character,
    disabled = false,
    readOnly = false,
    touchable = tokens.defaults.touchable,
    onIconPress,
    iconStyle,
    itemStyle,
    style,
    ...rest
  } = props

  const resolvedCount = Math.max(
    1,
    Math.floor(parseNumber(countProp, tokens.defaults.count)),
  )
  const resolvedSize = Math.max(0, parseNumber(sizeProp, tokens.defaults.size))
  const resolvedGutter = Math.max(0, parseNumber(gutterProp, tokens.defaults.gutter))

  const [rawValue, triggerChange] = useControllableValue<number>(props, {
    defaultValue: 0,
  })

  const normalizedValue = clamp(Number(rawValue ?? 0), 0, resolvedCount)
  const displayValue = allowHalf
    ? readOnly
      ? normalizedValue
      : Math.floor(normalizedValue * 2) / 2
    : Math.floor(normalizedValue)
  const interactive = !disabled && !readOnly
  const minScore = allowHalf ? 0.5 : 1

  const effectiveColor = color ?? tokens.colors.active
  const effectiveVoidColor = voidColor ?? tokens.colors.inactive
  const effectiveDisabledColor = disabledColor ?? tokens.colors.disabled

  const currentValueRef = React.useRef(normalizedValue)
  React.useEffect(() => {
    currentValueRef.current = normalizedValue
  }, [normalizedValue])

  const requestValueChange = React.useCallback(
    (nextScore: number) => {
      const current = currentValueRef.current
      if (nextScore === current) return false
      triggerChange(nextScore)
      return true
    },
    [triggerChange],
  )

  const resolveEventPosition = React.useCallback(
    (event: GestureResponderEvent): { x?: number; width?: number } => {
      const nativeEvent = event.nativeEvent as any
      const locationX = nativeEvent?.locationX
      if (typeof locationX === 'number' && Number.isFinite(locationX)) return { x: locationX }

      const clientX = nativeEvent?.clientX
      const currentTarget = (event as any)?.currentTarget
      if (
        typeof clientX === 'number' &&
        Number.isFinite(clientX) &&
        currentTarget &&
        typeof currentTarget.getBoundingClientRect === 'function'
      ) {
        const rect = currentTarget.getBoundingClientRect()
        if (rect) return { x: clientX - rect.left, width: rect.width }
      }

      const offsetX = nativeEvent?.offsetX
      if (typeof offsetX === 'number' && Number.isFinite(offsetX)) return { x: offsetX }

      return {}
    },
    [],
  )

  const evaluatePress = React.useCallback(
    (index: number, event?: GestureResponderEvent) => {
      if (!interactive) return
      const baseScore = index + 1
      let nextScore = baseScore

      if (allowHalf && event) {
        const { x, width } = resolveEventPosition(event)
        const threshold = (width ?? resolvedSize) / 2
        if (typeof x === 'number' && x <= threshold) {
          nextScore = baseScore - 0.5
        }
      }

      nextScore = clamp(nextScore, minScore, resolvedCount)
      const didChange = requestValueChange(nextScore)
      if (didChange) {
        onIconPress?.(nextScore)
      }
    },
    [
      allowHalf,
      interactive,
      minScore,
      onIconPress,
      requestValueChange,
      resolveEventPosition,
      resolvedCount,
      resolvedSize,
    ],
  )

  const valueFromLocationX = React.useCallback(
    (locationX: number) => {
      const stride = resolvedSize + resolvedGutter
      if (stride <= 0) return minScore

      const maxX = resolvedSize * resolvedCount + resolvedGutter * (resolvedCount - 1)
      const x = clamp(locationX, 0, maxX)

      const index = clamp(Math.floor(x / stride), 0, resolvedCount - 1)
      const within = x - index * stride

      let nextScore = index + 1
      if (allowHalf) {
        const withinIcon = Math.min(within, resolvedSize)
        if (withinIcon <= resolvedSize / 2) {
          nextScore -= 0.5
        }
      }

      return clamp(nextScore, minScore, resolvedCount)
    },
    [allowHalf, minScore, resolvedCount, resolvedGutter, resolvedSize],
  )

  const lastMoveValueRef = React.useRef<number | null>(null)
  const gestureStartRef = React.useRef<{ pageX: number; pageY: number } | null>(null)
  const gestureDirectionRef = React.useRef<'' | 'horizontal' | 'vertical'>('')

  const onStartShouldSetResponderCapture = React.useCallback(
    (event: GestureResponderEvent) => {
      if (!interactive || !touchable) return false
      gestureStartRef.current = {
        pageX: event.nativeEvent.pageX,
        pageY: event.nativeEvent.pageY,
      }
      gestureDirectionRef.current = ''
      lastMoveValueRef.current = null
      return false
    },
    [interactive, touchable],
  )

  const onMoveShouldSetResponderCapture = React.useCallback(
    (event: GestureResponderEvent) => {
      if (!interactive || !touchable) return false

      const start = gestureStartRef.current
      if (!start) {
        gestureStartRef.current = {
          pageX: event.nativeEvent.pageX,
          pageY: event.nativeEvent.pageY,
        }
        return false
      }

      const MIN_DISTANCE = 10
      const offsetX = Math.abs(event.nativeEvent.pageX - start.pageX)
      const offsetY = Math.abs(event.nativeEvent.pageY - start.pageY)

      if (offsetX > offsetY && offsetX > MIN_DISTANCE) {
        gestureDirectionRef.current = 'horizontal'
        return true
      }
      if (offsetY > offsetX && offsetY > MIN_DISTANCE) {
        gestureDirectionRef.current = 'vertical'
      }

      return false
    },
    [interactive, touchable],
  )

  const handleResponderGrant = React.useCallback(() => {
    lastMoveValueRef.current = null
  }, [])

  const handleResponderMove = React.useCallback(
    (event: GestureResponderEvent) => {
      if (!interactive || !touchable) return
      if (gestureDirectionRef.current !== 'horizontal') return
      ;(event as any)?.preventDefault?.()
      const nextScore = valueFromLocationX(event.nativeEvent.locationX)
      if (lastMoveValueRef.current === nextScore) return
      lastMoveValueRef.current = nextScore
      const didChange = requestValueChange(nextScore)
      if (didChange) {
        onIconPress?.(nextScore)
      }
    },
    [interactive, onIconPress, requestValueChange, touchable, valueFromLocationX],
  )

  const handleResponderEnd = React.useCallback(() => {
    lastMoveValueRef.current = null
    gestureStartRef.current = null
    gestureDirectionRef.current = ''
  }, [])

  const renderIconNode = (renderValue: React.ReactNode, tintColor: string) => {
    if (React.isValidElement(renderValue)) {
      const element = renderValue as React.ReactElement<any>
      return React.cloneElement(element, {
        style: StyleSheet.flatten([
          (element.props as any)?.style,
          iconStyle,
          {
            color: tintColor,
            fontSize: resolvedSize,
            width: resolvedSize,
            height: resolvedSize,
            flexShrink: 0,
          } as any,
        ]) as any,
      })
    }
    return (
      <Text
        style={[
          styles.character,
          iconStyle,
          {
            color: tintColor,
            fontSize: resolvedSize,
            lineHeight: resolvedSize,
            width: resolvedSize,
            height: resolvedSize,
            textAlign: 'center',
          },
        ]}
      >
        {(renderValue ?? DEFAULT_CHARACTER) as React.ReactNode}
      </Text>
    )
  }

  const resolvedActiveIcon = icon ?? character ?? DEFAULT_CHARACTER
  const resolvedVoidIcon = voidIcon ?? character ?? DEFAULT_CHARACTER

  const renderItem = (index: number) => {
    const score = index + 1
    const fill = clamp(displayValue - index, 0, 1)
    const activeColor = disabled ? effectiveDisabledColor : effectiveColor
    const voidTint = disabled ? effectiveDisabledColor : effectiveVoidColor

    const pressableStyle = ({ pressed }: PressableStateCallbackType) => [
      styles.item,
      { marginRight: index === resolvedCount - 1 ? 0 : resolvedGutter },
      itemStyle,
      pressed ? { opacity: 0.75 } : null,
    ]

    const iconContent = (
      <View style={[styles.iconBox, { width: resolvedSize, height: resolvedSize }]}>
        {fill < 1 ? renderIconNode(resolvedVoidIcon, voidTint) : null}
        {fill > 0 ? (
          <View
            pointerEvents="none"
            style={[
              styles.fill,
              {
                width: fill * resolvedSize,
                height: resolvedSize,
              },
            ]}
          >
            {renderIconNode(resolvedActiveIcon, activeColor)}
          </View>
        ) : null}
      </View>
    )

    if (!interactive) {
      return (
        <View
          key={score}
          style={[
            styles.item,
            { marginRight: index === resolvedCount - 1 ? 0 : resolvedGutter },
            itemStyle,
          ]}
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
    <View
      {...rest}
      style={[styles.container, style]}
      accessibilityRole="radiogroup"
      onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
      onMoveShouldSetResponderCapture={onMoveShouldSetResponderCapture}
      onResponderGrant={handleResponderGrant}
      onResponderMove={handleResponderMove}
      onResponderRelease={handleResponderEnd}
      onResponderTerminate={handleResponderEnd}
    >
      {Array.from({ length: resolvedCount }).map((_, index) => renderItem(index))}
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
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  character: {
    includeFontPadding: false,
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})

Rate.displayName = 'Rate'

export default Rate
