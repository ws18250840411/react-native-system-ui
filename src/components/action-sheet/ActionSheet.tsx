import React, { useCallback, useMemo, useRef } from 'react'
import { Platform, Pressable, View, type PressableStateCallbackType } from 'react-native'
import Close from 'react-native-system-icon/Close'
import { useAriaPress } from '../../hooks'
import { createHairlineView, isRenderable, isText, renderTextOrNode } from '../../utils'
import Loading from '../loading'
import Popup from '../popup'
import type { ActionSheetAction, ActionSheetCloseAction, ActionSheetProps, ActionSheetTokens } from './types'
import { useActionSheetTokens } from './tokens'

const defaultCloseIcon = <Close size={18} />

const ActionSheetHeader: React.FC<{ title: React.ReactNode; closeable: boolean; closeIcon: React.ReactNode; tokens: ActionSheetTokens; onClose: () => void }> = React.memo(({ title, closeable, closeIcon, tokens, onClose }) => {
  const closePress = useAriaPress({ onPress: onClose })
  const { colors, typography } = tokens
  return (
    <View style={tokens.layout.header}>
      <View style={tokens.layout.titleContainer}>
        {isText(title) ? renderTextOrNode(title, [tokens.layout.title, { color: colors.title, fontSize: typography.title }]) : <View style={tokens.layout.titleNode}>{title}</View>}
      </View>
      {closeable && <Pressable style={tokens.layout.closeButton} accessibilityRole="button" hitSlop={8} {...closePress.interactionProps}>{React.isValidElement(closeIcon) ? React.cloneElement(closeIcon as React.ReactElement<{ fill?: string; color?: string }>, { fill: colors.description, color: colors.description }) : renderTextOrNode(closeIcon, [{ color: colors.description }])}</Pressable>}
    </View>
  )
})

const ActionSheetItem: React.FC<{ action: ActionSheetAction; index: number; tokens: ActionSheetTokens; onActionPress: (action: ActionSheetAction, index: number) => void }> = React.memo(({ action, index, tokens, onActionPress }) => {
  const { disabled, loading, name, subname, icon } = action
  const { colors, spacing, typography } = tokens
  const actionPress = useAriaPress({ disabled: !!disabled || !!loading, onPress: useCallback(() => onActionPress(action, index), [action, index, onActionPress]), extraProps: { accessibilityRole: Platform.OS === 'web' ? ('menuitem' as any) : 'button', accessibilityLabel: isText(name) ? String(name) : undefined, accessibilityState: { disabled: !!disabled, busy: !!loading }, testID: `rv-action-sheet-item-${index}` } })
  return (
    <Pressable style={({ pressed }: PressableStateCallbackType) => [tokens.layout.item, !!icon && tokens.layout.itemWithIcon, { paddingVertical: spacing.vertical, paddingHorizontal: spacing.horizontal, backgroundColor: pressed && !action.disabled && !action.loading ? colors.itemPressedBackground : colors.itemBackground }, action.style]} {...actionPress.interactionProps}>
      {!!icon && <View style={tokens.layout.icon}>{isText(icon) ? renderTextOrNode(icon, [{ color: colors.item }]) : icon}</View>}
      {loading ? <Loading size={20} /> : isRenderable(name) ? (
        <View style={tokens.layout.itemTextWrapper}>
          {renderTextOrNode(name, [tokens.layout.itemText, { color: action.disabled ? colors.disabled : action.color ?? colors.item, fontSize: typography.item }])}
          {isRenderable(subname) && (isText(subname) ? renderTextOrNode(subname, [tokens.layout.subname, { color: colors.subitem }]) : <View style={tokens.layout.subnameNode}>{subname}</View>)}
        </View>
      ) : null}
    </Pressable>
  )
})

const ActionSheetCancel: React.FC<{ cancelText: React.ReactNode; tokens: ActionSheetTokens; onPress: () => void }> = React.memo(({ cancelText, tokens, onPress }) => {
  const { colors, spacing, typography } = tokens
  const cancelPress = useAriaPress({ onPress, extraProps: { accessibilityRole: 'button', testID: 'rv-action-sheet-cancel' } })
  return (
    <>
      <View style={[tokens.layout.cancelGap, { height: spacing.cancelGap, backgroundColor: colors.cancelGapBackground }]} />
      <Pressable style={[tokens.layout.cancel, { paddingVertical: spacing.vertical, paddingHorizontal: spacing.horizontal, backgroundColor: colors.cancelBackground }]} {...cancelPress.interactionProps}>
        {renderTextOrNode(cancelText, [tokens.layout.cancelText, { color: colors.cancel, fontSize: typography.item }])}
      </Pressable>
    </>
  )
})

const ActionSheetImpl: React.FC<ActionSheetProps> = props => {
  const { tokensOverride, visible, title, description, cancelText, actions = [], closeOnClickAction: closeOnActP, closeOnSelect, closeable: closeableP, closeIcon = defaultCloseIcon, beforeClose, onSelect, onCancel, onClose, children, round: roundP, safeAreaInsetBottom: safeP, overlay: ovP, lockScroll: lockP, style: popStyle, ...popProps } = props; const tokens = useActionSheetTokens(tokensOverride)
  const closeable = closeableP ?? tokens.defaults.closeable; const round = roundP ?? tokens.defaults.round; const safeBottom = safeP ?? tokens.defaults.safeAreaInsetBottom; const overlay = ovP ?? tokens.defaults.overlay; const lockScroll = lockP ?? tokens.defaults.lockScroll; const closeOnAct = closeOnActP ?? closeOnSelect ?? tokens.defaults.closeOnClickAction; const hasT = isRenderable(title); const hasD = isRenderable(description); const hasC = isRenderable(cancelText)
  const lastReasonRef = useRef<ActionSheetCloseAction>('close'); const closingRef = useRef(false); const beforeCloseRef = useRef(beforeClose); beforeCloseRef.current = beforeClose; const onCloseRef = useRef(onClose); onCloseRef.current = onClose; const onCancelRef = useRef(onCancel); onCancelRef.current = onCancel; const onSelectRef = useRef(onSelect); onSelectRef.current = onSelect
  const runBefore = useCallback(async (action: Parameters<NonNullable<ActionSheetProps['beforeClose']>>[0]) => { if (!beforeCloseRef.current) return true; try { return (await beforeCloseRef.current(action)) !== false } catch { return true } }, []); const emitClose = useCallback((reason: ActionSheetCloseAction) => { if (onCloseRef.current) { if (reason === 'cancel') onCancelRef.current?.(); onCloseRef.current(); return }; onCancelRef.current?.() }, []); const reqClose = useCallback(async (action: Parameters<NonNullable<ActionSheetProps['beforeClose']>>[0]) => { if (closingRef.current) return; closingRef.current = true; try { const ok = await runBefore(action); if (!ok) return; emitClose(action) } finally { closingRef.current = false } }, [emitClose, runBefore]); const onPopupBefore = useCallback((reason: 'close-icon' | 'overlay' | 'close') => { lastReasonRef.current = reason; return runBefore(reason) }, [runBefore]); const onPopupClose = useCallback(() => { emitClose(lastReasonRef.current) }, [emitClose]); const onActPress = useCallback((action: ActionSheetAction, index: number) => { if (action.disabled || action.loading) return; action.onPress?.(action); action.callback?.(action); onSelectRef.current?.(action, index); if (closeOnAct) void reqClose('action') }, [reqClose, closeOnAct]); const popStyleMemo = useMemo(() => [tokens.layout.popup, popStyle], [tokens.layout.popup, popStyle])
  return <Popup visible={visible} placement="bottom" round={round} safeAreaInsetTop={hasT && closeable} safeAreaInsetBottom={safeBottom} overlay={overlay} lockScroll={lockScroll} beforeClose={onPopupBefore} onClose={onPopupClose} style={popStyleMemo} {...popProps}><View accessibilityRole="menu" style={[tokens.layout.panel, { backgroundColor: tokens.colors.background }]}>{hasT && <ActionSheetHeader title={title} closeable={closeable} closeIcon={closeIcon} tokens={tokens} onClose={() => void reqClose('close-icon')} />}{hasD && <View style={tokens.layout.descriptionContainer}>{isText(description) ? renderTextOrNode(description, [tokens.layout.description, { color: tokens.colors.description, fontSize: tokens.typography.description }]) : <View style={tokens.layout.descriptionNode}>{description}</View>}<View style={createHairlineView({ position: 'bottom', color: tokens.colors.border, left: 0, right: 0 })} /></View>}<View style={tokens.layout.actions}>{actions.map((action, index) => <ActionSheetItem key={action.key ?? index} action={action} index={index} tokens={tokens} onActionPress={onActPress} />)}</View>{children}{hasC && <ActionSheetCancel cancelText={cancelText} tokens={tokens} onPress={() => void reqClose('cancel')} />}</View></Popup>
}

const ActionSheet = React.memo(ActionSheetImpl)
ActionSheet.displayName = 'ActionSheet'
export default ActionSheet
