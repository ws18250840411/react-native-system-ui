import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View, useWindowDimensions, type LayoutChangeEvent, type ViewStyle } from 'react-native'
import { SafeAreaView } from '../safe-area-view'
import { addPopStateListener, nativeDriverEnabled } from '../../platform'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { isRenderable, isText } from '../../utils/validate'
import { Cross } from 'react-native-system-icon'
import Portal from '../portal/Portal'
import { useAriaOverlay, useOverlayStack } from '../../hooks'
import { useLocale } from '../config-provider/useLocale'
import { useDirection } from '../config-provider/useDirection'
import { usePopupTokens } from './tokens'
import type { PopupPlacement, PopupProps } from './types'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const EASE_IN = Easing.bezier(0.55, 0.055, 0.675, 0.19)
const EASE_OUT = Easing.bezier(0.075, 0.82, 0.165, 1.0)
const CAPTURE = () => true

const placementConfig: Record<PopupPlacement, { container: ViewStyle; axis: 'x' | 'y' }> = {
  top: { container: { justifyContent: 'flex-start', alignItems: 'center' }, axis: 'y' },
  bottom: { container: { justifyContent: 'flex-end', alignItems: 'center' }, axis: 'y' },
  left: { container: { justifyContent: 'center', alignItems: 'flex-start' }, axis: 'x' },
  right: { container: { justifyContent: 'center', alignItems: 'flex-end' }, axis: 'x' },
  center: { container: { justifyContent: 'center', alignItems: 'center' }, axis: 'y' },
}

const buildRadius = (round: boolean | undefined, p: PopupPlacement, r: number): ViewStyle | undefined => {
  if (!round) return
  if (p === 'top') return { borderBottomLeftRadius: r, borderBottomRightRadius: r }
  if (p === 'bottom') return { borderTopLeftRadius: r, borderTopRightRadius: r }
  if (p === 'left') return { borderTopRightRadius: r, borderBottomRightRadius: r }
  if (p === 'right') return { borderTopLeftRadius: r, borderBottomLeftRadius: r }
  return { borderRadius: r }
}

const hiddenStyle: ViewStyle = { opacity: 0, shadowOpacity: 0, shadowRadius: 0, elevation: 0 }

const PopupImpl: React.FC<PopupProps> = props => {
  const locale = useLocale()
  const layoutDir = useDirection()
  const { visible, placement: placementProp, position, title, description, tokensOverride, overlay = true, overlayStyle, overlayAccessibilityLabel = locale?.vanPopup?.closeOverlay ?? 'Close overlay', closeOnOverlayPress, closeOnClickOverlay, overlayTestID = 'popup-overlay', closeable = false, closeIcon, closeIconPosition = 'top-right', round, safeArea = false, safeAreaInsetTop = false, safeAreaInsetBottom: safeAreaInsetBottomProp, lockScroll = true, destroyOnClose = true, duration = 300, zIndex, closeOnBackPress = false, closeOnPopstate = false, children, beforeClose, onClickOverlay, onClose, onOpen, onOpened, onClosed, stopPropagation = true, style, contentAnimationStyle, ...rest } = props

  const placement = placementProp ?? position ?? 'center'
  const shouldCloseOnOverlay = closeOnClickOverlay ?? closeOnOverlayPress ?? true
  const isCenter = placement === 'center'
  const safeAreaInsetBottom = safeAreaInsetBottomProp ?? false
  const tokens = usePopupTokens(tokensOverride)

  const cbRef = useRef({ onOpened, onClosed, onOpen, onClose, beforeClose, onClickOverlay })
  cbRef.current = { onOpened, onClosed, onOpen, onClose, beforeClose, onClickOverlay }

  const ds = useMemo(() => {
    const shadow = createPlatformShadow(tokens.shadow)
    const { colors: c, spacing: s, typography: t, layout: l } = tokens
    return {
      popup: { backgroundColor: c.background, padding: s.padding, ...shadow } as ViewStyle,
      title: { color: c.title, fontSize: t.titleSize, fontWeight: t.titleWeight, marginHorizontal: s.descriptionHorizontal, textAlign: 'center' as const },
      titleWrap: { marginTop: s.titleTop, marginBottom: s.titleBottom, marginHorizontal: s.descriptionHorizontal, alignItems: 'center' as const },
      desc: { color: c.description, fontSize: t.descriptionSize, lineHeight: t.descriptionLineHeight },
      descWrap: { marginHorizontal: s.descriptionHorizontal, marginBottom: s.descriptionBottom } as ViewStyle,
      closeBase: { minWidth: s.closeIconSize, minHeight: s.closeIconSize, padding: s.closeIconPadding } as ViewStyle,
      closeDef: { width: s.closeIconSize, height: s.closeIconSize } as ViewStyle,
      side: { width: l.sideWidth, maxWidth: l.maxWidth } as ViewStyle,
      center: { minWidth: l.minWidth, maxWidth: l.centerMaxWidth } as ViewStyle,
    }
  }, [tokens])

  const [mounted, setMounted] = useState(visible)
  const [interVis, setInterVis] = useState(visible)
  const isOpen = visible || interVis
  const canCloseOvl = shouldCloseOnOverlay && (onClose || beforeClose)
  const progress = useRef(new Animated.Value(0)).current
  const animRef = useRef<Animated.CompositeAnimation | null>(null)
  const seqRef = useRef(0)
  const prevVis = useRef(visible)
  const closingRef = useRef(false)

  const isV = placement === 'top' || placement === 'bottom'
  const isH = placement === 'left' || placement === 'right'
  const dir = placement === 'top' || placement === 'left' ? -1 : 1

  const runAnim = useCallback((show: boolean) => {
    seqRef.current += 1
    const seq = seqRef.current
    animRef.current?.stop()
    const a = Animated.timing(progress, { toValue: show ? 1 : 0, duration, easing: show ? EASE_OUT : EASE_IN, useNativeDriver: nativeDriverEnabled, isInteraction: false })
    animRef.current = a
    a.start(({ finished }) => {
      if (!finished || seq !== seqRef.current) return
      if (show) { cbRef.current.onOpened?.() } else { setInterVis(false); if (destroyOnClose) setMounted(false); cbRef.current.onClosed?.() }
    })
  }, [destroyOnClose, duration, progress])

  useEffect(() => {
    if (visible) { setMounted(true); setInterVis(true); runAnim(true) } else { if (prevVis.current) runAnim(false) }
  }, [runAnim, visible])

  useEffect(() => { if (visible && !prevVis.current) cbRef.current.onOpen?.(); prevVis.current = visible }, [visible])
  useEffect(() => () => { animRef.current?.stop() }, [])

  const requestClose = useCallback(async (reason: 'close-icon' | 'overlay' | 'close') => {
    if (closingRef.current) return
    closingRef.current = true
    try { if (cbRef.current.beforeClose) { const r = await cbRef.current.beforeClose(reason); if (r === false) return }; cbRef.current.onClose?.() } finally { closingRef.current = false }
  }, [])

  useEffect(() => {
    if (!closeOnPopstate) return
    return addPopStateListener(() => { if (visible) requestClose('close') })
  }, [closeOnPopstate, requestClose, visible])

  const handleOvlPress = useCallback(() => { cbRef.current.onClickOverlay?.(); if (shouldCloseOnOverlay) requestClose('overlay') }, [requestClose, shouldCloseOnOverlay])
  const handleClosePress = useCallback(() => requestClose('close-icon'), [requestClose])
  const handleEscape = useCallback(() => requestClose('close'), [requestClose])

  const { zIndex: stackZ } = useOverlayStack({ visible: isOpen, onClose: handleEscape, closeOnBack: closeOnBackPress, lockScroll, zIndex, type: 'popup' })
  const { overlayRef, overlayProps } = useAriaOverlay({ isOpen, onClose: () => requestClose('overlay'), isDismissable: shouldCloseOnOverlay, overlayProps: { ...(Platform.OS === 'android' ? {} : { accessibilityRole: 'dialog' }), accessibilityLiveRegion: 'polite' } })
  const { onLayout: ovlOnLayout, ...ovlRest } = overlayProps
  const contentProps = useMemo(() => stopPropagation ? { ...ovlRest, onStartShouldSetResponder: CAPTURE } : ovlRest, [ovlRest, stopPropagation])

  const cfg = placementConfig[placement]
  const radiusStyle = buildRadius(round, placement, tokens.radius.round)
  const { width: wW, height: wH } = useWindowDimensions()
  const dist = isH ? wW : isV ? wH : 0

  const translateT = useMemo(() => {
    if (isCenter) return null
    const out: [number, number] = [dist * dir, 0]
    return cfg.axis === 'y' ? { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: out }) } : { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: out }) }
  }, [cfg.axis, dir, dist, isCenter, progress])

  const baseT = useMemo(() => translateT ? [translateT] : [], [translateT])

  const animStyle = useMemo(() => {
    const et = contentAnimationStyle?.transform
    const t = Array.isArray(et) ? [...baseT, ...et] : baseT
    const s = { ...contentAnimationStyle, transform: t }
    if (isCenter) return { ...s, opacity: progress }
    if (contentAnimationStyle?.opacity == null) return { ...s, opacity: 1 }
    return s
  }, [baseT, contentAnimationStyle, isCenter, progress])

  const [saTopH, setSaTopH] = useState(0)
  const onSaTop = useCallback((e: LayoutChangeEvent) => setSaTopH(e.nativeEvent.layout.height), [])

  const shouldRender = mounted || visible
  const hidden = !isOpen
  const hasHeader = isRenderable(title) || isRenderable(description)

  const headerNode = useMemo(() => {
    if (!hasHeader) return null
    const pad = tokens.spacing.closeIconRight + tokens.spacing.closeIconSize
    const ps = closeable && closeIconPosition.startsWith('top-') ? closeIconPosition.endsWith('right') ? { paddingRight: pad } : { paddingLeft: pad } : undefined
    const renderH = (n: React.ReactNode, ts: any, ws: any) => !isRenderable(n) ? null : isText(n) ? <Text style={ts}>{n}</Text> : <View style={ws}>{n}</View>
    return <View style={[S.header, ps]}>{renderH(title, [S.title, ds.title], ds.titleWrap)}{renderH(description, [S.desc, ds.desc], ds.descWrap)}</View>
  }, [closeable, closeIconPosition, description, ds, hasHeader, title, tokens.spacing.closeIconRight, tokens.spacing.closeIconSize])

  const closeNode = useMemo(() => {
    if (!closeable) return null
    const custom = closeIcon != null
    const v = closeIconPosition.includes('bottom') ? { bottom: tokens.spacing.closeIconTop } : { top: tokens.spacing.closeIconTop + saTopH }
    const isRtl = layoutDir === 'rtl'
    const h = closeIconPosition.endsWith('left')
      ? (isRtl ? { right: tokens.spacing.closeIconRight } : { left: tokens.spacing.closeIconRight })
      : (isRtl ? { left: tokens.spacing.closeIconRight } : { right: tokens.spacing.closeIconRight })
    return <Pressable style={[S.closeBase, ds.closeBase, v, h, !custom && ds.closeDef]} hitSlop={8} onPress={handleClosePress}>{custom ? closeIcon : <Cross size={22} fill={tokens.colors.closeIcon} color={tokens.colors.closeIcon} />}</Pressable>
  }, [closeIcon, closeIconPosition, closeable, ds, handleClosePress, saTopH, tokens.colors.closeIcon, tokens.spacing.closeIconRight, tokens.spacing.closeIconTop])

  const body = hasHeader ? <>{headerNode}{children}</> : children

  if (!shouldRender) return null
  const rz = stackZ ?? zIndex

  const safeContent = safeArea
    ? <SafeAreaView>{body}</SafeAreaView>
    : <>{safeAreaInsetTop && <SafeAreaView edge="top" onLayout={onSaTop} pointerEvents="none" />}{body}{safeAreaInsetBottom && <SafeAreaView edge="bottom" pointerEvents="none" />}</>

  return (
    <Portal>
      <View style={[S.root, rz ? { zIndex: rz } : undefined]} pointerEvents="box-none">
        <View style={[S.ctr, cfg.container]} pointerEvents={isOpen ? 'auto' : 'none'} accessibilityViewIsModal={isOpen} accessibilityLiveRegion="polite" onAccessibilityEscape={handleEscape}>
          {overlay && isOpen ? <AnimatedPressable testID={overlayTestID} style={[S.ovl, { backgroundColor: tokens.colors.overlay, opacity: progress }, overlayStyle]} renderToHardwareTextureAndroid={Platform.OS === 'android'} shouldRasterizeIOS={Platform.OS === 'ios'} pointerEvents={isOpen ? 'auto' : 'none'} {...(canCloseOvl ? { accessibilityRole: 'button' as const, accessibilityLabel: overlayAccessibilityLabel, accessibilityHint: locale?.vanPopup?.closeHint ?? 'Double-tap to close' } : { accessible: false })} onPress={handleOvlPress} /> : null}
          {!overlay && lockScroll && isOpen ? <View style={S.lock} pointerEvents="auto" onStartShouldSetResponder={CAPTURE} onMoveShouldSetResponder={CAPTURE} /> : null}
          <Animated.View ref={overlayRef as any} {...contentProps} onLayout={ovlOnLayout} renderToHardwareTextureAndroid={Platform.OS === 'android'} shouldRasterizeIOS={Platform.OS === 'ios'} style={[ds.popup, isCenter && ds.center, isV && S.popV, isH && ds.side, radiusStyle, animStyle, style, hidden && hiddenStyle]} {...rest}>
            {closeNode}
            {safeContent}
          </Animated.View>
        </View>
      </View>
    </Portal>
  )
}

const S = StyleSheet.create({
  root: { ...StyleSheet.absoluteFillObject, justifyContent: 'center' },
  ctr: { flex: 1 },
  ovl: { ...StyleSheet.absoluteFillObject, opacity: 0 },
  header: { width: '100%' },
  title: { includeFontPadding: false },
  desc: { includeFontPadding: false },
  popV: { alignSelf: 'stretch' },
  closeBase: { position: 'absolute', zIndex: 999, alignItems: 'center', justifyContent: 'center' },
  lock: { ...StyleSheet.absoluteFillObject },
})

export type { PopupPlacement, PopupCloseIconPosition, PopupProps } from './types'
export const Popup = React.memo(PopupImpl)
Popup.displayName = 'Popup'
export default Popup
