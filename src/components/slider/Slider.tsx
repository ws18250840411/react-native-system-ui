import { useSlider, useSliderThumb } from '@react-native-aria/slider'
import { isRTL } from '@react-native-aria/utils'
import { useSliderState } from '@react-stately/slider'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { GestureResponderEvent, LayoutChangeEvent, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

import type { SliderProps, SliderValue } from './types'
import { useSliderTokens } from './tokens'
import { parseNumber } from '../../utils/number'
import { clamp } from '../../utils'
import { isFunction, isFiniteNumber, isRenderable } from '../../utils/validate'
import { useAriaPress } from '../../hooks'

type TrackLayout = { width: number; height: number; x: number; y: number }

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

    const first = isFiniteNumber(raw[0]) ? clamp(raw[0], min, max) : min
    const second = isFiniteNumber(raw[1] ?? raw[0]) ? clamp(raw[1] ?? raw[0], min, max) : min
    return first <= second ? [first, second] : [second, first]
  }

  const single = Array.isArray(value) ? value[0] : value
  return [isFiniteNumber(single) ? clamp(single, min, max) : min]
}

const toSliderValue = (values: readonly number[], range: boolean, fallback: number): SliderValue => {
  if (range) {
    const start = values[0] ?? fallback
    const end = values[1] ?? start
    return [start, end]
  }
  return values[0] ?? fallback
}

  const createAccessibilityProps = (inputProps?: { role?: string; ['aria-value']?: unknown; accessibilityActions?: unknown; onAccessibilityAction?: unknown; disabled?: boolean } | null) => {
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

const START_KEYS = ['onResponderGrant', 'onPanResponderGrant'] as const
const MOVE_KEYS = ['onResponderMove', 'onPanResponderMove'] as const
const END_KEYS = [
  'onResponderRelease',
  'onResponderTerminate',
  'onPanResponderRelease',
  'onPanResponderTerminate',
] as const

const useTrackLayout = () => {
  const trackRef = useRef<React.ElementRef<typeof Pressable> | null>(null)
  const measureRafRef = useRef<number | null>(null)
  const [trackLayout, setTrackLayout] = useState<TrackLayout>({ width: 0, height: 0, x: 0, y: 0 })

  const handleTrackLayout = useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent
    const next = {
      width: Math.max(layout.width, 1),
      height: Math.max(layout.height, 1),
      x: layout.x ?? 0,
      y: layout.y ?? 0,
    }
    setTrackLayout(prev => (isSameLayout(prev, next) ? prev : next))

    if (Platform.OS !== 'web' || typeof requestAnimationFrame === 'undefined') return

    if (measureRafRef.current != null) return
    measureRafRef.current = requestAnimationFrame(() => {
      measureRafRef.current = null
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
  }, [])

  useEffect(() => {
    return () => {
      if (measureRafRef.current != null && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(measureRafRef.current)
      }
      measureRafRef.current = null
    }
  }, [])

  return { trackRef, trackLayout, handleTrackLayout }
}

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
  const inputRef = useRef(null)
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
    ...(orientation === 'vertical' ? { top: `${visualPercent}%`, left: '50%' } : { left: `${visualPercent}%`, top: '50%' }),
    ...(!content ? { backgroundColor: thumbBackgroundColor, elevation: thumbElevation } : {}),
  }
  const indicatorStyle = { width: indicatorSize, height: indicatorSize, borderRadius: indicatorSize / 2, backgroundColor: indicatorColor }
  const accessibilityProps = createAccessibilityProps(inputProps) as unknown as Partial<React.ComponentProps<typeof View>>

  return (
    <View
      {...handlers}
      {...accessibilityProps}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      style={[content ? styles.thumbWrapper : styles.thumb, webGestureStyle, thumbStyle]}
    >
      {content ?? <View style={indicatorStyle} />}
    </View>
  )
})

ThumbNode.displayName = 'ThumbNode'

const SliderImpl: React.FC<SliderProps> = props => {
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
  const { trackRef, trackLayout, handleTrackLayout } = useTrackLayout()

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

  const normalized = normalizeValue(valueProp, range, resolvedMin, resolvedMax)
  const isControlled = valueProp !== undefined


  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const onChangeAfterRef = useRef(onChangeAfter)
  onChangeAfterRef.current = onChangeAfter
  const onDragStartRef = useRef(onDragStart)
  onDragStartRef.current = onDragStart
  const onDragEndRef = useRef(onDragEnd)
  onDragEndRef.current = onDragEnd

  const formatOutput = useCallback(
    (values: readonly number[]) => toSliderValue(values, range, resolvedMin),
    [range, resolvedMin],
  )

  const handleStateChange = useCallback(
    (values: readonly number[]) => {
      onChangeRef.current?.(formatOutput(values))
    },
    [formatOutput],
  )

  const handleStateChangeEnd = useCallback(
    (values: readonly number[]) => {
      onChangeAfterRef.current?.(formatOutput(values))
    },
    [formatOutput],
  )

  const sliderStateOptions = useMemo(() => ({
    minValue: resolvedMin,
    maxValue: resolvedMax,
    step: resolvedStep,
    isDisabled: ariaDisabled,
    numberFormatter: defaultNumberFormatter,
    orientation,
    value: isControlled ? normalized : undefined,
    defaultValue: !isControlled ? normalized : undefined,
    onChange: handleStateChange,
    onChangeEnd: handleStateChangeEnd,
  }), [ariaDisabled, handleStateChange, handleStateChangeEnd, isControlled, normalized, orientation, resolvedMax, resolvedMin, resolvedStep])

  const state = useSliderState(sliderStateOptions)

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

  const handleCombinedTrackLayout = useCallback((event: LayoutChangeEvent) => {
    handleTrackLayout(event)
    trackAriaOnLayout?.(event)
  }, [handleTrackLayout, trackAriaOnLayout])

  const handleTrackPress = useCallback((event: GestureResponderEvent) => {
    if (ariaDisabled) return
    if (!state.values.every((_, i) => !state.isThumbDragging(i))) return

    const { locationX, locationY, pageX, pageY } = event.nativeEvent
    const localX = isFiniteNumber(locationX) ? locationX : (isFiniteNumber(pageX) ? pageX - (trackLayout.x ?? 0) : 0)
    const localY = isFiniteNumber(locationY) ? locationY : (isFiniteNumber(pageY) ? pageY - (trackLayout.y ?? 0) : 0)

    const size = orientation === 'vertical' ? trackLayout.height : trackLayout.width
    const local = orientation === 'vertical' ? localY : localX
    const raw = local / Math.max(size, 1)
    const percent = orientation === 'vertical' ? (reverse ? raw : 1 - raw) : (reverseX ? 1 - raw : raw)

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
  }, [ariaDisabled, orientation, reverse, reverseX, state, trackLayout.height, trackLayout.width, trackLayout.x, trackLayout.y])

  const { interactionProps: trackInteractionProps } = useAriaPress({
    disabled: ariaDisabled,
    onPress: handleTrackPress,
    extraProps: restTrackProps as Record<string, unknown>,
  })

  const currentValue = formatOutput(state.values)
  const currentValueRef = useRef<SliderValue>(currentValue)
  currentValueRef.current = currentValue

  const dragStartedRef = useRef<boolean[]>([])
  const dragStartValueRef = useRef<(SliderValue | undefined)[]>([])
  const moveRafIdRef = useRef<(number | null)[]>([])
  const movePendingArgsRef = useRef<(unknown[] | null)[]>([])
  const enhancedHandlersCacheRef = useRef<WeakMap<object, Map<number, HandlerBag>>>(new WeakMap())

  useEffect(() => {
    return () => {
      const cancel = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : undefined
      if (!cancel) return
      for (const id of moveRafIdRef.current) {
        if (id != null) cancel(id)
      }
      moveRafIdRef.current = []
      movePendingArgsRef.current = []
    }
  }, [])

  const enhanceHandlers = useCallback(
    (handlers: HandlerBag | undefined, index: number) => {
      if (!handlers) return handlers
      if (!onDragStartRef.current && !onDragEndRef.current) {
        return handlers
      }
      const cached = enhancedHandlersCacheRef.current.get(handlers)
      const found = cached?.get(index)
      if (found) return found

      const hasAny =
        START_KEYS.some(k => isFunction(handlers[k])) ||
        MOVE_KEYS.some(k => isFunction(handlers[k])) ||
        END_KEYS.some(k => isFunction(handlers[k]))

      if (!hasAny) return handlers

      const wrapped: HandlerBag = { ...handlers }

      const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined
      const caf = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : undefined

      for (const key of MOVE_KEYS) {
        const original = wrapped[key]
        if (!isFunction(original)) continue
        const originalFn = original as (...args: unknown[]) => unknown
        wrapped[key] = (...args: unknown[]) => {
          if (!raf) {
            originalFn(...args)
            return
          }
          movePendingArgsRef.current[index] = args
          if (moveRafIdRef.current[index] != null) return
          moveRafIdRef.current[index] = raf(() => {
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

      for (const key of START_KEYS) {
        wrapAfter(key, () => {
          dragStartedRef.current[index] = false
          dragStartValueRef.current[index] = currentValueRef.current
        })
      }

      for (const key of MOVE_KEYS) {
        wrapBefore(key, event => {
          if (!dragStartedRef.current[index]) {
            dragStartedRef.current[index] = true
            onDragStartRef.current?.(event, dragStartValueRef.current[index] ?? currentValueRef.current)
          }
        })
      }

      const emitEnd = (event: GestureResponderEvent) => {
        if (dragStartedRef.current[index]) {
          dragStartedRef.current[index] = false
          dragStartValueRef.current[index] = undefined
          onDragEndRef.current?.(event, currentValueRef.current)
        }
        const rafId = moveRafIdRef.current[index]
        if (rafId != null && caf) {
          caf(rafId)
          moveRafIdRef.current[index] = null
        }
        movePendingArgsRef.current[index] = null
      }

      for (const key of END_KEYS) {
        wrapAfter(key, emitEnd)
      }

      const map = cached ?? new Map<number, HandlerBag>()
      map.set(index, wrapped)
      if (!cached) {
        enhancedHandlersCacheRef.current.set(handlers, map)
      }
      return wrapped
    },
    []
  )

  const values = state.values as readonly number[]
  const thumbPercents = useMemo(
    () => values.map(value => (((value ?? resolvedMin) - resolvedMin) / scope) * 100),
    [resolvedMin, scope, values]
  )
  const thumbVisualPercents = useMemo(
    () => thumbPercents.map(percent =>
      orientation === 'vertical'
        ? reverse
          ? percent
          : 100 - percent
        : reverseX
          ? 100 - percent
          : percent,
    ),
    [orientation, reverse, reverseX, thumbPercents]
  )

  const activeRange = useMemo(() => {
    const first = thumbVisualPercents[0] ?? 0
    const second = thumbVisualPercents[1] ?? first
    return range && thumbVisualPercents.length > 1
      ? { offset: Math.min(first, second), size: Math.max(first, second) - Math.min(first, second) }
      : (orientation === 'horizontal' ? !reverseX : reverse) ? { offset: 0, size: first } : { offset: first, size: 100 - first }
  }, [orientation, range, reverse, reverseX, thumbVisualPercents])

  const { track: { radius: trackRadius } } = tokens
  const activeTrackStyle: ViewStyle = useMemo(() => {
    const base: ViewStyle = {
      backgroundColor: resolvedActiveColor,
      borderRadius: trackRadius,
      ...(orientation === 'vertical'
        ? { left: 0, width: '100%', height: `${Math.max(activeRange.size, 0)}%`, top: `${Math.max(activeRange.offset, 0)}%` }
        : { top: 0, height: '100%', width: `${Math.max(activeRange.size, 0)}%`, left: `${Math.max(activeRange.offset, 0)}%` }),
    }
    return base
  }, [activeRange.offset, activeRange.size, orientation, resolvedActiveColor, trackRadius])

  const trackBaseStyle = useMemo(
    () => orientation === 'vertical'
      ? [styles.trackVertical, { width: resolvedTrackHeight, backgroundColor: resolvedInactiveColor, alignSelf: 'center' as const }]
      : [styles.trackHorizontal, { height: resolvedTrackHeight, backgroundColor: resolvedInactiveColor }],
    [orientation, resolvedInactiveColor, resolvedTrackHeight]
  )

  const isButtonFunction = isFunction(button)
  const sharedThumb = isButtonFunction ? (button as ({ value }: { value: SliderValue }) => React.ReactNode)({ value: currentValue }) : button ?? thumb
  const leftThumbContent = leftButton ?? leftThumb ?? sharedThumb
  const rightThumbContent = rightButton ?? rightThumb ?? sharedThumb
  const resolveThumbContent = useCallback(
    (index: number, total: number) => total > 1 ? (index === 0 ? leftThumbContent : rightThumbContent) : sharedThumb,
    [leftThumbContent, rightThumbContent, sharedThumb],
  )

  const webGestureStyle: ViewStyle | undefined = Platform.OS === 'web' ? ({ touchAction: orientation === 'horizontal' ? 'pan-y' : 'pan-x', userSelect: 'none' } as unknown as ViewStyle) : undefined
  const baseTrackPressableStyle: StyleProp<ViewStyle> = [
    styles.trackPressable,
    orientation === 'vertical' ? styles.trackPressableVertical : null,
    webGestureStyle,
  ]
  const trackPressableStyleFn = useCallback(
    (pressableState: PressableStateCallbackType): StyleProp<ViewStyle> => [
      baseTrackPressableStyle,
      (trackAriaStyle as (state: PressableStateCallbackType) => unknown)(pressableState) as StyleProp<ViewStyle>,
    ],
    [baseTrackPressableStyle, trackAriaStyle],
  )
  const trackPressableStyle: React.ComponentProps<typeof Pressable>['style'] = trackAriaStyle && isFunction(trackAriaStyle) ? trackPressableStyleFn : ([baseTrackPressableStyle, trackAriaStyle as StyleProp<ViewStyle>] as StyleProp<ViewStyle>)

  const { spacing: { containerPaddingVertical }, layout: { verticalMinHeight, verticalWidth }, states: { disabledOpacity } } = tokens
  const containerStyles = [
    styles.container,
    { paddingVertical: containerPaddingVertical },
    orientation === 'vertical' && [styles.verticalContainer, { minHeight: verticalMinHeight, width: verticalWidth }],
    disabled && { opacity: disabledOpacity },
    style,
  ]

  return (
    <View
      style={containerStyles}
      onLayout={containerOnLayout}
      {...rest}
    >
      <View style={[styles.trackWrapper, orientation === 'vertical' && styles.trackWrapperVertical]}>
        <Pressable
          ref={trackRef}
          {...trackInteractionProps}
          disabled={ariaDisabled}
          onLayout={handleCombinedTrackLayout}
          style={trackPressableStyle}
        >
          <View style={[styles.trackBase, { borderRadius: trackRadius }, ...trackBaseStyle]}>
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

export const Slider = React.memo(SliderImpl)
Slider.displayName = 'Slider'

export default Slider
