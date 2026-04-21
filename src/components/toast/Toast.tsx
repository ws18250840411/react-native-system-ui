import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, Pressable, StyleSheet, View, useWindowDimensions, type StyleProp, type TextStyle, type ViewStyle } from 'react-native'
import Portal from '../portal/Portal'
import { SafeAreaView } from '../safe-area-view'
import { useAriaPress } from '../../hooks/aria/useAriaPress'
import { useOverlayStack } from '../../hooks/overlay/useOverlayStack'
import Loading from '../loading'
import { Checked, Close } from '../../internal/icons'
import { useAccessibilityAnnouncement, useAutoClose, useVisibilityLifecycle } from '../../internal/feedback'
import type { DeepPartial } from '../../types'
import { isFiniteNumber, isText, isRenderable } from '../../utils/base'
import { renderTextOrNode } from '../../utils/render'
import { nativeDriverEnabled } from '../../platform/animation'
import { useReducedMotion } from '../../hooks/animation'
import { useLocale } from '../config-provider/loc'
import { useToastTokens } from './tokens'
import type { ToastTokens } from './tokens'

const RT = () => true as const
export type ToastPosition = 'top' | 'middle' | 'bottom'
export type ToastType = 'info' | 'success' | 'fail' | 'loading'
export interface ToastProps { visible: boolean; message?: React.ReactNode; icon?: React.ReactNode; type?: ToastType; iconSize?: number; duration?: number; position?: ToastPosition; forbidClick?: boolean; overlay?: boolean; overlayStyle?: StyleProp<ViewStyle>; closeOnClickOverlay?: boolean; closeOnClick?: boolean; loadingIndicator?: React.ReactNode; safeAreaInsetTop?: boolean; safeAreaInsetBottom?: boolean; tokensOverride?: DeepPartial<ToastTokens>; style?: StyleProp<ViewStyle>; textStyle?: StyleProp<TextStyle>; onClose?: () => void; onOpen?: () => void; onOpened?: () => void; onClosed?: () => void; }

const ToastContentImpl: React.FC<ToastProps> = props => {
  const { visible, message, icon, type = 'info', iconSize, duration = 2000, position = 'middle', forbidClick = false, overlay = false, overlayStyle, closeOnClickOverlay = false, closeOnClick = false, loadingIndicator, safeAreaInsetTop: safeAreaInsetTopProp, safeAreaInsetBottom: safeAreaInsetBottomProp, tokensOverride, style, textStyle, onClose, onOpen, onOpened, onClosed } = props; const locale = useLocale(); const tokens = useToastTokens(tokensOverride); const reducedMotion = useReducedMotion(); const { colors } = tokens; const { height: windowHeight } = useWindowDimensions(); const resolvedDuration = isFiniteNumber(duration) ? Math.max(0, duration) : 0; const [mounted, setMounted] = useState(visible); const animatedValue = useRef(new Animated.Value(visible ? 1 : 0)).current; const animationRef = useRef<Animated.CompositeAnimation | null>(null); const animationIdRef = useRef(0); const { zIndex: stackZIndex } = useOverlayStack({ visible: mounted, type: 'toast' }); const positionOffset = windowHeight > 0 ? Math.round(windowHeight * tokens.positionOffsetRatio) : tokens.positionOffsetMin; const needsSafeAreaTop = safeAreaInsetTopProp !== undefined ? safeAreaInsetTopProp : position === 'top'; const needsSafeAreaBottom = safeAreaInsetBottomProp !== undefined ? safeAreaInsetBottomProp : position === 'bottom'
  const positionStyle: ViewStyle = position === 'top' ? { justifyContent: 'flex-start', paddingTop: positionOffset } : position === 'bottom' ? { justifyContent: 'flex-end', paddingBottom: positionOffset } : { justifyContent: 'center' }
  useEffect(() => { animationIdRef.current += 1; const animationId = animationIdRef.current; animationRef.current?.stop(); const d = reducedMotion ? 0 : tokens.animationDuration; if (visible) { setMounted(true); animationRef.current = Animated.timing(animatedValue, { toValue: 1, duration: d, easing: Easing.out(Easing.cubic), useNativeDriver: nativeDriverEnabled, isInteraction: false }); animationRef.current.start() } else { animationRef.current = Animated.timing(animatedValue, { toValue: 0, duration: d, easing: Easing.out(Easing.cubic), useNativeDriver: nativeDriverEnabled, isInteraction: false }); animationRef.current.start(({ finished }) => { if (!finished || animationId !== animationIdRef.current) return; setMounted(false) }) } }, [animatedValue, reducedMotion, tokens.animationDuration, visible])
  useEffect(() => () => { animationRef.current?.stop() }, [])
  const resolvedAnimDuration = reducedMotion ? 0 : tokens.animationDuration
  useAutoClose({ visible, duration: resolvedDuration, onClose })
  useAccessibilityAnnouncement({ visible, message })
  useVisibilityLifecycle({ visible, mounted, openedDelay: resolvedAnimDuration, onOpen, onOpened, onClosed })
  const pressProps = useAriaPress({ disabled: !closeOnClick, onPress: onClose, extraProps: { accessibilityRole: closeOnClick ? 'button' : 'alert', accessibilityHint: closeOnClick ? (locale?.vanToast?.closeHint ?? 'Double-tap to dismiss') : undefined, accessibilityLiveRegion: 'assertive' } })
  const resolvedIconSize = iconSize ?? tokens.iconSize
  const iconNode = icon ?? (type === 'success' ? <Checked size={resolvedIconSize} fill={colors.text} color={colors.text} /> : type === 'fail' ? <Close size={resolvedIconSize} fill={colors.text} color={colors.text} /> : type === 'loading' ? (loadingIndicator ?? <Loading color={colors.text} size={resolvedIconSize} />) : null)
  const messageStyle = { color: colors.text, fontSize: tokens.fontSize, lineHeight: tokens.lineHeight, fontFamily: tokens.fontFamily }
  const isTextOnly = type === 'info' && !iconNode
  const baseStyle: ViewStyle = isTextOnly ? { minWidth: tokens.textMinWidth, minHeight: 0, paddingVertical: tokens.textPaddingVertical, paddingHorizontal: tokens.textPaddingHorizontal } : { minWidth: tokens.defaultWidth, minHeight: tokens.defaultMinHeight, padding: tokens.defaultPadding }
  const toastStyle = { borderRadius: tokens.radius, opacity: closeOnClick && pressProps.states.pressed ? tokens.pressedOpacity : animatedValue, backgroundColor: tokens.colors.variants[type], maxWidth: tokens.maxWidth, ...baseStyle } as Animated.WithAnimatedValue<ViewStyle>
  if (!mounted) return null; const hasMessage = isRenderable(message) && (typeof message !== 'string' || message !== '')
  return (
    <View style={[S.b, { backgroundColor: tokens.colors.transparent }, positionStyle, stackZIndex ? { zIndex: stackZIndex } : undefined, { pointerEvents: forbidClick || overlay || closeOnClick ? 'auto' : 'none' }]}>
      {(overlay || forbidClick) && <Pressable testID="rv-toast-overlay" style={[S.o, { backgroundColor: tokens.colors.transparent }, overlay && { backgroundColor: colors.backdrop }, overlayStyle, { pointerEvents: 'auto' }]} onPress={overlay && closeOnClickOverlay ? onClose : undefined} onStartShouldSetResponder={RT} onMoveShouldSetResponder={RT} />}
      {needsSafeAreaTop && <SafeAreaView edge="top" pointerEvents="none" />}
      <Pressable disabled={!closeOnClick} {...pressProps.interactionProps} style={S.pw}>
        <Animated.View renderToHardwareTextureAndroid shouldRasterizeIOS style={[S.t, toastStyle, style]}>
          {iconNode && <View style={{ marginBottom: tokens.gap }}>{isText(iconNode) ? renderTextOrNode(iconNode, [{ color: colors.text, fontSize: tokens.iconSize }]) : iconNode}</View>}
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
const S = StyleSheet.create({ b: { flex: 1, alignItems: 'center' }, o: { ...StyleSheet.absoluteFillObject }, pw: { alignItems: 'center' }, t: { alignItems: 'center', justifyContent: 'center' }, m: { textAlign: 'center' }, mw: { alignItems: 'center' } })
export default Toast
