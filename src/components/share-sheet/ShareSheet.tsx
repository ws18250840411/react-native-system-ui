import React from 'react'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import { createHairlineView } from '../../utils/hairline'
import Popup from '../popup'
import type { ShareSheetOption, ShareSheetOptions, ShareSheetProps } from './types'
import { useShareSheetTokens, type ShareSheetTokens } from './tokens'

const isValidNode = (node: React.ReactNode) =>
  node !== undefined &&
  node !== null &&
  node !== false &&
  !(typeof node === 'string' && node.length === 0)

const renderTextNode = (node: React.ReactNode, textStyle: any) => {
  if (!isValidNode(node)) return null
  if (typeof node === 'string' || typeof node === 'number') {
    return <Text style={textStyle}>{node}</Text>
  }
  return node
}

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
  const resolvedColumns = columns > 0 ? columns : 1
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
        { width: `${100 / resolvedColumns}%` },
      ]}
      {...press.interactionProps}
    >
      <View style={[styles.icon, { width: tokens.sizing.icon, height: tokens.sizing.icon, marginHorizontal: 12 }]}>
        {option.icon}
      </View>
      {renderTextNode(
        option.name,
        [styles.optionText, { color: tokens.colors.option, fontSize: tokens.typography.option, paddingHorizontal: 4 }]
      )}
      {isValidNode(option.description) ? (
        typeof option.description === 'string' || typeof option.description === 'number' ? (
          <Text
            style={[
              styles.optionDesc,
              {
                color: tokens.colors.optionDesc,
                marginTop: tokens.spacing.gap,
                fontSize: tokens.typography.optionDesc,
                paddingHorizontal: 16,
              },
            ]}
          >
            {option.description}
          </Text>
        ) : (
          <View style={{ marginTop: tokens.spacing.gap, alignItems: 'center', paddingHorizontal: 16 }}>
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
    <View style={styles.cancelWrapper}>
      <View
        style={[
          styles.cancelDivider,
          {
            height: 8,
          },
        ]}
      />
      <Pressable style={[styles.cancel, { backgroundColor: tokens.colors.background }]} {...cancelPress.interactionProps}>
        {typeof cancelText === 'string' || typeof cancelText === 'number' ? (
          <Text style={[styles.cancelText, { color: tokens.colors.option }]}>{cancelText}</Text>
        ) : (
          cancelText
        )}
      </Pressable>
    </View>
  )
}

const ShareSheet: React.FC<ShareSheetProps> = props => {
  const tokens = useShareSheetTokens()
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
    onSelect,
    onCancel,
    onClose,
    lockScroll = true,
    overlay = true,
    round = true,
    ...popupProps
  } = props

  const groups = React.useMemo(() => normalizeOptions(options), [options])
  const resolvedColumns = React.useMemo(() => {
    if (typeof columns !== 'number' || !Number.isFinite(columns) || columns <= 0) return 4
    return Math.max(1, Math.floor(columns))
  }, [columns])

  const hasTitle = isValidNode(title)
  const hasDescription = isValidNode(description)
  const hasCancelText = isValidNode(cancelText)

  const close = React.useCallback(
    (reason: 'cancel' | 'select') => {
      if (reason === 'cancel') {
        onCancel?.()
      }
      onClose?.()
    },
    [onCancel, onClose]
  )

  const handleSelect = React.useCallback(
    (option: ShareSheetOption, index: number) => {
      onSelect?.(option, index)
      option.onPress?.(option)
      if (closeOnSelect) {
        close('select')
      }
    },
    [close, closeOnSelect, onSelect]
  )

  const renderGroups = () => {
    if (!groups.length && !children) return null
    let globalIndex = 0
    return groups.map((group, groupIndex) => {
      const hasBorder = groupIndex !== 0
      return (
        <View key={groupIndex} style={styles.group}>
          {hasBorder ? (
            <View
              style={[
                styles.groupBorder,
                createHairlineView({
                  position: 'top',
                  color: tokens.colors.border ?? 'rgba(0,0,0,0.06)',
                  left: tokens.spacing.horizontal,
                  right: tokens.spacing.horizontal,
                }),
              ]}
            />
          ) : null}
          <View style={[styles.optionsRow, { paddingLeft: tokens.spacing.gap, paddingTop: 12, paddingBottom: 12 }]}>
            {group.map(option => {
              const currentIndex = globalIndex
              globalIndex += 1
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
      onClose={() => close('cancel')}
      style={[styles.popupOverride, popupProps.style]}
      {...popupProps}
    >
      <View style={[styles.wrapper, { backgroundColor: tokens.colors.background }]}>
        {(hasTitle || hasDescription) ? (
          <View style={styles.header}>
            {hasTitle
              ? typeof title === 'string' || typeof title === 'number'
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
                  <View style={styles.titleNode}>{title}</View>
                )
              : null}
            {hasDescription
              ? typeof description === 'string' || typeof description === 'number'
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
                  <View style={styles.descriptionNode}>{description}</View>
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
              onPress={() => close('cancel')}
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
  titleNode: {
    alignItems: 'center',
    marginTop: 4,
  },
  descriptionNode: {
    alignItems: 'center',
    marginTop: 4,
  },
  group: {
  },
  groupBorder: {
    position: 'absolute',
    top: 0,
    pointerEvents: 'none',
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
    fontSize: 12,
  },
  cancelWrapper: {
    backgroundColor: '#f7f8fa',
  },
  cancelDivider: {
    width: '100%',
  },
  cancel: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
})

ShareSheet.displayName = 'ShareSheet'

export default ShareSheet
