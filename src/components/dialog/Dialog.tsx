import React from 'react'
import { ActivityIndicator, Animated, Easing, Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native'

import { useLocale } from '../config-provider/useLocale'
import { nativeDriverEnabled } from '../../platform'
import { createHairlineView } from '../../utils/hairline'
import { isPromiseLike } from '../../utils/promise'
import { isNumber, isValidNode } from '../../utils/validate'
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
      {dividerStyle ? <View style={dividerStyle} pointerEvents="none" /> : null}
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : React.isValidElement(text) ? (
        text
      ) : (
        <Text
          style={{
            color: textColor,
            fontSize: tokens.typography.actionSize,
            fontWeight: tokens.typography.actionWeight,
          }}
        >
          {text ?? ''}
        </Text>
      )}
    </Pressable>
  )
}

export const Dialog: React.FC<DialogProps> = props => {
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

  const runBeforeClose = (action: 'confirm' | 'cancel' | 'close') => {
    if (!beforeClose) return true
    try {
      return beforeClose(action)
    } catch (error) {
      console.error(error)
      return true
    }
  }

  const runAction = (
    action: 'confirm' | 'cancel' | 'close',
    handler?: () => void
  ) => {
    const result = runBeforeClose(action)
    if (result === false) return
    if (isPromiseLike(result)) {
      void result
        .then(resolved => {
          if (resolved === false) return
          handler?.()
        })
        .catch(error => {
          console.error(error)
          handler?.()
        })
      return
    }
    handler?.()
  }

  const handleCloseIcon = () => {
    onClickCloseIcon?.()
    runAction('close', onClose)
  }

  const handleCancel = () => {
    if (cancelProps?.loading) return
    runAction('cancel', onCancel)
  }

  const handleConfirm = () => {
    if (confirmProps?.loading) return
    runAction('confirm', onConfirm)
  }

  const scaleAnim = React.useRef(new Animated.Value(0.7)).current

  React.useEffect(() => {
    scaleAnim.setValue(visible ? 0.7 : 1)
    Animated.timing(scaleAnim, {
      toValue: visible ? 1 : 0.9,
      duration: 300,
      easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
      useNativeDriver: nativeDriverEnabled,
    }).start()
  }, [scaleAnim, visible])

  const widthStyle = width
    ? isNumber(width)
      ? { width }
      : { width: String(width) as ViewStyle['width'] }
    : { width: '90%' as ViewStyle['width'], maxWidth: tokens.sizes.maxWidth }

  const titleWrapperStyle = hasTitle
    ? [
      styles.titleWrapper,
      {
        paddingTop:
          hasMessage || hasChildren
            ? tokens.spacing.titlePaddingTop
            : tokens.spacing.titleIsolatedPadding,
        paddingBottom: hasMessage || hasChildren ? 0 : tokens.spacing.titleIsolatedPadding,
        paddingHorizontal: hasMessage || hasChildren ? tokens.spacing.paddingHorizontal : 0,
        marginBottom: hasMessage || hasChildren ? tokens.spacing.titleGap : 0,
      },
    ]
    : null

  const titleTextStyle = hasTitle
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

  const messageTextStyle = [
    styles.message,
    {
      color: theme === 'round-button' ? tokens.colors.title : tokens.colors.message,
      fontSize: tokens.typography.messageSize,
      lineHeight: tokens.typography.messageLineHeight,
      textAlign: messageAlign,
    },
    messageStyle,
  ]

  const messageContentStyle = !hasChildren
    ? {
      alignItems:
        messageAlign === 'center'
          ? ('center' as const)
          : messageAlign === 'left'
            ? ('flex-start' as const)
            : ('flex-end' as const),
    }
    : null

  const messageWrapperStyle = [
    styles.messageWrapper,
    {
      paddingTop: hasTitle ? tokens.spacing.messagePaddingTop : tokens.spacing.messagePadding,
      paddingBottom: theme === 'round-button' ? tokens.spacing.roundFooterPadding : tokens.spacing.messagePadding,
      paddingHorizontal: tokens.spacing.messagePaddingHorizontal,
    },
  ]

  const footerBorderTopStyle = [
    styles.footerBorderTop,
    createHairlineView({
      position: 'top',
      color: tokens.colors.divider,
      left: 0,
      right: 0,
      top: 0,
    }),
  ]

  const mergedCloseOnOverlayPress = closeOnOverlayPress || closeOnClickOverlay
  const animatedStyle = { transform: [{ scale: scaleAnim }] }

  return (
    <Popup
      visible={visible}
      placement="center"
      round
      overlay={overlay}
      overlayStyle={overlayStyle}
      overlayTestID={overlayTestID}
      closeOnClickOverlay={mergedCloseOnOverlayPress}
      onClickOverlay={onClickOverlay}
      beforeClose={() => runBeforeClose('close')}
      onClose={onClose}
      onClosed={onClosed}
      contentAnimationStyle={animatedStyle}
      style={[
        {
          backgroundColor: tokens.colors.background,
          borderRadius: tokens.sizes.borderRadius,
          padding: 0
        },
        widthStyle,
        style,
      ]}
      {...rest}
    >
      {closeable ? (
        <Pressable
          style={[
            styles.closeIcon,
            { top: tokens.spacing.paddingTop / 2, right: tokens.spacing.paddingHorizontal / 2 },
          ]}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={handleCloseIcon}
        >
          {closeIcon ?? (
            <Close size={tokens.sizes.closeSize} fill={tokens.colors.closeIcon} color={tokens.colors.closeIcon} />
          )}
        </Pressable>
      ) : null}
      {hasTitle ? (
        <View style={titleWrapperStyle ?? undefined}>
          {React.isValidElement(title) ? (
            title
          ) : (
            <Text style={titleTextStyle ?? undefined}>{title}</Text>
          )}
        </View>
      ) : null}

      {hasMessage || hasChildren ? (
        <View style={[styles.content, messageContentStyle, contentStyle]}>
          {hasChildren ? (
            children
          ) : (
            <View style={messageWrapperStyle}>
              {React.isValidElement(message) ? (
                message
              ) : (
                <Text style={messageTextStyle}>{message}</Text>
              )}
            </View>
          )}
        </View>
      ) : null}

      {footer
        ? footer
        : theme === 'round-button'
          ? showCancelButton || showConfirmButton
            ? (
              <View
                style={[
                  styles.roundFooter,
                  {
                    paddingTop: tokens.spacing.messagePaddingTop,
                    paddingHorizontal: tokens.spacing.messagePaddingHorizontal,
                    paddingBottom: tokens.spacing.roundFooterPadding,
                  },
                ]}
              >
                {showCancelButton ? (
                  <View
                    style={[
                      styles.roundButtonWrapper,
                      showConfirmButton ? { marginRight: tokens.spacing.roundFooterGap } : null,
                    ]}
                  >
                    <Button
                      block
                      round
                      type="warning"
                      text={cancelButtonText ?? locale.cancel}
                      color={cancelButtonColor}
                      loading={cancelProps?.loading}
                      disabled={cancelProps?.disabled}
                      onPress={handleCancel}
                      style={{ minHeight: tokens.sizes.roundButtonHeight }}
                    />
                  </View>
                ) : null}
                {showConfirmButton ? (
                  <View
                    style={[
                      styles.roundButtonWrapper,
                      showCancelButton ? { marginLeft: tokens.spacing.roundFooterGap } : null,
                    ]}
                  >
                    <Button
                      block
                      round
                      type="danger"
                      text={confirmButtonText ?? locale.confirm}
                      color={confirmButtonColor}
                      loading={confirmProps?.loading}
                      disabled={confirmProps?.disabled}
                      onPress={handleConfirm}
                      style={{ minHeight: tokens.sizes.roundButtonHeight }}
                    />
                  </View>
                ) : null}
              </View>
            )
            : null
          : showCancelButton || showConfirmButton
            ? (
              <View style={styles.footer}>
                <View style={footerBorderTopStyle} pointerEvents="none" />
                {showCancelButton ? (
                  <ActionButton
                    tokens={tokens}
                    text={cancelButtonText ?? locale.cancel}
                    color={cancelButtonColor ?? tokens.colors.cancel}
                    dividerPosition="none"
                    loading={cancelProps?.loading}
                    disabled={cancelProps?.disabled}
                    onPress={handleCancel}
                  />
                ) : null}
                {showConfirmButton ? (
                  <ActionButton
                    tokens={tokens}
                    text={confirmButtonText ?? locale.confirm}
                    color={confirmButtonColor ?? tokens.colors.confirm}
                    dividerPosition={showCancelButton ? 'left' : 'none'}
                    loading={confirmProps?.loading}
                    disabled={confirmProps?.disabled}
                    onPress={handleConfirm}
                  />
                ) : null}
              </View>
            )
            : null}
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
    padding: 4,
    zIndex: 1,
  },
})

Dialog.displayName = 'Dialog'

export default Dialog
