import React, { useCallback, useMemo, useRef } from 'react'
import { Pressable, Text, View, type PressableStateCallbackType } from 'react-native'
import { Close } from 'react-native-system-icon'

import { useAriaPress } from '../../hooks'
import { createHairlineView, isRenderable, isText } from '../../utils'
import { renderTextOrNode } from '../../utils'
import Loading from '../loading'
import Popup from '../popup'
import type { ActionSheetAction, ActionSheetCloseAction, ActionSheetProps, ActionSheetTokens } from './types'
import { useActionSheetTokens } from './tokens'

const defaultCloseIcon = <Close size={18} />

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
    <View style={tokens.layout.header}>
      <View style={tokens.layout.titleContainer}>
        {isText(title) ? (
          renderTextOrNode(title, [tokens.layout.title, { color: colors.title, fontSize: typography.title }])
        ) : (
          <View style={tokens.layout.titleNode}>{title}</View>
        )}
      </View>
      {closeable && (
        <Pressable
          style={tokens.layout.closeButton}
          accessibilityRole="button"
          hitSlop={8}
          {...closePress.interactionProps}
        >
          {React.isValidElement(closeIcon)
            ? React.cloneElement(closeIcon as React.ReactElement<{ fill?: string; color?: string }>, {
              fill: colors.description,
              color: colors.description,
            })
            : closeIcon}
        </Pressable>
      )}
    </View>
  )
})

ActionSheetHeader.displayName = 'ActionSheetHeader'

const ActionSheetItem: React.FC<{
  action: ActionSheetAction
  index: number
  tokens: ActionSheetTokens
  onActionPress: (action: ActionSheetAction, index: number) => void
}> = React.memo(({ action, index, tokens, onActionPress }) => {
  const { disabled, loading, name, subname, icon } = action
  const { colors, spacing, typography } = tokens
  const actionPress = useAriaPress({
    disabled: !!disabled || !!loading,
    onPress: useCallback(() => onActionPress(action, index), [action, index, onActionPress]),
    extraProps: {
      accessibilityRole: 'menuitem' as any,
      accessibilityLabel: isText(name) ? String(name) : undefined,
      accessibilityState: { disabled: !!disabled, busy: !!loading },
      testID: `rv-action-sheet-item-${index}`,
    },
  })

  const color = action.color ?? colors.item

  return (
    <Pressable
      style={({ pressed }: PressableStateCallbackType) => [
        tokens.layout.item,
        !!icon && tokens.layout.itemWithIcon,
        {
          paddingVertical: spacing.vertical,
          paddingHorizontal: spacing.horizontal,
          backgroundColor: pressed && !action.disabled && !action.loading ? colors.itemPressedBackground : colors.itemBackground,
        },
        action.style,
      ]}
      {...actionPress.interactionProps}
    >
      {!!icon && <View style={tokens.layout.icon}>{icon}</View>}
      {loading ? (
        <Loading size={20} />
      ) : isRenderable(name) ? (
        <View style={tokens.layout.itemTextWrapper}>
          {renderTextOrNode(
            name,
            [tokens.layout.itemText, { color: action.disabled ? colors.disabled : color, fontSize: typography.item }]
          )}
          {isRenderable(subname) && (
            isText(subname) ? (
              renderTextOrNode(subname, [tokens.layout.subname, { color: colors.subitem }])
            ) : (
              <View style={tokens.layout.subnameNode}>{subname}</View>
            )
          )}
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
      <View
        style={[
          tokens.layout.cancelGap,
          { height: spacing.cancelGap, backgroundColor: colors.cancelGapBackground },
        ]}
      />
      <Pressable
        style={[
          tokens.layout.cancel,
          {
            paddingVertical: spacing.vertical,
            paddingHorizontal: spacing.horizontal,
            backgroundColor: colors.cancelBackground,
          },
        ]}
        {...cancelPress.interactionProps}
      >
        {renderTextOrNode(cancelText, [tokens.layout.cancelText, { color: colors.cancel, fontSize: typography.item }])}
      </Pressable>
    </>
  )
})

ActionSheetCancel.displayName = 'ActionSheetCancel'

const ActionSheetImpl: React.FC<ActionSheetProps> = props => {
  const {
    tokensOverride,
    visible,
    title,
    description,
    cancelText,
    actions = [],
    closeOnClickAction: closeOnClickActionProp,
    closeOnSelect,
    closeable: closeableProp,
    closeIcon = defaultCloseIcon,
    beforeClose,
    onSelect,
    onCancel,
    onClose,
    children,
    round: roundProp,
    safeAreaInsetBottom: safeAreaInsetBottomProp,
    overlay: overlayProp,
    lockScroll: lockScrollProp,
    style: popupStyle,
    ...popupProps
  } = props

  const tokens = useActionSheetTokens(tokensOverride)
  const closeable = closeableProp ?? tokens.defaults.closeable
  const round = roundProp ?? tokens.defaults.round
  const safeAreaInsetBottom = safeAreaInsetBottomProp ?? tokens.defaults.safeAreaInsetBottom
  const overlay = overlayProp ?? tokens.defaults.overlay
  const lockScroll = lockScrollProp ?? tokens.defaults.lockScroll
  const shouldCloseOnClickAction =
    closeOnClickActionProp ?? closeOnSelect ?? tokens.defaults.closeOnClickAction

  const hasTitle = isRenderable(title)
  const hasDescription = isRenderable(description)
  const hasCancelText = isRenderable(cancelText)

  const lastPopupCloseReasonRef = useRef<ActionSheetCloseAction>('close')
  const closingRef = useRef(false)
  const beforeCloseRef = useRef(beforeClose)
  beforeCloseRef.current = beforeClose
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const onCancelRef = useRef(onCancel)
  onCancelRef.current = onCancel
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  const runBeforeClose = useCallback(
    async (action: Parameters<NonNullable<ActionSheetProps['beforeClose']>>[0]) => {
      if (!beforeCloseRef.current) return true
      try {
        return (await beforeCloseRef.current(action)) !== false
      } catch (error) {
        return true
      }
    },
    [],
  )

  const emitClose = useCallback(
    (reason: ActionSheetCloseAction) => {
      if (onCloseRef.current) {
        if (reason === 'cancel') {
          onCancelRef.current?.()
        }
        onCloseRef.current()
        return
      }
      onCancelRef.current?.()
    },
    []
  )

  const requestClose = useCallback(
    async (action: Parameters<NonNullable<ActionSheetProps['beforeClose']>>[0]) => {
      if (closingRef.current) return
      closingRef.current = true
      try {
        const allowed = await runBeforeClose(action)
        if (!allowed) return
        emitClose(action)
      } finally {
        closingRef.current = false
      }
    },
    [emitClose, runBeforeClose],
  )

  const handlePopupBeforeClose = useCallback(
    (reason: 'close-icon' | 'overlay' | 'close') => {
      lastPopupCloseReasonRef.current = reason
      return runBeforeClose(reason)
    },
    [runBeforeClose]
  )

  const handlePopupClose = useCallback(() => {
    emitClose(lastPopupCloseReasonRef.current)
  }, [emitClose])

  const handleCancel = useCallback(() => {
    void requestClose('cancel')
  }, [requestClose])

  const handleCloseIcon = useCallback(() => {
    void requestClose('close-icon')
  }, [requestClose])

  const handleActionPress = useCallback(
    (action: ActionSheetAction, index: number) => {
      if (action.disabled || action.loading) {
        return
      }
      action.onPress?.(action)
      action.callback?.(action)
      onSelectRef.current?.(action, index)
      if (shouldCloseOnClickAction) {
        void requestClose('action')
      }
    },
    [requestClose, shouldCloseOnClickAction]
  )

  const popupStyleMemo = [tokens.layout.popup, popupStyle]

  const panelStyle = [tokens.layout.panel, { backgroundColor: tokens.colors.background }]

  const headerNode = useMemo(() => (
    hasTitle && (
      <ActionSheetHeader
        title={title}
        closeable={closeable}
        closeIcon={closeIcon}
        tokens={tokens}
        onClose={handleCloseIcon}
      />
    )
  ), [closeIcon, closeable, handleCloseIcon, hasTitle, title, tokens])

  const descriptionNode = useMemo(() => (
    hasDescription && (
      <View
        style={tokens.layout.descriptionContainer}
      >
        {isText(description) ? (
          renderTextOrNode(description, [
            tokens.layout.description,
            { color: tokens.colors.description, fontSize: tokens.typography.description },
          ])
        ) : (
          <View style={tokens.layout.descriptionNode}>{description}</View>
        )}
        <View style={createHairlineView({ position: 'bottom', color: tokens.colors.border, left: 0, right: 0 })} />
      </View>
    )
  ), [
    description,
    hasDescription,
    tokens.colors.border,
    tokens.colors.description,
    tokens.layout.description,
    tokens.layout.descriptionContainer,
    tokens.layout.descriptionNode,
    tokens.typography.description,
  ])

  const actionNodes = useMemo(
    () => actions.map((action, index) => (
      <ActionSheetItem
        key={action.key ?? index}
        action={action}
        index={index}
        tokens={tokens}
        onActionPress={handleActionPress}
      />
    )),
    [actions, handleActionPress, tokens]
  )

  const cancelNode = useMemo(
    () => (hasCancelText && (
      <ActionSheetCancel cancelText={cancelText} tokens={tokens} onPress={handleCancel} />
    )),
    [cancelText, handleCancel, hasCancelText, tokens]
  )

  return (
    <Popup
      visible={visible}
      placement="bottom"
      round={round}
      safeAreaInsetTop={hasTitle && closeable}
      safeAreaInsetBottom={safeAreaInsetBottom}
      overlay={overlay}
      lockScroll={lockScroll}
      beforeClose={handlePopupBeforeClose}
      onClose={handlePopupClose}
      style={popupStyleMemo}
      {...popupProps}
    >
      <View accessibilityRole="menu" style={panelStyle}>
        {headerNode}
        {descriptionNode}
        <View style={tokens.layout.actions}>
          {actionNodes}
        </View>
        {children}
        {cancelNode}
      </View>
    </Popup>
  )
}

const ActionSheet = React.memo(ActionSheetImpl)
ActionSheet.displayName = 'ActionSheet'

export default ActionSheet
