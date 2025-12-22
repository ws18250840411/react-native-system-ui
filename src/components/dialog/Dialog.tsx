import React from 'react'
import { ActivityIndicator, Animated, Easing, Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'

import { useLocale } from '../config-provider/useLocale'
import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { Close } from 'react-native-system-icon'
import Button from '../button'
import Popup from '../popup'
import type { DialogProps } from './types'

const isPromiseLike = (value: unknown): value is Promise<unknown> =>
  !!value && typeof value === 'object' && typeof (value as any).then === 'function'

interface DialogTokens {
  colors: {
    background: string
    title: string
    message: string
    divider: string
    cancel: string
    confirm: string
    closeIcon: string
  }
  spacing: {
    paddingHorizontal: number
    paddingTop: number
    paddingBottom: number
    titleGap: number
    footerGap: number
    roundFooterPadding: number
    roundFooterGap: number
  }
  sizes: {
    minWidth: number
    maxWidth: number
    borderRadius: number
    closeSize: number
    actionHeight: number
  }
  typography: {
    titleSize: number
    titleLineHeight: number
    titleWeight: string
    messageSize: number
    messageLineHeight: number
  }
}

const createDialogTokens = (foundations: Foundations): DialogTokens => {
  const { palette, spacing, radii, fontSize, typography } = foundations
  const foreground = palette.default.foreground ?? '#111827'
  const secondary = palette.default[600]

  return {
    colors: {
      background: '#ffffff',
      title: foreground,
      message: secondary,
      divider: 'rgba(0,0,0,0.08)',
      cancel: palette.default[700],
      confirm: palette.danger[500],
      closeIcon: palette.default[500],
    },
    spacing: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.md,
      titleGap: spacing.sm,
      footerGap: spacing.md,
      roundFooterPadding: spacing.md,
      roundFooterGap: spacing.sm,
    },
    sizes: {
      minWidth: 280,
      maxWidth: 360,
      borderRadius: radii.lg,
      closeSize: 20,
      actionHeight: 48,
    },
    typography: {
      titleSize: fontSize.lg,
      titleLineHeight: fontSize.lg * typography.lineHeightMultiplier,
      titleWeight: typography.weight.semiBold,
      messageSize: fontSize.md,
      messageLineHeight: fontSize.md * typography.lineHeightMultiplier,
    },
  }
}

const useDialogTokens = (overrides?: DeepPartial<DialogTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createDialogTokens(foundations)
    const globalOverrides = components?.dialog as DeepPartial<DialogTokens> | undefined
    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [foundations, components, overrides])
}

interface ActionButtonProps {
  text: React.ReactNode
  color?: string
  tokens: DialogTokens
  dividerPosition?: 'left' | 'right' | 'none'
  loading?: boolean
  disabled?: boolean
  onPress?: () => void
}

const ActionButton: React.FC<ActionButtonProps> = React.memo(props => {
  const { text, color, tokens, dividerPosition = 'none', loading, disabled, onPress } = props
  const textColor = color ?? tokens.colors.confirm

  const buttonStyle = React.useCallback(
    ({ pressed }: { pressed: boolean }) => [
      styles.actionButton,
      {
        height: tokens.sizes.actionHeight,
        borderColor: tokens.colors.divider,
        borderLeftWidth: dividerPosition === 'left' ? StyleSheet.hairlineWidth : 0,
        borderRightWidth: dividerPosition === 'right' ? StyleSheet.hairlineWidth : 0,
        opacity: pressed && !disabled && !loading ? 0.8 : 1,
      },
    ],
    [tokens.sizes.actionHeight, tokens.colors.divider, dividerPosition, disabled, loading]
  )

  const textStyle = React.useMemo(() => [styles.actionText, { color: textColor }], [textColor])

  const renderContent = React.useMemo(() => {
    if (loading) {
      return <ActivityIndicator size="small" color={textColor} />
    }
    if (React.isValidElement(text)) {
      return text
    }
    return <Text style={textStyle}>{text ?? ''}</Text>
  }, [loading, text, textColor, textStyle])

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={buttonStyle}
      onPress={disabled || loading ? undefined : onPress}
    >
      {renderContent}
    </Pressable>
  )
})

ActionButton.displayName = 'ActionButton'

export const Dialog: React.FC<DialogProps> = props => {
  const locale = useLocale()
  const tokens = useDialogTokens()

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
    style,
    children,
    onCancel,
    onConfirm,
    onClose,
    onClosed,
    ...rest
  } = props

  const hasTitle = React.useMemo(
    () => title !== undefined && title !== null && title !== false && title !== '',
    [title]
  )
  const hasMessage = React.useMemo(
    () => message !== undefined && message !== null && message !== false && message !== '',
    [message]
  )

  const runBeforeClose = React.useCallback(
    (action: 'confirm' | 'cancel' | 'close') => {
      if (!beforeClose) return true
      try {
        return beforeClose(action)
      } catch (error) {
        console.error(error)
        return true
      }
    },
    [beforeClose],
  )

  const requestClose = React.useCallback(() => {
    const result = runBeforeClose('close')
    if (result === false) return
    if (isPromiseLike(result)) {
      void result
        .then(resolved => {
          if (resolved === false) return
          onClose?.()
        })
        .catch(error => {
          console.error(error)
          onClose?.()
        })
      return
    }
    onClose?.()
  }, [onClose, runBeforeClose])

  const handleCloseIcon = React.useCallback(() => {
    onClickCloseIcon?.()
    requestClose()
  }, [onClickCloseIcon, requestClose])

  const handleCancel = React.useCallback(() => {
    if (cancelProps?.loading) return
    const result = runBeforeClose('cancel')
    if (result === false) return
    if (isPromiseLike(result)) {
      void result
        .then(resolved => {
          if (resolved === false) return
          onCancel?.()
        })
        .catch(error => {
          console.error(error)
          onCancel?.()
        })
      return
    }
    onCancel?.()
  }, [cancelProps?.loading, onCancel, runBeforeClose])

  const handleConfirm = React.useCallback(() => {
    if (confirmProps?.loading) return
    const result = runBeforeClose('confirm')
    if (result === false) return
    if (isPromiseLike(result)) {
      void result
        .then(resolved => {
          if (resolved === false) return
          onConfirm?.()
        })
        .catch(error => {
          console.error(error)
          onConfirm?.()
        })
      return
    }
    onConfirm?.()
  }, [confirmProps?.loading, onConfirm, runBeforeClose])

  const handlePopupBeforeClose = React.useCallback(
    async (reason: 'close-icon' | 'overlay' | 'close') => {
      if (!beforeClose) return true
      const actionMap: Record<string, 'confirm' | 'cancel' | 'close'> = {
        'close-icon': 'close',
        overlay: 'close',
        close: 'close',
      }
      const action = actionMap[reason] ?? 'close'
      return await runBeforeClose(action)
    },
    [beforeClose, runBeforeClose]
  )

  const scaleAnim = React.useRef(new Animated.Value(0.7)).current
  const prevVisibleRef = React.useRef<boolean | undefined>(undefined)

  React.useEffect(() => {
    const prevVisible = prevVisibleRef.current
    prevVisibleRef.current = visible

    if (visible) {
      if (prevVisible === undefined || !prevVisible) {
        scaleAnim.setValue(0.7)
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start()
      }
    } else {
      if (prevVisible === undefined || prevVisible) {
        scaleAnim.setValue(1)
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 300,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }).start()
      }
    }
  }, [visible, scaleAnim])

  const animatedStyle = React.useMemo(
    () => ({
      transform: [{ scale: scaleAnim }],
    }),
    [scaleAnim]
  )

  const widthStyle = React.useMemo<StyleProp<ViewStyle>>(
    () =>
      width
        ? typeof width === 'number'
          ? { width }
          : { width: String(width) as any }
        : { width: '90%' as any, maxWidth: tokens.sizes.maxWidth },
    [width, tokens.sizes.maxWidth]
  )

  const hasChildren = React.useMemo(
    () => !(children === null || children === undefined || children === false),
    [children]
  )

  const renderTitle = React.useCallback(() => {
    if (!hasTitle) return null
    const defaultTitleStyle = React.useMemo(
      () => [
        styles.title,
        {
          color: tokens.colors.title,
          fontSize: tokens.typography.titleSize,
          lineHeight: tokens.typography.titleLineHeight,
          fontWeight: tokens.typography.titleWeight as any,
        },
        titleStyle,
      ],
      [tokens.colors.title, tokens.typography.titleSize, tokens.typography.titleLineHeight, tokens.typography.titleWeight, titleStyle]
    )

    const hasMessageOrChildren = !!(message || children)
    const titleWrapperStyle = React.useMemo(
      () => [
        styles.titleWrapper,
        {
          marginBottom: hasMessageOrChildren ? tokens.spacing.titleGap : 0,
        },
      ],
      [hasMessageOrChildren, tokens.spacing.titleGap]
    )

    const content = React.isValidElement(title) ? (
      title
    ) : (
      <Text style={defaultTitleStyle}>{title}</Text>
    )

    return (
      <View style={titleWrapperStyle}>
        {content}
      </View>
    )
  }, [hasTitle, title, titleStyle, tokens, message, children])

  const messageTextStyle = React.useMemo(
    () => [
      styles.message,
      {
        color: tokens.colors.message,
        fontSize: tokens.typography.messageSize,
        lineHeight: tokens.typography.messageLineHeight,
        textAlign: messageAlign,
      },
      messageStyle,
    ],
    [tokens.colors.message, tokens.typography.messageSize, tokens.typography.messageLineHeight, messageAlign, messageStyle]
  )

  const renderMessage = React.useCallback(() => {
    if (!hasMessage && !hasChildren) return null
    const hasCustom = hasChildren

    const contentNode = React.useMemo(() => {
      if (hasCustom) return children
      if (React.isValidElement(message)) return message
      return <Text style={messageTextStyle}>{message}</Text>
    }, [hasCustom, children, message, messageTextStyle])

    const alignment = hasCustom
      ? null
      : React.useMemo(
        () => ({
          alignItems:
            messageAlign === 'center'
              ? ('center' as const)
              : messageAlign === 'left'
                ? ('flex-start' as const)
                : ('flex-end' as const),
        }),
        [messageAlign]
      )

    const contentStyleMemo = React.useMemo(
      () => [
        styles.content,
        {
          marginBottom: tokens.spacing.footerGap,
        },
        alignment,
        contentStyle,
      ],
      [tokens.spacing.footerGap, alignment, contentStyle]
    )

    return (
      <View style={contentStyleMemo}>
        {contentNode}
      </View>
    )
  }, [hasMessage, hasChildren, children, message, tokens, messageAlign, messageStyle, contentStyle, messageTextStyle])

  const renderDefaultFooter = React.useCallback(() => {
    if (!showCancelButton && !showConfirmButton) return null

    const footerStyle = React.useMemo(
      () => [
        styles.footer,
        {
          borderTopColor: tokens.colors.divider,
          marginTop: tokens.spacing.footerGap,
        },
      ],
      [tokens.colors.divider, tokens.spacing.footerGap]
    )

    return (
      <View style={footerStyle}>
        {showCancelButton ? (
          <ActionButton
            tokens={tokens}
            text={cancelButtonText ?? locale.cancel}
            color={cancelButtonColor ?? tokens.colors.cancel}
            dividerPosition={showConfirmButton ? 'right' : 'none'}
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
  }, [
    showCancelButton,
    showConfirmButton,
    tokens,
    locale.cancel,
    locale.confirm,
    cancelButtonText,
    cancelButtonColor,
    cancelProps?.loading,
    cancelProps?.disabled,
    confirmButtonText,
    confirmButtonColor,
    confirmProps?.loading,
    confirmProps?.disabled,
    handleCancel,
    handleConfirm,
  ])

  const renderRoundFooter = React.useCallback(() => {
    if (!showCancelButton && !showConfirmButton) return null

    const roundFooterStyle = React.useMemo(
      () => [
        styles.roundFooter,
        {
          padding: tokens.spacing.roundFooterPadding,
          marginTop: tokens.spacing.footerGap,
        },
      ],
      [tokens.spacing.roundFooterPadding, tokens.spacing.footerGap]
    )

    const cancelWrapperStyle = React.useMemo(
      () => [
        styles.roundButtonWrapper,
        { marginRight: showConfirmButton ? tokens.spacing.roundFooterGap : 0 },
      ],
      [showConfirmButton, tokens.spacing.roundFooterGap]
    )

    const confirmWrapperStyle = React.useMemo(
      () => [
        styles.roundButtonWrapper,
        { marginLeft: showCancelButton ? tokens.spacing.roundFooterGap : 0 },
      ],
      [showCancelButton, tokens.spacing.roundFooterGap]
    )

    return (
      <View style={roundFooterStyle}>
        {showCancelButton ? (
          <View style={cancelWrapperStyle}>
            <Button
              size="large"
              block
              round
              type="warning"
              text={cancelButtonText ?? locale.cancel}
              color={cancelButtonColor}
              loading={cancelProps?.loading}
              disabled={cancelProps?.disabled}
              onPress={handleCancel}
            />
          </View>
        ) : null}
        {showConfirmButton ? (
          <View style={confirmWrapperStyle}>
            <Button
              size="large"
              block
              round
              type="danger"
              text={confirmButtonText ?? locale.confirm}
              color={confirmButtonColor}
              loading={confirmProps?.loading}
              disabled={confirmProps?.disabled}
              onPress={handleConfirm}
            />
          </View>
        ) : null}
      </View>
    )
  }, [
    showCancelButton,
    showConfirmButton,
    tokens,
    locale.cancel,
    locale.confirm,
    cancelButtonText,
    cancelButtonColor,
    cancelProps?.loading,
    cancelProps?.disabled,
    confirmButtonText,
    confirmButtonColor,
    confirmProps?.loading,
    confirmProps?.disabled,
    handleCancel,
    handleConfirm,
  ])

  const renderFooter = React.useCallback(() => {
    if (footer) return footer
    return theme === 'round-button' ? renderRoundFooter() : renderDefaultFooter()
  }, [footer, theme, renderRoundFooter, renderDefaultFooter])

  const mergedCloseOnOverlayPress = React.useMemo(
    () => closeOnOverlayPress || closeOnClickOverlay,
    [closeOnOverlayPress, closeOnClickOverlay]
  )

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
      beforeClose={handlePopupBeforeClose}
      onClose={onClose}
      onClosed={onClosed}
      contentAnimationStyle={animatedStyle}
      style={[
        {
          backgroundColor: tokens.colors.background,
          borderRadius: tokens.sizes.borderRadius,
          paddingHorizontal: tokens.spacing.paddingHorizontal,
          paddingTop: tokens.spacing.paddingTop,
          paddingBottom: tokens.spacing.paddingBottom,
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
      {renderTitle()}
      {renderMessage()}
      {renderFooter()}
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
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
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
