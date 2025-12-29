import { useSlider, useSliderThumb } from '@react-native-aria/slider'
import { isRTL } from '@react-native-aria/utils'
import { useSliderState } from '@react-stately/slider'
import React from 'react'
import type { GestureResponderEvent, LayoutChangeEvent, PanResponderGestureState, ViewStyle } from 'react-native'
import { Animated, PanResponder, Pressable, StyleSheet, View } from 'react-native'

import type { SliderProps, SliderValue } from './types'
import { useSliderTokens } from './tokens'

const INITIAL_TRACK_LAYOUT = { width: 1, height: 1, x: 0, y: 0 }

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
  thumbBackgroundColor: string
  thumbElevation: number
  indicatorSize: number
  indicatorColor: string
  content: React.ReactNode
  visualPercent: number
  animatedPercent: Animated.Value
  onPanMove: (index: number, event: GestureResponderEvent, gestureState: PanResponderGestureState) => void
  onPanGrant: (index: number, event: GestureResponderEvent, gestureState: PanResponderGestureState) => void
  onPanEnd: (index: number, event: GestureResponderEvent, gestureState: PanResponderGestureState) => void
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
  thumbBackgroundColor,
  thumbElevation,
  indicatorSize,
  indicatorColor,
  content,
  visualPercent,
  animatedPercent,
  onPanGrant,
  onPanMove,
  onPanEnd,
}) => {
  const inputRef = React.useRef(null)
  const { inputProps } = useSliderThumb(
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

  const panResponder = React.useMemo(
    () => PanResponder.create({
      onStartShouldSetPanResponder: () => !isDisabled,
      onMoveShouldSetPanResponder: () => !isDisabled,
      onPanResponderGrant: (event, gestureState) => onPanGrant(index, event, gestureState),
      onPanResponderMove: (event, gestureState) => onPanMove(index, event, gestureState),
      onPanResponderRelease: (event, gestureState) => onPanEnd(index, event, gestureState),
      onPanResponderTerminate: (event, gestureState) => onPanEnd(index, event, gestureState),
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
    }),
    [index, isDisabled, onPanEnd, onPanGrant, onPanMove]
  )

  const axisKey = React.useMemo(
    () => orientation === 'vertical' ? 'top' : 'left',
    [orientation]
  )
  const crossAxisKey = React.useMemo(
    () => orientation === 'vertical' ? 'left' : 'top',
    [orientation]
  )

  const axisLength = React.useMemo(
    () => orientation === 'vertical' ? trackLayout.height : trackLayout.width,
    [orientation, trackLayout.height, trackLayout.width]
  )

  const mainAxisTranslate = React.useMemo(
    () => Animated.add(Animated.multiply(animatedPercent, axisLength), -size / 2),
    [animatedPercent, axisLength, size]
  )

  const thumbStyle: ViewStyle = React.useMemo(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      borderColor: activeColor,
      [axisKey]: axisLength > 1 ? 0 : `${visualPercent}%`,
      [crossAxisKey]: '50%',
      transform:
        axisLength > 1
          ? orientation === 'vertical'
            ? [{ translateX: -size / 2 }, { translateY: mainAxisTranslate }]
            : [{ translateX: mainAxisTranslate }, { translateY: -size / 2 }]
          : [{ translateX: -size / 2 }, { translateY: -size / 2 }],
    }),
    [size, activeColor, axisKey, axisLength, crossAxisKey, mainAxisTranslate, orientation, visualPercent]
  )

  const accessibilityProps = React.useMemo(
    () => createAccessibilityProps(inputProps),
    [inputProps]
  )

  return (
    <Animated.View
      {...panResponder.panHandlers}
      {...accessibilityProps}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      style={[
        content ? styles.thumbWrapper : styles.thumb,
        !content
          ? { backgroundColor: thumbBackgroundColor, elevation: thumbElevation }
          : null,
        thumbStyle,
      ]}
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
    </Animated.View>
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
  const trackWindowRef = React.useRef(INITIAL_TRACK_LAYOUT)

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

  const isControlled = valueProp !== undefined
  const ariaDisabled = disabled || readOnly || (isControlled && !onChange && !onChangeAfter)
  const resolvedActiveColor = activeColor ?? tokens.colors.active
  const resolvedInactiveColor = inactiveColor ?? tokens.colors.inactive
  const scope = Math.max(resolvedMax - resolvedMin, 0.00001)

  const normalized = React.useMemo(
    () => normalizeValue(valueProp, range, resolvedMin, resolvedMax),
    [valueProp, range, resolvedMin, resolvedMax]
  )
  const shouldKeepFullyControlled =
    isControlled && !onChange && !onChangeAfter && !onDragStart && !onDragEnd

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

  const isSyncingFromPropRef = React.useRef(false)
  const hasPendingUserChangeRef = React.useRef(false)
  const isInteractingRef = React.useRef(false)
  const lastExternalKeyRef = React.useRef<string | null>(
    isControlled && !shouldKeepFullyControlled ? normalized.join('|') : null
  )

  const state = useSliderState({
    minValue: resolvedMin,
    maxValue: resolvedMax,
    step: resolvedStep,
    isDisabled: ariaDisabled,
    numberFormatter,
    orientation,
    value: shouldKeepFullyControlled ? normalized : undefined,
    defaultValue: shouldKeepFullyControlled ? undefined : normalized,
    onChange: values => {
      if (isSyncingFromPropRef.current) return
      hasPendingUserChangeRef.current = true
      onChange?.(formatOutput(values))
    },
    onChangeEnd: values => {
      if (isSyncingFromPropRef.current) return
      onChangeAfter?.(formatOutput(values))
    },
  })

  React.useEffect(() => {
    if (!isControlled || shouldKeepFullyControlled) return
    if (isInteractingRef.current) return

    const externalKey = normalized.join('|')
    const lastExternalKey = lastExternalKeyRef.current
    lastExternalKeyRef.current = externalKey

    if (externalKey === lastExternalKey && hasPendingUserChangeRef.current) {
      return
    }

    const setThumbValue = (state as any)?.setThumbValue as
      | ((index: number, value: number) => void)
      | undefined
    if (typeof setThumbValue !== 'function') {
      hasPendingUserChangeRef.current = false
      return
    }

    const nextValues = normalized
    const currentValues = state.values as number[]
    const needsSync =
      nextValues.length !== currentValues.length ||
      nextValues.some((v, i) => v !== currentValues[i])
    if (!needsSync) {
      hasPendingUserChangeRef.current = false
      return
    }

    isSyncingFromPropRef.current = true
    for (let i = 0; i < nextValues.length; i += 1) {
      setThumbValue(i, nextValues[i]!)
    }
    Promise.resolve().then(() => {
      isSyncingFromPropRef.current = false
      hasPendingUserChangeRef.current = false
    })
  }, [isControlled, normalized, shouldKeepFullyControlled, state])

  const [trackLayout, setTrackLayout] = React.useState(INITIAL_TRACK_LAYOUT)

  const handleTrackLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { layout } = event.nativeEvent
    const width = Math.max(layout.width, 1)
    const height = Math.max(layout.height, 1)
    if (!isInteractingRef.current) {
      setTrackLayout(prev => ({ ...prev, width, height }))
    }

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
        trackWindowRef.current = measured
        if (!isInteractingRef.current) {
          setTrackLayout(measured)
        }
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

  const dragStartedRef = React.useRef<Record<number, boolean>>({})
  const dragStartValueRef = React.useRef<Record<number, SliderValue>>({})
  const dragPointerOffsetPxRef = React.useRef<Record<number, number>>({})
  const dragValuesRef = React.useRef<number[]>([])
  const rafOnChangeIdRef = React.useRef<number | null>(null)
  const pendingOnChangeValuesRef = React.useRef<number[] | null>(null)

  React.useEffect(() => () => {
    if (rafOnChangeIdRef.current != null) {
      cancelAnimationFrame(rafOnChangeIdRef.current)
      rafOnChangeIdRef.current = null
      pendingOnChangeValuesRef.current = null
    }
  }, [])

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

  const visualPercentsRef = React.useRef<number[]>([])
  const animatedPercentsRef = React.useRef<Animated.Value[]>([])
  const activeOffsetAnimRef = React.useRef(new Animated.Value(0))
  const activeSizeAnimRef = React.useRef(new Animated.Value(0))

  const computeActiveRangeFromVisualPercents = React.useCallback((percents: number[]) => {
    const first = percents[0] ?? 0
    const second = percents[1] ?? first

    if (range && percents.length > 1) {
      const start = Math.min(first, second)
      const end = Math.max(first, second)
      return { offset: start, size: end - start }
    }

    const minAtStart = orientation === 'horizontal' ? !reverseX : reverse
    return minAtStart
      ? { offset: 0, size: first }
      : { offset: first, size: 100 - first }
  }, [orientation, range, reverse, reverseX])

  const activeRange = React.useMemo(
    () => computeActiveRangeFromVisualPercents(thumbVisualPercents),
    [computeActiveRangeFromVisualPercents, thumbVisualPercents]
  )

  if (animatedPercentsRef.current.length !== values.length) {
    const next = animatedPercentsRef.current.slice(0, values.length)
    for (let i = next.length; i < values.length; i += 1) {
      next[i] = new Animated.Value((thumbVisualPercents[i] ?? 0) / 100)
    }
    animatedPercentsRef.current = next
  }

  const syncVisualsFromState = React.useCallback(() => {
    if (isInteractingRef.current) return
    const nextVisualPercents = thumbVisualPercents.slice()
    visualPercentsRef.current = nextVisualPercents
    for (let i = 0; i < nextVisualPercents.length; i += 1) {
      animatedPercentsRef.current[i]?.setValue((nextVisualPercents[i] ?? 0) / 100)
    }
    const nextActive = computeActiveRangeFromVisualPercents(nextVisualPercents)
    activeOffsetAnimRef.current.setValue(nextActive.offset / 100)
    activeSizeAnimRef.current.setValue(nextActive.size / 100)
  }, [computeActiveRangeFromVisualPercents, thumbVisualPercents])

  React.useEffect(() => {
    syncVisualsFromState()
  }, [syncVisualsFromState])

  const updateActiveAnimated = React.useCallback(() => {
    const nextActive = computeActiveRangeFromVisualPercents(visualPercentsRef.current)
    activeOffsetAnimRef.current.setValue(nextActive.offset / 100)
    activeSizeAnimRef.current.setValue(nextActive.size / 100)
  }, [computeActiveRangeFromVisualPercents])

  const getVisualPercentFromValue = React.useCallback((value: number) => {
    const percent = percentFromValue(value)
    return orientation === 'vertical'
      ? reverse
        ? percent
        : 100 - percent
      : reverseX
        ? 100 - percent
        : percent
  }, [orientation, percentFromValue, reverse, reverseX])

  const getValueFromVisualPercent = React.useCallback((visualPercent: number) => {
    const valuePercent =
      orientation === 'vertical'
        ? reverse
          ? visualPercent
          : 100 - visualPercent
        : reverseX
          ? 100 - visualPercent
          : visualPercent

    const raw = resolvedMin + (valuePercent / 100) * scope
    const stepped = resolvedMin + Math.round((raw - resolvedMin) / resolvedStep) * resolvedStep
    return clampValue(stepped, resolvedMin, resolvedMax)
  }, [orientation, resolvedMax, resolvedMin, resolvedStep, reverse, reverseX, scope])

  const getFingerPositionPx = React.useCallback((
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const currentLayout = trackWindowRef.current
    const native: any = event.nativeEvent
    const absX =
      typeof native.pageX === 'number'
        ? native.pageX
        : Number.isFinite(gestureState?.moveX)
          ? gestureState.moveX
          : undefined
    const absY =
      typeof native.pageY === 'number'
        ? native.pageY
        : Number.isFinite(gestureState?.moveY)
          ? gestureState.moveY
          : undefined

    if (orientation === 'vertical') {
      if (typeof absY !== 'number') return null
      return absY - currentLayout.y
    }

    if (typeof absX !== 'number') return null
    return absX - currentLayout.x
  }, [orientation])

  const getVisualPercentFromGesture = React.useCallback((
    index: number,
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    const currentLayout = trackWindowRef.current
    const axisLength = orientation === 'vertical' ? currentLayout.height : currentLayout.width
    const fingerPx = getFingerPositionPx(event, gestureState)
    if (fingerPx == null) return 0

    const offset = dragPointerOffsetPxRef.current[index] ?? 0
    const desiredCenterPx = fingerPx - offset
    const percent = (desiredCenterPx / Math.max(axisLength, 1)) * 100
    return Math.max(0, Math.min(100, percent))
  }, [getFingerPositionPx, orientation])

  const refreshTrackWindowLayout = React.useCallback(() => {
    const node = trackRef.current as any
    if (!node || typeof node.measureInWindow !== 'function') return
    node.measureInWindow((x: number, y: number, width: number, height: number) => {
      trackWindowRef.current = {
        width: Math.max(width, 1),
        height: Math.max(height, 1),
        x,
        y,
      }
    })
  }, [])

  const scheduleOnChange = React.useCallback((nextValues: number[]) => {
    if (!onChange) return
    pendingOnChangeValuesRef.current = nextValues
    if (rafOnChangeIdRef.current != null) return
    rafOnChangeIdRef.current = requestAnimationFrame(() => {
      rafOnChangeIdRef.current = null
      const pending = pendingOnChangeValuesRef.current
      pendingOnChangeValuesRef.current = null
      if (!pending) return
      onChange(formatOutput(pending))
    })
  }, [formatOutput, onChange])

  const handlePanGrant = React.useCallback((
    index: number,
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (ariaDisabled) return
    refreshTrackWindowLayout()
    isInteractingRef.current = true
    dragStartedRef.current[index] = false

    const startValues = (state.values as number[]).slice()
    dragValuesRef.current = startValues
    visualPercentsRef.current = startValues.map(v => getVisualPercentFromValue(v ?? resolvedMin))
    dragStartValueRef.current[index] = formatOutput(startValues)

    const native: any = event.nativeEvent
    const locationAxis =
      orientation === 'vertical'
        ? typeof native.locationY === 'number' ? native.locationY : undefined
        : typeof native.locationX === 'number' ? native.locationX : undefined
    dragPointerOffsetPxRef.current[index] =
      typeof locationAxis === 'number'
        ? locationAxis - resolvedThumbSize / 2
        : 0

    updateActiveAnimated()
  }, [
    ariaDisabled,
    formatOutput,
    getVisualPercentFromValue,
    orientation,
    refreshTrackWindowLayout,
    resolvedMin,
    resolvedThumbSize,
    state.values,
    updateActiveAnimated,
  ])

  const handlePanMove = React.useCallback((
    index: number,
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (ariaDisabled) return
    if (!dragValuesRef.current.length) {
      dragValuesRef.current = (state.values as number[]).slice()
    }

    if (!dragStartedRef.current[index]) {
      dragStartedRef.current[index] = true
      onDragStart?.(
        event,
        dragStartValueRef.current[index] ?? formatOutput(dragValuesRef.current)
      )
    }

    const nextVisualPercent = getVisualPercentFromGesture(index, event, gestureState)
    let nextValue = getValueFromVisualPercent(nextVisualPercent)

    if (range && dragValuesRef.current.length > 1) {
      const otherIndex = index === 0 ? 1 : 0
      const otherValue = dragValuesRef.current[otherIndex] ?? resolvedMin
      nextValue =
        index === 0
          ? clampValue(nextValue, resolvedMin, otherValue)
          : clampValue(nextValue, otherValue, resolvedMax)
    }

    dragValuesRef.current[index] = nextValue

    const nextVisual = getVisualPercentFromValue(nextValue)
    visualPercentsRef.current[index] = nextVisual
    animatedPercentsRef.current[index]?.setValue(nextVisual / 100)
    updateActiveAnimated()

    scheduleOnChange(dragValuesRef.current.slice())
  }, [
    animatedPercentsRef,
    ariaDisabled,
    getValueFromVisualPercent,
    getVisualPercentFromGesture,
    getVisualPercentFromValue,
    range,
    resolvedMax,
    resolvedMin,
    scheduleOnChange,
    state.values,
    updateActiveAnimated,
  ])

  const handlePanEnd = React.useCallback((
    index: number,
    event: GestureResponderEvent,
    _gestureState: PanResponderGestureState
  ) => {
    if (ariaDisabled) return
    isInteractingRef.current = false

    if (rafOnChangeIdRef.current != null) {
      cancelAnimationFrame(rafOnChangeIdRef.current)
      rafOnChangeIdRef.current = null
      pendingOnChangeValuesRef.current = null
    }

    const finalValues =
      dragValuesRef.current.length
        ? dragValuesRef.current.slice()
        : (state.values as number[]).slice()

    if (dragStartedRef.current[index]) {
      dragStartedRef.current[index] = false
      delete dragStartValueRef.current[index]
      onDragEnd?.(event, formatOutput(finalValues))
    }

    onChange?.(formatOutput(finalValues))

    const setThumbValue = (state as any)?.setThumbValue as
      | ((i: number, value: number) => void)
      | undefined
    if (typeof setThumbValue === 'function') {
      isSyncingFromPropRef.current = true
      for (let i = 0; i < finalValues.length; i += 1) {
        setThumbValue(i, finalValues[i]!)
      }
      Promise.resolve().then(() => {
        isSyncingFromPropRef.current = false
      })
    }

    onChangeAfter?.(formatOutput(finalValues))

    dragValuesRef.current = []
    delete dragPointerOffsetPxRef.current[index]
  }, [ariaDisabled, formatOutput, onChange, onChangeAfter, onDragEnd, state])

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

  const axisLengthPx = orientation === 'vertical' ? trackLayout.height : trackLayout.width
  const canUseAnimatedLayout = axisLengthPx > 1

  const animatedActiveStyle = React.useMemo(() => {
    if (!canUseAnimatedLayout) return undefined
    const activeOffset = activeOffsetAnimRef.current
    const activeSize = activeSizeAnimRef.current

    const translateForCenterScale = Animated.multiply(
      Animated.add(activeSize, -1),
      axisLengthPx / 2
    )
    const translate = Animated.add(
      Animated.multiply(activeOffset, axisLengthPx),
      translateForCenterScale
    )

    return {
      ...(orientation === 'vertical'
        ? { left: 0, width: '100%', top: 0, height: axisLengthPx }
        : { top: 0, height: '100%', left: 0, width: axisLengthPx }),
      backgroundColor: resolvedActiveColor,
      transform:
        orientation === 'vertical'
          ? [{ translateY: translate }, { scaleY: activeSize }]
          : [{ translateX: translate }, { scaleX: activeSize }],
    } as any
  }, [axisLengthPx, canUseAnimatedLayout, orientation, resolvedActiveColor])

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
        { paddingVertical: tokens.spacing.containerPaddingVertical },
        orientation === 'vertical' && styles.verticalContainer,
        orientation === 'vertical' && {
          minHeight: tokens.layout.verticalMinHeight,
          width: tokens.layout.verticalWidth,
        },
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
        <View style={[styles.trackBase, { borderRadius: tokens.track.radius }, ...trackBaseStyle]}>
          {canUseAnimatedLayout
            ? <Animated.View style={[styles.active, { borderRadius: tokens.track.radius }, animatedActiveStyle]} />
            : <View style={[styles.active, { borderRadius: tokens.track.radius }, activeTrackStyle]} />}
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
            thumbBackgroundColor={tokens.colors.thumbBackground}
            thumbElevation={tokens.thumb.elevation}
            indicatorSize={tokens.thumb.indicatorSize}
            indicatorColor={tokens.colors.thumbIndicator}
            content={resolveThumbContent(index, values.length)}
            visualPercent={thumbVisualPercents[index] ?? 0}
            animatedPercent={animatedPercentsRef.current[index]!}
            onPanGrant={handlePanGrant}
            onPanMove={handlePanMove}
            onPanEnd={handlePanEnd}
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
