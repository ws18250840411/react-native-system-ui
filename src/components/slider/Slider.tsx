import React from 'react'
import {
  PanResponder,
  StyleSheet,
  View,
  Platform,
  Pressable,
  type GestureResponderEvent,
} from 'react-native'

import type { SliderProps, SliderValue } from './types'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const toArrayValue = (value: SliderValue, range: boolean): [number, number] => {
  if (!range) {
    const v = typeof value === 'number' ? value : value[0]
    return [v ?? 0, v ?? 0]
  }
  if (Array.isArray(value)) {
    const sorted: [number, number] = [...value].sort((a, b) => a - b) as [number, number]
    return sorted
  }
  return [0, typeof value === 'number' ? value : 0]
}

const formatValue = (value: SliderValue, min: number, max: number, range: boolean): SliderValue => {
  if (!range) {
    const numeric = typeof value === 'number' ? value : value[0]
    return clamp(numeric ?? 0, min, max)
  }
  const arr = toArrayValue(value, true)
  return [clamp(arr[0], min, max), clamp(arr[1], min, max)]
}

export const Slider: React.FC<SliderProps> = props => {
  const {
    value: valueProp = 0,
    min = 0,
    max = 100,
    step = 1,
    range = false,
    vertical = false,
    disabled = false,
    readOnly = false,
    reverse = false,
    activeColor = '#3f45ff',
    inactiveColor = '#e5e5e5',
    trackHeight = 2,
    thumbSize = 24,
    thumb,
    leftThumb,
    rightThumb,
    onChange,
    onChangeAfter,
    onDragStart,
    onDragEnd,
    style,
    ...rest
  } = props

  const formatted = React.useMemo(
    () => formatValue(valueProp, min, max, range),
    [valueProp, min, max, range],
  )

  const [value, setValue] = React.useState<SliderValue>(formatted)
  const valueRef = React.useRef<SliderValue>(formatted)

  const [layout, setLayout] = React.useState({ width: 0, height: 0 })
  const layoutRef = React.useRef(layout)

  React.useEffect(() => {
    setValue(formatted)
    valueRef.current = formatted
  }, [formatted])

  React.useEffect(() => {
    layoutRef.current = layout
  }, [layout])

  const trackRef = React.useRef<View>(null)

  const updateLayout = React.useCallback((width: number, height: number) => {
    layoutRef.current = { width, height }
    setLayout({ width, height })
  }, [])

  const measureTrack = React.useCallback(() => {
    trackRef.current?.measure((x, y, width, height) => {
      if (width && height) {
        updateLayout(width, height)
      }
    })
  }, [updateLayout])

  const emitChange = (next: SliderValue, event?: GestureResponderEvent) => {
    const prev = valueRef.current
    const changed = Array.isArray(next)
      ? !Array.isArray(prev) || prev[0] !== next[0] || prev[1] !== next[1]
      : Array.isArray(prev)
        ? prev[0] !== next
        : prev !== next
    if (!changed) return
    valueRef.current = Array.isArray(next) ? [...next] as SliderValue : next
    setValue(next)
    onChange?.(next)
    if (event?.persist) event.persist()
  }

  const emitEnd = React.useCallback(
    (event: GestureResponderEvent, next: SliderValue) => {
      onDragEnd?.(event, next)
      onChangeAfter?.(next)
    },
    [onDragEnd, onChangeAfter],
  )

  const getPercent = (val: number) => {
    const percent = ((val - min) / (max - min)) * 100
    return clamp(percent, 0, 100)
  }

  const getValueFromPosition = React.useCallback(
    (pageX: number, pageY: number) => {
      const layout = layoutRef.current
      const length = vertical ? layout.height : layout.width
      if (length === 0) return min
      const offset = vertical ? pageY - layout.pageY : pageX - layout.pageX
      const ratio = clamp(offset / length, 0, 1)
      const normalized = reverse ? 1 - ratio : ratio
      const raw = min + normalized * (max - min)
      const snapped = Math.round(raw / step) * step
      return clamp(snapped, min, max)
    },
    [vertical, min, max, reverse, step],
  )

  const handleMove = React.useCallback(
    (index: 0 | 1, event: GestureResponderEvent) => {
      const nextValue = getValueFromPosition(event.nativeEvent.pageX, event.nativeEvent.pageY)
      if (!range) {
        emitChange(nextValue, event)
      } else {
        const current = toArrayValue(valueRef.current, true)
        const newValues: [number, number] = [...current] as [number, number]
        newValues[index] = nextValue
        newValues.sort((a, b) => a - b)
        emitChange(newValues, event)
      }
    },
    [getValueFromPosition, range],
  )

  const buildPanResponder = React.useCallback(
    (index: 0 | 1) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled && !readOnly,
        onMoveShouldSetPanResponder: () => !disabled && !readOnly,
        onPanResponderGrant: event => {
          onDragStart?.(event, valueRef.current)
          measureTrack()
        },
        onPanResponderMove: event => handleMove(index, event),
        onPanResponderRelease: event => emitEnd(event, valueRef.current),
        onPanResponderTerminate: event => emitEnd(event, valueRef.current),
      }),
    [disabled, readOnly, onDragStart, updateLayout, handleMove, emitEnd],
  )

  const singleResponder = React.useMemo(() => buildPanResponder(0), [buildPanResponder])
  const leftResponder = React.useMemo(() => buildPanResponder(0), [buildPanResponder])
  const rightResponder = React.useMemo(() => buildPanResponder(1), [buildPanResponder])

  const getPositionStyle = (percent: number) => {
    const length = vertical ? layout.height : layout.width
    if (length > 0) {
      const px = (percent / 100) * length
      return vertical ? { bottom: px } : { left: px }
    }
    return vertical ? { bottom: 0 } : { left: 0 }
  }

  const renderThumb = (
    percent: number,
    responder: ReturnType<typeof PanResponder.create>,
    custom?: React.ReactNode,
  ) => {
    const translate = vertical
      ? [{ translateY: -(thumbSize / 2) }]
      : [{ translateX: -(thumbSize / 2) }]

    return (
      <View
        {...responder.panHandlers}
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            borderColor: activeColor,
            transform: translate,
          },
          getPositionStyle(percent),
        ]}
        pointerEvents={disabled || readOnly ? 'none' : 'auto'}
      >
        {custom ?? <View style={styles.defaultThumb} />}
      </View>
    )
  }

  const renderThumbs = () => {
    if (range) {
      const arr = toArrayValue(value, true)
      const leftPercent = getPercent(arr[0])
      const rightPercent = getPercent(arr[1])
      return (
        <>
          {renderThumb(leftPercent, leftResponder, leftThumb ?? thumb)}
          {renderThumb(rightPercent, rightResponder, rightThumb ?? thumb)}
        </>
      )
    }
    const percent = getPercent(value as number)
    return renderThumb(percent, singleResponder, thumb)
  }

  const renderActiveTrack = () => {
    if (range) {
      const arr = toArrayValue(value, true)
      const start = getPercent(arr[0])
      const end = getPercent(arr[1])
      const size = end - start
      return (
        <View
          style={[
            styles.active,
            vertical
              ? {
                  bottom: `${start}%`,
                  height: `${size}%`,
                }
              : {
                  left: `${start}%`,
                  width: `${size}%`,
                },
            { backgroundColor: disabled ? inactiveColor : activeColor },
            { height: trackHeight },
          ]}
        />
      )
    }

    const percent = getPercent(value as number)
    return (
      <View
        style={[
          styles.active,
          vertical
            ? {
                bottom: 0,
                height: `${percent}%`,
              }
            : {
                left: 0,
                width: `${percent}%`,
              },
          { backgroundColor: disabled ? inactiveColor : activeColor },
          { height: trackHeight },
        ]}
      />
    )
  }

  const trackStyle = vertical
    ? [styles.trackVertical, { width: trackHeight, backgroundColor: inactiveColor }]
    : [styles.trackHorizontal, { height: trackHeight, backgroundColor: inactiveColor }]

  return (
    <Pressable
      ref={trackRef}
      style={[styles.container, vertical && styles.vertical, style]}
      onLayout={updateLayout}
      disabled={disabled || readOnly}
      onPress={event => {
        if (disabled || readOnly) return
        updateLayout()
        const next = getValueFromPosition(event.nativeEvent.pageX, event.nativeEvent.pageY)
        if (range) {
          const arr = toArrayValue(valueRef.current, true)
          const distanceToStart = Math.abs(next - arr[0])
          const distanceToEnd = Math.abs(next - arr[1])
          const targetIndex = distanceToStart <= distanceToEnd ? 0 : 1
          const updated: [number, number] = [...arr] as [number, number]
          updated[targetIndex] = next
          updated.sort((a, b) => a - b)
          emitChange(updated)
          onChangeAfter?.(updated)
        } else {
          emitChange(next)
          onChangeAfter?.(next)
        }
      }}
      {...rest}
    >
      <View style={trackStyle}>
        {renderActiveTrack()}
      </View>
      {renderThumbs()}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 12,
  },
  vertical: {
    height: 150,
    width: 40,
    alignItems: 'center',
  },
  trackHorizontal: {
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  trackVertical: {
    height: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  active: {
    position: 'absolute',
    borderRadius: 999,
  },
  thumb: {
    position: 'absolute',
    borderWidth: Platform.OS === 'web' ? 1 : StyleSheet.hairlineWidth,
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
