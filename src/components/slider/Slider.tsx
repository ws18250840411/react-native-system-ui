import { useSlider, useSliderThumb } from '@react-native-aria/slider'
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

const getPositionKey = (orientation: 'horizontal' | 'vertical', reverse: boolean) => {
  if (orientation === 'vertical') {
    return reverse ? 'bottom' : 'top'
  }
  return reverse ? 'right' : 'left'
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
  reverse: boolean
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

const ThumbNode: React.FC<ThumbNodeProps> = ({
  index,
  orientation,
  reverse,
  ariaReverse,
  trackLayout,
  isDisabled,
  state,
  size,
  activeColor,
  content,
  percent,
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

  const handlers = enhanceHandlers({ ...(thumbProps ?? {}) }, index) ?? {}
  const positionKey = getPositionKey(orientation, reverse)

  const translateStyle =
    orientation === 'vertical'
      ? ([{ translateY: -size / 2 }] as ViewStyle['transform'])
      : ([{ translateX: (reverse ? 1 : -1) * size * 0.5 }] as ViewStyle['transform'])

  const thumbStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor: activeColor,
    [positionKey]: `${visualPercent}%`,
    transform: translateStyle,
  }

  return (
    <View
      {...handlers}
      {...createAccessibilityProps(inputProps)}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      style={[styles.thumb, thumbStyle]}
    >
      {content ?? <View style={styles.defaultThumb} />}
    </View>
  )
}

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
  const resolvedTrackHeight = barHeight ?? trackHeight ?? tokens.track.height
  const resolvedThumbSize = buttonSize ?? thumbSize ?? tokens.thumb.size
  const isDisabled = disabled || readOnly
  const resolvedActiveColor = activeColor ?? tokens.colors.active
  const resolvedInactiveColor = inactiveColor ?? tokens.colors.inactive
  const scope = Math.max(max - min, 0.00001)

  const normalized = React.useMemo(
    () => normalizeValue(valueProp, range, min, max),
    [valueProp, range, min, max]
  )
  const isControlled = valueProp !== undefined

  const formatOutput = React.useCallback(
    (values: readonly number[]) => toSliderValue(values, range, min),
    [range, min]
  )

  const state = useSliderState({
    minValue: min,
    maxValue: max,
    step,
    isDisabled,
    isReadOnly: readOnly,
    numberFormatter: { format: (val: number) => val },
    orientation,
    value: isControlled ? normalized : undefined,
    defaultValue: !isControlled ? normalized : undefined,
    onChange: values => onChange?.(formatOutput(values)),
    onChangeEnd: values => onChangeAfter?.(formatOutput(values)),
  })

  const ariaReverse = reverse

  const [trackLayout, setTrackLayout] = React.useState({ width: 0, height: 0, x: 0, y: 0 })

  const handleTrackLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent
    setTrackLayout({
      width: layout.width,
      height: layout.height,
      x: layout.x ?? 0,
      y: layout.y ?? 0,
    })
  }, [])

  const accessibleLabel = ariaLabel ?? 'Slider'

  const { trackProps } = useSlider(
    {
      orientation,
      isDisabled,
      isReadOnly: readOnly,
      'aria-label': accessibleLabel,
    } as any,
    state,
    trackLayout,
    ariaReverse
  )

  const dragStatusRef = React.useRef<Record<number, boolean>>({})
  const getCurrentValue = React.useCallback(() => formatOutput(state.values), [state.values, formatOutput])

  const enhanceHandlers = React.useCallback(
    (handlers: Record<string, any> | undefined, index: number) => {
      if (!handlers) return handlers
      if (!onDragStart && !onDragEnd) {
        return handlers
      }
      const wrapped = { ...handlers }

      const wrap = (
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

      wrap('onPanResponderGrant', event => {
        if (!dragStatusRef.current[index]) {
          dragStatusRef.current[index] = true
          onDragStart?.(event, getCurrentValue())
        }
      })

      const emitEnd = (event: GestureResponderEvent) => {
        if (dragStatusRef.current[index]) {
          dragStatusRef.current[index] = false
          onDragEnd?.(event, getCurrentValue())
        }
      }

      wrap('onPanResponderRelease', emitEnd)
      wrap('onPanResponderTerminate', emitEnd)

      return wrapped
    },
    [getCurrentValue, onDragStart, onDragEnd]
  )

  const values = state.values as number[]

  const percentFromValue = React.useCallback(
    (value: number) => ((value - min) / scope) * 100,
    [min, scope]
  )

  const thumbPercents = React.useMemo(
    () => values.map(value => percentFromValue(value ?? min)),
    [values, percentFromValue, min]
  )

  const thumbVisualPercents = React.useMemo(
    () =>
      thumbPercents.map(percent =>
        orientation === 'vertical'
          ? reverse
            ? percent
            : 100 - percent
          : percent
      ),
    [thumbPercents, orientation, reverse]
  )

  const trackOffsetPercent = range ? percentFromValue(values[0] ?? min) : 0
  const trackSizePercent = range
    ? percentFromValue(values[1] ?? values[0] ?? min) - trackOffsetPercent
    : percentFromValue(values[0] ?? min)

  const positionKey = getPositionKey(orientation, reverse)
  const sizeKey = orientation === 'vertical' ? 'height' : 'width'

  const activeTrackStyle: ViewStyle = React.useMemo(
    () => ({
      [sizeKey]: `${Math.max(trackSizePercent, 0)}%`,
      [positionKey]: `${Math.max(trackOffsetPercent, 0)}%`,
      backgroundColor: isDisabled ? resolvedInactiveColor : resolvedActiveColor,
    }),
    [sizeKey, positionKey, trackSizePercent, trackOffsetPercent, isDisabled, resolvedInactiveColor, resolvedActiveColor]
  )

  const trackBaseStyle =
    orientation === 'vertical'
      ? [
        styles.trackVertical,
        { width: resolvedTrackHeight, backgroundColor: resolvedInactiveColor, alignSelf: 'center' },
      ]
      : [styles.trackHorizontal, { height: resolvedTrackHeight, backgroundColor: resolvedInactiveColor }]

  const thumbContentMap = React.useMemo(() => {
    const shared = button ?? thumb
    const leftContent = leftButton ?? leftThumb ?? shared
    const rightContent = rightButton ?? rightThumb ?? shared
    return {
      single: shared,
      left: leftContent,
      right: rightContent,
    }
  }, [button, thumb, leftButton, leftThumb, rightButton, rightThumb])

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
      style={[styles.container, orientation === 'vertical' && styles.verticalContainer, style]}
      onLayout={containerOnLayout}
      {...rest}
    >
      <Pressable
        style={[
          styles.trackWrapper,
          orientation === 'vertical' && styles.trackWrapperVertical,
        ]}
        disabled={isDisabled}
        onLayout={handleTrackLayout}
        {...trackProps}
      >
        <View style={[styles.trackBase, ...trackBaseStyle]}>
          <View style={[styles.active, activeTrackStyle]} />
        </View>
      </Pressable>
      {values.map((_, index) => (
        <ThumbNode
          key={`thumb-${index}`}
          index={index}
          orientation={orientation}
          reverse={reverse}
          ariaReverse={ariaReverse}
          trackLayout={trackLayout}
          isDisabled={isDisabled}
          state={state}
          size={resolvedThumbSize}
          activeColor={resolvedActiveColor}
          content={resolveThumbContent(index, values.length)}
          visualPercent={thumbVisualPercents[index] ?? 0}
          enhanceHandlers={enhanceHandlers}
        />
      ))}
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
    height: 150,
    width: 40,
    alignItems: 'center',
    paddingVertical: 0,
  },
  trackWrapper: {
    width: '100%',
    justifyContent: 'center',
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
  defaultThumb: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
})

Slider.displayName = 'Slider'

export default Slider
