import { useSlider, useSliderThumb } from '@react-native-aria/slider'
import { isRTL } from '@react-native-aria/utils'
import { useSliderState } from '@react-stately/slider'
import React from 'react'
import type { GestureResponderEvent, LayoutChangeEvent, ViewStyle } from 'react-native'
import { Pressable, StyleSheet, View } from 'react-native'

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
    () => enhanceHandlers({ ...(thumbProps ?? {}) }, index) ?? {},
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
      style={[content ? styles.thumbWrapper : styles.thumb, thumbStyle]}
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
    setTrackLayout({
      width: Math.max(layout.width, 1),
      height: Math.max(layout.height, 1),
      x: layout.x ?? 0,
      y: layout.y ?? 0,
    })

    requestAnimationFrame(() => {
      const node = trackRef.current as any
      if (!node || typeof node.measureInWindow !== 'function') return
      node.measureInWindow((x: number, y: number, width: number, height: number) => {
        setTrackLayout({
          width: Math.max(width, 1),
          height: Math.max(height, 1),
          x,
          y,
        })
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

  const getCurrentValue = React.useCallback(() => formatOutput(state.values), [state.values, formatOutput])
  const dragStartedRef = React.useRef<Record<number, boolean>>({})
  const dragStartValueRef = React.useRef<Record<number, SliderValue>>({})

  const enhanceHandlers = React.useCallback(
    (handlers: Record<string, any> | undefined, index: number) => {
      if (!handlers) return handlers
      if (!onDragStart && !onDragEnd) {
        return handlers
      }
      const wrapped = { ...handlers }

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

      wrapAfter('onPanResponderGrant', () => {
        dragStartedRef.current[index] = false
        dragStartValueRef.current[index] = getCurrentValue()
      })

      wrapBefore('onPanResponderMove', event => {
        if (!dragStartedRef.current[index]) {
          dragStartedRef.current[index] = true
          onDragStart?.(event, dragStartValueRef.current[index] ?? getCurrentValue())
        }
      })

      const emitEnd = (event: GestureResponderEvent) => {
        if (dragStartedRef.current[index]) {
          dragStartedRef.current[index] = false
          delete dragStartValueRef.current[index]
          onDragEnd?.(event, getCurrentValue())
        }
      }

      wrapAfter('onPanResponderRelease', emitEnd)
      wrapAfter('onPanResponderTerminate', emitEnd)

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
      <Pressable
        ref={trackRef}
        {...(trackProps as any)}
        disabled={ariaDisabled}
        onLayout={(event: LayoutChangeEvent) => {
          handleTrackLayout(event)
            ; (trackProps as any)?.onLayout?.(event)
        }}
        style={[
          styles.trackWrapper,
          orientation === 'vertical' && styles.trackWrapperVertical,
          (trackProps as any)?.style,
        ]}
      >
        <View style={[styles.trackBase, ...trackBaseStyle]}>
          <View style={[styles.active, activeTrackStyle]} />
        </View>
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
            enhanceHandlers={enhanceHandlers}
          />
        ))}
      </Pressable>
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
