import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
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
        { width: `${100 / resolvedColumns}%`, paddingVertical: tokens.spacing.vertical },
      ]}
      {...press.interactionProps}
    >
      <View style={[styles.icon, { width: tokens.sizing.icon, height: tokens.sizing.icon, marginBottom: tokens.spacing.vertical }]}>
        {option.icon}
      </View>
      {renderTextNode(
        option.name,
        [styles.optionText, { color: tokens.colors.option, fontSize: tokens.typography.option }]
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
              },
            ]}
          >
            {option.description}
          </Text>
        ) : (
          <View style={{ marginTop: tokens.spacing.gap, alignItems: 'center' }}>
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
    <Pressable style={styles.cancel} {...cancelPress.interactionProps}>
      {typeof cancelText === 'string' || typeof cancelText === 'number' ? (
        <Text style={[styles.cancelText, { color: tokens.colors.option }]}>{cancelText}</Text>
      ) : (
        cancelText
      )}
    </Pressable>
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
    return groups.map((group, groupIndex) => (
      <View key={groupIndex} style={styles.group}>
        <View style={styles.optionsRow}>
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
    ))
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
      {...popupProps}
    >
      <View style={[styles.wrapper, { paddingHorizontal: tokens.spacing.horizontal, backgroundColor: tokens.colors.background }]}>
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
  wrapper: {
    width: '100%',
    paddingTop: 16,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  titleNode: {
    alignItems: 'center',
  },
  descriptionNode: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  group: {
    marginBottom: 12,
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
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    fontWeight: '500',
  },
  optionDesc: {
    fontSize: 12,
  },
  cancel: {
    marginTop: 8,
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
