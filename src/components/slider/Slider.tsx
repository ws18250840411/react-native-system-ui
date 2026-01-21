import { useSlider, useSliderThumb } from '@react-native-aria/slider'
import { isRTL } from '@react-native-aria/utils'
import { useSliderState } from '@react-stately/slider'
import React from 'react'
import type { GestureResponderEvent, LayoutChangeEvent, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

import type { SliderProps, SliderValue } from './types'
import { useSliderTokens } from './tokens'
import { clamp, parseNumber } from '../../utils/number'
import { isFiniteNumber, isFunction } from '../../utils/validate'

type TrackLayout = { width: number; height: number; x: number; y: number }

const clampValue = (value: number | undefined, min: number, max: number) => {
  if (!isFiniteNumber(value)) {
    return min
  }
  return clamp(value, min, max)
}

const isSameLayout = (a: TrackLayout, b: TrackLayout) =>
  a.width === b.width && a.height === b.height && a.x === b.x && a.y === b.y

const normalizeValue = (
  value: SliderValue | undefined,
  range: boolean,
  min: number,
  max: number
): number[] => {
  if (range) {
    const raw = Array.isArray(value)
      ? value
      : isFiniteNumber(value)
        ? [min, value]
        : [min, min]

    const first = clampValue(raw[0], min, max)
    const second = clampValue(raw[1] ?? raw[0], min, max)
    return first <= second ? [first, second] : [second, first]
  }

  const single = Array.isArray(value) ? value[0] : value
  return [clampValue(single, min, max)]
}

const toSliderValue = (values: readonly number[], range: boolean, fallback: number): SliderValue => {
  if (range) {
    const start = values[0] ?? fallback
    const end = values[1] ?? start
    return [start, end]
  }
  return values[0] ?? fallback
}

const createAccessibilityProps = (
  inputProps?: {
    role?: string
    ['aria-value']?: unknown
    accessibilityActions?: unknown
    onAccessibilityAction?: unknown
    disabled?: boolean
  } | null
) => {
  if (!inputProps) return {}
  const {
    role,
    ['aria-value']: ariaValue,
    accessibilityActions,
    onAccessibilityAction,
    disabled,
  } = inputProps

  return {
    accessible: true,
    accessibilityRole: role ?? 'adjustable',
    accessibilityValue: ariaValue,
    accessibilityActions,
    onAccessibilityAction,
    accessibilityState: { disabled },
  }
}

const defaultNumberFormatter =
  typeof Intl !== 'undefined' && isFunction(Intl.NumberFormat)
    ? new Intl.NumberFormat()
    : ({ format: (val: number) => String(val) } as unknown as Intl.NumberFormat)

type PressableLikeEvent = GestureResponderEvent & { preventDefault?: () => void }

type HandlerBag = Record<string, unknown> & Partial<React.ComponentProps<typeof View>>

interface ThumbNodeProps {
  index: number
  orientation: 'horizontal' | 'vertical'
  ariaReverse: boolean
  trackLayout: TrackLayout
  isDisabled: boolean
  state: ReturnType<typeof useSliderState>
  size: number
  activeColor: string
  content: React.ReactNode
  visualPercent: number
  thumbBackgroundColor: string
  thumbElevation: number
  indicatorSize: number
  indicatorColor: string
  webGestureStyle?: ViewStyle
  enhanceHandlers: (
    handlers: HandlerBag | undefined,
    index: number
  ) => HandlerBag | undefined
}

const ThumbNode: React.FC<ThumbNodeProps> = React.memo(({
  index,
  orientation,
  ariaReverse,
  trackLayout,
  isDisabled,
  state,
  size,
  activeColor,
  content,
  visualPercent,
  thumbBackgroundColor,
  thumbElevation,
  indicatorSize,
  indicatorColor,
  webGestureStyle,
  enhanceHandlers,
}) => {
  const inputRef = React.useRef(null)
  const { thumbProps, inputProps } = useSliderThumb(
    {
      index,
      trackLayout,
      inputRef,
      isDisabled,
      orientation,
    },
    state,
    ariaReverse
  )

  const rawThumbViewProps = thumbProps as unknown as HandlerBag | undefined
  const handlers = enhanceHandlers(rawThumbViewProps, index) ?? rawThumbViewProps ?? {}
  const translate = -size / 2
  const thumbStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor: activeColor,
    transform: [{ translateX: translate }, { translateY: translate }],
  }
  if (orientation === 'vertical') {
    thumbStyle.top = `${visualPercent}%`
    thumbStyle.left = '50%'
  } else {
    thumbStyle.left = `${visualPercent}%`
    thumbStyle.top = '50%'
  }
  if (!content) {
    thumbStyle.backgroundColor = thumbBackgroundColor
    thumbStyle.elevation = thumbElevation
  }
  const accessibilityProps = createAccessibilityProps(inputProps)

  return (
    <View
      {...handlers}
      {...accessibilityProps}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      style={[content ? styles.thumbWrapper : styles.thumb, webGestureStyle, thumbStyle]}
    >
      {content ?? (
        <View
          style={{
            width: indicatorSize,
            height: indicatorSize,
            borderRadius: indicatorSize / 2,
            backgroundColor: indicatorColor,
          }}
        />
      )}
    </View>
  )
})

ThumbNode.displayName = 'ThumbNode'

export const Slider: React.FC<SliderProps> = props => {
  const {
    value: valueProp,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    vertical = false,
    reverse = false,
    disabled = false,
    readOnly = false,
    activeColor,
    inactiveColor,
    barHeight,
    trackHeight,
    buttonSize,
    thumbSize,
    tokensOverride,
    button,
    leftButton,
    rightButton,
    thumb,
    leftThumb,
    rightThumb,
    ariaLabel,
    onChange,
    onChangeAfter,
    onDragStart,
    onDragEnd,
    style,
    onLayout: containerOnLayout,
    ...rest
  } = props

  const tokens = useSliderTokens(tokensOverride)
  const orientation: 'horizontal' | 'vertical' = vertical ? 'vertical' : 'horizontal'
  const trackRef = React.useRef<React.ElementRef<typeof Pressable> | null>(null)

  const resolvedMin = parseNumber(min, 0)
  const resolvedMax = parseNumber(max, 100)
  const resolvedStepRaw = parseNumber(step, 1)
  const resolvedStep = resolvedStepRaw > 0 ? resolvedStepRaw : 1

  const resolvedTrackHeight = Math.max(
    0,
    parseNumber(barHeight ?? trackHeight, tokens.track.height)
  )
  const resolvedThumbSize = Math.max(
    0,
    parseNumber(buttonSize ?? thumbSize, tokens.thumb.size)
  )

  const ariaDisabled = disabled || readOnly
  const resolvedActiveColor = activeColor ?? tokens.colors.active
  const resolvedInactiveColor = inactiveColor ?? tokens.colors.inactive
  const scope = Math.max(resolvedMax - resolvedMin, 0.00001)

  const normalized = React.useMemo(
    () => normalizeValue(valueProp, range, resolvedMin, resolvedMax),
    [valueProp, range, resolvedMin, resolvedMax]
  )
  const isControlled = valueProp !== undefined

  const formatOutput = (values: readonly number[]) => toSliderValue(values, range, resolvedMin)

  const state = useSliderState({
    minValue: resolvedMin,
    maxValue: resolvedMax,
    step: resolvedStep,
    isDisabled: ariaDisabled,
    numberFormatter: defaultNumberFormatter,
    orientation,
    value: isControlled ? normalized : undefined,
    defaultValue: !isControlled ? normalized : undefined,
    onChange: values => onChange?.(formatOutput(values)),
    onChangeEnd: values => onChangeAfter?.(formatOutput(values)),
  })

  const [trackLayout, setTrackLayout] = React.useState<TrackLayout>({ width: 0, height: 0, x: 0, y: 0 })

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent
    const next = {
      width: Math.max(layout.width, 1),
      height: Math.max(layout.height, 1),
      x: layout.x ?? 0,
      y: layout.y ?? 0,
    }
    setTrackLayout(prev => (isSameLayout(prev, next) ? prev : next))

    if (Platform.OS !== 'web' || typeof requestAnimationFrame === 'undefined') return

    requestAnimationFrame(() => {
      const node = trackRef.current as unknown as {
        measureInWindow?: (cb: (x: number, y: number, width: number, height: number) => void) => void
      } | null
      if (!node?.measureInWindow) return
      node.measureInWindow((x, y, width, height) => {
        const measured = {
          width: Math.max(width, 1),
          height: Math.max(height, 1),
          x,
          y,
        }
        setTrackLayout(prev => (isSameLayout(prev, measured) ? prev : measured))
      })
    })
  }

  const reverseX = orientation === 'horizontal' ? reverse || isRTL() : reverse
  const ariaReverse = orientation === 'horizontal' ? reverseX : reverse

  const { trackProps } = useSlider(
    {
      orientation,
      isDisabled: ariaDisabled,
      'aria-label': ariaLabel ?? 'Slider',
    } as Parameters<typeof useSlider>[0],
    state,
    trackLayout,
    ariaReverse
  )
  const trackPressableProps = trackProps as unknown as Partial<React.ComponentProps<typeof Pressable>>
  const { style: trackAriaStyle, onLayout: trackAriaOnLayout, ...restTrackProps } = trackPressableProps

  const handleTrackPress = (event: GestureResponderEvent) => {
    if (ariaDisabled) return
    if (!state.values.every((_, i) => !state.isThumbDragging(i))) return

    const { locationX, locationY, pageX, pageY } = event.nativeEvent

    const localX = isFiniteNumber(locationX)
      ? locationX
      : isFiniteNumber(pageX)
        ? pageX - (trackLayout.x ?? 0)
        : 0
    const localY = isFiniteNumber(locationY)
      ? locationY
      : isFiniteNumber(pageY)
        ? pageY - (trackLayout.y ?? 0)
        : 0

    const size = orientation === 'vertical' ? trackLayout.height : trackLayout.width
    const local = orientation === 'vertical' ? localY : localX
    const raw = local / Math.max(size, 1)
    const percent =
      orientation === 'vertical'
        ? reverse
          ? raw
          : 1 - raw
        : reverseX
          ? 1 - raw
          : raw

    const value = state.getPercentValue(Math.min(1, Math.max(0, percent)))
    const closestThumb = state.values.reduce(
      (best, v, i) => (Math.abs(v - value) < Math.abs(state.values[best] - value) ? i : best),
      0
    )

    if (closestThumb >= 0 && state.isThumbEditable(closestThumb)) {
      ; (event as unknown as PressableLikeEvent).preventDefault?.()
      state.setFocusedThumb(closestThumb)
      state.setThumbDragging(closestThumb, true)
      state.setThumbValue(closestThumb, value)
      state.setThumbDragging(closestThumb, false)
    }
  }

  const currentValue = formatOutput(state.values)
  const currentValueRef = React.useRef<SliderValue>(currentValue)
  currentValueRef.current = currentValue

  const dragStartedRef = React.useRef<boolean[]>([])
  const dragStartValueRef = React.useRef<(SliderValue | undefined)[]>([])
  const moveRafIdRef = React.useRef<(number | null)[]>([])
  const movePendingArgsRef = React.useRef<(unknown[] | null)[]>([])

  const enhanceHandlers = React.useCallback(
    (handlers: HandlerBag | undefined, index: number) => {
      if (!handlers) return handlers
      if (!onDragStart && !onDragEnd) {
        return handlers
      }
      const startKeys = ['onResponderGrant', 'onPanResponderGrant']
      const moveKeys = ['onResponderMove', 'onPanResponderMove']
      const endKeys = [
        'onResponderRelease',
        'onResponderTerminate',
        'onPanResponderRelease',
        'onPanResponderTerminate',
      ]

      const hasAny =
        startKeys.some(k => isFunction(handlers[k])) ||
        moveKeys.some(k => isFunction(handlers[k])) ||
        endKeys.some(k => isFunction(handlers[k]))

      if (!hasAny) return handlers

      const wrapped: HandlerBag = { ...handlers }

      for (const key of moveKeys) {
        const original = wrapped[key]
        if (!isFunction(original)) continue
        const originalFn = original as (...args: unknown[]) => unknown
        wrapped[key] = (...args: unknown[]) => {
          movePendingArgsRef.current[index] = args
          if (moveRafIdRef.current[index] != null) return
          moveRafIdRef.current[index] = requestAnimationFrame(() => {
            moveRafIdRef.current[index] = null
            const pending = movePendingArgsRef.current[index]
            if (!pending) return
            movePendingArgsRef.current[index] = null
            originalFn(...pending)
          })
        }
      }

      const wrapAfter = (
        key: string,
        callback: ((event: GestureResponderEvent) => void) | undefined
      ) => {
        if (!callback) return
        const original = wrapped[key]
        wrapped[key] = (...args: unknown[]) => {
          if (isFunction(original)) {
            ; (original as (...args: unknown[]) => unknown)(...args)
          }
          callback(args[0] as GestureResponderEvent)
        }
      }

      const wrapBefore = (
        key: string,
        callback: ((event: GestureResponderEvent) => void) | undefined
      ) => {
        if (!callback) return
        const original = wrapped[key]
        wrapped[key] = (...args: unknown[]) => {
          callback(args[0] as GestureResponderEvent)
          if (isFunction(original)) {
            ; (original as (...args: unknown[]) => unknown)(...args)
          }
        }
      }

      for (const key of startKeys) {
        wrapAfter(key, () => {
          dragStartedRef.current[index] = false
          dragStartValueRef.current[index] = currentValueRef.current
        })
      }

      for (const key of moveKeys) {
        wrapBefore(key, event => {
          if (!dragStartedRef.current[index]) {
            dragStartedRef.current[index] = true
            onDragStart?.(event, dragStartValueRef.current[index] ?? currentValueRef.current)
          }
        })
      }

      const emitEnd = (event: GestureResponderEvent) => {
        if (dragStartedRef.current[index]) {
          dragStartedRef.current[index] = false
          dragStartValueRef.current[index] = undefined
          onDragEnd?.(event, currentValueRef.current)
        }
        const rafId = moveRafIdRef.current[index]
        if (rafId != null) {
          cancelAnimationFrame(rafId)
          moveRafIdRef.current[index] = null
        }
        movePendingArgsRef.current[index] = null
      }

      for (const key of endKeys) {
        wrapAfter(key, emitEnd)
      }

      return wrapped
    },
    [onDragStart, onDragEnd]
  )

  const values = state.values as readonly number[]
  const thumbPercents = values.map(value => (((value ?? resolvedMin) - resolvedMin) / scope) * 100)
  const thumbVisualPercents = thumbPercents.map(percent =>
    orientation === 'vertical'
      ? reverse
        ? percent
        : 100 - percent
      : reverseX
        ? 100 - percent
        : percent
  )

  const first = thumbVisualPercents[0] ?? 0
  const second = thumbVisualPercents[1] ?? first
  const activeRange =
    range && thumbVisualPercents.length > 1
      ? { offset: Math.min(first, second), size: Math.max(first, second) - Math.min(first, second) }
      : (orientation === 'horizontal' ? !reverseX : reverse)
        ? { offset: 0, size: first }
        : { offset: first, size: 100 - first }

  const activeTrackStyle: ViewStyle = {
    backgroundColor: resolvedActiveColor,
    borderRadius: tokens.track.radius,
  }
  if (orientation === 'vertical') {
    activeTrackStyle.left = 0
    activeTrackStyle.width = '100%'
    activeTrackStyle.height = `${Math.max(activeRange.size, 0)}%`
    activeTrackStyle.top = `${Math.max(activeRange.offset, 0)}%`
  } else {
    activeTrackStyle.top = 0
    activeTrackStyle.height = '100%'
    activeTrackStyle.width = `${Math.max(activeRange.size, 0)}%`
    activeTrackStyle.left = `${Math.max(activeRange.offset, 0)}%`
  }

  const trackBaseStyle =
    orientation === 'vertical'
      ? [
        styles.trackVertical,
        {
          width: resolvedTrackHeight,
          backgroundColor: resolvedInactiveColor,
          alignSelf: 'center' as const,
        },
      ]
      : [styles.trackHorizontal, { height: resolvedTrackHeight, backgroundColor: resolvedInactiveColor }]

  const isButtonFunction = isFunction(button)
  const sharedThumb = isButtonFunction
    ? (button as ({ value }: { value: SliderValue }) => React.ReactNode)({ value: currentValue })
    : button ?? thumb
  const leftThumbContent = leftButton ?? leftThumb ?? sharedThumb
  const rightThumbContent = rightButton ?? rightThumb ?? sharedThumb
  const resolveThumbContent = (index: number, total: number) =>
    total > 1 ? (index === 0 ? leftThumbContent : rightThumbContent) : sharedThumb

  const webGestureStyle: ViewStyle | undefined =
    Platform.OS === 'web'
      ? ({ touchAction: orientation === 'horizontal' ? 'pan-y' : 'none', userSelect: 'none' } as unknown as ViewStyle)
      : undefined
  const baseTrackPressableStyle: StyleProp<ViewStyle> = [
    styles.trackPressable,
    orientation === 'vertical' ? styles.trackPressableVertical : null,
    webGestureStyle,
  ]
  const trackPressableStyle =
    trackAriaStyle && isFunction(trackAriaStyle)
      ? (state: PressableStateCallbackType) => [
        baseTrackPressableStyle,
        trackAriaStyle(state) as StyleProp<ViewStyle>,
      ]
      : ([baseTrackPressableStyle, trackAriaStyle as StyleProp<ViewStyle>] as StyleProp<ViewStyle>)

  return (
    <View
      style={[
        styles.container,
        { paddingVertical: tokens.spacing.containerPaddingVertical },
        orientation === 'vertical' && [
          styles.verticalContainer,
          { minHeight: tokens.layout.verticalMinHeight, width: tokens.layout.verticalWidth },
        ],
        disabled && { opacity: tokens.states.disabledOpacity },
        style,
      ]}
      onLayout={containerOnLayout}
      {...rest}
    >
      <View style={[styles.trackWrapper, orientation === 'vertical' && styles.trackWrapperVertical]}>
        <Pressable
          ref={trackRef}
          {...restTrackProps}
          onPress={handleTrackPress}
          disabled={ariaDisabled}
          onLayout={(event: LayoutChangeEvent) => {
            handleTrackLayout(event)
            trackAriaOnLayout?.(event)
          }}
          style={trackPressableStyle}
        >
          <View style={[styles.trackBase, { borderRadius: tokens.track.radius }, ...trackBaseStyle]}>
            <View style={[styles.active, activeTrackStyle]} />
          </View>
        </Pressable>
        {values.map((_, index) => (
          <ThumbNode
            key={`thumb-${index}`}
            index={index}
            orientation={orientation}
            ariaReverse={ariaReverse}
            trackLayout={trackLayout}
            isDisabled={ariaDisabled}
            state={state}
            size={resolvedThumbSize}
            activeColor={resolvedActiveColor}
            content={resolveThumbContent(index, values.length)}
            visualPercent={thumbVisualPercents[index] ?? 0}
            thumbBackgroundColor={tokens.colors.thumbBackground}
            thumbElevation={tokens.thumb.elevation}
            indicatorSize={tokens.thumb.indicatorSize}
            indicatorColor={tokens.colors.thumbIndicator}
            webGestureStyle={webGestureStyle}
            enhanceHandlers={enhanceHandlers}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
  },
  verticalContainer: {
    height: '100%',
    alignItems: 'center',
    paddingVertical: 0,
  },
  trackWrapper: {
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  trackWrapperVertical: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  trackPressable: {
    width: '100%',
    justifyContent: 'center',
  },
  trackPressableVertical: {
    flex: 1,
    alignItems: 'center',
  },
  trackBase: {
    overflow: 'hidden',
    position: 'relative',
  },
  trackHorizontal: {
    width: '100%',
  },
  trackVertical: {
    height: '100%',
  },
  active: {
    position: 'absolute',
  },
  thumb: {
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

Slider.displayName = 'Slider'

export default Slider
