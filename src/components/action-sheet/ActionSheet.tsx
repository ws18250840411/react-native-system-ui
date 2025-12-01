import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import Icon from '../icon'
import Loading from '../loading'
import Popup from '../popup'
import type { ActionSheetAction, ActionSheetProps } from './types'
import { useActionSheetTokens } from './tokens'

const defaultCloseIcon = <Icon name="close" size={18} />

const ActionSheet: React.FC<ActionSheetProps> = props => {
  const tokens = useActionSheetTokens()
  const {
    visible,
    title,
    description,
    cancelText,
    actions = [],
    closeOnSelect = true,
    closeable = true,
    closeIcon = defaultCloseIcon,
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

  const close = React.useCallback(
    (reason: 'action' | 'cancel') => {
      if (reason === 'cancel') {
        onCancel?.()
      }
      onClose?.()
    },
    [onCancel, onClose]
  )

  const handlePopupClose = React.useCallback(() => {
    close('cancel')
  }, [close])

  const handleActionPress = React.useCallback(
    (action: ActionSheetAction, index: number) => {
      if (action.disabled || action.loading) {
        return
      }
      action.onPress?.(action)
      onSelect?.(action, index)
      if (closeOnSelect) {
        close('action')
      }
    },
    [close, closeOnSelect, onSelect]
  )

  const renderHeader = () => {
    if (!title) return null
    const closePress = useAriaPress({
      onPress: () => close('cancel'),
    })

    return (
      <View style={styles.header}>
        <Text style={[styles.title, { color: tokens.colors.title, fontSize: tokens.typography.title }]}>{title}</Text>
        {closeable ? (
          <Pressable accessibilityRole="button" hitSlop={8} {...closePress.interactionProps}>
            {React.isValidElement(closeIcon)
              ? React.cloneElement(closeIcon, { color: tokens.colors.description })
              : closeIcon}
          </Pressable>
        ) : null}
      </View>
    )
  }

  const renderDescription = () => {
    if (!description) return null
    return (
      <Text style={[styles.description, { color: tokens.colors.description, fontSize: tokens.typography.description }]}>
        {description}
      </Text>
    )
  }

  const renderAction = (action: ActionSheetAction, index: number) => {
    const disabled = !!action.disabled
    const loading = !!action.loading
    const actionPress = useAriaPress({
      disabled: disabled || loading,
      onPress: () => handleActionPress(action, index),
      extraProps: {
        accessibilityRole: 'button',
        accessibilityState: { disabled, busy: loading },
        testID: `rv-action-sheet-item-${index}`,
      },
    })
    const color = action.color ?? tokens.colors.item

    return (
      <Pressable
        key={action.key ?? index}
        style={[
          styles.item,
          {
            paddingVertical: tokens.spacing.vertical,
            borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth,
            borderTopColor: tokens.colors.border,
          },
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

  const renderCancel = () => {
    if (!cancelText) return null
    const cancelPress = useAriaPress({
      onPress: () => close('cancel'),
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

  return (
    <Popup
      visible={visible}
      placement="bottom"
      round={round}
      safeAreaInsetBottom={safeAreaInsetBottom}
      overlay={overlay}
      lockScroll={lockScroll}
      onClose={handlePopupClose}
      {...popupProps}
    >
      <View style={[styles.panel, { paddingHorizontal: tokens.spacing.horizontal, backgroundColor: tokens.colors.background }]}>
        {renderHeader()}
        {renderDescription()}
        <View style={styles.actions}>{actions.map(renderAction)}</View>
        {children}
        {renderCancel()}
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.06)',
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
    borderColor: 'rgba(0,0,0,0.06)',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
})

ActionSheet.displayName = 'ActionSheet'

export default ActionSheet
