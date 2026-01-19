import React from 'react'
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  type ViewProps,
} from 'react-native'

import type { DeepPartial } from '../../types'
import { addPopStateListener, nativeDriverEnabled } from '../../platform'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { isRenderable, isText } from '../../utils/validate'
import { Cross } from 'react-native-system-icon'
import Portal from '../portal/Portal'
import { useOverlayStack } from '../overlay'
import { useAriaOverlay } from '../../hooks'
import type { PopupTokens } from './tokens'
import { usePopupTokens } from './tokens'

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
  title?: React.ReactNode
  description?: React.ReactNode
  tokensOverride?: DeepPartial<PopupTokens>
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
  /** 自定义内容动画样式，用于覆盖默认动画（如 Dialog 的 scale 动画） */
  contentAnimationStyle?: Animated.WithAnimatedObject<ViewStyle>
}

const placementConfig: Record<
  PopupPlacement,
  { container: ViewStyle; axis: 'x' | 'y' }
> = {
  top: { container: { justifyContent: 'flex-start', alignItems: 'center' }, axis: 'y' },
  bottom: { container: { justifyContent: 'flex-end', alignItems: 'center' }, axis: 'y' },
  left: { container: { justifyContent: 'center', alignItems: 'flex-start' }, axis: 'x' },
  right: { container: { justifyContent: 'center', alignItems: 'flex-end' }, axis: 'x' },
  center: { container: { justifyContent: 'center', alignItems: 'center' }, axis: 'y' },
}

const buildRadius = (
  round: boolean | undefined,
  placement: PopupPlacement,
  radius: number,
): ViewStyle | undefined => {
  if (!round) return
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

const renderHeaderNode = (
  node: React.ReactNode,
  options: { textStyle: StyleProp<TextStyle>; wrapperStyle: StyleProp<ViewStyle> },
) => {
  if (!isRenderable(node)) return null
  if (isText(node)) {
    return <Text style={options.textStyle}>{node}</Text>
  }
  return <View style={options.wrapperStyle}>{node}</View>
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

const hiddenContentStyle: ViewStyle = {
  opacity: 0,
  shadowOpacity: 0,
  shadowRadius: 0,
  elevation: 0,
}

export const Popup: React.FC<PopupProps> = props => {
  const {
    visible,
    placement: placementProp,
    position,
    title,
    description,
    tokensOverride,
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
    contentAnimationStyle,
    ...rest
  } = props

  const placement = placementProp ?? position ?? 'center'
  const shouldCloseOnOverlay = closeOnClickOverlay ?? closeOnOverlayPress ?? true
  const shouldTranslate = placement !== 'center'
  const safeAreaInsetBottom = safeAreaInsetBottomProp ?? false
  const resolvedDuration = duration < 0 ? 0 : duration

  const tokens = usePopupTokens(tokensOverride)

  const dynamicStyles = React.useMemo(() => {
    const shadow = createPlatformShadow({
      color: tokens.shadow.color,
      opacity: tokens.shadow.opacity,
      radius: tokens.shadow.radius,
      offsetY: tokens.shadow.offsetY,
      elevation: tokens.shadow.elevation,
    })

    const popup: ViewStyle = {
      backgroundColor: tokens.colors.background,
      padding: tokens.spacing.padding,
      ...shadow,
    }

    const title: TextStyle = {
      color: tokens.colors.title,
      fontSize: tokens.typography.titleSize,
      fontWeight: tokens.typography.titleWeight,
      marginHorizontal: tokens.spacing.descriptionHorizontal,
      textAlign: 'center',
    }

    const titleWrapper: ViewStyle = {
      marginTop: tokens.spacing.titleTop,
      marginBottom: tokens.spacing.titleBottom,
      marginHorizontal: tokens.spacing.descriptionHorizontal,
      alignItems: 'center',
    }

    const description: TextStyle = {
      color: tokens.colors.description,
      fontSize: tokens.typography.descriptionSize,
      lineHeight: tokens.typography.descriptionLineHeight,
    }

    const descriptionWrapper: ViewStyle = {
      marginHorizontal: tokens.spacing.descriptionHorizontal,
      marginBottom: tokens.spacing.descriptionBottom,
    }

    const closeIconBase: ViewStyle = {
      minWidth: tokens.spacing.closeIconSize,
      minHeight: tokens.spacing.closeIconSize,
      padding: 6,
    }

    const closeIconDefault: ViewStyle = {
      width: tokens.spacing.closeIconSize,
      height: tokens.spacing.closeIconSize,
    }

    const popupSide: ViewStyle = {
      width: tokens.layout.sideWidth,
      maxWidth: tokens.layout.maxWidth,
    }

    const popupCenter: ViewStyle = {
      minWidth: tokens.layout.minWidth,
      maxWidth: tokens.layout.centerMaxWidth,
    }

    return {
      popup,
      title,
      titleWrapper,
      description,
      descriptionWrapper,
      closeIconBase,
      closeIconDefault,
      popupSide,
      popupCenter,
    }
  }, [tokens])

  const [mounted, setMounted] = React.useState(visible)
  const [interactionVisible, setInteractionVisible] = React.useState(visible)
  const [contentDistance, setContentDistance] = React.useState(0)
  const progress = React.useRef(new Animated.Value(0)).current
  const animatingRef = React.useRef(false)
  const animationRef = React.useRef<Animated.CompositeAnimation | null>(null)
  const distanceRef = React.useRef(0)
  const pendingDistanceRef = React.useRef<number | null>(null)
  const pendingShowRef = React.useRef(false)
  const openFallbackTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevVisible = React.useRef(visible)
  const closingRef = React.useRef(false)

  const isVertical = placement === 'top' || placement === 'bottom'
  const isHorizontal = placement === 'left' || placement === 'right'
  const direction = placement === 'top' || placement === 'left' ? -1 : 1

  const clearOpenFallbackTimer = React.useCallback(() => {
    if (openFallbackTimerRef.current) {
      clearTimeout(openFallbackTimerRef.current)
      openFallbackTimerRef.current = null
    }
  }, [])

  const runAnimation = React.useCallback(
    (show: boolean) => {
      animatingRef.current = true
      // 对齐 react-vant：进入使用 ease-out，退出使用 ease-in（近似 CSS cubic-bezier 0.25,0.1,0.25,1 / 0.42,0,1,1）
      const easing = show ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic)
      animationRef.current?.stop()
      const animation = Animated.timing(progress, {
        toValue: show ? 1 : 0,
        duration: resolvedDuration,
        easing,
        useNativeDriver: nativeDriverEnabled,
      })
      animationRef.current = animation

      animation.start(({ finished }) => {
        if (!finished) return
        animatingRef.current = false
        const pendingDistance = pendingDistanceRef.current
        if (pendingDistance != null) {
          pendingDistanceRef.current = null
          distanceRef.current = pendingDistance
          setContentDistance(pendingDistance)
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
    [destroyOnClose, onClosed, onOpened, progress, resolvedDuration]
  )

  React.useEffect(() => {
    if (visible) {
      setMounted(true)
      setInteractionVisible(true)
      clearOpenFallbackTimer()
      const needWaitForLayout = shouldTranslate && distanceRef.current === 0
      if (needWaitForLayout) {
        pendingShowRef.current = true
        openFallbackTimerRef.current = setTimeout(() => {
          if (pendingShowRef.current && visible) {
            pendingShowRef.current = false
            runAnimation(true)
          }
        }, 50)
        return
      }
      pendingShowRef.current = false
      runAnimation(true)
    } else {
      pendingShowRef.current = false
      clearOpenFallbackTimer()
      if (!prevVisible.current) return
      runAnimation(false)
    }
  }, [clearOpenFallbackTimer, runAnimation, shouldTranslate, visible])

  React.useEffect(() => {
    if (visible && !prevVisible.current) {
      onOpen?.()
    }
    prevVisible.current = visible
  }, [onOpen, visible])

  React.useEffect(
    () => () => {
      animationRef.current?.stop()
      clearOpenFallbackTimer()
    },
    [clearOpenFallbackTimer]
  )

  const requestClose = React.useCallback(
    async (reason: 'close-icon' | 'overlay' | 'close') => {
      if (closingRef.current) return
      closingRef.current = true
      try {
        if (beforeClose) {
          const result = await beforeClose(reason)
          if (result === false) {
            return
          }
        }
        onClose?.()
      } finally {
        closingRef.current = false
      }
    },
    [beforeClose, onClose]
  )

  React.useEffect(() => {
    if (!closeOnPopstate) {
      return
    }
    const handler = () => {
      if (!visible) return
      requestClose('close')
    }
    return addPopStateListener(handler)
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

  const stopPropagationResponder = React.useCallback(() => true, [])

  const contentInteractionProps = React.useMemo(
    () =>
      stopPropagation
        ? { ...overlayRestProps, onStartShouldSetResponder: stopPropagationResponder }
        : overlayRestProps,
    [overlayRestProps, stopPropagation, stopPropagationResponder],
  )

  const config = placementConfig[placement]
  const distance = distanceRef.current || contentDistance
  const radiusStyle = React.useMemo(
    () => buildRadius(round, placement, tokens.radius.round),
    [placement, round, tokens.radius.round],
  )

  const overlayOpacity = React.useMemo(
    () => progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
    [progress],
  )

  const translateTransform = React.useMemo(() => {
    if (!shouldTranslate) return null
    const outputRange: [number, number] = [distance * direction, 0]
    return config.axis === 'y'
      ? { translateY: progress.interpolate({ inputRange: [0, 1], outputRange }) }
      : { translateX: progress.interpolate({ inputRange: [0, 1], outputRange }) }
  }, [config.axis, direction, distance, progress, shouldTranslate])

  const baseTransform = React.useMemo(
    () => (translateTransform ? [translateTransform] : []),
    [translateTransform],
  )

  const animatedContentStyle: Animated.WithAnimatedObject<ViewStyle> = React.useMemo(() => {
    const extraTransform = contentAnimationStyle?.transform
    const transform = Array.isArray(extraTransform) ? [...baseTransform, ...extraTransform] : baseTransform
    return { ...contentAnimationStyle, transform, opacity: progress }
  }, [baseTransform, contentAnimationStyle, progress])

  const handleContentLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      overlayOnLayout?.(event)
      const { width, height } = event.nativeEvent.layout
      const nextDistance = isVertical ? height : width
      if (animatingRef.current) {
        pendingDistanceRef.current = nextDistance
        return
      }
      distanceRef.current = nextDistance
      setContentDistance(prev => (Math.abs(prev - nextDistance) < 0.5 ? prev : nextDistance))
      if (pendingShowRef.current && visible) {
        pendingShowRef.current = false
        clearOpenFallbackTimer()
        runAnimation(true)
      }
    },
    [clearOpenFallbackTimer, isVertical, overlayOnLayout, runAnimation, visible]
  )

  const shouldRender = mounted || visible

  if (!shouldRender) return null

  const hidden = (!visible && !interactionVisible)

  const hasCustomCloseIcon = closeIcon != null

  const hasHeader = isRenderable(title) || isRenderable(description)
  const headerPadding = tokens.spacing.closeIconRight + tokens.spacing.closeIconSize
  const headerPaddingStyle =
    closeable && closeIconPosition.startsWith('top-')
      ? closeIconPosition.endsWith('right')
        ? { paddingRight: headerPadding }
        : { paddingLeft: headerPadding }
      : undefined

  const closeIconVerticalStyle = closeIconPosition.includes('bottom')
    ? { bottom: tokens.spacing.closeIconTop }
    : { top: tokens.spacing.closeIconTop }
  const closeIconHorizontalStyle = closeIconPosition.endsWith('left')
    ? { left: tokens.spacing.closeIconRight }
    : { right: tokens.spacing.closeIconRight }

  const headerNode = hasHeader ? (
    <View style={[styles.header, headerPaddingStyle]}>
      {renderHeaderNode(title, {
        textStyle: [styles.title, dynamicStyles.title],
        wrapperStyle: dynamicStyles.titleWrapper,
      })}
      {renderHeaderNode(description, {
        textStyle: [styles.description, dynamicStyles.description],
        wrapperStyle: dynamicStyles.descriptionWrapper,
      })}
    </View>
  ) : null

  const contentBody = hasHeader ? (
    <>
      {headerNode}
      {children}
    </>
  ) : (
    children
  )

  const content = (
    <Animated.View
      ref={overlayRef as unknown as React.Ref<React.ElementRef<typeof View>>}
      {...contentInteractionProps}
      onLayout={handleContentLayout}
      style={[
        dynamicStyles.popup,
        placement === 'center' ? dynamicStyles.popupCenter : null,
        isVertical ? styles.popupVertical : null,
        isHorizontal ? dynamicStyles.popupSide : null,
        radiusStyle,
        animatedContentStyle,
        style,
        hidden ? hiddenContentStyle : null,
      ]}
      {...rest}
    >
      {closeable ? (
        <Pressable
          style={[
            styles.closeIconBase,
            dynamicStyles.closeIconBase,
            closeIconVerticalStyle,
            closeIconHorizontalStyle,
            !hasCustomCloseIcon ? dynamicStyles.closeIconDefault : null,
          ]}
          hitSlop={8}
          onPress={() => requestClose('close-icon')}
        >
          {hasCustomCloseIcon ? closeIcon : <Cross size={22} fill={tokens.colors.closeIcon} color={tokens.colors.closeIcon} />}
        </Pressable>
      ) : null}
      {renderWithSafeArea(contentBody, { safeArea, safeAreaInsetTop, safeAreaInsetBottom })}
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
              pointerEvents={visible || interactionVisible ? 'auto' : 'none'}
              {...(shouldCloseOnOverlay && (onClose || beforeClose)
                ? {
                  accessibilityRole: 'button' as const,
                  accessibilityLabel: overlayAccessibilityLabel,
                  accessibilityHint: '双击即可关闭弹层',
                }
                : { accessible: false })}
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
          {content}
        </View>
      </View>
    </Portal>
  )
}

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
  header: {
    width: '100%',
  },
  title: {
    includeFontPadding: false,
  },
  description: {
    includeFontPadding: false,
  },
  popupVertical: {
    alignSelf: 'stretch',
  },
  closeIconBase: {
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockLayer: {
    ...StyleSheet.absoluteFillObject,
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
