import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Close } from 'react-native-system-icon'

import { useAriaPress } from '../../hooks'
import { createHairlineBorderBottom } from '../../utils/hairline'
import Loading from '../loading'
import Popup from '../popup'
import type { ActionSheetAction, ActionSheetCloseAction, ActionSheetProps } from './types'
import { useActionSheetTokens, type ActionSheetTokens } from './tokens'

const defaultCloseIcon = <Close size={18} />
const isRenderableNode = (node: React.ReactNode) => node != null && node !== false

const ActionSheetHeader: React.FC<{
  title: React.ReactNode
  closeable: boolean
  closeIcon: React.ReactNode
  tokens: ActionSheetTokens
  onClose: () => void
}> = React.memo(({ title, closeable, closeIcon, tokens, onClose }) => {
  const closePress = useAriaPress({
    onPress: onClose,
  })

  const { colors, typography } = tokens
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        {typeof title === 'string' || typeof title === 'number' ? (
          <Text style={[styles.title, { color: colors.title, fontSize: typography.title }]}>{title}</Text>
        ) : (
          <View style={styles.titleNode}>{title}</View>
        )}
      </View>
      {closeable ? (
        <Pressable style={styles.closeButton} accessibilityRole="button" hitSlop={8} {...closePress.interactionProps}>
          {React.isValidElement(closeIcon)
            ? React.cloneElement(closeIcon, { fill: colors.description, color: colors.description } as any)
            : closeIcon}
        </Pressable>
      ) : null}
    </View>
  )
})

ActionSheetHeader.displayName = 'ActionSheetHeader'

const ActionSheetItem: React.FC<{
  action: ActionSheetAction
  index: number
  tokens: ActionSheetTokens
  onPress: () => void
}> = React.memo(({ action, index, tokens, onPress }) => {
  const disabled = !!action.disabled
  const loading = !!action.loading
  const { colors, spacing, typography } = tokens
  const actionPress = useAriaPress({
    disabled: disabled || loading,
    onPress,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityState: { disabled, busy: loading },
      testID: `rv-action-sheet-item-${index}`,
    },
  })

  const color = action.color ?? colors.item
  const name = action.name
  const subname = action.subname
  const hasIcon = !!action.icon

  const hasName = isRenderableNode(name)
  const hasSubname = isRenderableNode(subname)

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        hasIcon && styles.itemWithIcon,
        {
          paddingVertical: spacing.vertical,
          paddingHorizontal: spacing.horizontal,
          backgroundColor: pressed && !disabled && !loading ? colors.itemPressedBackground : colors.itemBackground,
        },
        action.style,
      ]}
      {...actionPress.interactionProps}
    >
      {hasIcon ? <View style={styles.icon}>{action.icon}</View> : null}
      {loading ? (
        <Loading size={20} />
      ) : hasName ? (
        <View style={styles.itemTextWrapper}>
          {typeof name === 'string' || typeof name === 'number' ? (
            <Text
              style={[
                styles.itemText,
                {
                  color: disabled ? colors.disabled : color,
                  fontSize: typography.item,
                },
              ]}
            >
              {name}
            </Text>
          ) : (
            name
          )}
          {hasSubname ? (
            typeof subname === 'string' || typeof subname === 'number' ? (
              <Text style={[styles.subname, { color: colors.subitem }]}>{subname}</Text>
            ) : (
              <View style={styles.subnameNode}>{subname}</View>
            )
          ) : null}
        </View>
      ) : null}
    </Pressable>
  )
})

ActionSheetItem.displayName = 'ActionSheetItem'

const ActionSheetCancel: React.FC<{
  cancelText: React.ReactNode
  tokens: ActionSheetTokens
  onPress: () => void
}> = React.memo(({ cancelText, tokens, onPress }) => {
  const { colors, spacing, typography } = tokens
  const cancelPress = useAriaPress({
    onPress,
    extraProps: { accessibilityRole: 'button', testID: 'rv-action-sheet-cancel' },
  })

  return (
    <>
      <View style={[styles.cancelGap, { height: spacing.cancelGap, backgroundColor: colors.cancelGapBackground }]} />
      <Pressable
        style={[
          styles.cancel,
          {
            paddingVertical: spacing.vertical,
            paddingHorizontal: spacing.horizontal,
            backgroundColor: colors.cancelBackground,
          },
        ]}
        {...cancelPress.interactionProps}
      >
        {typeof cancelText === 'string' || typeof cancelText === 'number' ? (
          <Text style={[styles.cancelText, { color: colors.cancel, fontSize: typography.item }]}>{cancelText}</Text>
        ) : (
          cancelText
        )}
      </Pressable>
    </>
  )
})

ActionSheetCancel.displayName = 'ActionSheetCancel'

const ActionSheet: React.FC<ActionSheetProps> = props => {
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
    closeOnClickOverlay = true,
    tokensOverride,
    style: popupStyle,
    ...popupProps
  } = props

  const tokens = useActionSheetTokens(tokensOverride)
  const shouldCloseOnClickAction = closeOnClickAction ?? closeOnSelect ?? false
  const hasTitle = isRenderableNode(title)
  const hasDescription = isRenderableNode(description)
  const hasCancelText = isRenderableNode(cancelText)

  const runBeforeClose = React.useCallback(
    async (action: Parameters<NonNullable<ActionSheetProps['beforeClose']>>[0]) => {
      if (!beforeClose) return true
      try {
        return (await beforeClose(action)) !== false
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

  const handlePopupBeforeClose = React.useCallback(
    async (reason: 'close-icon' | 'overlay' | 'close') => {
      if (!beforeClose) return true
      const action: ActionSheetCloseAction =
        reason === 'close-icon' ? 'close-icon' : reason === 'overlay' ? 'overlay' : 'close'
      return runBeforeClose(action)
    },
    [beforeClose, runBeforeClose]
  )

  const handleClose = React.useCallback(
    (action: Parameters<NonNullable<ActionSheetProps['beforeClose']>>[0]) => {
      onCancel?.()
      void requestClose(action)
    },
    [onCancel, requestClose],
  )

  const handleCancel = React.useCallback(() => {
    handleClose('cancel')
  }, [handleClose])

  const handleCloseIcon = React.useCallback(() => {
    handleClose('close-icon')
  }, [handleClose])

  const handleActionPress = React.useCallback(
    (action: ActionSheetAction, index: number) => {
      if (action.disabled || action.loading) {
        return
      }
      action.onPress?.(action)
      action.callback?.(action)
      onSelect?.(action, index)
      if (shouldCloseOnClickAction) {
        handleClose('action')
      }
    },
    [onSelect, handleClose, shouldCloseOnClickAction]
  )

  return (
    <Popup
      visible={visible}
      placement="bottom"
      round={round}
      safeAreaInsetBottom={safeAreaInsetBottom}
      overlay={overlay}
      lockScroll={lockScroll}
      beforeClose={handlePopupBeforeClose}
      onClickOverlay={() => closeOnClickOverlay && handleClose('overlay')}
      onClose={onClose}
      style={[
        { paddingLeft: 0, paddingRight: 0, paddingBottom: 0 },
        popupStyle,
      ]}
      {...popupProps}
    >
      <View style={[styles.panel, { backgroundColor: tokens.colors.background }]}>
        {hasTitle ? (
          <ActionSheetHeader
            title={title}
            closeable={closeable}
            closeIcon={closeIcon}
            tokens={tokens}
            onClose={handleCloseIcon}
          />
        ) : null}
        {hasDescription ? (
          <View style={[styles.descriptionContainer, createHairlineBorderBottom(tokens.colors.border)]}>
            {typeof description === 'string' || typeof description === 'number' ? (
              <Text style={[styles.description, { color: tokens.colors.description, fontSize: tokens.typography.description }]}>
                {description}
              </Text>
            ) : (
              <View style={styles.descriptionNode}>{description}</View>
            )}
          </View>
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
        {hasCancelText ? (
          <ActionSheetCancel cancelText={cancelText} tokens={tokens} onPress={handleCancel} />
        ) : null}
      </View>
    </Popup>
  )
}

const styles = StyleSheet.create({
  panel: {
    width: '100%',
    maxHeight: '80%',
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
  },
  titleNode: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  description: {
    textAlign: 'center',
    lineHeight: 20,
  },
  descriptionNode: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    width: '100%',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  itemWithIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  itemTextWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    lineHeight: 24,
  },
  subname: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
  },
  subnameNode: {
    marginTop: 4,
  },
  icon: {
    marginRight: 12,
  },
  cancelGap: {
    width: '100%',
    marginBottom: 0,
  },
  cancel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    lineHeight: 24,
  },
})

ActionSheet.displayName = 'ActionSheet'

export default ActionSheet
