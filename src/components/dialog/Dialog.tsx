import React from 'react'
import { ActivityIndicator, Animated, Easing, Platform, Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'

import { useLocale } from '../config-provider/useLocale'
import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createHairlineView } from '../../utils/hairline'
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
    titlePaddingTop: number
    titleIsolatedPadding: number
    messagePadding: number
    messagePaddingTop: number
    messagePaddingHorizontal: number
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
    roundButtonHeight: number
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
      titlePaddingTop: 22,
      titleIsolatedPadding: spacing.lg, // var(--rv-padding-lg)
      messagePadding: 20,
      messagePaddingTop: spacing.xs, // var(--rv-padding-xs)
      messagePaddingHorizontal: spacing.lg, // var(--rv-padding-lg)
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
      roundButtonHeight: 40, // var(--rv-dialog-round-button-height)
    },
    typography: {
      titleSize: fontSize.md,
      titleLineHeight: fontSize.md * typography.lineHeightMultiplier,
      titleWeight: typography.weight.semiBold,
      messageSize: fontSize.sm,
      messageLineHeight: fontSize.sm * typography.lineHeightMultiplier,
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
  const platform = Platform.OS
  const borderWidth = platform === 'web' ? 1 : StyleSheet.hairlineWidth

  const buttonStyle = React.useCallback(
    ({ pressed }: { pressed: boolean }) => [
      styles.actionButton,
      {
        height: tokens.sizes.actionHeight,
        opacity: pressed && !disabled && !loading ? 0.8 : 1,
        position: 'relative' as const,
      },
    ],
    [tokens.sizes.actionHeight, disabled, loading]
  )

  const dividerStyle = React.useMemo(() => {
    if (dividerPosition === 'none') return null
    const isLeft = dividerPosition === 'left'
    const hairlineStyle = createHairlineView({
      position: isLeft ? 'left' : 'right',
      color: tokens.colors.divider,
      top: 0,
      bottom: 0,
      [isLeft ? 'left' : 'right']: 0,
    })
    return [styles.actionButtonDivider, { width: 0 }, hairlineStyle]
  }, [dividerPosition, tokens.colors.divider])

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
      {dividerStyle ? <View style={dividerStyle} pointerEvents="none" /> : null}
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
    const isIsolated = !hasMessageOrChildren
    const titleWrapperStyle = React.useMemo(
      () => [
        styles.titleWrapper,
        {
          paddingTop: isIsolated ? tokens.spacing.titleIsolatedPadding : tokens.spacing.titlePaddingTop,
          paddingBottom: isIsolated ? tokens.spacing.titleIsolatedPadding : 0,
          paddingHorizontal: isIsolated ? 0 : tokens.spacing.paddingHorizontal,
          marginBottom: hasMessageOrChildren ? tokens.spacing.titleGap : 0,
        },
      ],
      [isIsolated, hasMessageOrChildren, tokens.spacing.titlePaddingTop, tokens.spacing.titleIsolatedPadding, tokens.spacing.paddingHorizontal, tokens.spacing.titleGap]
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
        color: theme === 'round-button' ? tokens.colors.title : tokens.colors.message,
        fontSize: tokens.typography.messageSize,
        lineHeight: tokens.typography.messageLineHeight,
        textAlign: messageAlign,
      },
      messageStyle,
    ],
    [theme, tokens.colors.title, tokens.colors.message, tokens.typography.messageSize, tokens.typography.messageLineHeight, messageAlign, messageStyle]
  )

  const renderMessage = React.useCallback(() => {
    if (!hasMessage && !hasChildren) return null
    const hasCustom = hasChildren
    const hasTitle = !!title

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

    const messageWrapperStyle = React.useMemo(
      () => [
        styles.messageWrapper,
        {
          paddingTop: hasTitle ? tokens.spacing.messagePaddingTop : tokens.spacing.messagePadding,
          paddingBottom: theme === 'round-button' ? tokens.spacing.roundFooterPadding : tokens.spacing.messagePadding,
          paddingHorizontal: tokens.spacing.messagePaddingHorizontal,
          fontSize: tokens.typography.messageSize,
        },
      ],
      [hasTitle, theme, tokens.spacing.messagePaddingTop, tokens.spacing.messagePadding, tokens.spacing.roundFooterPadding, tokens.spacing.messagePaddingHorizontal, tokens.typography.messageSize]
    )

    const contentStyleMemo = React.useMemo(
      () => [
        styles.content,
        alignment,
        contentStyle,
      ],
      [alignment, contentStyle]
    )

    return (
      <View style={contentStyleMemo}>
        {hasCustom ? (
          contentNode
        ) : (
          <View style={messageWrapperStyle}>
            {contentNode}
          </View>
        )}
      </View>
    )
  }, [hasMessage, hasChildren, children, message, title, theme, tokens, messageAlign, messageStyle, contentStyle, messageTextStyle])

  const renderDefaultFooter = React.useCallback(() => {
    if (!showCancelButton && !showConfirmButton) return null

    const platform = Platform.OS
    const borderWidth = platform === 'web' ? 1 : StyleSheet.hairlineWidth
    const footerStyle = React.useMemo(
      () => [
        styles.footer,
      ],
      []
    )

    const borderTopStyle = React.useMemo(
      () => [
        styles.footerBorderTop,
        createHairlineView({
          position: 'top',
          color: tokens.colors.divider,
          left: 0,
          right: 0,
          top: 0,
        }),
      ],
      [tokens.colors.divider]
    )

    return (
      <View style={footerStyle}>
        <View style={borderTopStyle} pointerEvents="none" />
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
          paddingTop: tokens.spacing.messagePaddingTop, // padding-xs
          paddingHorizontal: tokens.spacing.messagePaddingHorizontal, // padding-lg
          paddingBottom: tokens.spacing.roundFooterPadding, // padding-md
        },
      ],
      [tokens.spacing.messagePaddingTop, tokens.spacing.messagePaddingHorizontal, tokens.spacing.roundFooterPadding]
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
          <View style={confirmWrapperStyle}>
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
    fontSize: 14,
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
