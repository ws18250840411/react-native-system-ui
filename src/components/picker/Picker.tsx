import React from 'react'
import { Pressable, Text, type TextStyle, View, Platform } from 'react-native'

import Loading from '../loading'
import { usePickerTokens } from './tokens'
import WheelPicker from './WheelPicker'
import styles from './styles'
import { usePickerValue } from './usePickerValue'
import type { PickerColumnProps, PickerOption, PickerProps } from './types'
import { findEnabledIndex } from './utils'

const getVisibleCount = (count: number) => {
  const normalized = Number.isFinite(count) ? Math.max(3, Math.floor(count)) : 5
  return normalized % 2 === 0 ? normalized + 1 : normalized
}

const clampUnit = (value: number) => Math.max(0, Math.min(1, value))

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '')
  const expanded = normalized.length === 3 ? normalized.split('').map(char => char + char).join('') : normalized
  if (expanded.length !== 6) return null
  const r = parseInt(expanded.substring(0, 2), 16)
  const g = parseInt(expanded.substring(2, 4), 16)
  const b = parseInt(expanded.substring(4, 6), 16)
  if ([r, g, b].some(channel => Number.isNaN(channel))) return null
  return { r, g, b }
}

const withOpacity = (color: string, alpha: number) => {
  const clamped = clampUnit(alpha)
  const trimmed = color?.trim?.() ?? ''
  if (!trimmed) return color
  if (trimmed.startsWith('#')) {
    const rgb = hexToRgb(trimmed)
    if (rgb) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamped})`
    }
    return color
  }
  const rgbMatch = trimmed.match(/^rgba?\(([^)]*)\)$/i)
  if (rgbMatch) {
    const parts = rgbMatch[1].split(',').map(part => part.trim()).slice(0, 3)
    const numeric = parts.map(value => Number(value))
    if (numeric.every(channel => Number.isFinite(channel))) {
      const [r, g, b] = numeric
      return `rgba(${r}, ${g}, ${b}, ${clamped})`
    }
  }
  return trimmed
}

const GRADIENT_OVERLAY_ALPHA = 0.25
const GRADIENT_START_ALPHA = 0.98
const GRADIENT_END_ALPHA = 0.4
const GRADIENT_SEGMENTS = 8

const createGradientSteps = (start: number, end: number, segments: number) => {
  const count = Math.max(1, segments)
  const delta = (start - end) / count
  return Array.from({ length: count + 1 }, (_, idx) => clampUnit(start - delta * idx))
}

const GRADIENT_STEPS = createGradientSteps(GRADIENT_START_ALPHA, GRADIENT_END_ALPHA, GRADIENT_SEGMENTS)

const GradientMask: React.FC<{
  height: number
  color: string
  position: 'top' | 'bottom'
  maskType: NonNullable<PickerProps['maskType']>
}> = ({ height, color, position, maskType }) => {
  const isWeb = Platform.OS === 'web'
  const baseStyle = [
    styles.gradientMask,
    { height },
    position === 'top' ? { top: 0 } : { bottom: 0 },
  ]

  const overlayColor = withOpacity(color, GRADIENT_OVERLAY_ALPHA)

  if (maskType === 'solid') {
    return <View pointerEvents="none" style={[...baseStyle, { backgroundColor: withOpacity(color, 0.9) }]} />
  }

  if (isWeb) {
    const angle = position === 'top' ? '180deg' : '0deg'
    const gradientStart = withOpacity(color, GRADIENT_START_ALPHA)
    const gradientEnd = withOpacity(color, GRADIENT_END_ALPHA)
    return (
      <View
        pointerEvents="none"
        style={[
          ...baseStyle,
          {
            backgroundColor: overlayColor,
            backgroundImage: `linear-gradient(${angle}, ${gradientStart}, ${gradientEnd})`,
          },
        ]}
      />
    )
  }

  const steps = position === 'top' ? GRADIENT_STEPS : [...GRADIENT_STEPS].reverse()

  return (
    <View pointerEvents="none" style={[...baseStyle, { backgroundColor: overlayColor }]}>
      {steps.map((opacity, idx) => (
        <View key={idx} style={{ flex: 1, backgroundColor: withOpacity(color, opacity) }} />
      ))}
    </View>
  )
}

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
      swipeDuration,
      effects,
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
          swipeDuration={swipeDuration}
          effects={effects}
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
    prev.swipeDuration === next.swipeDuration &&
    prev.effects === next.effects &&
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
    swipeDuration = tokens.defaults.swipeDuration,
    scrollEventThrottle = 16,
    effects,
    columnsTop,
    columnsBottom,
    optionRender,
    getOptionTestID,
    getOptionA11yLabel,
    emitConfirmOnAutoSelect = true,
    disableRemoveClippedSubviewsOnWeb = false,
    maskColor,
    maskType = tokens.defaults.maskType,
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

  const { normalized, handleSelect, handleConfirm } = usePickerValue({
    columns,
    valueProp,
    defaultValue,
    emitConfirmOnAutoSelect,
    onChange,
    onConfirm,
  })

  const handleCancel = React.useCallback(() => {
    onCancel?.()
  }, [onCancel])

  const renderActionContent = React.useCallback(
    (content: React.ReactNode, options: { color: string }) => {
      if (React.isValidElement(content)) {
        return (
          <View style={{ minWidth: 44, alignItems: 'center', justifyContent: 'center' }}>
            {content}
          </View>
        )
      }
      if (typeof content === 'string' || typeof content === 'number') {
        return (
          <Text
            numberOfLines={1}
            style={[
              styles.actionText,
              {
                color: options.color,
                fontSize: tokens.typography.toolbarSize,
                fontFamily: tokens.typography.fontFamily,
                fontWeight: tokens.typography.toolbarWeight as TextStyle['fontWeight'],
              },
            ]}
          >
            {content}
          </Text>
        )
      }
      return <View style={{ minWidth: 44 }} />
    },
    [tokens.typography.fontFamily, tokens.typography.toolbarSize, tokens.typography.toolbarWeight],
  )

  const renderTitleContent = React.useCallback(
    (content: React.ReactNode) => {
      if (content === undefined || content === null) {
        return <View />
      }
      if (React.isValidElement(content)) {
        return (
          <View style={[styles.title, { alignItems: 'center', justifyContent: 'center' }]}>
            {content}
          </View>
        )
      }
      return (
        <Text
          style={[
            styles.title,
            {
              fontSize: tokens.typography.toolbarSize,
              fontFamily: tokens.typography.fontFamily,
              color: tokens.colors.text,
              fontWeight: tokens.typography.toolbarWeight as TextStyle['fontWeight'],
            },
          ]}
          numberOfLines={1}
        >
          {content as any}
        </Text>
      )
    },
    [
      tokens.colors.text,
      tokens.typography.fontFamily,
      tokens.typography.toolbarSize,
      tokens.typography.toolbarWeight,
    ],
  )

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
          {renderActionContent(cancelButtonText, { color: tokens.colors.cancel })}
        </Pressable>
        {renderTitleContent(title)}
        <Pressable onPress={handleConfirm} accessibilityRole="button">
          {renderActionContent(confirmButtonText, { color: tokens.colors.confirm })}
        </Pressable>
      </View>
    )
  }

  const wrapperHeight = itemHeight * visibleItemCount
  const maskVisibleCount = Math.max(1, Math.floor((visibleItemCount - 1) / 2))
  const indicatorOffset = itemHeight * maskVisibleCount
  const maskHeight = Math.max(itemHeight * 2, indicatorOffset)
  const hasColumns = normalized.columns.length > 0

  return (
    <View {...rest} style={[styles.container, { backgroundColor: tokens.colors.background }, style]} testID={testID}>
      {toolbarPosition === 'top' ? renderToolbar() : null}
      <View style={[styles.body, { height: wrapperHeight }]}>
        <View style={styles.columns} pointerEvents={loading ? 'none' : 'auto'}>
          {columnsTop}
          {hasColumns
            ? normalized.columns.map((column, columnIndex) => (
              <PickerColumn
                key={columnIndex}
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
                disableRemoveClippedSubviewsOnWeb={disableRemoveClippedSubviewsOnWeb}
                debug={debug}
                readOnly={readOnly}
                swipeDuration={swipeDuration}
                effects={effects}
                onSelect={handleSelect}
                tokens={tokens}
              />
            ))
            : null}
          {columnsBottom}
          {hasColumns ? (
            <>
              <View
                pointerEvents="none"
                style={[
                  styles.indicator,
                  {
                    top: indicatorOffset,
                    height: itemHeight,
                    borderColor: tokens.colors.indicator,
                  },
                ]}
              />
              <GradientMask position="top" height={maskHeight} color={maskColor ?? tokens.colors.mask} maskType={maskType} />
              <GradientMask position="bottom" height={maskHeight} color={maskColor ?? tokens.colors.mask} maskType={maskType} />
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

export default Picker
