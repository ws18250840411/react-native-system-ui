import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
} from 'react-native'

import type { RateProps } from './types'
import { useRateTokens } from './tokens'
import { useControllableValue } from '../../hooks'
import { clamp, parseNumber, isFiniteNumber } from '../../utils'

const DEFAULT_CHARACTER = '★'

export const Rate = React.memo((props: RateProps) => {
  const {
    tokensOverride,
    count: countProp,
    allowHalf: allowHalfProp,
    size: sizeProp,
    gutter: gutterProp,
    color,
    voidColor,
    disabledColor,
    icon,
    voidIcon,
    character,
    disabled: disabledProp,
    readOnly: readOnlyProp,
    touchable: touchableProp,
    onIconPress,
    iconStyle,
    itemStyle,
    style,
    ...rest
  } = props
  const tokens = useRateTokens(tokensOverride)
  const count = countProp ?? tokens.defaults.count
  const allowHalf = allowHalfProp ?? tokens.defaults.allowHalf
  const size = sizeProp ?? tokens.defaults.size
  const gutter = gutterProp ?? tokens.defaults.gutter
  const disabled = disabledProp ?? tokens.defaults.disabled
  const readOnly = readOnlyProp ?? tokens.defaults.readOnly
  const touchable = touchableProp ?? tokens.defaults.touchable

  const resolvedCount = Math.max(
    1,
    Math.floor(parseNumber(count, tokens.defaults.count)),
  )
  const resolvedSize = Math.max(0, parseNumber(size, tokens.defaults.size))
  const resolvedGutter = Math.max(0, parseNumber(gutter, tokens.defaults.gutter))


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

  const activeTint = disabled
    ? (disabledColor ?? tokens.colors.disabled)
    : (color ?? tokens.colors.active)
  const voidTint = disabled
    ? (disabledColor ?? tokens.colors.disabled)
    : (voidColor ?? tokens.colors.inactive)

  const requestValueChange = (nextScore: number) => {
    if (nextScore === normalizedValue) return false
    triggerChange(nextScore)
    return true
  }

  type AnyStyle = Record<string, unknown>
  type EventNative = { locationX?: unknown; clientX?: unknown; offsetX?: unknown }
  type EventTarget = {
    currentTarget?: {
      getBoundingClientRect?: () => { left: number; width: number } | null
    }
  }

  const evaluatePress = (index: number, event?: GestureResponderEvent) => {
    if (!interactive) return
    const baseScore = index + 1
    let nextScore = baseScore

    if (allowHalf && event) {
      const nativeEvent = event.nativeEvent as unknown as EventNative
      let x: number | undefined
      let width: number | undefined

      const locationX = nativeEvent.locationX
      if (isFiniteNumber(locationX)) {
        x = locationX
      } else {
        const clientX = nativeEvent.clientX
        if (isFiniteNumber(clientX)) {
          const rect = (event as unknown as EventTarget).currentTarget?.getBoundingClientRect?.()
          if (rect) {
            x = clientX - rect.left
            width = rect.width
          }
        } else {
          const offsetX = nativeEvent.offsetX
          if (isFiniteNumber(offsetX)) x = offsetX
        }
      }

      const threshold = (width ?? resolvedSize) / 2
      if (x !== undefined && x <= threshold) {
        nextScore = baseScore - 0.5
      }
    }

    nextScore = clamp(nextScore, minScore, resolvedCount)
    if (requestValueChange(nextScore)) onIconPress?.(nextScore)
  }

  const valueFromLocationX = (locationX: number) => {
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
  }

  const lastMoveValueRef = React.useRef<number | null>(null)
  const gestureStartRef = React.useRef<{ pageX: number; pageY: number } | null>(null)
  const gestureDirectionRef = React.useRef<'' | 'horizontal' | 'vertical'>('')

  const onStartShouldSetResponderCapture = (event: GestureResponderEvent) => {
    if (!interactive || !touchable) return false
    gestureStartRef.current = {
      pageX: event.nativeEvent.pageX,
      pageY: event.nativeEvent.pageY,
    }
    gestureDirectionRef.current = ''
    lastMoveValueRef.current = null
    return false
  }

  const onMoveShouldSetResponderCapture = (event: GestureResponderEvent) => {
    if (!interactive || !touchable) return false

    const start = gestureStartRef.current
    if (!start) {
      gestureStartRef.current = {
        pageX: event.nativeEvent.pageX,
        pageY: event.nativeEvent.pageY,
      }
      return false
    }

    const offsetX = Math.abs(event.nativeEvent.pageX - start.pageX)
    const offsetY = Math.abs(event.nativeEvent.pageY - start.pageY)

    if (offsetX > offsetY && offsetX > 10) {
      gestureDirectionRef.current = 'horizontal'
      return true
    }
    if (offsetY > offsetX && offsetY > 10) {
      gestureDirectionRef.current = 'vertical'
    }

    return false
  }

  const handleResponderMove = (event: GestureResponderEvent) => {
    if (!interactive || !touchable) return
    if (gestureDirectionRef.current !== 'horizontal') return
      ; (event as unknown as { preventDefault?: () => void }).preventDefault?.()
    const nextScore = valueFromLocationX(event.nativeEvent.locationX)
    if (lastMoveValueRef.current === nextScore) return
    lastMoveValueRef.current = nextScore
    if (requestValueChange(nextScore)) onIconPress?.(nextScore)
  }

  const handleResponderEnd = () => {
    lastMoveValueRef.current = null
    gestureStartRef.current = null
    gestureDirectionRef.current = ''
  }

  const renderIconNode = (renderValue: React.ReactNode, tintColor: string) => {
    if (React.isValidElement(renderValue)) {
      const element = renderValue as React.ReactElement<{ style?: StyleProp<AnyStyle> }>
      const defaultStyle: AnyStyle = {
        color: tintColor,
        fontSize: resolvedSize,
        lineHeight: resolvedSize,
        textAlign: 'center',
        includeFontPadding: false,
      }
      const layoutStyle: AnyStyle = {
        width: resolvedSize,
        height: resolvedSize,
        flexShrink: 0,
      }
      return React.cloneElement(element, {
        style: StyleSheet.flatten<AnyStyle>([
          defaultStyle,
          element.props.style,
          iconStyle as unknown as StyleProp<AnyStyle>,
          layoutStyle,
        ]),
      })
    }
    return (
      <Text
        style={[
          tokens.layout.character,
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
    const marginRight = index === resolvedCount - 1 ? 0 : resolvedGutter

    const isFull = fill === 1
    const activeIconWrapperStyle: AnyStyle = {
      width: fill * resolvedSize,
      height: isFull ? resolvedSize : resolvedSize * 1.5,
      top: isFull ? 0 : -resolvedSize * 0.25,
      overflow: isFull ? 'visible' : 'hidden',
    }
    const activeIconInnerStyle: AnyStyle = {
      width: resolvedSize,
      height: resolvedSize,
      marginTop: isFull ? 0 : resolvedSize * 0.25,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'visible',
    }

    const iconContent = (
      <View style={[tokens.layout.iconBox, { width: resolvedSize, height: resolvedSize }]}>
        {fill < 1 ? renderIconNode(resolvedVoidIcon, voidTint) : null}
        {fill > 0 ? (
          <View
            pointerEvents="none"
            style={[tokens.layout.fill, activeIconWrapperStyle]}
          >
            <View style={activeIconInnerStyle}>
              {renderIconNode(resolvedActiveIcon, activeTint)}
            </View>
          </View>
        ) : null}
      </View>
    )

    if (!interactive) {
      return (
        <View
          key={score}
          style={[
            tokens.layout.item,
            { marginRight },
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
        style={({ pressed }) => [
          tokens.layout.item,
          { marginRight },
          itemStyle,
          pressed ? { opacity: tokens.states.pressedOpacity } : null,
        ]}
      >
        {iconContent}
      </Pressable>
    )
  }

  const items: React.ReactNode[] = []
  for (let i = 0; i < resolvedCount; i++) items.push(renderItem(i))

  return (
    <View
      {...rest}
      style={[tokens.layout.container, style]}
      accessibilityRole="radiogroup"
      onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
      onMoveShouldSetResponderCapture={onMoveShouldSetResponderCapture}
      onResponderMove={handleResponderMove}
      onResponderRelease={handleResponderEnd}
      onResponderTerminate={handleResponderEnd}
    >
      {items}
    </View>
  )
})

Rate.displayName = 'Rate'

export default Rate
