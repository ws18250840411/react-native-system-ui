import { useSlider, useSliderThumb } from '@react-native-aria/slider'
import { isRTL } from '@react-native-aria/utils'
import { useSliderState } from '@react-stately/slider'
import React from 'react'
import type { GestureResponderEvent, LayoutChangeEvent, ViewStyle } from 'react-native'
import { Platform, Pressable, StyleSheet, View } from 'react-native'

import type { SliderProps, SliderValue } from './types'
import { useSliderTokens } from './tokens'

const clampValue = (value: number | undefined, min: number, max: number) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return min
  }
  if (value < min) return min
  if (value > max) return max
  return value
}

const parseNumber = (value: number | string | undefined, fallback: number) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

const isSameLayout = (
  a: { width: number; height: number; x: number; y: number },
  b: { width: number; height: number; x: number; y: number }
) => a.width === b.width && a.height === b.height && a.x === b.x && a.y === b.y

const normalizeValue = (
  value: SliderValue | undefined,
  range: boolean,
  min: number,
  max: number
): number[] => {
  if (range) {
    const raw = Array.isArray(value)
      ? value
      : typeof value === 'number'
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

const createAccessibilityProps = (inputProps: any) => {
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

interface ThumbNodeProps {
  index: number
  orientation: 'horizontal' | 'vertical'
  ariaReverse: boolean
  trackLayout: { width: number; height: number; x: number; y: number }
  isDisabled: boolean
  state: ReturnType<typeof useSliderState>
  size: number
  activeColor: string
  content: React.ReactNode
  visualPercent: number
  webGestureStyle?: any
  enhanceHandlers: (handlers: Record<string, any> | undefined, index: number) => Record<string, any> | undefined
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

  const handlers = React.useMemo(
    () => enhanceHandlers(thumbProps, index) ?? {},
    [enhanceHandlers, thumbProps, index]
  )

  const axisKey = React.useMemo(
    () => orientation === 'vertical' ? 'top' : 'left',
    [orientation]
  )
  const crossAxisKey = React.useMemo(
    () => orientation === 'vertical' ? 'left' : 'top',
    [orientation]
  )

  const thumbStyle: ViewStyle = React.useMemo(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      borderColor: activeColor,
      [axisKey]: `${visualPercent}%`,
      [crossAxisKey]: '50%',
      transform: [{ translateX: -size / 2 }, { translateY: -size / 2 }],
    }),
    [size, activeColor, axisKey, crossAxisKey, visualPercent]
  )

  const accessibilityProps = React.useMemo(
    () => createAccessibilityProps(inputProps),
    [inputProps]
  )

  return (
    <View
      {...handlers}
      {...accessibilityProps}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      style={[content ? styles.thumbWrapper : styles.thumb, webGestureStyle, thumbStyle]}
    >
      {content ?? <View style={styles.defaultThumb} />}
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

  const tokens = useSliderTokens()
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

  const formatOutput = React.useCallback(
    (values: readonly number[]) => toSliderValue(values, range, resolvedMin),
    [range, resolvedMin]
  )

  const numberFormatter = React.useMemo(() => {
    if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
      return new Intl.NumberFormat()
    }
    return { format: (val: number) => String(val) } as any
  }, [])

  const state = useSliderState({
    minValue: resolvedMin,
    maxValue: resolvedMax,
    step: resolvedStep,
    isDisabled: ariaDisabled,
    numberFormatter,
    orientation,
    value: isControlled ? normalized : undefined,
    defaultValue: !isControlled ? normalized : undefined,
    onChange: values => onChange?.(formatOutput(values)),
    onChangeEnd: values => onChangeAfter?.(formatOutput(values)),
  })

  const [trackLayout, setTrackLayout] = React.useState({ width: 0, height: 0, x: 0, y: 0 })

  const handleTrackLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent
    const next = {
      width: Math.max(layout.width, 1),
      height: Math.max(layout.height, 1),
      x: layout.x ?? 0,
      y: layout.y ?? 0,
    }
    setTrackLayout(prev => (isSameLayout(prev, next) ? prev : next))

    if (Platform.OS !== 'web') return

    requestAnimationFrame(() => {
      const node = trackRef.current as any
      if (!node || typeof node.measureInWindow !== 'function') return
      node.measureInWindow((x: number, y: number, width: number, height: number) => {
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

  const accessibleLabel = ariaLabel ?? 'Slider'

  const reverseX = React.useMemo(
    () => orientation === 'horizontal' ? reverse || isRTL() : reverse,
    [orientation, reverse]
  )

  const ariaReverse = React.useMemo(
    () => orientation === 'horizontal' ? reverseX : reverse,
    [orientation, reverse, reverseX]
  )

  const { trackProps } = useSlider(
    {
      orientation,
      isDisabled: ariaDisabled,
      'aria-label': accessibleLabel,
    } as any,
    state,
    trackLayout,
    ariaReverse
  )

  const handleTrackPress = React.useCallback(
    (event: GestureResponderEvent) => {
      if (ariaDisabled) return
      if (!state.values.every((_, i) => !state.isThumbDragging(i))) return

      const nativeEvent: any = (event as any)?.nativeEvent
      const locationX = nativeEvent?.locationX
      const locationY = nativeEvent?.locationY
      const pageX = nativeEvent?.pageX
      const pageY = nativeEvent?.pageY

      const localX =
        typeof locationX === 'number'
          ? locationX
          : typeof pageX === 'number'
            ? pageX - (trackLayout.x ?? 0)
            : 0
      const localY =
        typeof locationY === 'number'
          ? locationY
          : typeof pageY === 'number'
            ? pageY - (trackLayout.y ?? 0)
            : 0

      const size = orientation === 'vertical' ? trackLayout.height : trackLayout.width
      const rawPercent = (orientation === 'vertical' ? localY : localX) / Math.max(size, 1)

      const isReversedAxis = orientation === 'horizontal' ? reverseX : reverse
      let percent = rawPercent
      if (isReversedAxis) {
        if (orientation !== 'vertical') {
          percent = 1 - percent
        }
      } else {
        if (orientation === 'vertical') {
          percent = 1 - percent
        }
      }

      const clampedPercent = Math.min(1, Math.max(0, percent))
      const value = state.getPercentValue(clampedPercent)

      let closestThumb: number
      const split = state.values.findIndex(v => value - v < 0)
      if (split === 0) {
        closestThumb = 0
      } else if (split === -1) {
        closestThumb = state.values.length - 1
      } else {
        const lastLeft = state.values[split - 1]
        const firstRight = state.values[split]
        closestThumb = Math.abs(lastLeft - value) < Math.abs(firstRight - value) ? split - 1 : split
      }

      if (closestThumb >= 0 && state.isThumbEditable(closestThumb)) {
        ; (event as any)?.preventDefault?.()
        state.setFocusedThumb(closestThumb)
        state.setThumbDragging(closestThumb, true)
        state.setThumbValue(closestThumb, value)
        state.setThumbDragging(closestThumb, false)
      }
    },
    [ariaDisabled, orientation, reverse, reverseX, state, trackLayout.x, trackLayout.y, trackLayout.width, trackLayout.height]
  )

  const getCurrentValue = React.useCallback(() => formatOutput(state.values), [state.values, formatOutput])
  const dragStartedRef = React.useRef<Record<number, boolean>>({})
  const dragStartValueRef = React.useRef<Record<number, SliderValue>>({})
  const moveRafIdRef = React.useRef<Record<number, number | null>>({})
  const movePendingArgsRef = React.useRef<Record<number, any[] | null>>({})

  const enhanceHandlers = React.useCallback(
    (handlers: Record<string, any> | undefined, index: number) => {
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
        startKeys.some(k => typeof handlers[k] === 'function') ||
        moveKeys.some(k => typeof handlers[k] === 'function') ||
        endKeys.some(k => typeof handlers[k] === 'function')

      if (!hasAny) return handlers

      const wrapped = { ...handlers }

      for (const key of moveKeys) {
        const original = wrapped[key]
        if (typeof original !== 'function') continue
        wrapped[key] = (...args: any[]) => {
          movePendingArgsRef.current[index] = args
          if (moveRafIdRef.current[index] != null) return
          moveRafIdRef.current[index] = requestAnimationFrame(() => {
            moveRafIdRef.current[index] = null
            const pending = movePendingArgsRef.current[index]
            if (!pending) return
            movePendingArgsRef.current[index] = null
            original(...pending)
          })
        }
      }

      const wrapAfter = (
        key: string,
        callback: ((event: GestureResponderEvent) => void) | undefined
      ) => {
        if (!callback) return
        const original = wrapped[key]
        wrapped[key] = (...args: any[]) => {
          original?.(...args)
          callback(args[0])
        }
      }

      const wrapBefore = (
        key: string,
        callback: ((event: GestureResponderEvent) => void) | undefined
      ) => {
        if (!callback) return
        const original = wrapped[key]
        wrapped[key] = (...args: any[]) => {
          callback(args[0])
          original?.(...args)
        }
      }

      for (const key of startKeys) {
        wrapAfter(key, () => {
          dragStartedRef.current[index] = false
          dragStartValueRef.current[index] = getCurrentValue()
        })
      }

      for (const key of moveKeys) {
        wrapBefore(key, event => {
          if (!dragStartedRef.current[index]) {
            dragStartedRef.current[index] = true
            onDragStart?.(event, dragStartValueRef.current[index] ?? getCurrentValue())
          }
        })
      }

      const emitEnd = (event: GestureResponderEvent) => {
        if (dragStartedRef.current[index]) {
          dragStartedRef.current[index] = false
          delete dragStartValueRef.current[index]
          onDragEnd?.(event, getCurrentValue())
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
    [getCurrentValue, onDragStart, onDragEnd]
  )

  const values = state.values as number[]

  const percentFromValue = React.useCallback(
    (value: number) => ((value - resolvedMin) / scope) * 100,
    [resolvedMin, scope]
  )

  const thumbPercents = React.useMemo(
    () => values.map(value => percentFromValue(value ?? resolvedMin)),
    [values, percentFromValue, resolvedMin]
  )

  const thumbVisualPercents = React.useMemo(
    () =>
      thumbPercents.map(percent =>
        orientation === 'vertical'
          ? reverse
            ? percent
            : 100 - percent
          : reverseX
            ? 100 - percent
            : percent
      ),
    [thumbPercents, orientation, reverse, reverseX]
  )

  const activeRange = React.useMemo(() => {
    const first = thumbVisualPercents[0] ?? 0
    const second = thumbVisualPercents[1] ?? first

    if (range && thumbVisualPercents.length > 1) {
      const start = Math.min(first, second)
      const end = Math.max(first, second)
      return { offset: start, size: end - start }
    }

    const minAtStart = orientation === 'horizontal' ? !reverseX : reverse
    return minAtStart
      ? { offset: 0, size: first }
      : { offset: first, size: 100 - first }
  }, [orientation, range, reverse, reverseX, thumbVisualPercents])

  const positionKey = React.useMemo(
    () => orientation === 'vertical' ? 'top' : 'left',
    [orientation]
  )
  const sizeKey = React.useMemo(
    () => orientation === 'vertical' ? 'height' : 'width',
    [orientation]
  )

  const activeTrackStyle: ViewStyle = React.useMemo(
    () =>
      ({
        ...(orientation === 'vertical' ? { left: 0, width: '100%' } : { top: 0, height: '100%' }),
        [sizeKey]: `${Math.max(activeRange.size, 0)}%`,
        [positionKey]: `${Math.max(activeRange.offset, 0)}%`,
        backgroundColor: resolvedActiveColor,
      }) as ViewStyle,
    [activeRange.offset, activeRange.size, orientation, positionKey, resolvedActiveColor, sizeKey]
  )

  const trackBaseStyle = React.useMemo(
    () =>
      orientation === 'vertical'
        ? [
          styles.trackVertical,
          {
            width: resolvedTrackHeight,
            backgroundColor: resolvedInactiveColor,
            alignSelf: 'center' as const,
          },
        ]
        : [styles.trackHorizontal, { height: resolvedTrackHeight, backgroundColor: resolvedInactiveColor }],
    [orientation, resolvedTrackHeight, resolvedInactiveColor]
  )

  const trackBaseCombinedStyle = React.useMemo(
    () => [styles.trackBase, ...trackBaseStyle],
    [trackBaseStyle]
  )

  const isButtonFunction = typeof button === 'function'
  const thumbContentMap = React.useMemo(() => {
    const currentValue = isButtonFunction ? formatOutput(state.values) : undefined
    const shared =
      isButtonFunction
        ? button({ value: currentValue! })
        : button ?? thumb
    const leftContent = leftButton ?? leftThumb ?? shared
    const rightContent = rightButton ?? rightThumb ?? shared
    return {
      single: shared,
      left: leftContent,
      right: rightContent,
    }
  }, [
    isButtonFunction,
    button,
    thumb,
    leftButton,
    leftThumb,
    rightButton,
    rightThumb,
    formatOutput,
    state.values,
  ])

  const webGestureStyle = React.useMemo(() => {
    if (Platform.OS !== 'web') return undefined
    const touchAction = orientation === 'horizontal' ? 'pan-y' : 'none'
    return { touchAction, userSelect: 'none' } as any
  }, [orientation])

  const resolveThumbContent = React.useCallback(
    (index: number, total: number) => {
      if (total > 1) {
        return index === 0 ? thumbContentMap.left : thumbContentMap.right
      }
      return thumbContentMap.single
    },
    [thumbContentMap]
  )

  return (
    <View
      style={[
        styles.container,
        orientation === 'vertical' && styles.verticalContainer,
        disabled && { opacity: tokens.states.disabledOpacity },
        style,
      ]}
      onLayout={containerOnLayout}
      {...rest}
    >
      <View style={[styles.trackWrapper, orientation === 'vertical' && styles.trackWrapperVertical]}>
        <Pressable
          ref={trackRef}
          {...(trackProps as any)}
          onPress={handleTrackPress}
          disabled={ariaDisabled}
          onLayout={(event: LayoutChangeEvent) => {
            handleTrackLayout(event)
              ; (trackProps as any)?.onLayout?.(event)
          }}
          style={[
            styles.trackPressable,
            orientation === 'vertical' && styles.trackPressableVertical,
            webGestureStyle,
            (trackProps as any)?.style,
          ]}
        >
          <View style={trackBaseCombinedStyle}>
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
    paddingVertical: 12,
  },
  verticalContainer: {
    height: '100%',
    minHeight: 150,
    width: 40,
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
    borderRadius: 999,
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
    borderRadius: 999,
  },
  thumb: {
    position: 'absolute',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  thumbWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultThumb: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
})

Slider.displayName = 'Slider'

export default Slider
