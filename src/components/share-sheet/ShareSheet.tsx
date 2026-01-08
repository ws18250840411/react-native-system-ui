import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

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
}> = ({ option, index, columns, tokens, onSelect }) => {
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
        { width: `${100 / columns}%` },
      ]}
      {...press.interactionProps}
    >
      <View style={[styles.icon, { width: tokens.sizing.icon, height: tokens.sizing.icon }]}>
        {option.icon}
      </View>
      {isValidNode(option.name)
        ? isText(option.name)
          ? (
            <Text style={[styles.optionText, { color: tokens.colors.option, fontSize: tokens.typography.option }]}>
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
              },
            ]}
          >
            {option.description}
          </Text>
        ) : (
          <View style={[styles.optionDescNode, { marginTop: tokens.spacing.gap }]}>
            {option.description}
          </View>
        )
      ) : null}
    </Pressable>
  )
}

const ShareSheetCancel: React.FC<{
  cancelText: React.ReactNode
  tokens: ShareSheetTokens
  onPress: () => void
}> = ({ cancelText, tokens, onPress }) => {
  const cancelPress = useAriaPress({
    onPress,
    extraProps: { testID: 'rv-share-sheet-cancel', accessibilityRole: 'button' },
  })

  return (
    <View style={{ backgroundColor: tokens.colors.divider }}>
      <Pressable style={[styles.cancel, { backgroundColor: tokens.colors.background }]} {...cancelPress.interactionProps}>
        {isText(cancelText) ? (
          <Text style={[styles.cancelText, { color: tokens.colors.option }]}>{cancelText}</Text>
        ) : (
          cancelText
        )}
      </Pressable>
    </View>
  )
}

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
    ...popupProps
  } = props

  const tokens = useShareSheetTokens(tokensOverride)
  const groups = normalizeOptions(options)
  const resolvedColumns =
    isFiniteNumber(columns) ? Math.max(1, Math.floor(columns)) : 4

  const hasTitle = isValidNode(title)
  const hasDescription = isValidNode(description)
  const hasCancelText = isValidNode(cancelText)

  const close = (isCancel?: boolean) => {
    if (isCancel) onCancel?.()
    onClose?.()
  }

  const handleSelect = (option: ShareSheetOption, index: number) => {
    onSelect?.(option, index)
    option.onPress?.(option)
    if (closeOnSelect) close()
  }

  const renderGroups = () => {
    if (!groups.length) return null
    let globalIndex = 0
    return groups.map((group, groupIndex) => {
      return (
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
          <View style={[styles.optionsRow, { paddingLeft: tokens.spacing.gap, paddingVertical: 12 }]}>
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
      )
    })
  }

  return (
    <Popup
      visible={visible}
      placement="bottom"
      round={round}
      safeAreaInsetBottom={safeAreaInsetBottom}
      overlay={overlay}
      lockScroll={lockScroll}
      onClose={() => close(true)}
      style={[styles.popupOverride, popupProps.style]}
      {...popupProps}
    >
      <View style={[styles.wrapper, { backgroundColor: tokens.colors.background }]}>
        {(hasTitle || hasDescription) ? (
          <View style={styles.header}>
            {hasTitle
              ? isText(title)
                ? (
                  <Text
                    style={[
                      styles.title,
                      { color: tokens.colors.title, fontSize: tokens.typography.title },
                    ]}
                  >
                    {title}
                  </Text>
                )
                : (
                  <View style={styles.node}>{title}</View>
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
                      },
                    ]}
                  >
                    {description}
                  </Text>
                )
                : (
                  <View style={styles.node}>{description}</View>
                )
              : null}
          </View>
        ) : null}
        {renderGroups()}
        {children}
        {hasCancelText
          ? (
            <ShareSheetCancel
              cancelText={cancelText}
              tokens={tokens}
              onPress={() => close(true)}
            />
          )
          : null}
      </View>
    </Popup>
  )
}

const styles = StyleSheet.create({
  popupOverride: {
    padding: 0,
  },
  wrapper: {
    width: '100%',
  },
  header: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 4,
  },
  description: {
    textAlign: 'center',
    marginTop: 4,
  },
  node: {
    alignItems: 'center',
    marginTop: 4,
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
    marginHorizontal: 12,
  },
  optionText: {
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  optionDesc: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  optionDescNode: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  cancel: {
    paddingVertical: 14,
    marginTop: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
})

ShareSheet.displayName = 'ShareSheet'

export default ShareSheet
