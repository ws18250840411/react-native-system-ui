import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { ActivityIndicator, Animated, Easing, Pressable, StyleSheet, View, type ViewStyle } from 'react-native'
import { useLocale } from '../config-provider/useLocale'
import { nativeDriverEnabled } from '../../platform'
import { useReducedMotion } from '../../hooks/animation'
import { createHairlineView } from '../../utils/hairline'
import { isPromiseLike } from '../../utils/promise'
import { isNumber, isValidNode } from '../../utils/validate'
import { renderTextOrNode } from '../../utils'
import { Close } from 'react-native-system-icon'
import Button from '../button'
import Popup from '../popup'
import type { DialogProps } from './types'
import { useDialogTokens, type DialogTokens } from './tokens'

interface ActionButtonProps { text: React.ReactNode; color?: string; tokens: DialogTokens; dividerPosition?: 'left' | 'right' | 'none'; loading?: boolean; disabled?: boolean; onPress?: () => void }

const ActionButton = (props: ActionButtonProps) => {
  const { text, color, tokens, dividerPosition = 'none', loading, disabled, onPress } = props
  const txtColor = color ?? tokens.colors.confirm
  const divStyle = dividerPosition === 'none' ? null : [S.btnDiv, { width: 0 }, createHairlineView({ position: dividerPosition, color: tokens.colors.divider, top: 0, bottom: 0, [dividerPosition]: 0 })]
  return (
    <Pressable accessibilityRole="button" disabled={disabled || loading} style={({ pressed }) => [S.btn, { height: tokens.sizes.actionHeight, opacity: pressed && !disabled && !loading ? 0.8 : 1 }]} onPress={disabled || loading ? undefined : onPress}>
      {divStyle && <View style={divStyle} pointerEvents="none" />}
      {loading ? <ActivityIndicator size="small" color={txtColor} /> : renderTextOrNode(text ?? '', { color: txtColor, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.actionSize, fontWeight: tokens.typography.actionWeight })}
    </Pressable>
  )
}

const DialogImpl: React.FC<DialogProps> = props => {
  const locale = useLocale(); const { visible, title, message, messageAlign = 'center', theme = 'default', width, closeable = false, closeIcon, overlay = true, overlayStyle, overlayTestID = 'dialog-overlay', closeOnBackPress = false, closeOnPopstate = true, closeOnOverlayPress = false, closeOnClickOverlay = false, onClickOverlay, onClickCloseIcon, beforeClose, showCancelButton = false, showConfirmButton = true, cancelButtonText, cancelButtonColor, cancelProps, confirmButtonText, confirmButtonColor, confirmProps, footer, contentStyle, titleStyle, messageStyle, tokensOverride, style, children, onCancel, onConfirm, onClose, onClosed, ...rest } = props; const tokens = useDialogTokens(tokensOverride); const reducedMotion = useReducedMotion(); const hTitle = isValidNode(title); const hMsg = isValidNode(message); const hChildren = isValidNode(children); const hContent = hMsg || hChildren; const hFooterActions = showCancelButton || showConfirmButton; const isRound = theme === 'round-button'; const cancelLoad = cancelProps?.loading; const confirmLoad = confirmProps?.loading; const cancelTxt = cancelButtonText ?? locale.cancel; const confirmTxt = confirmButtonText ?? locale.confirm
  const seqRef = useRef(0); const beforeCloseRef = useRef(beforeClose); beforeCloseRef.current = beforeClose; const onCloseRef = useRef(onClose); onCloseRef.current = onClose; const onCancelRef = useRef(onCancel); onCancelRef.current = onCancel; const onConfirmRef = useRef(onConfirm); onConfirmRef.current = onConfirm; const onClickCloseIconRef = useRef(onClickCloseIcon); onClickCloseIconRef.current = onClickCloseIcon; const cancelLoadRef = useRef(cancelLoad); cancelLoadRef.current = cancelLoad; const confirmLoadRef = useRef(confirmLoad); confirmLoadRef.current = confirmLoad
  const run = useCallback((action: 'confirm' | 'cancel' | 'close', handler?: () => void) => { seqRef.current += 1; const seq = seqRef.current; const bc = beforeCloseRef.current; if (!bc) { handler?.(); return }; let result: ReturnType<NonNullable<typeof beforeClose>>; try { result = bc(action) } catch { handler?.(); return }; if (result === false) return; if (isPromiseLike(result)) { void result.then(resolved => { if (resolved === false) return; if (seqRef.current !== seq) return; handler?.() }).catch(() => { if (seqRef.current !== seq) return; handler?.() }); return }; handler?.() }, []); const handleCloseIcon = useCallback(() => { onClickCloseIconRef.current?.(); run('close', () => onCloseRef.current?.()) }, [run]); const handleCancel = useCallback(() => { if (cancelLoadRef.current) return; run('cancel', () => onCancelRef.current?.()) }, [run]); const handleConfirm = useCallback(() => { if (confirmLoadRef.current) return; run('confirm', () => onConfirmRef.current?.()) }, [run])
  const scaleAnim = useRef(new Animated.Value(0.7)).current; const scaleRef = useRef<Animated.CompositeAnimation | null>(null); useEffect(() => { scaleRef.current?.stop(); scaleAnim.setValue(visible ? 0.7 : 1); const anim = Animated.timing(scaleAnim, { toValue: visible ? 1 : 0.9, duration: reducedMotion ? 0 : 300, easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic), useNativeDriver: nativeDriverEnabled, isInteraction: false }); scaleRef.current = anim; anim.start() }, [scaleAnim, visible, reducedMotion]); useEffect(() => () => { scaleRef.current?.stop() }, [])
  const widthStyle = useMemo(() => width ? isNumber(width) ? { width } : { width: String(width) as ViewStyle['width'] } : { width: '90%' as ViewStyle['width'], maxWidth: tokens.sizes.maxWidth }, [tokens.sizes.maxWidth, width]); const titleWrapStyle = useMemo(() => hTitle ? [S.titleWrap, { paddingTop: hContent ? tokens.spacing.titlePaddingTop : tokens.spacing.titleIsolatedPadding, paddingBottom: hContent ? 0 : tokens.spacing.titleIsolatedPadding, paddingHorizontal: hContent ? tokens.spacing.paddingHorizontal : 0, marginBottom: hContent ? tokens.spacing.titleGap : 0 }] : null, [hContent, hTitle, tokens.spacing.paddingHorizontal, tokens.spacing.titleGap, tokens.spacing.titleIsolatedPadding, tokens.spacing.titlePaddingTop]); const titleTxtStyle = useMemo(() => hTitle ? [S.title, { color: tokens.colors.title, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.titleSize, lineHeight: tokens.typography.titleLineHeight, fontWeight: tokens.typography.titleWeight }, titleStyle] : null, [hTitle, titleStyle, tokens.colors.title, tokens.typography.fontFamily, tokens.typography.titleLineHeight, tokens.typography.titleSize, tokens.typography.titleWeight]); const msgTxtStyle = useMemo(() => [S.msg, { color: isRound ? tokens.colors.title : tokens.colors.message, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.messageSize, lineHeight: tokens.typography.messageLineHeight, textAlign: messageAlign }, messageStyle], [isRound, messageAlign, messageStyle, tokens.colors.message, tokens.colors.title, tokens.typography.fontFamily, tokens.typography.messageLineHeight, tokens.typography.messageSize]); const msgContentStyle = useMemo(() => !hChildren ? { alignItems: messageAlign === 'center' ? ('center' as const) : messageAlign === 'left' ? ('flex-start' as const) : ('flex-end' as const) } : null, [hChildren, messageAlign]); const msgWrapStyle = useMemo(() => [S.msgWrap, { paddingTop: hTitle ? tokens.spacing.messagePaddingTop : tokens.spacing.messagePadding, paddingBottom: isRound ? tokens.spacing.roundFooterPadding : tokens.spacing.messagePadding, paddingHorizontal: tokens.spacing.messagePaddingHorizontal }], [hTitle, isRound, tokens.spacing.messagePadding, tokens.spacing.messagePaddingHorizontal, tokens.spacing.messagePaddingTop, tokens.spacing.roundFooterPadding]); const footerBorderStyle = useMemo(() => ([S.footerBorder, createHairlineView({ position: 'top', color: tokens.colors.divider, left: 0, right: 0, top: 0 })]), [tokens.colors.divider]); const mergeOverlay = closeOnOverlayPress || closeOnClickOverlay; const animStyle = useMemo(() => ({ transform: [{ scale: scaleAnim }] }), [scaleAnim]); const roundFooterStyle = useMemo(() => [S.roundFooter, { paddingTop: tokens.spacing.messagePaddingTop, paddingHorizontal: tokens.spacing.messagePaddingHorizontal, paddingBottom: tokens.spacing.roundFooterPadding }], [tokens.spacing.messagePaddingHorizontal, tokens.spacing.messagePaddingTop, tokens.spacing.roundFooterPadding]); const popupBc = useCallback(() => { const bc = beforeCloseRef.current; if (!bc) return true; try { return bc('close') } catch { return true } }, [])
  const roundFooterNode = useMemo(() => (hFooterActions && (
    <View style={roundFooterStyle}>
      {showCancelButton && <View style={[S.roundBtnWrap, showConfirmButton && { marginRight: tokens.spacing.roundFooterGap }]}>
        <Button block round type="warning" text={cancelTxt} color={cancelButtonColor} loading={cancelLoad} disabled={cancelProps?.disabled} onPress={handleCancel} style={{ minHeight: tokens.sizes.roundButtonHeight }} />
      </View>}
      {showConfirmButton && <View style={[S.roundBtnWrap, showCancelButton && { marginLeft: tokens.spacing.roundFooterGap }]}>
        <Button block round type="danger" text={confirmTxt} color={confirmButtonColor} loading={confirmLoad} disabled={confirmProps?.disabled} onPress={handleConfirm} style={{ minHeight: tokens.sizes.roundButtonHeight }} />
      </View>}
    </View>
  )), [cancelButtonColor, cancelLoad, cancelProps?.disabled, cancelTxt, confirmButtonColor, confirmLoad, confirmProps?.disabled, confirmTxt, handleCancel, handleConfirm, hFooterActions, roundFooterStyle, showCancelButton, showConfirmButton, tokens.sizes.roundButtonHeight, tokens.spacing.roundFooterGap])
  const defaultFooterNode = useMemo(() => (hFooterActions && (
    <View style={S.footer}>
      <View style={footerBorderStyle} pointerEvents="none" />
      {showCancelButton && <ActionButton tokens={tokens} text={cancelTxt} color={cancelButtonColor ?? tokens.colors.cancel} dividerPosition="none" loading={cancelLoad} disabled={cancelProps?.disabled} onPress={handleCancel} />}
      {showConfirmButton && <ActionButton tokens={tokens} text={confirmTxt} color={confirmButtonColor ?? tokens.colors.confirm} dividerPosition={showCancelButton ? 'left' : 'none'} loading={confirmLoad} disabled={confirmProps?.disabled} onPress={handleConfirm} />}
    </View>
  )), [cancelButtonColor, cancelLoad, cancelProps?.disabled, cancelTxt, confirmButtonColor, confirmLoad, confirmProps?.disabled, confirmTxt, footerBorderStyle, handleCancel, handleConfirm, hFooterActions, showCancelButton, showConfirmButton, tokens])
  const footerNode = useMemo(() => footer ?? (isRound ? roundFooterNode : defaultFooterNode), [defaultFooterNode, footer, isRound, roundFooterNode]); const popupStyle = useMemo(() => [{ backgroundColor: tokens.colors.background, borderRadius: tokens.sizes.borderRadius, padding: 0 }, widthStyle, style], [style, tokens.colors.background, tokens.sizes.borderRadius, widthStyle])
  return (
    <Popup visible={visible} placement="center" round overlay={overlay} overlayStyle={overlayStyle} overlayTestID={overlayTestID} closeOnBackPress={closeOnBackPress} closeOnPopstate={closeOnPopstate} closeOnClickOverlay={mergeOverlay} onClickOverlay={onClickOverlay} beforeClose={popupBc} onClose={onClose} onClosed={onClosed} contentAnimationStyle={animStyle} style={popupStyle} accessibilityRole={'alertdialog' as any} accessibilityLabel={typeof title === 'string' ? title : undefined} {...rest}>
      {closeable && <Pressable style={[S.closeIcon, { top: tokens.spacing.paddingTop / 2, right: tokens.spacing.paddingHorizontal / 2, padding: tokens.spacing.closeIconPadding }]} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={handleCloseIcon}>
        {closeIcon ?? <Close size={tokens.sizes.closeSize} fill={tokens.colors.closeIcon} color={tokens.colors.closeIcon} />}
      </Pressable>}
      {hTitle && <View style={titleWrapStyle}>{renderTextOrNode(title, titleTxtStyle)}</View>}
      {hContent && <View style={[S.content, msgContentStyle, contentStyle]}>
        {hChildren ? children : <View style={msgWrapStyle}>{renderTextOrNode(message, msgTxtStyle)}</View>}
      </View>}
      {footerNode}
    </Popup>
  )
}

const S = StyleSheet.create({ titleWrap: { alignItems: 'center' }, title: { textAlign: 'center' }, content: { width: '100%' }, msg: { textAlign: 'center' }, footer: { flexDirection: 'row', position: 'relative' }, footerBorder: { position: 'absolute', top: 0, left: 0, right: 0, height: 0 }, btn: { flex: 1, alignItems: 'center', justifyContent: 'center' }, btnDiv: { position: 'absolute', pointerEvents: 'none' }, msgWrap: { width: '100%' }, roundFooter: { width: '100%', flexDirection: 'row' }, roundBtnWrap: { flex: 1 }, closeIcon: { position: 'absolute', zIndex: 1 } })
export const Dialog = React.memo(DialogImpl)
export default Dialog
