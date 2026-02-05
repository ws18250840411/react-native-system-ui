import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View, Platform, StyleSheet, type ViewStyle } from 'react-native'

import { withAlpha } from '../../utils/color'
import { isFiniteNumber, isText } from '../../utils/validate'
import { usePickerTokens } from './tokens'
import WheelPicker from './WheelPicker'
import type { PickerColumnProps, PickerColumns, PickerOption, PickerProps, PickerValue } from './types'
import { findEnabledIndex, normalizePicker, prepareColumns, shallowEqualArray, toArrayValue } from './utils'

export function usePickerValue({
  columns,
  valueProp,
  defaultValue,
  emitConfirmOnAutoSelect = true,
  onChange,
  onConfirm,
}: {
  columns?: PickerColumns
  valueProp?: PickerProps['value']
  defaultValue?: PickerProps['defaultValue']
  emitConfirmOnAutoSelect?: boolean
  onChange?: PickerProps['onChange']
  onConfirm?: PickerProps['onConfirm']
}) {
  const preparedColumns = useMemo(() => prepareColumns(columns), [columns])
  const isControlled = valueProp !== undefined

  const [innerValue, setInnerValue] = useState<PickerValue[]>(() => {
    const initial = toArrayValue(valueProp ?? defaultValue)
    return normalizePicker(preparedColumns, initial).values
  })
  const innerValueRef = useRef(innerValue)

  const commitValue = useCallback((next: PickerValue[]) => {
    innerValueRef.current = next
    setInnerValue(next)
  }, [])

  useEffect(() => {
    if (!isControlled) return
    const next = toArrayValue(valueProp)
    if (!shallowEqualArray(innerValueRef.current, next)) {
      commitValue(next)
    }
  }, [commitValue, isControlled, valueProp])

  const normalized = useMemo(
    () => normalizePicker(preparedColumns, innerValue),
    [preparedColumns, innerValue]
  )

  useEffect(() => {
    if (isControlled) return
    if (!shallowEqualArray(innerValue, normalized.values)) {
      commitValue(normalized.values)
      onChange?.(normalized.values, normalized.options)
      if (emitConfirmOnAutoSelect) {
        onConfirm?.(normalized.values, normalized.options)
      }
    }
  }, [
    commitValue,
    emitConfirmOnAutoSelect,
    innerValue,
    isControlled,
    normalized,
    onChange,
    onConfirm,
  ])

  const handleSelect = useCallback(
    (option: PickerOption, columnIndex: number) => {
      const next = [...innerValueRef.current]
      next[columnIndex] = option.value

      if (preparedColumns.type === 'cascade') {
        next.length = columnIndex + 1
      }

      const final = normalizePicker(preparedColumns, next)
      if (shallowEqualArray(innerValueRef.current, final.values)) return
      commitValue(final.values)
      onChange?.(final.values, final.options)
    },
    [commitValue, onChange, preparedColumns],
  )

  const handleConfirm = useCallback(() => {
    onConfirm?.(normalized.values, normalized.options)
  }, [normalized, onConfirm])

  return {
    preparedColumns,
    normalized,
    handleSelect,
    handleConfirm,
  }
}

const getVisibleCount = (count: number) => {
  const normalized = isFiniteNumber(count) ? Math.max(3, Math.floor(count)) : 5
  return normalized % 2 === 0 ? normalized + 1 : normalized
}

const GRADIENT_OVERLAY_ALPHA = 0.25
const GRADIENT_STEPS = [0.95, 0.75, 0.55, 0.35]
const GRADIENT_STEPS_REVERSED = [...GRADIENT_STEPS].reverse()

const GradientMask: React.FC<{
  height: number
  color: string
  position: 'top' | 'bottom'
  maskType: NonNullable<PickerProps['maskType']>
}> = ({ height, color, position, maskType }) => {
  const isWeb = Platform.OS === 'web'
  const baseStyle = useMemo(
    () => [
      styles.gradientMask,
      { height },
      position === 'top' ? { top: 0 } : { bottom: 0 },
    ],
    [height, position]
  )

  const overlayColor = useMemo(() => withAlpha(color, GRADIENT_OVERLAY_ALPHA), [color])

  if (maskType === 'solid') {
    return <View pointerEvents="none" style={[...baseStyle, { backgroundColor: withAlpha(color, 0.9) }]} />
  }

  if (isWeb) {
    const angle = position === 'top' ? '180deg' : '0deg'
    const gradientStart = withAlpha(color, 0.98)
    const gradientEnd = withAlpha(color, 0.4)
    return (
      <View
        pointerEvents="none"
        style={[
          ...baseStyle,
          ({
            backgroundColor: overlayColor,
            backgroundImage: `linear-gradient(${angle}, ${gradientStart}, ${gradientEnd})`,
          } as unknown as ViewStyle),
        ]}
      />
    )
  }

  const steps = position === 'top' ? GRADIENT_STEPS : GRADIENT_STEPS_REVERSED

  return (
    <View pointerEvents="none" style={[...baseStyle, { backgroundColor: overlayColor }]}>
      {steps.map((opacity, idx) => (
        <View key={idx} style={{ flex: 1, backgroundColor: withAlpha(color, opacity) }} />
      ))}
    </View>
  )
}

const PickerColumn: React.FC<
  PickerColumnProps & {
    tokens: ReturnType<typeof usePickerTokens>
  }
> = React.memo(
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
      swipeDuration,
    } = props
    const restVisible = Math.max(1, Math.floor((visibleItemCount - 1) / 2))

    const valueIndexMap = useMemo(
      () => new Map(options.map((option, idx) => [option.value, idx] as const)),
      [options]
    )
    const selectedIndex = useMemo(() => {
      if (!options.length) return 0
      const idx = valueIndexMap.get(value as PickerValue)
      const startIndex = typeof idx === 'number' && idx >= 0 ? idx : 0
      return findEnabledIndex(options, startIndex)
    }, [options, value, valueIndexMap])

    const handleChange = useCallback((index: number) => {
      const target = findEnabledIndex(options, index)
      const option = options[target]
      if (!option || option.disabled) return
      onSelect(option, columnIndex, target)
    }, [columnIndex, onSelect, options])

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
          swipeDuration={swipeDuration}
          renderItem={(item: PickerOption, _index, meta) => {
            const active = meta?.active ?? false
            const disabled = meta?.disabled ?? false
            const textColor = disabled ? tokens.colors.textDisabled : (active ? tokens.colors.text : tokens.colors.textMuted)
            const content = optionRender ? optionRender(item, { columnIndex, active }) : item.label ?? item.value
            const testID = getOptionTestID?.(item, { columnIndex, active })
            const a11yLabel = getOptionA11yLabel?.(item, { columnIndex, active })
            return (
              <View style={[styles.option, { opacity: disabled ? 0.5 : 1, minHeight: itemHeight }]} testID={testID} accessible={!!a11yLabel} accessibilityLabel={a11yLabel}>
                {isText(content) ? (
                  <Text numberOfLines={1} style={[styles.optionText, {
                    color: textColor,
                    fontSize: tokens.typography.optionSize,
                    fontFamily: tokens.typography.fontFamily,
                    fontWeight: tokens.typography.optionWeight,
                  }]}>{content}</Text>
                ) : content}
              </View>
            )
          }}
        />
      </View>
    )
  }
)

const Picker: React.FC<PickerProps> = props => {
  const { tokensOverride } = props
  const tokens = usePickerTokens(tokensOverride)
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
    decelerationRate = Platform.select({ ios: 0.999, android: 0.997, default: 0.989 }) ?? 'normal',
    swipeDuration = tokens.defaults.swipeDuration,
    scrollEventThrottle = 16,
    columnsTop,
    columnsBottom,
    optionRender,
    getOptionTestID,
    getOptionA11yLabel,
    emitConfirmOnAutoSelect = true,
    maskColor,
    maskType = tokens.defaults.maskType,
    onChange,
    onConfirm,
    onCancel,
    style,
    testID,
    ...rest
  } = props

  const visibleItemCount = getVisibleCount(visibleItemCountProp ?? tokens.defaults.visibleItemCount)

  const { normalized, handleSelect, handleConfirm, preparedColumns } = usePickerValue({
    columns,
    valueProp,
    defaultValue,
    emitConfirmOnAutoSelect,
    onChange,
    onConfirm,
  })
  const isCascade = preparedColumns.type === 'cascade'


  const renderActionContent = useCallback((content: React.ReactNode, color: string) => {
    if (React.isValidElement(content)) return <View style={{ minWidth: 44, alignItems: 'center', justifyContent: 'center' }}>{content}</View>
    if (isText(content)) return <Text numberOfLines={1} style={[styles.actionText, {
      color,
      fontSize: tokens.typography.toolbarSize,
      fontFamily: tokens.typography.fontFamily,
      fontWeight: tokens.typography.toolbarWeight,
    }]}>{content}</Text>
    return <View style={{ minWidth: 44 }} />
  }, [tokens.typography.fontFamily, tokens.typography.toolbarSize, tokens.typography.toolbarWeight])

  const renderTitleContent = useCallback((content: React.ReactNode) => {
    if (content == null) return <View />
    if (React.isValidElement(content)) return <View style={[styles.title, { alignItems: 'center', justifyContent: 'center' }]}>{content}</View>
    return <Text style={[styles.title, {
      fontSize: tokens.typography.toolbarSize,
      fontFamily: tokens.typography.fontFamily,
      color: tokens.colors.text,
      fontWeight: tokens.typography.toolbarWeight,
    }]} numberOfLines={1}>{content}</Text>
  }, [tokens.colors.text, tokens.typography.fontFamily, tokens.typography.toolbarSize, tokens.typography.toolbarWeight])

  const toolbar = useMemo(() => {
    if (!showToolbar) return null
    return (
      <View style={[styles.toolbar, {
        height: tokens.spacing.toolbarHeight,
        borderColor: tokens.colors.indicator,
        paddingHorizontal: tokens.spacing.actionPadding,
      }]}>
        <Pressable onPress={onCancel} accessibilityRole="button">
          {renderActionContent(cancelButtonText, tokens.colors.cancel)}
        </Pressable>
        {renderTitleContent(title)}
        <Pressable onPress={handleConfirm} accessibilityRole="button">
          {renderActionContent(confirmButtonText, tokens.colors.confirm)}
        </Pressable>
      </View>
    )
  }, [
    cancelButtonText,
    confirmButtonText,
    handleConfirm,
    onCancel,
    renderActionContent,
    renderTitleContent,
    showToolbar,
    title,
    tokens.colors.cancel,
    tokens.colors.confirm,
    tokens.colors.indicator,
    tokens.spacing.actionPadding,
    tokens.spacing.toolbarHeight,
  ])

  const wrapperHeight = itemHeight * visibleItemCount
  const maskVisibleCount = Math.max(1, Math.floor((visibleItemCount - 1) / 2))
  const indicatorOffset = itemHeight * maskVisibleCount
  const maskHeight = indicatorOffset
  const hasColumns = normalized.columns.length > 0
  const effectiveMaskColor = maskColor ?? tokens.colors.mask
  const columnsContent = hasColumns
    ? normalized.columns.map((column, columnIndex) => {
      const key = isCascade ? `${columnIndex}-${normalized.values.slice(0, columnIndex).map(String).join('|')}` : String(columnIndex)
      return (
        <PickerColumn
          key={key}
          columnIndex={columnIndex}
          options={column}
          value={normalized.values[columnIndex]}
          itemHeight={itemHeight}
          visibleItemCount={visibleItemCount}
          decelerationRate={decelerationRate}
          scrollEventThrottle={scrollEventThrottle}
          optionRender={optionRender}
          getOptionTestID={getOptionTestID}
          getOptionA11yLabel={getOptionA11yLabel}
          readOnly={readOnly}
          swipeDuration={swipeDuration}
          onSelect={handleSelect}
          tokens={tokens}
        />
      )
    })
    : null

  return (
    <View
      {...rest}
      style={[
        styles.container,
        { backgroundColor: tokens.colors.background, borderRadius: tokens.radius.container },
        style,
      ]}
      testID={testID}
    >
      {toolbarPosition === 'top' && toolbar}
      <View style={[styles.body, { height: wrapperHeight }]}>
        <View style={styles.columns} pointerEvents={loading ? 'none' : 'auto'}>
          {columnsTop}
          {columnsContent}
          {columnsBottom}
          {hasColumns && (
            <>
              <View pointerEvents="none" style={[styles.indicator, {
                top: indicatorOffset,
                height: itemHeight,
                borderColor: tokens.colors.indicator,
              }]} />
              <GradientMask position="top" height={maskHeight} color={effectiveMaskColor} maskType={maskType} />
              <GradientMask position="bottom" height={maskHeight} color={effectiveMaskColor} maskType={maskType} />
            </>
          )}
        </View>
        {loading && (
          <View style={[styles.loading, { backgroundColor: tokens.colors.loadingMask }]}>
            <ActivityIndicator size="small" color={tokens.colors?.text ?? '#666'} />
          </View>
        )}
      </View>
      {toolbarPosition === 'bottom' && toolbar}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
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
    zIndex: 3,
  },
  gradientMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
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
  },
})

Picker.displayName = 'Picker'

export default Picker
