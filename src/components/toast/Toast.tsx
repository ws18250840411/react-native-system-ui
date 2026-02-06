import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  AccessibilityInfo,
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Platform,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

import Portal from '../portal/Portal'
import { SafeAreaView } from '../safe-area-view'
import { useAriaPress, useOverlayStack } from '../../hooks'
import Loading from '../loading'
import { Checked, Close } from 'react-native-system-icon'
import type { DeepPartial } from '../../types'
import { isFiniteNumber, isText } from '../../utils/validate'
import { nativeDriverEnabled } from '../../platform'
import { useToastTokens } from './tokens'
import type { ToastTokens } from './tokens'

export type ToastPosition = 'top' | 'middle' | 'bottom'
export type ToastType = 'info' | 'success' | 'fail' | 'loading'

export interface ToastProps {
  visible: boolean
  message?: React.ReactNode
  icon?: React.ReactNode
  type?: ToastType
  iconSize?: number
  duration?: number
  position?: ToastPosition
  forbidClick?: boolean
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  closeOnClickOverlay?: boolean
  closeOnClick?: boolean
  loadingIndicator?: React.ReactNode
  safeAreaInsetTop?: boolean
  safeAreaInsetBottom?: boolean
  tokensOverride?: DeepPartial<ToastTokens>
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onClose?: () => void
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
}

export const ToastContent: React.FC<ToastProps> = props => {
  const {
    visible,
    message,
    icon,
    type = 'info',
    iconSize,
    duration = 2000,
    position = 'middle',
    forbidClick = false,
    overlay = false,
    overlayStyle,
    closeOnClickOverlay = false,
    closeOnClick = false,
    loadingIndicator,
    safeAreaInsetTop: safeAreaInsetTopProp,
    safeAreaInsetBottom: safeAreaInsetBottomProp,
    tokensOverride,
    style,
    textStyle,
    onClose,
    onOpen,
    onOpened,
    onClosed,
  } = props

  const tokens = useToastTokens(tokensOverride)
  const { colors } = tokens
  const { height: windowHeight } = useWindowDimensions()
  const durationMs = isFiniteNumber(duration) ? Math.max(0, duration) : 0
  const [mounted, setMounted] = useState(visible)
  const animated = useRef(new Animated.Value(visible ? 1 : 0)).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)
  const animationIdRef = useRef(0)
  const { zIndex: stackZIndex } = useOverlayStack({ visible: mounted, type: 'toast' })
  const prevVisibleRef = useRef(visible)
  const closingRef = useRef(false)
  const positionOffset = windowHeight > 0
    ? Math.round(windowHeight * tokens.positionOffsetRatio)
    : tokens.positionOffsetMin
  const needsSafeAreaTop =
    safeAreaInsetTopProp !== undefined ? safeAreaInsetTopProp : position === 'top'
  const needsSafeAreaBottom =
    safeAreaInsetBottomProp !== undefined ? safeAreaInsetBottomProp : position === 'bottom'
  const positionStyle: ViewStyle = useMemo(
    () =>
      position === 'top'
        ? { justifyContent: 'flex-start', paddingTop: positionOffset }
        : position === 'bottom'
          ? { justifyContent: 'flex-end', paddingBottom: positionOffset }
          : { justifyContent: 'center' },
    [position, positionOffset]
  )

  useEffect(() => {
    animationIdRef.current += 1
    const animationId = animationIdRef.current
    animationRef.current?.stop()
    const durationValue = tokens.animationDuration
    if (visible) {
      setMounted(true)
      animationRef.current = Animated.timing(animated, {
        toValue: 1,
        duration: durationValue,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: nativeDriverEnabled,
        isInteraction: false,
      })
      animationRef.current.start()
    } else {
      animationRef.current = Animated.timing(animated, {
        toValue: 0,
        duration: durationValue,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: nativeDriverEnabled,
        isInteraction: false,
      })
      animationRef.current.start(({ finished }) => {
        if (!finished || animationId !== animationIdRef.current) return
        setMounted(false)
      })
    }
  }, [animated, tokens.animationDuration, visible])

  useEffect(() => () => {
    animationRef.current?.stop()
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    if (visible) {
      if (durationMs > 0) {
        timer = setTimeout(() => {
          onClose?.()
        }, durationMs)
      }
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [durationMs, onClose, visible])

  useEffect(() => {
    if (!visible) return
    if (!isText(message)) return
    const text = String(message)
    if (!text) return
    AccessibilityInfo.announceForAccessibility?.(text)
  }, [message, visible])

  useEffect(() => {
    let openedTimer: ReturnType<typeof setTimeout> | null = null
    if (visible) {
      closingRef.current = false
      if (!prevVisibleRef.current) {
        onOpen?.()
        if (onOpened) {
          openedTimer = setTimeout(onOpened, tokens.animationDuration)
        }
      }
    } else if (prevVisibleRef.current) {
      closingRef.current = true
    }
    prevVisibleRef.current = visible
    return () => {
      if (openedTimer) clearTimeout(openedTimer)
    }
  }, [onOpen, onOpened, tokens.animationDuration, visible])

  useEffect(() => {
    if (!mounted && closingRef.current) {
      closingRef.current = false
      onClosed?.()
    }
  }, [mounted, onClosed])

  const toastPress = useAriaPress({
    disabled: !closeOnClick,
    onPress: onClose,
    extraProps: {
      accessibilityRole: closeOnClick ? 'button' : 'alert',
      accessibilityHint: closeOnClick ? '双击关闭提示' : undefined,
      accessibilityLiveRegion: 'assertive',
    },
  })

  const iconNode = useMemo(() => {
    if (icon) return icon
    const resolvedIconSize = iconSize ?? tokens.iconSize
    switch (type) {
      case 'success':
        return <Checked size={resolvedIconSize} fill={colors.text} color={colors.text} />
      case 'fail':
        return <Close size={resolvedIconSize} fill={colors.text} color={colors.text} />
      case 'loading':
        return (
          loadingIndicator ?? (
            <Loading color={colors.text} size={resolvedIconSize} />
          )
        )
      default:
        return null
    }
  }, [colors.text, icon, iconSize, loadingIndicator, tokens.iconSize, type])
  const isTextToast = type === 'info' && !iconNode
  const boxStyle: ViewStyle = useMemo(() => (isTextToast
    ? {
      minWidth: tokens.textMinWidth,
      minHeight: 0,
      paddingVertical: tokens.textPaddingVertical,
      paddingHorizontal: tokens.textPaddingHorizontal,
    }
    : {
      minWidth: tokens.defaultWidth,
      minHeight: tokens.defaultMinHeight,
      padding: tokens.defaultPadding,
    }), [
    isTextToast,
    tokens.defaultMinHeight,
    tokens.defaultPadding,
    tokens.defaultWidth,
    tokens.textMinWidth,
    tokens.textPaddingHorizontal,
    tokens.textPaddingVertical,
  ])
  const toastStyle = useMemo(() => ({
    borderRadius: tokens.radius,
    opacity: closeOnClick && toastPress.states.pressed ? tokens.pressedOpacity : animated,
    backgroundColor: tokens.colors.variants[type],
    maxWidth: tokens.maxWidth,
    ...boxStyle,
  } as Animated.WithAnimatedValue<ViewStyle>), [
    animated,
    boxStyle,
    closeOnClick,
    toastPress.states.pressed,
    tokens.colors.variants,
    tokens.maxWidth,
    tokens.pressedOpacity,
    tokens.radius,
    type,
  ])

  if (!mounted) return null

  const hasMessage = message !== undefined && message !== null && message !== false && message !== ''
  return (
    <View
      style={[
        styles.backdrop,
        { backgroundColor: tokens.colors.transparent },
        positionStyle,
        stackZIndex ? { zIndex: stackZIndex } : undefined,
      ]}
      pointerEvents={forbidClick || overlay || closeOnClick ? 'auto' : 'none'}
    >
      {overlay || forbidClick ? (
        <Pressable
          testID="rv-toast-overlay"
          style={[
            styles.overlay,
            { backgroundColor: tokens.colors.transparent },
            overlay && { backgroundColor: colors.backdrop },
            overlayStyle,
          ]}
          pointerEvents="auto"
          onPress={overlay && closeOnClickOverlay ? onClose : undefined}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
        />
      ) : null}
      {needsSafeAreaTop && <SafeAreaView edge="top" pointerEvents="none" />}
      <Pressable disabled={!closeOnClick} {...toastPress.interactionProps}>
        <Animated.View
          style={[
            styles.toast,
            toastStyle,
            style,
          ]}
        >
          {iconNode ? (
            <View style={{ marginBottom: tokens.gap }}>{iconNode}</View>
          ) : null}
          {hasMessage
            ? isText(message)
              ? (
                <Text
                  style={[
                    styles.message,
                    { color: colors.text, fontSize: tokens.fontSize, lineHeight: tokens.lineHeight },
                    textStyle,
                  ]}
                >
                  {message}
                </Text>
              )
              : (
                <View style={{ alignItems: 'center' }}>{message}</View>
              )
            : null}
        </Animated.View>
      </Pressable>
      {needsSafeAreaBottom && <SafeAreaView edge="bottom" pointerEvents="none" />}
    </View>
  )
}

export const Toast: React.FC<ToastProps> = props => (
  <Portal>
    <ToastContent {...props} />
  </Portal>
)

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? { position: 'fixed' as any, top: 0, left: 0, right: 0, bottom: 0 } : {}),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  toast: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
  },
})

ToastContent.displayName = 'ToastContent'
Toast.displayName = 'Toast'

export default Toast
