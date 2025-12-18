import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Close } from 'react-native-system-icon'

import { useAriaPress } from '../../hooks'
import Loading from '../loading'
import Popup from '../popup'
import type { ActionSheetAction, ActionSheetProps } from './types'
import { useActionSheetTokens, type ActionSheetTokens } from './tokens'

const defaultCloseIcon = <Close size={18} />
const isPromiseLike = (value: unknown): value is Promise<unknown> =>
  !!value && typeof value === 'object' && typeof (value as any).then === 'function'

const ActionSheetHeader: React.FC<{
  title: React.ReactNode
  closeable: boolean
  closeIcon: React.ReactNode
  tokens: ActionSheetTokens
  onClose: () => void
}> = ({ title, closeable, closeIcon, tokens, onClose }) => {
  const closePress = useAriaPress({
    onPress: onClose,
  })

  return (
    <View style={styles.header}>
      <Text style={[styles.title, { color: tokens.colors.title, fontSize: tokens.typography.title }]}>{title}</Text>
      {closeable ? (
        <Pressable accessibilityRole="button" hitSlop={8} {...closePress.interactionProps}>
          {React.isValidElement(closeIcon)
            ? React.cloneElement(closeIcon, { fill: tokens.colors.description, color: tokens.colors.description })
            : closeIcon}
        </Pressable>
      ) : null}
    </View>
  )
}

const ActionSheetItem: React.FC<{
  action: ActionSheetAction
  index: number
  tokens: ActionSheetTokens
  onPress: () => void
}> = ({ action, index, tokens, onPress }) => {
  const disabled = !!action.disabled
  const loading = !!action.loading
  const actionPress = useAriaPress({
    disabled: disabled || loading,
    onPress,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityState: { disabled, busy: loading },
      testID: `rv-action-sheet-item-${index}`,
    },
  })

  const color = action.color ?? tokens.colors.item

  return (
    <Pressable
      style={[
        styles.item,
        {
          paddingVertical: tokens.spacing.vertical,
          borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth,
          borderTopColor: tokens.colors.border,
        },
        action.style,
      ]}
      {...actionPress.interactionProps}
    >
      {action.icon ? <View style={styles.icon}>{action.icon}</View> : null}
      {loading ? (
        <Loading size={20} />
      ) : (
        <View style={styles.itemTextWrapper}>
          <Text
            style={[
              styles.itemText,
              {
                color: disabled ? tokens.colors.disabled : color,
                fontSize: tokens.typography.item,
              },
            ]}
          >
            {action.name}
          </Text>
          {action.subname ? (
            <Text style={[styles.subname, { color: tokens.colors.subitem }]}>{action.subname}</Text>
          ) : null}
        </View>
      )}
    </Pressable>
  )
}

const ActionSheetCancel: React.FC<{
  cancelText: React.ReactNode
  tokens: ActionSheetTokens
  onPress: () => void
}> = ({ cancelText, tokens, onPress }) => {
  const cancelPress = useAriaPress({
    onPress,
    extraProps: { accessibilityRole: 'button', testID: 'rv-action-sheet-cancel' },
  })

  return (
    <>
      <View style={[styles.cancelGap, { height: tokens.spacing.cancelGap, backgroundColor: tokens.colors.background }]} />
      <Pressable
        style={[styles.cancel, { borderColor: tokens.colors.border }]}
        {...cancelPress.interactionProps}
      >
        <Text style={[styles.cancelText, { color: tokens.colors.cancel }]}>{cancelText}</Text>
      </Pressable>
    </>
  )
}

const ActionSheet: React.FC<ActionSheetProps> = props => {
  const tokens = useActionSheetTokens()
  const {
    visible,
    title,
    description,
    cancelText,
    actions = [],
    closeOnClickAction,
    closeOnSelect,
    closeable = true,
    closeIcon = defaultCloseIcon,
    beforeClose,
    onSelect,
    onCancel,
    onClose,
    children,
    round = true,
    safeAreaInsetBottom = true,
    overlay = true,
    lockScroll = true,
    ...popupProps
  } = props

  const shouldCloseOnClickAction = closeOnClickAction ?? closeOnSelect ?? false

  const runBeforeClose = React.useCallback(
    async (action: Parameters<NonNullable<ActionSheetProps['beforeClose']>>[0]) => {
      if (!beforeClose) return true
      try {
        const result = beforeClose(action)
        if (isPromiseLike(result)) {
          const resolved = await result
          return resolved !== false
        }
        return result !== false
      } catch (error) {
        console.error(error)
        return true
      }
    },
    [beforeClose],
  )

  const requestClose = React.useCallback(
    async (action: Parameters<NonNullable<ActionSheetProps['beforeClose']>>[0]) => {
      const allowed = await runBeforeClose(action)
      if (!allowed) return
      onClose?.()
    },
    [onClose, runBeforeClose],
  )

  const handleCancel = React.useCallback(() => {
    onCancel?.()
    void requestClose('cancel')
  }, [onCancel, requestClose])

  const handleCloseIcon = React.useCallback(() => {
    void requestClose('close-icon')
  }, [requestClose])

  const handleActionPress = React.useCallback(
    (action: ActionSheetAction, index: number) => {
      if (action.disabled || action.loading) {
        return
      }
      action.onPress?.(action)
      action.callback?.(action)
      onSelect?.(action, index)
      if (shouldCloseOnClickAction) {
        void requestClose('action')
      }
    },
    [onSelect, requestClose, shouldCloseOnClickAction]
  )

  return (
    <Popup
      visible={visible}
      placement="bottom"
      round={round}
      safeAreaInsetBottom={safeAreaInsetBottom}
      overlay={overlay}
      lockScroll={lockScroll}
      beforeClose={beforeClose}
      onClose={onClose}
      {...popupProps}
    >
      <View style={[styles.panel, { paddingHorizontal: tokens.spacing.horizontal, backgroundColor: tokens.colors.background }]}>
        {title ? (
          <ActionSheetHeader
            title={title}
            closeable={closeable}
            closeIcon={closeIcon}
            tokens={tokens}
            onClose={handleCloseIcon}
          />
        ) : null}
        {description ? (
          <Text style={[styles.description, { color: tokens.colors.description, fontSize: tokens.typography.description }]}>
            {description}
          </Text>
        ) : null}
        <View style={styles.actions}>
          {actions.map((action, index) => (
            <ActionSheetItem
              key={action.key ?? index}
              action={action}
              index={index}
              tokens={tokens}
              onPress={() => handleActionPress(action, index)}
            />
          ))}
        </View>
        {children}
        {cancelText ? (
          <ActionSheetCancel cancelText={cancelText} tokens={tokens} onPress={handleCancel} />
        ) : null}
      </View>
    </Popup>
  )
}

const styles = StyleSheet.create({
  panel: {
    paddingTop: 12,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
  },
  description: {
    marginBottom: 8,
  },
  actions: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTextWrapper: {
    alignItems: 'center',
  },
  itemText: {
    fontWeight: '500',
  },
  subname: {
    marginTop: 4,
    fontSize: 12,
  },
  icon: {
    marginRight: 12,
  },
  cancelGap: {
    width: '100%',
  },
  cancel: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
})

ActionSheet.displayName = 'ActionSheet'

export default ActionSheet
