import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Easing, Platform, Pressable, View, type LayoutChangeEvent, type ViewStyle } from 'react-native'
import { isFunction, isText, renderTextOrNode } from '../../utils'
import { isRenderable } from '../../utils/validate'
import { useAriaPress, useSafeAreaPadding, useOverlayStack } from '../../hooks'
import Portal from '../portal/Portal'
import { nativeDriverEnabled } from '../../platform'
import { useReducedMotion } from '../../hooks/animation'
import type { NotifyProps, NotifyPosition } from './types'
import { useNotifyTokens } from './tokens'
export type { NotifyProps, NotifyPosition, NotifyType, NotifyTokens } from './types'

const NotifyContentImpl: React.FC<NotifyProps> = props => {
  const { visible, message, type: typeProp, duration: durationProp, position: positionProp, offset: offsetProp, color, background, zIndex, closeOnClick: closeOnClickProp, style, textStyle, tokensOverride, onClick, onClose, onOpen, onOpened, onClosed } = props; const tokens = useNotifyTokens(tokensOverride); const reducedMotion = useReducedMotion(); const safeAreaPadding = useSafeAreaPadding({ top: 0, bottom: 0 }); const type = typeProp ?? tokens.defaults.type; const position: NotifyPosition = positionProp ?? tokens.defaults.position; const closeOnClick = closeOnClickProp ?? tokens.defaults.closeOnClick; const safeAreaInsetTop = props.safeAreaInsetTop ?? (position === 'top' ? tokens.defaults.safeAreaInsetTop : false); const safeAreaInsetBottom = props.safeAreaInsetBottom ?? (position === 'bottom' ? tokens.defaults.safeAreaInsetBottom : false); const safeAreaTopValue = safeAreaInsetTop && position === 'top' ? safeAreaPadding.paddingTop : 0; const safeAreaBottomValue = safeAreaInsetBottom && position === 'bottom' ? safeAreaPadding.paddingBottom : 0; const offset = typeof offsetProp === 'number' && Number.isFinite(offsetProp) ? Math.max(0, offsetProp) : 0; const addOffset = (value: number | string, delta: number) => typeof value === 'string' ? `calc(${value} + ${delta}px)` : value + delta; const safeAreaBottomInset = safeAreaInsetBottom && position === 'bottom' && typeof safeAreaBottomValue === 'number' ? safeAreaBottomValue + offset : offset; const webTopPadding = Platform.OS === 'web' && position === 'top' ? addOffset(safeAreaTopValue, offset) : undefined; const webBottomPadding = Platform.OS === 'web' && safeAreaInsetBottom && position === 'bottom' ? addOffset(safeAreaBottomValue, offset) : undefined; const variant = tokens.colors.variants[type]; const resolvedBackground = background ?? variant.background; const resolvedTextColor = color ?? variant.text; const resolvedDuration = durationProp ?? tokens.defaults.duration; const onCloseRef = useRef(onClose); onCloseRef.current = onClose; const onOpenRef = useRef(onOpen); onOpenRef.current = onOpen; const onOpenedRef = useRef(onOpened); onOpenedRef.current = onOpened; const onClosedRef = useRef(onClosed); onClosedRef.current = onClosed; const onClickRef = useRef(onClick); onClickRef.current = onClick; const [barHeight, setBarHeight] = useState(0); const handleLayout = useCallback((e: LayoutChangeEvent) => { const height = e.nativeEvent.layout.height; if (!height) return; setBarHeight(prev => prev === height ? prev : height) }, []); const canAnimate = barHeight > 0; const [mounted, setMounted] = useState(visible); const animatedValue = useRef(new Animated.Value(0)).current; const animationRef = useRef<Animated.CompositeAnimation | null>(null); const animationIdRef = useRef(0); const { zIndex: stackZIndex } = useOverlayStack({ visible: mounted, type: 'notify', zIndex }); const resolvedZIndex = stackZIndex ?? zIndex; const previousVisibleRef = useRef(visible); const closingRef = useRef(false)
  useEffect(() => { animationIdRef.current += 1; const animationId = animationIdRef.current; animationRef.current?.stop(); const d = reducedMotion ? 0 : tokens.defaults.animationDuration; if (visible) { setMounted(true); if (!canAnimate) { animatedValue.setValue(0); return }; animationRef.current = Animated.timing(animatedValue, { toValue: 1, duration: d, easing: Easing.out(Easing.cubic), useNativeDriver: nativeDriverEnabled, isInteraction: false }); animationRef.current.start() } else { if (!canAnimate) { animatedValue.setValue(0); setMounted(false); return }; animationRef.current = Animated.timing(animatedValue, { toValue: 0, duration: d, easing: Easing.out(Easing.cubic), useNativeDriver: nativeDriverEnabled, isInteraction: false }); animationRef.current.start(({ finished }) => { if (!finished || animationId !== animationIdRef.current) return; setMounted(false) }) } }, [animatedValue, canAnimate, reducedMotion, tokens.defaults.animationDuration, visible])
  useEffect(() => () => { animationRef.current?.stop() }, [])
  const resolvedAnimDuration = reducedMotion ? 0 : tokens.defaults.animationDuration
  useEffect(() => { if (visible) { closingRef.current = false; if (!previousVisibleRef.current) { onOpenRef.current?.(); if (onOpenedRef.current) { const cb = onOpenedRef.current; const t = setTimeout(cb, resolvedAnimDuration); previousVisibleRef.current = visible; return () => clearTimeout(t) } } } else if (previousVisibleRef.current) closingRef.current = true; previousVisibleRef.current = visible }, [resolvedAnimDuration, visible])
  useEffect(() => { if (!mounted && closingRef.current) { closingRef.current = false; onClosedRef.current?.() } }, [mounted])
  useEffect(() => { if (!visible || resolvedDuration <= 0) return; const timeout = setTimeout(() => { onCloseRef.current?.() }, resolvedDuration); return () => clearTimeout(timeout) }, [resolvedDuration, visible])
  const contentHeight = barHeight > 0 ? barHeight : tokens.sizing.minHeight; const interactive = closeOnClick || isFunction(onClick); const handlePress = useCallback(() => { onClickRef.current?.(); if (closeOnClick) onCloseRef.current?.() }, [closeOnClick]); const accessibilityRole = interactive ? 'button' : 'alert'; const pressProps = useAriaPress({ disabled: !interactive, onPress: handlePress, extraProps: { accessibilityRole, accessibilityLiveRegion: 'assertive' } })
  const translateY = useMemo(() => position === 'bottom' ? animatedValue.interpolate({ inputRange: [0, 1], outputRange: [contentHeight, 0] }) : animatedValue.interpolate({ inputRange: [0, 1], outputRange: [-contentHeight, 0] }), [animatedValue, contentHeight, position]); const hasMessage = isRenderable(message) && (typeof message !== 'string' || message !== '')
  const barRender = useMemo(() => (
    <View style={[tokens.layout.container, position === 'top' ? ({ paddingTop: webTopPadding ?? addOffset(safeAreaTopValue, offset) } as ViewStyle) : null, webBottomPadding !== undefined ? ({ paddingBottom: webBottomPadding } as ViewStyle) : null]}>
      <View style={{ height: contentHeight, overflow: 'hidden' }}>
        <Animated.View testID="rv-notify-bar" accessibilityRole={!interactive ? accessibilityRole : undefined} accessibilityLiveRegion={!interactive ? 'assertive' : undefined} renderToHardwareTextureAndroid shouldRasterizeIOS onLayout={handleLayout} style={[tokens.layout.container, { opacity: animatedValue, transform: [{ translateY }] } as ViewStyle, style]}>
          <View style={{ backgroundColor: resolvedBackground }}>
            <View style={[tokens.layout.content, { paddingHorizontal: tokens.spacing.paddingHorizontal, paddingVertical: tokens.spacing.paddingVertical, minHeight: tokens.sizing.minHeight }]}>
              {hasMessage && (isText(message) ? renderTextOrNode(message, [tokens.layout.text, { color: resolvedTextColor, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.fontSize, lineHeight: tokens.typography.lineHeight }, textStyle]) : message)}
            </View>
          </View>
        </Animated.View>
      </View>
      {position === 'bottom' && <View style={{ height: safeAreaBottomInset }} />}
    </View>
  ), [accessibilityRole, animatedValue, contentHeight, handleLayout, hasMessage, interactive, message, offset, resolvedBackground, resolvedTextColor, safeAreaBottomInset, safeAreaTopValue, style, textStyle, tokens.layout.container, tokens.layout.content, tokens.layout.text, tokens.sizing.minHeight, tokens.spacing.paddingHorizontal, tokens.spacing.paddingVertical, tokens.typography.fontFamily, tokens.typography.fontSize, tokens.typography.lineHeight, translateY, webBottomPadding, webTopPadding, position])
  if (!mounted) return null
  return (
    <View testID="rv-notify" pointerEvents={interactive ? 'box-none' : 'none'} style={[tokens.layout.portal, position === 'bottom' ? { bottom: 0 } : { top: 0 }, resolvedZIndex != null ? { zIndex: resolvedZIndex } : null]}>
      {interactive ? <Pressable {...pressProps.interactionProps} disabled={!interactive}>{barRender}</Pressable> : barRender}
    </View>
  )
}

export const NotifyContent = React.memo(NotifyContentImpl)
const NotifyImpl: React.FC<NotifyProps> = props => <Portal><NotifyContent {...props} /></Portal>
export const Notify = React.memo(NotifyImpl)
export default Notify
