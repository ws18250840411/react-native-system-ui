import { useDialog } from '@react-native-aria/dialog'
import React from 'react'
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  type TextStyle,
  type ViewProps,
  type ViewStyle,
} from 'react-native'

import { useLocale } from '../config-provider/useLocale'
import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { Close } from 'react-native-system-icon'
import Button from '../button'
import Portal from '../portal/Portal'
import { useOverlayStack } from '../overlay'
import type { DialogProps } from './types'
import type { FocusableElement } from '@react-types/shared'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type DialogA11yProps = Pick<
  ViewProps,
  'accessible' | 'accessibilityRole' | 'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>

const mapDialogAccessibility = (props?: Record<string, any>): DialogA11yProps => {
  if (!props) return { accessible: true, accessibilityRole: 'dialog' }
  const mapped: DialogA11yProps = { accessible: true, accessibilityRole: 'dialog' }
  const role = props.role as string | undefined
  if (role) {
    mapped.accessibilityRole = role === 'alertdialog' ? 'alert' : (role as ViewProps['accessibilityRole'])
  }
  if (props['aria-label']) {
    mapped.accessibilityLabel = String(props['aria-label'])
  }
  if (props['aria-labelledby']) {
    mapped.accessibilityLabelledBy = props['aria-labelledby']
  }
  if (props['aria-describedby']) {
    mapped.accessibilityHint = String(props['aria-describedby'])
  }
  return mapped
}

let idCounter = 0
const useStableNativeId = () => {
  const [nativeId] = React.useState(() => {
    idCounter += 1
    return `rn-system-dialog-title-${idCounter}`
  })
  return nativeId
}

interface DialogTokens {
  colors: {
    background: string
    title: string
    message: string
    overlay: string
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
      overlay: 'rgba(0,0,0,0.45)',
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

const ActionButton: React.FC<ActionButtonProps> = props => {
  const { text, color, tokens, dividerPosition = 'none', loading, disabled, onPress } = props
  const textColor = color ?? tokens.colors.confirm

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="small" color={textColor} />
    }

    if (React.isValidElement(text)) {
      return text
    }

    return <Text style={[styles.actionText, { color: textColor }]}>{text ?? ''}</Text>
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.actionButton,
        {
          height: tokens.sizes.actionHeight,
          borderColor: tokens.colors.divider,
          borderLeftWidth: dividerPosition === 'left' ? StyleSheet.hairlineWidth : 0,
          borderRightWidth: dividerPosition === 'right' ? StyleSheet.hairlineWidth : 0,
          opacity: pressed && !disabled && !loading ? 0.8 : 1,
        },
      ]}
      onPress={disabled || loading ? undefined : onPress}
    >
      {renderContent()}
    </Pressable>
  )
}

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

  const dialogRef = React.useRef<View>(null)
  const titleNativeId = useStableNativeId()
  const ariaConfig = React.useMemo(() => {
    if (title) {
      return { 'aria-labelledby': titleNativeId }
    }
    if (typeof title === 'undefined' && typeof message === 'string') {
      return { 'aria-label': message }
    }
    return {}
  }, [message, title, titleNativeId])
  const { dialogProps, titleProps } = useDialog(
    ariaConfig,
    dialogRef as unknown as React.RefObject<FocusableElement>
  )
  const dialogAccessibilityProps = React.useMemo(
    () => mapDialogAccessibility(dialogProps as Record<string, any>),
    [dialogProps]
  )
  const titleAccessibilityProps = React.useMemo(
    () => ({
      nativeID: (titleProps as Record<string, any> | undefined)?.id ?? titleNativeId,
      accessibilityRole: 'header' as const,
    }),
    [titleNativeId, titleProps]
  )

  const [mounted, setMounted] = React.useState(visible)
  const opacity = React.useRef(new Animated.Value(visible ? 1 : 0)).current
  const scale = React.useRef(new Animated.Value(visible ? 1 : 0.96)).current

  React.useEffect(() => {
    if (visible) {
      setMounted(true)
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      ]).start()
    } else if (mounted) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 150, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 0.96, duration: 150, useNativeDriver: true }),
      ]).start(() => {
        setMounted(false)
        onClosed?.()
      })
    }
  }, [mounted, onClosed, opacity, scale, visible])

  const handleOverlayPress = () => {
    if (!closeOnOverlayPress) return
    onClose?.()
  }

  const handleCloseIcon = () => {
    onClose?.()
  }

  const handleCancel = () => {
    if (cancelProps?.loading) return
    onCancel?.()
  }

  const handleConfirm = () => {
    if (confirmProps?.loading) return
    onConfirm?.()
  }

  const { zIndex: stackZIndex, isTopMost } = useOverlayStack({
    visible,
    onClose,
    closeOnBack: true,
    lockScroll: true,
    type: 'dialog',
  })

  if (!mounted) {
    return null
  }

  const widthStyle: StyleProp<ViewStyle> = width
    ? typeof width === 'number'
      ? { width }
      : { width }
    : { minWidth: tokens.sizes.minWidth, maxWidth: tokens.sizes.maxWidth }

  const renderTitle = () => {
    if (!title) return null
    const defaultTitleStyle = [
      styles.title,
      {
        color: tokens.colors.title,
        fontSize: tokens.typography.titleSize,
        lineHeight: tokens.typography.titleLineHeight,
        fontWeight: tokens.typography.titleWeight,
      },
      titleStyle,
    ]

    const content = React.isValidElement(title)
      ? React.cloneElement(title, {
          ...(title.props ?? {}),
          ...titleAccessibilityProps,
        })
      : (
          <Text style={defaultTitleStyle} {...titleAccessibilityProps}>
            {title}
          </Text>
        )

    return (
      <View
        style={[
          styles.titleWrapper,
          {
            marginBottom: message || children ? tokens.spacing.titleGap : 0,
          },
        ]}
      >
        {content}
      </View>
    )
  }

  const renderMessage = () => {
    const hasChildren = !(children === null || children === undefined || children === false)
    if (!message && !hasChildren) return null
    const hasCustom = hasChildren
    const contentNode =
      hasCustom
        ? children
        :
      (React.isValidElement(message) ? (
        message
      ) : (
        <Text
          style={[
            styles.message,
            {
              color: tokens.colors.message,
              fontSize: tokens.typography.messageSize,
              lineHeight: tokens.typography.messageLineHeight,
              textAlign: messageAlign,
            },
            messageStyle,
          ]}
        >
          {message}
        </Text>
      ))

    const alignment =
      hasCustom
        ? null
        : {
            alignItems:
              messageAlign === 'center'
                ? 'center'
                : messageAlign === 'left'
                  ? 'flex-start'
                  : 'flex-end',
          }

    return (
      <View
        style={[
          styles.content,
          {
            marginBottom: tokens.spacing.footerGap,
          },
          alignment,
          contentStyle,
        ]}
      >
        {contentNode}
      </View>
    )
  }

  const renderDefaultFooter = () => {
    if (!showCancelButton && !showConfirmButton) return null

    return (
      <View
        style={[
          styles.footer,
          {
            borderTopColor: tokens.colors.divider,
            marginTop: tokens.spacing.footerGap,
          },
        ]}
      >
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
  }

  const renderRoundFooter = () => {
    if (!showCancelButton && !showConfirmButton) return null

    return (
      <View
        style={[
          styles.roundFooter,
          {
            padding: tokens.spacing.roundFooterPadding,
            marginTop: tokens.spacing.footerGap,
          },
        ]}
      >
        {showCancelButton ? (
          <View
            style={[
              styles.roundButtonWrapper,
              { marginRight: showConfirmButton ? tokens.spacing.roundFooterGap : 0 },
            ]}
          >
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
          <View
            style={[
              styles.roundButtonWrapper,
              { marginLeft: showCancelButton ? tokens.spacing.roundFooterGap : 0 },
            ]}
          >
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
  }

  const renderFooter = () => {
    if (footer) return footer
    return theme === 'round-button' ? renderRoundFooter() : renderDefaultFooter()
  }

  return (
    <Portal>
      <View
        style={[styles.portalRoot, stackZIndex ? { zIndex: stackZIndex } : null]}
        pointerEvents="box-none"
      >
        <View style={styles.backdrop} pointerEvents="box-none">
          {overlay ? (
            <AnimatedPressable
              testID={overlayTestID}
              style={[
                styles.overlay,
                { backgroundColor: tokens.colors.overlay, opacity },
                overlayStyle,
              ]}
              pointerEvents={visible ? 'auto' : 'none'}
              onPress={() => {
                if (!closeOnOverlayPress || !isTopMost) return
                handleOverlayPress()
              }}
            />
          ) : null}
          <Animated.View style={[styles.center, { opacity, transform: [{ scale }] }]} pointerEvents="box-none">
            <View
              ref={dialogRef}
              accessibilityViewIsModal
              style={[
                styles.dialog,
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
              {...dialogAccessibilityProps}
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
            </View>
          </Animated.View>
        </View>
      </View>
    </Portal>
  )
}

const styles = StyleSheet.create({
  portalRoot: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  dialog: {
    width: '80%',
    maxWidth: 360,
  },
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
  },
})

Dialog.displayName = 'Dialog'

export default Dialog
