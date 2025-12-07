import React from 'react'
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  type PanResponderGestureState,
} from 'react-native'

import Loading from '../loading'
import { usePickerTokens } from './tokens'
import type { PickerColumnProps, PickerOption, PickerProps, PickerValue } from './types'
import {
  findEnabledIndex,
  normalizePicker,
  prepareColumns,
  shallowEqualArray,
  toArrayValue,
  type PreparedPickerColumns,
} from './utils'
import { adjustIndex, clamp, indexToOffset, offsetToIndex, shouldMomentum, momentumTarget } from './core'

const getVisibleCount = (count: number) => {
  const normalized = Number.isFinite(count) ? Math.max(3, Math.floor(count)) : 5
  return normalized % 2 === 0 ? normalized + 1 : normalized
}

type WheelPickerRender<T> = (item: T | null, index: number) => React.ReactNode

type WheelPickerProps<T> = {
  data: T[]
  selectedIndex: number
  onChange: (index: number) => void
  renderItem: WheelPickerRender<T>
  itemHeight: number
  visibleRest: number
  readOnly?: boolean
  indicatorColor: string
  decelerationRate?: 'normal' | 'fast' | number
  scrollEventThrottle?: number
  disableRemoveClippedSubviewsOnWeb?: boolean
  debug?: boolean
}

const GradientMask: React.FC<{
  height: number
  color: string
  position: 'top' | 'bottom'
}> = ({ height, color, position }) => {
  const steps = [0.9, 0.6, 0.3, 0]
  const isWeb = Platform.OS === 'web'
  const baseStyle = [
    styles.gradientMask,
    { height },
    position === 'top' ? { top: 0 } : { bottom: 0 },
  ]

  if (isWeb) {
    const angle = position === 'top' ? '180deg' : '0deg'
    return <View pointerEvents="none" style={[...baseStyle, { backgroundImage: `linear-gradient(${angle}, ${color}, transparent)` }]} />
  }

  return (
    <View pointerEvents="none" style={baseStyle}>
      {steps.map((opacity, idx) => (
        <View key={idx} style={{ flex: 1, backgroundColor: color, opacity }} />
      ))}
    </View>
  )
}

const WheelPicker = React.memo(<T,>({
  data,
  selectedIndex,
  onChange,
  renderItem,
  itemHeight,
  visibleRest,
  readOnly,
  indicatorColor,
  decelerationRate = 'fast',
  scrollEventThrottle = 16,
  disableRemoveClippedSubviewsOnWeb = false,
  debug = false,
}: WheelPickerProps<T>) => {
  const offset = React.useRef(new Animated.Value(0)).current
  const useNativeDriver = Platform.OS !== 'web'
  const startOffsetRef = React.useRef(0)
  const startTimeRef = React.useRef(0)
  const wheelLock = React.useRef(false)
  const decayAnimRef = React.useRef<Animated.CompositeAnimation | null>(null)

  const total = data.length
  const minOffset = -Math.max(0, total - 1) * itemHeight
  const animatedIndex = React.useMemo(
    () => Animated.divide(Animated.multiply(offset, -1), itemHeight),
    [offset, itemHeight],
  )

  const computeIndex = React.useCallback(
    (rawOffset: number) => offsetToIndex(rawOffset, itemHeight, total, data as any),
    [data, itemHeight, total],
  )

  const getOffsetValue = React.useCallback(() => {
    const val = (offset as any).__getValue?.()
    return typeof val === 'number' ? val : 0
  }, [offset])

  const snapToIndex = React.useCallback(
    (index: number, animated: boolean, emitChange = true) => {
      const nextIndex = adjustIndex(clamp(index, 0, total - 1), data as any)
      const toValue = indexToOffset(nextIndex, itemHeight)
      if (animated) {
        Animated.spring(offset, {
          toValue,
          speed: 28,
          bounciness: 0,
          useNativeDriver,
        }).start(({ finished }) => {
          if (!finished || !emitChange) return
          const { index: realIndex } = computeIndex(toValue)
          if (realIndex !== selectedIndex) onChange(realIndex)
        })
      } else {
        offset.setValue(toValue)
        if (emitChange) {
          const { index: realIndex } = computeIndex(toValue)
          if (realIndex !== selectedIndex) onChange(realIndex)
        }
      }
    },
    [computeIndex, data, itemHeight, offset, onChange, selectedIndex, total, useNativeDriver],
  )

  React.useEffect(() => {
    if (!Number.isFinite(selectedIndex)) return
    snapToIndex(selectedIndex, false, false)
  }, [selectedIndex, snapToIndex])

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !readOnly,
        onMoveShouldSetPanResponder: () => !readOnly,
        onPanResponderGrant: () => {
          offset.stopAnimation(value => {
            const v = typeof value === 'number' ? value : getOffsetValue()
            startOffsetRef.current = v
            startTimeRef.current = Date.now()
            wheelLock.current = true
            decayAnimRef.current?.stop()
          })
        },
        onPanResponderMove: (_, gesture) => {
          if (readOnly) return
          const next = clamp(startOffsetRef.current + gesture.dy, minOffset, 0)
          offset.setValue(next)
        },
        onPanResponderRelease: (_, gesture: PanResponderGestureState) => {
          if (readOnly) return
          const duration = Date.now() - startTimeRef.current
          const distance = gesture.dy
          let targetOffset = clamp(startOffsetRef.current + distance, minOffset, 0)
          if (shouldMomentum(distance, duration)) {
            targetOffset = momentumTarget(distance, duration, startOffsetRef.current, itemHeight, minOffset)
          }
          const current = getOffsetValue()
          const velocity = gesture.vy
          const { index } = computeIndex(targetOffset)
          if (index !== selectedIndex) onChange(index)

          // 避免在边界继续惯性导致闪烁
          const atTop = current >= 0 && velocity > 0
          const atBottom = current <= minOffset && velocity < 0
          if (atTop || atBottom) {
            snapToIndex(index, true, false)
            wheelLock.current = false
            return
          }

          decayAnimRef.current?.stop()
          decayAnimRef.current = Animated.decay(offset, {
            velocity,
            deceleration: 0.99,
            useNativeDriver,
          })
          decayAnimRef.current.start(({ finished }) => {
            if (!finished) return
            const { index: finalIndex } = computeIndex(getOffsetValue())
            if (finalIndex !== selectedIndex) onChange(finalIndex)
            snapToIndex(finalIndex, true, false)
          })
          wheelLock.current = false
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderTerminate: () => snapToIndex(selectedIndex, true),
      }),
    [computeIndex, debug, getOffsetValue, itemHeight, minOffset, offset, readOnly, selectedIndex, snapToIndex, useNativeDriver],
  )

  const handleWheel = React.useCallback(
    (event: any) => {
      if (Platform.OS !== 'web' || readOnly || wheelLock.current) return
      const delta = event?.nativeEvent?.deltaY ?? 0
      if (!delta) return
      const direction = delta > 0 ? 1 : -1
      const { index } = computeIndex(getOffsetValue())
      const nextIndex = index + direction
      if (nextIndex !== selectedIndex) onChange(nextIndex)
      snapToIndex(nextIndex, true, false)
    },
    [computeIndex, getOffsetValue, readOnly, snapToIndex],
  )

  if (!data.length) {
    return (
      <View
        style={[styles.column, { height: itemHeight * (visibleRest * 2 + 1) }]}
        {...panResponder.panHandlers}
        // @ts-expect-error web only
        onWheel={handleWheel}
      >
        <View
          style={[
            styles.indicator,
            { height: itemHeight, top: itemHeight * visibleRest, borderColor: indicatorColor },
          ]}
          pointerEvents="none"
        />
      </View>
    )
  }

  return (
    <View
      style={[styles.column, { height: itemHeight * (visibleRest * 2 + 1) }]}
      {...panResponder.panHandlers}
      // @ts-expect-error web only
      onWheel={handleWheel}
    >
      <View
        style={[
          styles.indicator,
          { height: itemHeight, top: itemHeight * visibleRest, borderColor: indicatorColor },
        ]}
        pointerEvents="none"
      />
      <Animated.View
        style={{
          transform: [{ translateY: offset }],
        }}
        pointerEvents="none"
      >
        <View style={{ height: visibleRest * itemHeight }} />
        {data.map((item, index) => {
          const diff = Animated.subtract(index, animatedIndex)
          const opacity = diff.interpolate({
            inputRange: [-3, -2, -1, 0, 1, 2, 3],
            outputRange: [0.05, 0.15, 0.4, 1, 0.4, 0.15, 0.05],
            extrapolate: 'clamp',
          })
          const scale = diff.interpolate({
            inputRange: [-3, -2, -1, 0, 1, 2, 3],
            outputRange: [0.7, 0.82, 0.94, 1.08, 0.94, 0.82, 0.7],
            extrapolate: 'clamp',
          })
          const rotateX = diff.interpolate({
            inputRange: [-3, -2, -1, 0, 1, 2, 3],
            outputRange: ['25deg', '18deg', '10deg', '0deg', '-10deg', '-18deg', '-25deg'],
            extrapolate: 'clamp',
          })
          const translateY = diff.interpolate({
            inputRange: [-3, -2, -1, 0, 1, 2, 3],
            outputRange: [-itemHeight * 0.5, -itemHeight * 0.25, -itemHeight * 0.12, 0, itemHeight * 0.12, itemHeight * 0.25, itemHeight * 0.5],
            extrapolate: 'clamp',
          })
          return (
            <Animated.View
              key={(item as any)?.value ?? index}
              style={[
                styles.option,
                {
                  height: itemHeight,
                  opacity,
                  transform: [
                    { perspective: 800 },
                    { translateY },
                    { rotateX },
                    { scale },
                  ],
                },
              ]}
            >
              {renderItem(item, index)}
            </Animated.View>
          )
        })}
        <View style={{ height: visibleRest * itemHeight }} />
      </Animated.View>
    </View>
  )
})

const PickerColumn: React.FC<PickerColumnProps & { tokens: ReturnType<typeof usePickerTokens> }> = React.memo(
  props => {
    const {
      columnIndex,
      options,
      value,
      itemHeight,
      visibleItemCount,
      optionRender,
      getOptionTestID,
      getOptionA11yLabel,
      onSelect,
      tokens,
      readOnly,
      decelerationRate,
      scrollEventThrottle,
      disableRemoveClippedSubviewsOnWeb,
      debug,
    } = props
    const restVisible = Math.max(1, Math.floor((visibleItemCount - 1) / 2))

    const selectedIndex = React.useMemo(() => {
      if (!options.length) return 0
      const idx = options.findIndex(option => option.value === value)
      return findEnabledIndex(options, idx >= 0 ? idx : 0)
    }, [options, value])

    const handleChange = React.useCallback(
      (index: number) => {
        const target = findEnabledIndex(options, index)
        const option = options[target]
        if (!option || option.disabled) return
        onSelect(option, columnIndex, target)
      },
      [columnIndex, onSelect, options],
    )

    return (
      <View style={[styles.column, { height: itemHeight * visibleItemCount }]}>
        <WheelPicker
          data={options}
          itemHeight={itemHeight}
          visibleRest={restVisible}
          selectedIndex={Math.max(0, selectedIndex)}
          onChange={handleChange}
          readOnly={readOnly}
          indicatorColor={tokens.colors.indicator}
          decelerationRate={decelerationRate}
          scrollEventThrottle={scrollEventThrottle}
          disableRemoveClippedSubviewsOnWeb={disableRemoveClippedSubviewsOnWeb}
          debug={debug}
          renderItem={item => {
            if (!item) return null
            const active = item.value === value
            const disabled = !!item.disabled
            const textColor = disabled
              ? tokens.colors.textDisabled
              : active
                ? tokens.colors.text
                : tokens.colors.textMuted
            const content = optionRender ? optionRender(item, { columnIndex, active }) : item.label ?? item.value
            const testID = getOptionTestID?.(item, { columnIndex, active })
            const a11yLabel = getOptionA11yLabel?.(item, { columnIndex, active })
            return (
              <View
                style={{
                  opacity: disabled ? 0.5 : 1,
                  minHeight: itemHeight,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                testID={testID}
                accessible={!!a11yLabel}
                accessibilityLabel={a11yLabel}
              >
                {typeof content === 'string' || typeof content === 'number' ? (
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.optionText,
                      {
                        color: textColor,
                        fontSize: tokens.typography.optionSize,
                        fontFamily: tokens.typography.fontFamily,
                        fontWeight: tokens.typography.optionWeight,
                      },
                    ]}
                  >
                    {content}
                  </Text>
                ) : (
                  content
                )}
              </View>
            )
          }}
        />
      </View>
    )
  },
  (prev, next) =>
    prev.value === next.value &&
    prev.itemHeight === next.itemHeight &&
    prev.visibleItemCount === next.visibleItemCount &&
    prev.readOnly === next.readOnly &&
    prev.decelerationRate === next.decelerationRate &&
    prev.scrollEventThrottle === next.scrollEventThrottle &&
    prev.options === next.options &&
    prev.tokens === next.tokens &&
    prev.optionRender === next.optionRender &&
    prev.getOptionTestID === next.getOptionTestID &&
    prev.getOptionA11yLabel === next.getOptionA11yLabel &&
    prev.debug === next.debug,
)

const Picker: React.FC<PickerProps> = props => {
  const tokens = usePickerTokens()
  const {
    columns = [],
    value: valueProp,
    defaultValue,
    title,
    showToolbar = tokens.defaults.showToolbar,
    toolbarPosition = tokens.defaults.toolbarPosition,
    confirmButtonText = '确定',
    cancelButtonText = '取消',
    itemHeight = tokens.defaults.itemHeight,
    visibleItemCount: visibleItemCountProp = tokens.defaults.visibleItemCount,
    loading = false,
    readOnly = false,
    decelerationRate = 'fast',
    scrollEventThrottle = 16,
    optionRender,
    getOptionTestID,
    getOptionA11yLabel,
    emitConfirmOnAutoSelect = true,
    disableRemoveClippedSubviewsOnWeb = false,
    maskColor,
    debug = false,
    onChange,
    onConfirm,
    onCancel,
    style,
    testID,
    ...rest
  } = props

  const visibleItemCount = React.useMemo(
    () => getVisibleCount(visibleItemCountProp ?? tokens.defaults.visibleItemCount),
    [tokens.defaults.visibleItemCount, visibleItemCountProp],
  )

  const isControlled = valueProp !== undefined
  const [innerValue, setInnerValue] = React.useState<PickerValue[]>(() =>
    toArrayValue(valueProp ?? defaultValue ?? []),
  )

  React.useEffect(() => {
    if (isControlled) {
      setInnerValue(toArrayValue(valueProp))
    }
  }, [isControlled, valueProp])

  const preparedColumns: PreparedPickerColumns = React.useMemo(() => prepareColumns(columns), [columns])

  const normalized = React.useMemo(() => normalizePicker(preparedColumns, innerValue), [preparedColumns, innerValue])

  React.useEffect(() => {
    if (!isControlled && !shallowEqualArray(innerValue, normalized.values)) {
      setInnerValue(normalized.values)
      onChange?.(normalized.values, normalized.options)
      if (emitConfirmOnAutoSelect) {
        onConfirm?.(normalized.values, normalized.options)
      }
    }
  }, [emitConfirmOnAutoSelect, innerValue, isControlled, normalized.options, normalized.values, onChange, onConfirm])

  const handleSelect = React.useCallback(
    (option: PickerOption, columnIndex: number) => {
      const base = [...innerValue]
      base[columnIndex] = option.value
      // 后续列需重算
      base.length = columnIndex + 1

      const next = normalizePicker(preparedColumns, base)

      if (!isControlled) {
        setInnerValue(next.values)
      }
      if (!shallowEqualArray(normalized.values, next.values)) {
        onChange?.(next.values, next.options)
      }
    },
    [innerValue, preparedColumns, isControlled, normalized.values, onChange],
  )

  const handleConfirm = React.useCallback(() => {
    onConfirm?.(normalized.values, normalized.options)
  }, [normalized.options, normalized.values, onConfirm])

  const handleCancel = React.useCallback(() => {
    onCancel?.()
  }, [onCancel])

  const renderToolbar = () => {
    if (!showToolbar) return null
    return (
      <View
        style={[
          styles.toolbar,
          {
            height: tokens.spacing.toolbarHeight,
            borderColor: tokens.colors.indicator,
            paddingHorizontal: tokens.spacing.actionPadding,
          },
        ]}
      >
        <Pressable onPress={handleCancel} accessibilityRole="button">
          <Text
            style={[
              styles.actionText,
              {
                color: tokens.colors.cancel,
                fontSize: tokens.typography.toolbarSize,
                fontFamily: tokens.typography.fontFamily,
                fontWeight: tokens.typography.toolbarWeight,
              },
            ]}
          >
            {cancelButtonText}
          </Text>
        </Pressable>
        {title ? (
          <Text
            style={[
              styles.title,
              {
                fontSize: tokens.typography.toolbarSize,
                fontFamily: tokens.typography.fontFamily,
                color: tokens.colors.text,
                fontWeight: tokens.typography.toolbarWeight,
              },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : (
          <View />
        )}
        <Pressable onPress={handleConfirm} accessibilityRole="button">
          <Text
            style={[
              styles.actionText,
              {
                color: tokens.colors.confirm,
                fontSize: tokens.typography.toolbarSize,
                fontFamily: tokens.typography.fontFamily,
                fontWeight: tokens.typography.toolbarWeight,
              },
            ]}
          >
            {confirmButtonText}
          </Text>
        </Pressable>
      </View>
    )
  }

  const wrapperHeight = itemHeight * visibleItemCount
  const maskHeight = (wrapperHeight - itemHeight) / 2
  const hasColumns = normalized.columns.length > 0

  return (
    <View {...rest} style={[styles.container, { backgroundColor: tokens.colors.background }, style]} testID={testID}>
      {toolbarPosition === 'top' ? renderToolbar() : null}
      <View style={[styles.body, { height: wrapperHeight }]}>
        <View style={styles.columns} pointerEvents={loading ? 'none' : 'auto'}>
          {hasColumns
            ? normalized.columns.map((column, columnIndex) => (
                <PickerColumn
                  key={columnIndex}
                  columnIndex={columnIndex}
                  options={column}
                  value={normalized.values[columnIndex]}
                  itemHeight={itemHeight}
                  visibleItemCount={visibleItemCount}
                  optionRender={optionRender}
                  getOptionTestID={getOptionTestID}
                  getOptionA11yLabel={getOptionA11yLabel}
                  disableRemoveClippedSubviewsOnWeb={disableRemoveClippedSubviewsOnWeb}
                  debug={debug}
                  readOnly={readOnly}
                  onSelect={handleSelect}
                  tokens={tokens}
                />
              ))
            : null}
          {hasColumns ? (
            <>
              <View
                pointerEvents="none"
                style={[
                  styles.indicator,
                  {
                    top: maskHeight,
                    height: itemHeight,
                    borderColor: tokens.colors.indicator,
                  },
                ]}
              />
              <GradientMask position="top" height={maskHeight} color={maskColor ?? tokens.colors.mask} />
              <GradientMask position="bottom" height={maskHeight} color={maskColor ?? tokens.colors.mask} />
            </>
          ) : null}
        </View>
        {loading ? (
          <View style={styles.loading}>
            <Loading />
          </View>
        ) : null}
      </View>
      {toolbarPosition === 'bottom' ? renderToolbar() : null}
    </View>
  )
}

Picker.displayName = 'Picker'

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
  },
  body: {
    position: 'relative',
    overflow: 'hidden',
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  option: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    includeFontPadding: false,
  },
  indicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  gradientMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 3,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  actionText: {
    minWidth: 44,
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
})

export default Picker
