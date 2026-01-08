import React from 'react'
import { Pressable, Text, type TextStyle, View, Platform } from 'react-native'

import Loading from '../loading'
import { withAlpha } from '../../utils/color'
import { isText } from '../../utils/validate'
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

const GRADIENT_OVERLAY_ALPHA = 0.25
const GRADIENT_STEPS = [0.98, 0.9075, 0.835, 0.7625, 0.69, 0.6175, 0.545, 0.4725, 0.4]

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

  const overlayColor = withAlpha(color, GRADIENT_OVERLAY_ALPHA)

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
          } as any),
        ]}
      />
    )
  }

  const steps = position === 'top' ? GRADIENT_STEPS : [...GRADIENT_STEPS].reverse()

  return (
    <View pointerEvents="none" style={[...baseStyle, { backgroundColor: overlayColor }]}>
      {steps.map((opacity, idx) => (
        <View key={idx} style={{ flex: 1, backgroundColor: withAlpha(color, opacity) }} />
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
      swipeDuration,
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
          swipeDuration={swipeDuration}
          renderItem={(item: PickerOption | null) => {
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
                style={[styles.option, { opacity: disabled ? 0.5 : 1, minHeight: itemHeight }]}
                testID={testID}
                accessible={!!a11yLabel}
                accessibilityLabel={a11yLabel}
              >
                {isText(content) ? (
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.optionText,
                      {
                        color: textColor,
                        fontSize: tokens.typography.optionSize,
                        fontFamily: tokens.typography.fontFamily,
                        fontWeight: tokens.typography.optionWeight as TextStyle['fontWeight'],
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
    decelerationRate = 'fast',
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

  const renderActionContent = (content: React.ReactNode, color: string) => {
    if (React.isValidElement(content)) {
      return (
        <View style={{ minWidth: 44, alignItems: 'center', justifyContent: 'center' }}>
          {content}
        </View>
      )
    }
    if (isText(content)) {
      return (
        <Text
          numberOfLines={1}
          style={[
            styles.actionText,
            {
              color,
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
  }

  const renderTitleContent = (content: React.ReactNode) => {
    if (content == null) {
      return <View />
    }
    if (React.isValidElement(content)) {
      return <View style={[styles.title, { alignItems: 'center', justifyContent: 'center' }]}>{content}</View>
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
  }

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
        <Pressable onPress={onCancel} accessibilityRole="button">
          {renderActionContent(cancelButtonText, tokens.colors.cancel)}
        </Pressable>
        {renderTitleContent(title)}
        <Pressable onPress={handleConfirm} accessibilityRole="button">
          {renderActionContent(confirmButtonText, tokens.colors.confirm)}
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
                readOnly={readOnly}
                swipeDuration={swipeDuration}
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
