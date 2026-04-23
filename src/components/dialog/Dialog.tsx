import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, Animated, Easing, Platform, Pressable, StyleSheet, View, type ViewStyle } from 'react-native'
import { useLocale } from '../config-provider/loc'
import { nativeDriverEnabled } from '../../platform/animation'
import { useReducedMotion } from '../../hooks/animation'
import { createHairlineView } from '../../utils/hairline'
import { isNumber, isPromiseLike, isValidNode } from '../../utils/base'
import { renderTextOrNode } from '../../utils/render'
import { Close } from '../../internal/icons'
import Button from '../button'
import Popup from '../popup'
import type { DialogProps } from './types'
import { useDialogTokens, type DialogTokens } from './tokens'

interface ActionButtonProps { text: React.ReactNode; color?: string; tokens: DialogTokens; dividerPosition?: 'left' | 'right' | 'none'; loading?: boolean; disabled?: boolean; onPress?: () => void }

const ActionButton = (props: ActionButtonProps) => {
  const { text, color, tokens, dividerPosition = 'none', loading, disabled, onPress } = props
  const textColor = color ?? tokens.colors.confirm
  const dividerStyle = dividerPosition === 'none'
    ? null
    : [DIALOG_BUTTON_STYLES.buttonDivider, { width: 0 }, createHairlineView({ position: dividerPosition, color: tokens.colors.divider, top: 0, bottom: 0, [dividerPosition]: 0 })]
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={({ pressed }) => [DIALOG_BUTTON_STYLES.button, { height: tokens.sizes.actionHeight, opacity: pressed && !disabled && !loading ? 0.8 : 1 }]}
      onPress={disabled || loading ? undefined : onPress}
    >
      {dividerStyle && <View style={dividerStyle} />}
      {loading
        ? <ActivityIndicator size="small" color={textColor} />
        : renderTextOrNode(text ?? '', { color: textColor, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.actionSize, fontWeight: tokens.typography.actionWeight })}
    </Pressable>
  )
}

const DIALOG_BUTTON_STYLES = StyleSheet.create({ button: { flex: 1, alignItems: 'center', justifyContent: 'center' }, buttonDivider: { position: 'absolute', pointerEvents: 'none' } })
const DialogImpl: React.FC<DialogProps> = props => {
  const locale = useLocale(); const { visible, title, message, messageAlign = 'center', theme = 'default', width, closeable = false, closeIcon, overlay = true, overlayStyle, overlayTestID = 'dialog-overlay', closeOnBackPress = false, closeOnPopstate = true, closeOnOverlayPress = false, closeOnClickOverlay = false, onClickOverlay, onClickCloseIcon, beforeClose, showCancelButton = false, showConfirmButton = true, cancelButtonText, cancelButtonColor, cancelProps, confirmButtonText, confirmButtonColor, confirmProps, footer, contentStyle, titleStyle, messageStyle, tokensOverride, style, children, onCancel, onConfirm, onClose, onClosed, ...rest } = props; const tokens = useDialogTokens(tokensOverride); const reducedMotion = useReducedMotion(); const hTitle = isValidNode(title); const hChildren = isValidNode(children); const hContent = isValidNode(message) || hChildren; const hFooterActions = showCancelButton || showConfirmButton; const isRound = theme === 'round-button'; const cancelLoad = cancelProps?.loading; const confirmLoad = confirmProps?.loading; const cancelTxt = cancelButtonText ?? locale.cancel; const confirmTxt = confirmButtonText ?? locale.confirm
  const $ = useRef({ seq: 0, beforeClose, onClose, onCancel, onConfirm, onClickCloseIcon, cancelLoad, confirmLoad }); Object.assign($.current, { beforeClose, onClose, onCancel, onConfirm, onClickCloseIcon, cancelLoad, confirmLoad })
  const run = (action: 'confirm' | 'cancel' | 'close', handler?: () => void) => { const c = $.current; c.seq += 1; const seq = c.seq; const bc = c.beforeClose; if (!bc) { handler?.(); return }; let result: ReturnType<NonNullable<typeof beforeClose>>; try { result = bc(action) } catch { return }; if (result === false) return; if (isPromiseLike(result)) { void result.then(resolved => { if (resolved === false || $.current.seq !== seq) return; handler?.() }).catch(() => undefined); return }; handler?.() }; const handleCloseIcon = () => { $.current.onClickCloseIcon?.(); run('close', () => $.current.onClose?.()) }; const handleCancel = () => { if ($.current.cancelLoad) return; run('cancel', () => $.current.onCancel?.()) }; const handleConfirm = () => { if ($.current.confirmLoad) return; run('confirm', () => $.current.onConfirm?.()) }
  const scaleAnim = useRef(new Animated.Value(0.7)).current; const scaleRef = useRef<Animated.CompositeAnimation | null>(null); useEffect(() => { scaleRef.current?.stop(); scaleAnim.setValue(visible ? 0.7 : 1); const anim = Animated.timing(scaleAnim, { toValue: visible ? 1 : 0.9, duration: reducedMotion ? 0 : 300, easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic), useNativeDriver: nativeDriverEnabled, isInteraction: false }); scaleRef.current = anim; anim.start() }, [scaleAnim, visible, reducedMotion]); useEffect(() => () => { scaleRef.current?.stop() }, []); const animStyle = { transform: [{ scale: scaleAnim }] }
  const titleStyles = hTitle ? { wrap: [S.titleWrap, { paddingTop: hContent ? tokens.spacing.titlePaddingTop : tokens.spacing.titleIsolatedPadding, paddingBottom: hContent ? 0 : tokens.spacing.titleIsolatedPadding, paddingHorizontal: hContent ? tokens.spacing.paddingHorizontal : 0, marginBottom: hContent ? tokens.spacing.titleGap : 0 }], text: [S.title, { color: tokens.colors.title, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.titleSize, lineHeight: tokens.typography.titleLineHeight, fontWeight: tokens.typography.titleWeight }, titleStyle] } : null
  const msgStyles = { text: [S.msg, { color: isRound ? tokens.colors.title : tokens.colors.message, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.messageSize, lineHeight: tokens.typography.messageLineHeight, textAlign: messageAlign }, messageStyle], content: !hChildren ? { alignItems: messageAlign === 'center' ? ('center' as const) : messageAlign === 'left' ? ('flex-start' as const) : ('flex-end' as const) } : null, wrap: [S.msgWrap, { paddingTop: hTitle ? tokens.spacing.messagePaddingTop : tokens.spacing.messagePadding, paddingBottom: isRound ? tokens.spacing.roundFooterPadding : tokens.spacing.messagePadding, paddingHorizontal: tokens.spacing.messagePaddingHorizontal }] }
  const footerBorderStyle = [S.footerBorder, createHairlineView({ position: 'top', color: tokens.colors.divider, left: 0, right: 0, top: 0 })]
  const roundFooterStyle = [S.roundFooter, { paddingTop: tokens.spacing.messagePaddingTop, paddingHorizontal: tokens.spacing.messagePaddingHorizontal, paddingBottom: tokens.spacing.roundFooterPadding }]
  const popupStyle = [{ backgroundColor: tokens.colors.background, borderRadius: tokens.sizes.borderRadius, padding: 0 }, width ? isNumber(width) ? { width } : { width: String(width) as ViewStyle['width'] } : { width: '90%' as ViewStyle['width'], maxWidth: tokens.sizes.maxWidth }, style]
  const popupBc = () => { const bc = $.current.beforeClose; if (!bc) return true; try { return bc('close') } catch { return false } }
  const roundFooterNode = hFooterActions && <View style={roundFooterStyle}>{showCancelButton && <View style={[S.roundBtnWrap, showConfirmButton && { marginRight: tokens.spacing.roundFooterGap }]}><Button block round type="warning" text={cancelTxt} color={cancelButtonColor} loading={cancelLoad} disabled={cancelProps?.disabled} onPress={handleCancel} style={{ minHeight: tokens.sizes.roundButtonHeight }} /></View>}{showConfirmButton && <View style={[S.roundBtnWrap, showCancelButton && { marginLeft: tokens.spacing.roundFooterGap }]}><Button block round type="danger" text={confirmTxt} color={confirmButtonColor} loading={confirmLoad} disabled={confirmProps?.disabled} onPress={handleConfirm} style={{ minHeight: tokens.sizes.roundButtonHeight }} /></View>}</View>
  const defaultFooterNode = hFooterActions && <View style={S.footer}><View style={[footerBorderStyle, { pointerEvents: 'none' }]} />{showCancelButton && <ActionButton tokens={tokens} text={cancelTxt} color={cancelButtonColor ?? tokens.colors.cancel} dividerPosition="none" loading={cancelLoad} disabled={cancelProps?.disabled} onPress={handleCancel} />}{showConfirmButton && <ActionButton tokens={tokens} text={confirmTxt} color={confirmButtonColor ?? tokens.colors.confirm} dividerPosition={showCancelButton ? 'left' : 'none'} loading={confirmLoad} disabled={confirmProps?.disabled} onPress={handleConfirm} />}</View>
  const footerNode = footer ?? (isRound ? roundFooterNode : defaultFooterNode); return <Popup visible={visible} placement="center" round overlay={overlay} overlayStyle={overlayStyle} overlayTestID={overlayTestID} closeOnBackPress={closeOnBackPress} closeOnPopstate={closeOnPopstate} closeOnClickOverlay={closeOnOverlayPress || closeOnClickOverlay} onClickOverlay={onClickOverlay} beforeClose={popupBc} onClose={onClose} onClosed={onClosed} contentAnimationStyle={animStyle} style={popupStyle} accessibilityRole={Platform.OS === 'android' ? 'alert' : ('alertdialog' as any)} accessibilityLabel={typeof title === 'string' ? title : undefined} {...rest}>{closeable && <Pressable style={[S.closeIcon, { top: tokens.spacing.paddingTop / 2, right: tokens.spacing.paddingHorizontal / 2, padding: tokens.spacing.closeIconPadding }]} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={handleCloseIcon}>{closeIcon ?? <Close size={tokens.sizes.closeSize} fill={tokens.colors.closeIcon} color={tokens.colors.closeIcon} />}</Pressable>}{titleStyles && <View style={titleStyles.wrap}>{renderTextOrNode(title, titleStyles.text)}</View>}{hContent && <View style={[S.content, msgStyles.content, contentStyle]}>{hChildren ? children : <View style={msgStyles.wrap}>{renderTextOrNode(message, msgStyles.text)}</View>}</View>}{footerNode}</Popup>
}
const S = StyleSheet.create({ titleWrap: { alignItems: 'center' }, title: { textAlign: 'center' }, content: { width: '100%' }, msg: { textAlign: 'center' }, footer: { flexDirection: 'row', position: 'relative' }, footerBorder: { position: 'absolute', top: 0, left: 0, right: 0, height: 0 }, msgWrap: { width: '100%' }, roundFooter: { width: '100%', flexDirection: 'row' }, roundBtnWrap: { flex: 1 }, closeIcon: { position: 'absolute', zIndex: 1 } })
export const Dialog = React.memo(DialogImpl); Dialog.displayName = 'Dialog'; export default Dialog
