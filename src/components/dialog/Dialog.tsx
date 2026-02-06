import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { ActivityIndicator, Animated, Easing, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native'

import { useLocale } from '../config-provider/useLocale'
import { nativeDriverEnabled } from '../../platform'
import { createHairlineView } from '../../utils/hairline'
import { isPromiseLike } from '../../utils/promise'
import { isNumber, isValidNode } from '../../utils/validate'
import { renderTextOrNode } from '../../utils'
import { Close } from 'react-native-system-icon'
import Button from '../button'
import Popup from '../popup'
import type { DialogProps } from './types'
import { useDialogTokens, type DialogTokens } from './tokens'

interface ActionButtonProps {
  text: React.ReactNode
  color?: string
  tokens: DialogTokens
  dividerPosition?: 'left' | 'right' | 'none'
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
}

const ActionButton = (props: ActionButtonProps) => {
  const { text, color, tokens, dividerPosition = 'none', loading, disabled, onPress } = props
  const textColor = color ?? tokens.colors.confirm

  const dividerStyle =
    dividerPosition === 'none'
      ? null
      : [
        styles.actionButtonDivider,
        { width: 0 },
        createHairlineView({
          position: dividerPosition,
          color: tokens.colors.divider,
          top: 0,
          bottom: 0,
          [dividerPosition]: 0,
        }),
      ]

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.actionButton,
        {
          height: tokens.sizes.actionHeight,
          opacity: pressed && !disabled && !loading ? 0.8 : 1,
        },
      ]}
      onPress={disabled || loading ? undefined : onPress}
    >
      {dividerStyle && <View style={dividerStyle} pointerEvents="none" />}
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        renderTextOrNode(text ?? '', {
          color: textColor,
          fontSize: tokens.typography.actionSize,
          fontWeight: tokens.typography.actionWeight,
        })
      )}
    </Pressable>
  )
}

const DialogImpl: React.FC<DialogProps> = props => {
  const locale = useLocale()

  const {
    visible,
    title,
    message,
    messageAlign = 'center',
    theme = 'default',
    width,
    closeable = false,
    closeIcon,
    overlay = true,
    overlayStyle,
    overlayTestID = 'dialog-overlay',
    closeOnBackPress = false,
    closeOnPopstate = true,
    closeOnOverlayPress = false,
    closeOnClickOverlay = false,
    onClickOverlay,
    onClickCloseIcon,
    beforeClose,
    showCancelButton = false,
    showConfirmButton = true,
    cancelButtonText,
    cancelButtonColor,
    cancelProps,
    confirmButtonText,
    confirmButtonColor,
    confirmProps,
    footer,
    contentStyle,
    titleStyle,
    messageStyle,
    tokensOverride,
    style,
    children,
    onCancel,
    onConfirm,
    onClose,
    onClosed,
    ...rest
  } = props

  const tokens = useDialogTokens(tokensOverride)
  const hasTitle = isValidNode(title)
  const hasMessage = isValidNode(message)
  const hasChildren = isValidNode(children)
  const hasContent = hasMessage || hasChildren
  const hasFooterActions = showCancelButton || showConfirmButton
  const isRoundTheme = theme === 'round-button'
  const cancelLoading = cancelProps?.loading
  const confirmLoading = confirmProps?.loading
  const cancelText = cancelButtonText ?? locale.cancel
  const confirmText = confirmButtonText ?? locale.confirm
  const actionSeqRef = useRef(0)
  const beforeCloseRef = useRef(beforeClose)
  beforeCloseRef.current = beforeClose
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const onCancelRef = useRef(onCancel)
  onCancelRef.current = onCancel
  const onConfirmRef = useRef(onConfirm)
  onConfirmRef.current = onConfirm
  const onClickCloseIconRef = useRef(onClickCloseIcon)
  onClickCloseIconRef.current = onClickCloseIcon
  const cancelLoadingRef = useRef(cancelLoading)
  cancelLoadingRef.current = cancelLoading
  const confirmLoadingRef = useRef(confirmLoading)
  confirmLoadingRef.current = confirmLoading

  const runAction = useCallback(
    (action: 'confirm' | 'cancel' | 'close', handler?: () => void) => {
      actionSeqRef.current += 1
      const seq = actionSeqRef.current
      const bc = beforeCloseRef.current
      if (!bc) { handler?.(); return }
      let result: ReturnType<NonNullable<typeof beforeClose>>
      try { result = bc(action) } catch { handler?.(); return }
      if (result === false) return
      if (isPromiseLike(result)) {
        void result
          .then(resolved => {
            if (resolved === false) return
            if (actionSeqRef.current !== seq) return
            handler?.()
          })
          .catch(() => {
            if (actionSeqRef.current !== seq) return
            handler?.()
          })
        return
      }
      handler?.()
    },
    []
  )

  const handleCloseIcon = useCallback(() => {
    onClickCloseIconRef.current?.()
    runAction('close', () => onCloseRef.current?.())
  }, [runAction])

  const handleCancel = useCallback(() => {
    if (cancelLoadingRef.current) return
    runAction('cancel', () => onCancelRef.current?.())
  }, [runAction])

  const handleConfirm = useCallback(() => {
    if (confirmLoadingRef.current) return
    runAction('confirm', () => onConfirmRef.current?.())
  }, [runAction])

  const scaleAnim = useRef(new Animated.Value(0.7)).current
  const scaleAnimRef = useRef<Animated.CompositeAnimation | null>(null)

  useEffect(() => {
    scaleAnimRef.current?.stop()
    scaleAnim.setValue(visible ? 0.7 : 1)
    const anim = Animated.timing(scaleAnim, {
      toValue: visible ? 1 : 0.9,
      duration: 300,
      easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
      useNativeDriver: nativeDriverEnabled,
      isInteraction: false,
    })
    scaleAnimRef.current = anim
    anim.start()
  }, [scaleAnim, visible])

  useEffect(() => () => { scaleAnimRef.current?.stop() }, [])

  const widthStyle = useMemo(() => (
    width
      ? isNumber(width)
        ? { width }
        : { width: String(width) as ViewStyle['width'] }
      : { width: '90%' as ViewStyle['width'], maxWidth: tokens.sizes.maxWidth }
  ), [tokens.sizes.maxWidth, width])

  const titleWrapperStyle = useMemo(() => (
    hasTitle
      ? [
        styles.titleWrapper,
        {
          paddingTop: hasContent ? tokens.spacing.titlePaddingTop : tokens.spacing.titleIsolatedPadding,
          paddingBottom: hasContent ? 0 : tokens.spacing.titleIsolatedPadding,
          paddingHorizontal: hasContent ? tokens.spacing.paddingHorizontal : 0,
          marginBottom: hasContent ? tokens.spacing.titleGap : 0,
        },
      ]
      : null
  ), [
    hasContent,
    hasTitle,
    tokens.spacing.paddingHorizontal,
    tokens.spacing.titleGap,
    tokens.spacing.titleIsolatedPadding,
    tokens.spacing.titlePaddingTop,
  ])

  const titleTextStyle = useMemo(() => (
    hasTitle
      ? [
        styles.title,
        {
          color: tokens.colors.title,
          fontSize: tokens.typography.titleSize,
          lineHeight: tokens.typography.titleLineHeight,
          fontWeight: tokens.typography.titleWeight,
        },
        titleStyle,
      ]
      : null
  ), [
    hasTitle,
    titleStyle,
    tokens.colors.title,
    tokens.typography.titleLineHeight,
    tokens.typography.titleSize,
    tokens.typography.titleWeight,
  ])

  const messageTextStyle = useMemo(() => [
    styles.message,
    {
      color: isRoundTheme ? tokens.colors.title : tokens.colors.message,
      fontSize: tokens.typography.messageSize,
      lineHeight: tokens.typography.messageLineHeight,
      textAlign: messageAlign,
    },
    messageStyle,
  ], [isRoundTheme, messageAlign, messageStyle, tokens.colors.message, tokens.colors.title, tokens.typography.messageLineHeight, tokens.typography.messageSize])

  const messageContentStyle = useMemo(() => !hasChildren
    ? {
      alignItems:
        messageAlign === 'center'
          ? ('center' as const)
          : messageAlign === 'left'
            ? ('flex-start' as const)
            : ('flex-end' as const),
    }
    : null, [hasChildren, messageAlign])

  const messageWrapperStyle = useMemo(() => [
    styles.messageWrapper,
    {
      paddingTop: hasTitle ? tokens.spacing.messagePaddingTop : tokens.spacing.messagePadding,
      paddingBottom: isRoundTheme ? tokens.spacing.roundFooterPadding : tokens.spacing.messagePadding,
      paddingHorizontal: tokens.spacing.messagePaddingHorizontal,
    },
  ], [hasTitle, isRoundTheme, tokens.spacing.messagePadding, tokens.spacing.messagePaddingHorizontal, tokens.spacing.messagePaddingTop, tokens.spacing.roundFooterPadding])

  const footerBorderTopStyle = useMemo(() => ([
    styles.footerBorderTop,
    createHairlineView({
      position: 'top',
      color: tokens.colors.divider,
      left: 0,
      right: 0,
      top: 0,
    }),
  ]), [tokens.colors.divider])

  const mergedCloseOnOverlayPress = closeOnOverlayPress || closeOnClickOverlay
  const animatedStyle = useMemo(() => ({ transform: [{ scale: scaleAnim }] }), [scaleAnim])

  const roundFooterStyle = useMemo(() => [
    styles.roundFooter,
    {
      paddingTop: tokens.spacing.messagePaddingTop,
      paddingHorizontal: tokens.spacing.messagePaddingHorizontal,
      paddingBottom: tokens.spacing.roundFooterPadding,
    },
  ], [tokens.spacing.messagePaddingHorizontal, tokens.spacing.messagePaddingTop, tokens.spacing.roundFooterPadding])

  const popupBeforeClose = useCallback(() => {
    const bc = beforeCloseRef.current
    if (!bc) return true
    try { return bc('close') } catch { return true }
  }, [])

  const roundFooterNode = useMemo(() => (hasFooterActions && (
    <View style={roundFooterStyle}>
      {showCancelButton && (
        <View
          style={[
            styles.roundButtonWrapper,
            showConfirmButton && { marginRight: tokens.spacing.roundFooterGap },
          ]}
        >
          <Button
            block
            round
            type="warning"
            text={cancelText}
            color={cancelButtonColor}
            loading={cancelLoading}
            disabled={cancelProps?.disabled}
            onPress={handleCancel}
            style={{ minHeight: tokens.sizes.roundButtonHeight }}
          />
        </View>
      )}
      {showConfirmButton && (
        <View
          style={[
            styles.roundButtonWrapper,
            showCancelButton && { marginLeft: tokens.spacing.roundFooterGap },
          ]}
        >
          <Button
            block
            round
            type="danger"
            text={confirmText}
            color={confirmButtonColor}
            loading={confirmLoading}
            disabled={confirmProps?.disabled}
            onPress={handleConfirm}
            style={{ minHeight: tokens.sizes.roundButtonHeight }}
          />
        </View>
      )}
    </View>
  )), [
    cancelButtonColor,
    cancelLoading,
    cancelProps?.disabled,
    cancelText,
    confirmButtonColor,
    confirmLoading,
    confirmProps?.disabled,
    confirmText,
    handleCancel,
    handleConfirm,
    hasFooterActions,
    roundFooterStyle,
    showCancelButton,
    showConfirmButton,
    tokens.sizes.roundButtonHeight,
    tokens.spacing.roundFooterGap,
  ])

  const defaultFooterNode = useMemo(() => (hasFooterActions && (
    <View style={styles.footer}>
      <View style={footerBorderTopStyle} pointerEvents="none" />
      {showCancelButton && (
        <ActionButton
          tokens={tokens}
          text={cancelText}
          color={cancelButtonColor ?? tokens.colors.cancel}
          dividerPosition="none"
          loading={cancelLoading}
          disabled={cancelProps?.disabled}
          onPress={handleCancel}
        />
      )}
      {showConfirmButton && (
        <ActionButton
          tokens={tokens}
          text={confirmText}
          color={confirmButtonColor ?? tokens.colors.confirm}
          dividerPosition={showCancelButton ? 'left' : 'none'}
          loading={confirmLoading}
          disabled={confirmProps?.disabled}
          onPress={handleConfirm}
        />
      )}
    </View>
  )), [
    cancelButtonColor,
    cancelLoading,
    cancelProps?.disabled,
    cancelText,
    confirmButtonColor,
    confirmLoading,
    confirmProps?.disabled,
    confirmText,
    footerBorderTopStyle,
    handleCancel,
    handleConfirm,
    hasFooterActions,
    showCancelButton,
    showConfirmButton,
    tokens,
  ])

  const footerNode = useMemo(
    () => footer ?? (isRoundTheme ? roundFooterNode : defaultFooterNode),
    [defaultFooterNode, footer, isRoundTheme, roundFooterNode]
  )

  const popupStyleMemo = useMemo(
    () => [
      {
        backgroundColor: tokens.colors.background,
        borderRadius: tokens.sizes.borderRadius,
        padding: 0,
      },
      widthStyle,
      style,
    ],
    [style, tokens.colors.background, tokens.sizes.borderRadius, widthStyle]
  )

  return (
    <Popup
      visible={visible}
      placement="center"
      round
      overlay={overlay}
      overlayStyle={overlayStyle}
      overlayTestID={overlayTestID}
      closeOnBackPress={closeOnBackPress}
      closeOnPopstate={closeOnPopstate}
      closeOnClickOverlay={mergedCloseOnOverlayPress}
      onClickOverlay={onClickOverlay}
      beforeClose={popupBeforeClose}
      onClose={onClose}
      onClosed={onClosed}
      contentAnimationStyle={animatedStyle}
      style={popupStyleMemo}
      accessibilityRole={'alertdialog' as any}
      accessibilityLabel={typeof title === 'string' ? title : undefined}
      {...rest}
    >
      {closeable && (
        <Pressable
          style={[
            styles.closeIcon,
            {
              top: tokens.spacing.paddingTop / 2,
              right: tokens.spacing.paddingHorizontal / 2,
              padding: tokens.spacing.closeIconPadding,
            },
          ]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={handleCloseIcon}
        >
          {closeIcon ?? (
            <Close size={tokens.sizes.closeSize} fill={tokens.colors.closeIcon} color={tokens.colors.closeIcon} />
          )}
        </Pressable>
      )}
      {hasTitle && (
        <View style={titleWrapperStyle}>
          {renderTextOrNode(title, titleTextStyle)}
        </View>
      )}

      {hasContent && (
        <View style={[styles.content, messageContentStyle, contentStyle]}>
          {hasChildren ? (
            children
          ) : (
            <View style={messageWrapperStyle}>
              {renderTextOrNode(message, messageTextStyle)}
            </View>
          )}
        </View>
      )}

      {footerNode}
    </Popup>
  )
}

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  content: {
    width: '100%',
  },
  message: {
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    position: 'relative',
  },
  footerBorderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 0,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonDivider: {
    position: 'absolute',
    pointerEvents: 'none',
  },
  messageWrapper: {
    width: '100%',
  },
  roundFooter: {
    width: '100%',
    flexDirection: 'row',
  },
  roundButtonWrapper: {
    flex: 1,
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
  },
})

export const Dialog = React.memo(DialogImpl)
Dialog.displayName = 'Dialog'

export default Dialog
