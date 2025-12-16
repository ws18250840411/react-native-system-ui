import React from 'react'
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
  type ViewProps,
} from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { Cross } from 'react-native-system-icon'
import Portal from '../portal/Portal'
import { useOverlayStack } from '../overlay'
import { useAriaOverlay } from '../../hooks'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type PopupPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center'
export type PopupCloseIconPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

export interface PopupProps extends ViewProps {
  visible: boolean
  /** 与 react-vant 对齐：position 等价于 placement */
  position?: PopupPlacement
  placement?: PopupPlacement
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  overlayAccessibilityLabel?: string
  closeOnOverlayPress?: boolean
  closeOnClickOverlay?: boolean
  overlayTestID?: string
  closeable?: boolean
  closeIcon?: React.ReactNode
  closeIconPosition?: PopupCloseIconPosition
  stopPropagation?: boolean
  round?: boolean
  safeArea?: boolean
  safeAreaInsetTop?: boolean
  safeAreaInsetBottom?: boolean
  lockScroll?: boolean
  destroyOnClose?: boolean
  duration?: number
  zIndex?: number
  closeOnBackPress?: boolean
  closeOnPopstate?: boolean
  children?: React.ReactNode
  beforeClose?: (reason: 'close-icon' | 'overlay' | 'close') => boolean | Promise<boolean>
  onClickOverlay?: () => void
  onClose?: () => void
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
}

interface PopupTokens {
  colors: {
    overlay: string
    background: string
  }
  radius: {
    round: number
  }
}

const createPopupTokens = (foundations: Foundations): PopupTokens => ({
  colors: {
    overlay: 'rgba(0,0,0,0.5)',
    background: '#fff',
  },
  radius: {
    round: foundations.radii.lg,
  },
})

const usePopupTokens = (overrides?: DeepPartial<PopupTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createPopupTokens(foundations)
    const globalOverrides = components?.popup as DeepPartial<PopupTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [foundations, components, overrides])
}

const placementConfig: Record<
  PopupPlacement,
  { container: ViewStyle; axis: 'x' | 'y'; scale?: boolean }
> = {
  top: { container: { justifyContent: 'flex-start', alignItems: 'center' }, axis: 'y' },
  bottom: { container: { justifyContent: 'flex-end', alignItems: 'center' }, axis: 'y' },
  left: { container: { justifyContent: 'center', alignItems: 'flex-start' }, axis: 'x' },
  right: { container: { justifyContent: 'center', alignItems: 'flex-end' }, axis: 'x' },
  center: { container: { justifyContent: 'center', alignItems: 'center' }, axis: 'y', scale: true },
}

const buildRadius = (round: boolean | undefined, placement: PopupPlacement, radius: number) => {
  if (!round) return { borderRadius: 0 }
  switch (placement) {
    case 'top':
      return {
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
      }
    case 'bottom':
      return {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
      }
    case 'left':
      return {
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
      }
    case 'right':
      return {
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
      }
    default:
      return { borderRadius: radius }
  }
}

const renderWithSafeArea = (
  children: React.ReactNode,
  opts: { safeArea: boolean; safeAreaInsetTop: boolean; safeAreaInsetBottom: boolean }
) => {
  if (opts.safeArea) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        {children}
      </SafeAreaView>
    )
  }
  return (
    <>
      {opts.safeAreaInsetTop ? <SafeAreaView style={styles.safeInsetTop} /> : null}
      {children}
      {opts.safeAreaInsetBottom ? <SafeAreaView style={styles.safeInsetBottom} /> : null}
    </>
  )
}

export const Popup: React.FC<PopupProps> = props => {
  const {
    visible,
    placement: placementProp,
    position,
    overlay = true,
    overlayStyle,
    overlayAccessibilityLabel = '关闭弹层',
    closeOnOverlayPress,
    closeOnClickOverlay,
    overlayTestID = 'popup-overlay',
    closeable = false,
    closeIcon,
    closeIconPosition = 'top-right',
    round,
    safeArea = false,
    safeAreaInsetTop = false,
    safeAreaInsetBottom: safeAreaInsetBottomProp,
    lockScroll = true,
    destroyOnClose = false,
    duration = 300,
    zIndex,
    closeOnBackPress = false,
    closeOnPopstate = false,
    children,
    beforeClose,
    onClickOverlay,
    onClose,
    onOpen,
    onOpened,
    onClosed,
    stopPropagation = true,
    style,
    ...rest
  } = props

  const placement = placementProp ?? position ?? 'center'
  const shouldCloseOnOverlay = closeOnClickOverlay ?? closeOnOverlayPress ?? true
  const shouldTranslate = placement !== 'center'
  const safeAreaInsetBottom = safeAreaInsetBottomProp ?? false
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()

  const tokens = usePopupTokens()
  const [mounted, setMounted] = React.useState(visible)
  const [interactionVisible, setInteractionVisible] = React.useState(visible)
  const [contentSize, setContentSize] = React.useState({ width: 0, height: 0 })
  const progress = React.useRef(new Animated.Value(visible ? 1 : 0)).current
  const animatingRef = React.useRef(false)
  const animationRef = React.useRef<Animated.CompositeAnimation | null>(null)
  const pendingShowRef = React.useRef(false)
  const distanceRef = React.useRef(0)
  const pendingLayoutRef = React.useRef<{ width: number; height: number } | null>(null)
  const prevVisible = React.useRef(visible)

  const isVertical = placement === 'top' || placement === 'bottom'
  const isHorizontal = placement === 'left' || placement === 'right'
  const direction = placement === 'top' || placement === 'left' ? -1 : 1

  const runAnimation = React.useCallback(
    (show: boolean) => {
      animatingRef.current = true
      if (show) {
        setMounted(true)
        setInteractionVisible(true)
      }
      // 对齐 react-vant：进入使用 ease-out，退出使用 ease-in（近似 CSS cubic-bezier 0.25,0.1,0.25,1 / 0.42,0,1,1）
      const easing = show ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic)
      animationRef.current?.stop()
      const animation = Animated.timing(progress, {
        toValue: show ? 1 : 0,
        duration,
        easing,
        useNativeDriver: true,
      })
      animationRef.current = animation

      animation.start(({ finished }) => {
        if (!finished) return
        animatingRef.current = false
        const pending = pendingLayoutRef.current
        if (pending) {
          pendingLayoutRef.current = null
          distanceRef.current = isVertical ? pending.height : pending.width
          setContentSize(pending)
        }
        if (show) {
          onOpened?.()
        } else {
          setInteractionVisible(false)
          if (destroyOnClose) {
            setMounted(false)
          }
          onClosed?.()
        }
      })
    },
    [destroyOnClose, duration, isVertical, onClosed, onOpened, progress]
  )

  React.useEffect(() => {
    const needsMeasure = shouldTranslate && distanceRef.current === 0
    if (visible) {
      if (needsMeasure) {
        pendingShowRef.current = true
        progress.setValue(0)
        setMounted(true)
        setInteractionVisible(true)
        return
      }
      pendingShowRef.current = false
      runAnimation(true)
    } else {
      pendingShowRef.current = false
      runAnimation(false)
    }
  }, [progress, runAnimation, shouldTranslate, visible])

  React.useEffect(() => {
    if (visible && !prevVisible.current) {
      onOpen?.()
    }
    prevVisible.current = visible
  }, [onOpen, visible])

  React.useEffect(
    () => () => {
      animationRef.current?.stop()
    },
    []
  )

  const requestClose = React.useCallback(
    async (reason: 'close-icon' | 'overlay' | 'close') => {
      if (beforeClose) {
        const result = await beforeClose(reason)
        if (result === false) {
          return
        }
      }
      onClose?.()
    },
    [beforeClose, onClose]
  )

  React.useEffect(() => {
    if (!closeOnPopstate || typeof window === 'undefined') {
      return
    }
    const handler = () => {
      if (!visible) return
      requestClose('close')
    }
    window.addEventListener('popstate', handler)
    return () => {
      window.removeEventListener('popstate', handler)
    }
  }, [closeOnPopstate, requestClose, visible])

  const handleStackClose = React.useCallback(() => {
    requestClose('close')
  }, [requestClose])

  const { zIndex: stackZIndex } = useOverlayStack({
    visible,
    onClose: handleStackClose,
    closeOnBack: closeOnBackPress,
    lockScroll,
    zIndex,
    type: 'popup',
  })

  const { overlayRef, overlayProps } = useAriaOverlay({
    isOpen: visible,
    onClose: () => requestClose('overlay'),
    isDismissable: shouldCloseOnOverlay,
    overlayProps: {
      accessibilityRole: 'dialog',
      accessibilityLiveRegion: 'polite',
    },
  })

  const { onLayout: overlayOnLayout, ...overlayRestProps } = overlayProps

  const contentInteractionProps = React.useMemo(() => {
    if (!stopPropagation) {
      return overlayRestProps
    }
    return {
      ...overlayRestProps,
      onStartShouldSetResponder: () => true,
    }
  }, [overlayRestProps, stopPropagation])

  const config = placementConfig[placement]
  const distance =
    distanceRef.current ||
    (config.axis === 'x'
      ? contentSize.width || windowWidth
      : contentSize.height || windowHeight)

  const translateStyle: Animated.WithAnimatedObject<ViewStyle> = shouldTranslate
    ? {
      transform: [
        config.axis === 'y'
          ? {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [distance * direction, 0],
            }),
          }
          : {
            translateX: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [distance * direction, 0],
            }),
          },
      ],
    }
    : { transform: [] }

  const overlayOpacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })
  const contentOpacity = placement === 'center' ? progress : 1
  const animatedContentStyle: Animated.WithAnimatedObject<ViewStyle> = {
    ...translateStyle,
    opacity: contentOpacity,
  }

  const handleContentLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      overlayOnLayout?.(event)
      const { width, height } = event.nativeEvent.layout
      const next = { width, height }
      const nextDistance = isVertical ? height : width
      if (animatingRef.current) {
        pendingLayoutRef.current = next
        return
      }
      distanceRef.current = nextDistance
      setContentSize(prev => {
        if (Math.abs(prev.width - width) < 0.5 && Math.abs(prev.height - height) < 0.5) {
          return prev
        }
        return next
      })
      if (pendingShowRef.current) {
        pendingShowRef.current = false
        runAnimation(true)
      }
    },
    [isVertical, overlayOnLayout, runAnimation]
  )

  const shouldRender = mounted || visible

  if (!shouldRender) return null

  const hidden = (!visible && !interactionVisible) || pendingShowRef.current

  const hasCustomCloseIcon = closeIcon != null

  const content = (
    <Animated.View
      ref={overlayRef}
      {...contentInteractionProps}
      onLayout={handleContentLayout}
      style={[
        styles.popup,
        placement === 'center' ? styles.popupCenter : null,
        isVertical ? styles.popupVertical : null,
        isHorizontal ? styles.popupSide : null,
        {
          backgroundColor: tokens.colors.background,
          ...buildRadius(round, placement, tokens.radius.round),
        },
        animatedContentStyle,
        hidden ? styles.hiddenContent : null,
        style,
      ]}
      {...rest}
    >
      {closeable ? (
        <Pressable
          style={[
            styles.closeIconBase,
            closeIconPosition === 'top-left'
              ? { top: 12, left: 12 }
              : closeIconPosition === 'bottom-left'
                ? { bottom: 12, left: 12 }
                : closeIconPosition === 'bottom-right'
                  ? { bottom: 12, right: 12 }
                  : { top: 12, right: 12 },
            !hasCustomCloseIcon ? styles.closeIconDefault : null,
          ]}
          hitSlop={8}
          onPress={() => requestClose('close-icon')}
        >
          {hasCustomCloseIcon ? closeIcon : <Cross size={22} fill="#c8c9cc" color="#c8c9cc" />}
        </Pressable>
      ) : null}
      {renderWithSafeArea(children, { safeArea, safeAreaInsetTop, safeAreaInsetBottom })}
    </Animated.View>
  )

  const resolvedZIndex = stackZIndex ?? zIndex

  return (
    <Portal>
      <View
        style={[styles.portalRoot, resolvedZIndex ? { zIndex: resolvedZIndex } : null]}
        pointerEvents="box-none"
      >
        <View
          style={[styles.container, config.container]}
          pointerEvents={visible || interactionVisible ? 'auto' : 'none'}
          accessibilityViewIsModal={visible}
          accessibilityLiveRegion="polite"
          onAccessibilityEscape={() => requestClose('close')}
        >
          {overlay && (visible || interactionVisible) ? (
            <AnimatedPressable
              testID={overlayTestID}
              style={[
                styles.overlay,
                { backgroundColor: tokens.colors.overlay, opacity: overlayOpacity },
                overlayStyle,
              ]}
              pointerEvents={visible ? 'auto' : 'none'}
              accessibilityRole="button"
              accessibilityLabel={overlayAccessibilityLabel}
              accessibilityHint={
                shouldCloseOnOverlay ? '双击即可关闭弹层' : undefined
              }
              onPress={() => {
                onClickOverlay?.()
                if (shouldCloseOnOverlay) {
                  requestClose('overlay')
                }
              }}
            />
          ) : null}
          {!overlay && lockScroll && (visible || interactionVisible) ? (
            <View
              style={styles.lockLayer}
              pointerEvents="auto"
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
            />
          ) : null}
          {visible || mounted ? content : null}
        </View>
      </View>
    </Portal>
  )
}

const popupShadow = createPlatformShadow({
  color: 'rgba(0,0,0,0.25)',
  opacity: 0.35,
  radius: 18,
  offsetY: 8,
  elevation: 24,
})

const styles = StyleSheet.create({
  portalRoot: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
  popup: {
    padding: 16,
    ...popupShadow,
  },
  popupVertical: {
    alignSelf: 'stretch',
  },
  popupSide: {
    width: '80%',
    maxWidth: 420,
    height: '100%',
  },
  popupCenter: {
    alignSelf: 'center',
    minWidth: 260,
    maxWidth: 360,
  },
  closeIconBase: {
    position: 'absolute',
    zIndex: 1,
    minWidth: 36,
    minHeight: 36,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconDefault: {
    width: 36,
    height: 36,
  },
  lockLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  hiddenContent: {
    pointerEvents: 'none',
  },
  safeAreaView: {
    width: '100%',
  },
  safeInsetTop: {
    width: '100%',
  },
  safeInsetBottom: {
    width: '100%',
  },
})

Popup.displayName = 'Popup'

export default Popup
