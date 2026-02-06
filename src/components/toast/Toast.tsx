import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, Text, View, useWindowDimensions, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'
import Portal from '../portal/Portal'
import { SafeAreaView } from '../safe-area-view'
import { useAriaPress, useOverlayStack } from '../../hooks'
import Loading from '../loading'
import { Checked, Close } from 'react-native-system-icon'
import type { DeepPartial } from '../../types'
import { isFiniteNumber, isText, isRenderable } from '../../utils/validate'
import { renderTextOrNode } from '../../utils'
import { nativeDriverEnabled } from '../../platform'
import { useToastTokens } from './tokens'
import type { ToastTokens } from './tokens'

const RT = () => true as const

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

const ToastContentImpl: React.FC<ToastProps> = props => {
  const { visible, message, icon, type = 'info', iconSize, duration = 2000, position = 'middle', forbidClick = false, overlay = false, overlayStyle, closeOnClickOverlay = false, closeOnClick = false, loadingIndicator, safeAreaInsetTop: safeAreaInsetTopProp, safeAreaInsetBottom: safeAreaInsetBottomProp, tokensOverride, style, textStyle, onClose, onOpen, onOpened, onClosed } = props
  const tokens = useToastTokens(tokensOverride)
  const { colors } = tokens
  const { height: windowHeight } = useWindowDimensions()
  const resolvedDuration = isFiniteNumber(duration) ? Math.max(0, duration) : 0
  const [mounted, setMounted] = useState(visible)
  const animatedValue = useRef(new Animated.Value(visible ? 1 : 0)).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)
  const animationIdRef = useRef(0)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const onOpenRef = useRef(onOpen)
  onOpenRef.current = onOpen
  const onOpenedRef = useRef(onOpened)
  onOpenedRef.current = onOpened
  const onClosedRef = useRef(onClosed)
  onClosedRef.current = onClosed
  const { zIndex: stackZIndex } = useOverlayStack({ visible: mounted, type: 'toast' })
  const previousVisibleRef = useRef(visible)
  const closingRef = useRef(false)
  const positionOffset = windowHeight > 0 ? Math.round(windowHeight * tokens.positionOffsetRatio) : tokens.positionOffsetMin
  const needsSafeAreaTop = safeAreaInsetTopProp !== undefined ? safeAreaInsetTopProp : position === 'top'
  const needsSafeAreaBottom = safeAreaInsetBottomProp !== undefined ? safeAreaInsetBottomProp : position === 'bottom'
  const positionStyle: ViewStyle = useMemo(() => position === 'top' ? { justifyContent: 'flex-start', paddingTop: positionOffset } : position === 'bottom' ? { justifyContent: 'flex-end', paddingBottom: positionOffset } : { justifyContent: 'center' }, [position, positionOffset])
  useEffect(() => {
    animationIdRef.current += 1
    const animationId = animationIdRef.current
    animationRef.current?.stop()
    const animationDuration = tokens.animationDuration
    if (visible) {
      setMounted(true)
      animationRef.current = Animated.timing(animatedValue, { toValue: 1, duration: animationDuration, easing: Easing.out(Easing.cubic), useNativeDriver: nativeDriverEnabled, isInteraction: false })
      animationRef.current.start()
    } else {
      animationRef.current = Animated.timing(animatedValue, { toValue: 0, duration: animationDuration, easing: Easing.out(Easing.cubic), useNativeDriver: nativeDriverEnabled, isInteraction: false })
      animationRef.current.start(({ finished }) => { if (!finished || animationId !== animationIdRef.current) return; setMounted(false) })
    }
  }, [animatedValue, tokens.animationDuration, visible])
  useEffect(() => () => { animationRef.current?.stop() }, [])
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (visible) {
      if (resolvedDuration > 0) {
        timeout = setTimeout(() => { onCloseRef.current?.() }, resolvedDuration)
      }
    }
    return () => { if (timeout) clearTimeout(timeout) }
  }, [resolvedDuration, visible])
  useEffect(() => {
    if (!visible) return
    if (!isText(message)) return
    const text = String(message)
    if (!text) return
    AccessibilityInfo.announceForAccessibility?.(text)
  }, [message, visible])
  useEffect(() => {
    let openedTimeout: ReturnType<typeof setTimeout> | null = null
    if (visible) {
      closingRef.current = false
      if (!previousVisibleRef.current) {
        onOpenRef.current?.()
        if (onOpenedRef.current) {
          const callback = onOpenedRef.current
          openedTimeout = setTimeout(callback, tokens.animationDuration)
        }
      }
    } else if (previousVisibleRef.current) {
      closingRef.current = true
    }
    previousVisibleRef.current = visible
    return () => { if (openedTimeout) clearTimeout(openedTimeout) }
  }, [tokens.animationDuration, visible])
  useEffect(() => {
    if (!mounted && closingRef.current) {
      closingRef.current = false
      onClosedRef.current?.()
    }
  }, [mounted])
  const handleClose = useRef(() => onCloseRef.current?.()).current
  const pressProps = useAriaPress({ disabled: !closeOnClick, onPress: handleClose, extraProps: { accessibilityRole: closeOnClick ? 'button' : 'alert', accessibilityHint: closeOnClick ? '双击关闭提示' : undefined, accessibilityLiveRegion: 'assertive' } })
  const iconNode = useMemo(() => {
    if (icon) return icon
    const resolvedIconSize = iconSize ?? tokens.iconSize
    switch (type) {
      case 'success': return <Checked size={resolvedIconSize} fill={colors.text} color={colors.text} />
      case 'fail': return <Close size={resolvedIconSize} fill={colors.text} color={colors.text} />
      case 'loading': return loadingIndicator ?? <Loading color={colors.text} size={resolvedIconSize} />
      default: return null
    }
  }, [colors.text, icon, iconSize, loadingIndicator, tokens.iconSize, type])
  const iconWrapperStyle = useMemo(() => ({ marginBottom: tokens.gap }), [tokens.gap])
  const messageStyle = useMemo(() => ({ color: colors.text, fontSize: tokens.fontSize, lineHeight: tokens.lineHeight }), [colors.text, tokens.fontSize, tokens.lineHeight])
  const isTextOnly = type === 'info' && !iconNode
  const baseStyle: ViewStyle = useMemo(() => isTextOnly ? { minWidth: tokens.textMinWidth, minHeight: 0, paddingVertical: tokens.textPaddingVertical, paddingHorizontal: tokens.textPaddingHorizontal } : { minWidth: tokens.defaultWidth, minHeight: tokens.defaultMinHeight, padding: tokens.defaultPadding }, [isTextOnly, tokens.defaultMinHeight, tokens.defaultPadding, tokens.defaultWidth, tokens.textMinWidth, tokens.textPaddingHorizontal, tokens.textPaddingVertical])
  const toastStyle = useMemo(() => ({ borderRadius: tokens.radius, opacity: closeOnClick && pressProps.states.pressed ? tokens.pressedOpacity : animatedValue, backgroundColor: tokens.colors.variants[type], maxWidth: tokens.maxWidth, ...baseStyle } as Animated.WithAnimatedValue<ViewStyle>), [animatedValue, baseStyle, closeOnClick, pressProps.states.pressed, tokens.colors.variants, tokens.maxWidth, tokens.pressedOpacity, tokens.radius, type])
  if (!mounted) return null
  const hasMessage = isRenderable(message) && (typeof message !== 'string' || message !== '')
  return (
    <View style={[S.b, { backgroundColor: tokens.colors.transparent }, positionStyle, stackZIndex ? { zIndex: stackZIndex } : undefined]} pointerEvents={forbidClick || overlay || closeOnClick ? 'auto' : 'none'}>
      {(overlay || forbidClick) && <Pressable testID="rv-toast-overlay" style={[S.o, { backgroundColor: tokens.colors.transparent }, overlay && { backgroundColor: colors.backdrop }, overlayStyle]} pointerEvents="auto" onPress={overlay && closeOnClickOverlay ? handleClose : undefined} onStartShouldSetResponder={RT} onMoveShouldSetResponder={RT} />}
      {needsSafeAreaTop && <SafeAreaView edge="top" pointerEvents="none" />}
      <Pressable disabled={!closeOnClick} {...pressProps.interactionProps}>
        <Animated.View style={[S.t, toastStyle, style]}>
          {iconNode && <View style={iconWrapperStyle}>{iconNode}</View>}
          {hasMessage && (isText(message) ? renderTextOrNode(message, [S.m, messageStyle, textStyle]) : <View style={S.mw}>{message}</View>)}
        </Animated.View>
      </Pressable>
      {needsSafeAreaBottom && <SafeAreaView edge="bottom" pointerEvents="none" />}
    </View>
  )
}

export const ToastContent = React.memo(ToastContentImpl)

const ToastImpl: React.FC<ToastProps> = props => <Portal><ToastContent {...props} /></Portal>
export const Toast = React.memo(ToastImpl)

const S = StyleSheet.create({
  b: { flex: 1, alignItems: 'center' },
  o: { ...StyleSheet.absoluteFillObject },
  t: { alignItems: 'center', justifyContent: 'center' },
  m: { textAlign: 'center' },
  mw: { alignItems: 'center' },
})

ToastContent.displayName = 'ToastContent'
Toast.displayName = 'Toast'

export default Toast
