import React, { useCallback, useMemo } from 'react'
import { Pressable, StyleSheet, Text, View, type DimensionValue, type ViewStyle } from 'react-native'

import { useAriaPress } from '../../hooks'
import { createHairlineView } from '../../utils/hairline'
import { isFiniteNumber, isText, isValidNode } from '../../utils/validate'
import Popup from '../popup'
import type { ShareSheetOption, ShareSheetOptions, ShareSheetProps } from './types'
import { useShareSheetTokens, type ShareSheetTokens } from './tokens'

const normalizeOptions = (options?: ShareSheetOptions): ShareSheetOption[][] => {
  if (!options || options.length === 0) return []
  if (Array.isArray(options[0])) {
    return options as ShareSheetOption[][]
  }
  return [options as ShareSheetOption[]]
}

const ShareSheetOptionItem: React.FC<{
  option: ShareSheetOption
  index: number
  columns: number
  tokens: ShareSheetTokens
  onSelect: (option: ShareSheetOption, index: number) => void
}> = React.memo(({ option, index, columns, tokens, onSelect }) => {
  const optionWidthStyle: ViewStyle = { width: `${100 / columns}%` as DimensionValue }
  const iconStyle = { width: tokens.sizing.icon, height: tokens.sizing.icon }
  const press = useAriaPress({
    onPress: () => onSelect(option, index),
    extraProps: {
      accessibilityRole: 'button',
      testID: `rv-share-sheet-item-${index}`,
    },
  })

  return (
    <Pressable
      style={[
        styles.option,
        optionWidthStyle,
      ]}
      {...press.interactionProps}
    >
      <View style={[styles.icon, iconStyle, { marginHorizontal: tokens.spacing.iconMarginHorizontal }]}>
        {option.icon}
      </View>
      {isValidNode(option.name)
        ? isText(option.name)
          ? (
            <Text
              style={[
                styles.optionText,
                {
                  color: tokens.colors.option,
                  fontSize: tokens.typography.option,
                  paddingHorizontal: tokens.spacing.optionTextPaddingHorizontal,
                },
              ]}
            >
              {option.name}
            </Text>
          )
          : option.name
        : null}
      {isValidNode(option.description) ? (
        isText(option.description) ? (
          <Text
            style={[
              styles.optionDesc,
              {
                color: tokens.colors.optionDesc,
                marginTop: tokens.spacing.gap,
                fontSize: tokens.typography.optionDesc,
                paddingHorizontal: tokens.spacing.optionDescPaddingHorizontal,
              },
            ]}
          >
            {option.description}
          </Text>
        ) : (
          <View
            style={[
              styles.optionDescNode,
              { marginTop: tokens.spacing.gap, paddingHorizontal: tokens.spacing.optionDescPaddingHorizontal },
            ]}
          >
            {option.description}
          </View>
        )
      ) : null}
    </Pressable>
  )
})

const ShareSheetCancel: React.FC<{
  cancelText: React.ReactNode
  tokens: ShareSheetTokens
  onPress: () => void
}> = React.memo(({ cancelText, tokens, onPress }) => {
  const cancelPress = useAriaPress({
    onPress,
    extraProps: { testID: 'rv-share-sheet-cancel', accessibilityRole: 'button' },
  })

  return (
    <View style={{ backgroundColor: tokens.colors.divider }}>
      <Pressable
        style={[
          styles.cancel,
          {
            backgroundColor: tokens.colors.background,
            paddingVertical: tokens.spacing.cancelPaddingVertical,
            marginTop: tokens.spacing.cancelMarginTop,
          },
        ]}
        {...cancelPress.interactionProps}
      >
        {isText(cancelText) ? (
          <Text style={[styles.cancelText, { color: tokens.colors.option, fontSize: tokens.typography.cancel }]}>
            {cancelText}
          </Text>
        ) : (
          cancelText
        )}
      </Pressable>
    </View>
  )
})

const ShareSheet: React.FC<ShareSheetProps> = props => {
  const {
    visible,
    title,
    description,
    cancelText = '取消',
    options,
    columns = 4,
    closeOnSelect = true,
    safeAreaInsetBottom = true,
    children,
    tokensOverride,
    onSelect,
    onCancel,
    onClose,
    lockScroll = true,
    overlay = true,
    round = true,
    style: popupStyle,
    placement: _placement,
    position: _position,
    ...popupProps
  } = props

  const tokens = useShareSheetTokens(tokensOverride)
  const groups = normalizeOptions(options)
  const resolvedColumns = isFiniteNumber(columns) ? Math.max(1, Math.floor(columns)) : 4

  const hasTitle = isValidNode(title)
  const hasDescription = isValidNode(description)
  const hasCancelText = isValidNode(cancelText)

  const close = useCallback((isCancel?: boolean) => {
    if (isCancel) onCancel?.()
    onClose?.()
  }, [onCancel, onClose])

  const handleSelect = useCallback((option: ShareSheetOption, index: number) => {
    onSelect?.(option, index)
    option.onPress?.(option)
    if (closeOnSelect) close()
  }, [close, closeOnSelect, onSelect])

  const onPopupClose = useCallback(() => close(true), [close])

  const wrapperStyle = [styles.wrapper, { backgroundColor: tokens.colors.background }]

  const groupRowStyle = [styles.optionsRow, { paddingLeft: tokens.spacing.gap, paddingVertical: 12 }]

  const groupNodes = useMemo(() => {
    if (!groups.length) return null
    let globalIndex = 0
    return groups.map((group, groupIndex) => (
      <View key={groupIndex}>
        {groupIndex ? (
          <View
            style={createHairlineView({
              position: 'top',
              color: tokens.colors.border,
              left: tokens.spacing.horizontal,
              right: tokens.spacing.horizontal,
            })}
          />
        ) : null}
        <View style={groupRowStyle}>
          {group.map(option => {
            const currentIndex = globalIndex++
            return (
              <ShareSheetOptionItem
                key={option.key ?? currentIndex}
                option={option}
                index={currentIndex}
                columns={resolvedColumns}
                tokens={tokens}
                onSelect={handleSelect}
              />
            )
          })}
        </View>
      </View>
    ))
  }, [groups, groupRowStyle, handleSelect, resolvedColumns, tokens])

  const headerNode = useMemo(() => {
    if (!hasTitle && !hasDescription) return null
    return (
      <View
        style={[
          styles.header,
          {
            paddingTop: tokens.spacing.headerPaddingTop,
            paddingHorizontal: tokens.spacing.headerPaddingHorizontal,
            paddingBottom: tokens.spacing.headerPaddingBottom,
          },
        ]}
      >
        {hasTitle
          ? isText(title)
            ? (
              <Text
                style={[
                  styles.title,
                  {
                    color: tokens.colors.title,
                    fontSize: tokens.typography.title,
                    marginTop: tokens.spacing.titleMarginTop,
                  },
                ]}
              >
                {title}
              </Text>
            )
            : (
              <View style={[styles.node, { marginTop: tokens.spacing.nodeMarginTop }]}>{title}</View>
            )
          : null}
        {hasDescription
          ? isText(description)
            ? (
              <Text
                style={[
                  styles.description,
                  {
                    color: tokens.colors.description,
                    fontSize: tokens.typography.description,
                    marginTop: tokens.spacing.descriptionMarginTop,
                  },
                ]}
              >
                {description}
              </Text>
            )
            : (
              <View style={[styles.node, { marginTop: tokens.spacing.nodeMarginTop }]}>{description}</View>
            )
          : null}
      </View>
    )
  }, [
    description,
    hasDescription,
    hasTitle,
    title,
    tokens.colors.description,
    tokens.colors.title,
    tokens.spacing.descriptionMarginTop,
    tokens.spacing.headerPaddingBottom,
    tokens.spacing.headerPaddingHorizontal,
    tokens.spacing.headerPaddingTop,
    tokens.spacing.nodeMarginTop,
    tokens.spacing.titleMarginTop,
    tokens.typography.description,
    tokens.typography.title,
  ])

  const popupStyleMemo = [styles.popupOverride, { padding: tokens.spacing.popupPadding }, popupStyle]

  return (
    <Popup
      {...popupProps}
      visible={visible}
      placement="bottom"
      round={round}
      safeAreaInsetBottom={safeAreaInsetBottom}
      overlay={overlay}
      lockScroll={lockScroll}
      onClose={onPopupClose}
      style={popupStyleMemo}
    >
      <View style={wrapperStyle}>
        {headerNode}
        {groupNodes}
        {children}
        {hasCancelText
          ? (
            <ShareSheetCancel
              cancelText={cancelText}
              tokens={tokens}
              onPress={onPopupClose}
            />
          )
          : null}
      </View>
    </Popup>
  )
}

const styles = StyleSheet.create({
  popupOverride: {
  },
  wrapper: {
    width: '100%',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'normal',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
  node: {
    alignItems: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  optionDesc: {
    textAlign: 'center',
  },
  optionDescNode: {
    alignItems: 'center',
  },
  cancel: {
    alignItems: 'center',
  },
  cancelText: {
    fontWeight: '500',
  },
})

ShareSheet.displayName = 'ShareSheet'

export default ShareSheet
