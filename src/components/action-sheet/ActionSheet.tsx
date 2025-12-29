import React from 'react'
import { Pressable, StyleSheet, Text, View, type PressableStateCallbackType } from 'react-native'
import { Close } from 'react-native-system-icon'

import { useAriaPress } from '../../hooks'
import { createHairlineBorderBottom } from '../../utils/hairline'
import Loading from '../loading'
import Popup from '../popup'
import type { ActionSheetAction, ActionSheetCloseAction, ActionSheetProps } from './types'
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
}> = React.memo(({ title, closeable, closeIcon, tokens, onClose }) => {
  const closePress = useAriaPress({
    onPress: onClose,
  })

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        {typeof title === 'string' || typeof title === 'number' ? (
          <Text style={[styles.title, { color: tokens.colors.title, fontSize: tokens.typography.title }]}>{title}</Text>
        ) : (
          <View style={styles.titleNode}>{title}</View>
        )}
      </View>
      {closeable ? (
        <Pressable style={styles.closeButton} accessibilityRole="button" hitSlop={8} {...closePress.interactionProps}>
          {React.isValidElement(closeIcon)
            ? React.cloneElement(closeIcon, { fill: tokens.colors.description, color: tokens.colors.description } as any)
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
  const name = action.name
  const subname = action.subname
  const hasName = name !== undefined && name !== null && name !== false
  const hasSubname = subname !== undefined && subname !== null && subname !== false

  const hasIcon = !!action.icon

  const itemStyle = React.useCallback(
    ({ pressed }: PressableStateCallbackType) => [
      styles.item,
      hasIcon && styles.itemWithIcon,
      {
        paddingVertical: tokens.spacing.vertical,
        paddingHorizontal: tokens.spacing.horizontal,
        backgroundColor: pressed && !disabled && !loading
          ? tokens.colors.itemPressedBackground
          : tokens.colors.itemBackground,
      },
      action.style,
    ],
    [
      hasIcon,
      tokens.spacing.vertical,
      tokens.spacing.horizontal,
      disabled,
      loading,
      tokens.colors.itemBackground,
      tokens.colors.itemPressedBackground,
      action.style,
    ]
  )

  return (
    <Pressable
      style={itemStyle}
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
                  color: disabled ? tokens.colors.disabled : color,
                  fontSize: tokens.typography.item,
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
              <Text style={[styles.subname, { color: tokens.colors.subitem }]}>{subname}</Text>
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
  const cancelPress = useAriaPress({
    onPress,
    extraProps: { accessibilityRole: 'button', testID: 'rv-action-sheet-cancel' },
  })

  return (
    <>
      <View style={[styles.cancelGap, { height: tokens.spacing.cancelGap, backgroundColor: tokens.colors.cancelGapBackground }]} />
      <Pressable
        style={[
          styles.cancel,
          {
            paddingVertical: tokens.spacing.vertical,
            paddingHorizontal: tokens.spacing.horizontal,
            backgroundColor: tokens.colors.cancelBackground,
          },
        ]}
        {...cancelPress.interactionProps}
      >
        {typeof cancelText === 'string' || typeof cancelText === 'number' ? (
          <Text style={[styles.cancelText, { color: tokens.colors.cancel, fontSize: tokens.typography.item }]}>{cancelText}</Text>
        ) : (
          cancelText
        )}
      </Pressable>
    </>
  )
})

ActionSheetCancel.displayName = 'ActionSheetCancel'

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
    closeOnClickOverlay = true,
    ...popupProps
  } = props

  const shouldCloseOnClickAction = React.useMemo(
    () => closeOnClickAction ?? closeOnSelect ?? false,
    [closeOnClickAction, closeOnSelect]
  )
  const hasTitle = React.useMemo(
    () => title !== undefined && title !== null && title !== false,
    [title]
  )
  const hasDescription = React.useMemo(
    () => description !== undefined && description !== null && description !== false,
    [description]
  )
  const hasCancelText = React.useMemo(
    () => cancelText !== undefined && cancelText !== null && cancelText !== false,
    [cancelText]
  )

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

  const handlePopupBeforeClose = React.useCallback(
    async (reason: 'close-icon' | 'overlay' | 'close') => {
      if (!beforeClose) return true
      const actionMap: Record<string, ActionSheetCloseAction> = {
        'close-icon': 'close-icon',
        overlay: 'overlay',
        close: 'close',
      }
      const action = actionMap[reason] ?? 'close'
      return await runBeforeClose(action)
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
        popupProps?.style,
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
