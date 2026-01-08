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
  // @ts-ignore
  boxShadow: 'none',
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

  const tokens = usePopupTokens(tokensOverride)

  // Dynamic styles derived from tokens
  const dynamicStyles = React.useMemo(() => {
    const shadow = createPlatformShadow({
      color: tokens.shadow.color,
      opacity: tokens.shadow.opacity,
      radius: tokens.shadow.radius,
      offsetY: tokens.shadow.offsetY,
      elevation: tokens.shadow.elevation,
    })

    return {
      popup: {
        backgroundColor: tokens.colors.background,
        padding: tokens.spacing.padding,
        ...shadow,
      },
      title: {
        color: tokens.colors.title,
        fontSize: tokens.typography.titleSize,
        fontWeight: tokens.typography.titleWeight,
      },
      titleWrapper: {
        marginTop: tokens.spacing.titleTop,
        marginBottom: tokens.spacing.titleBottom,
      },
      description: {
        color: tokens.colors.description,
        fontSize: tokens.typography.descriptionSize,
        lineHeight: tokens.typography.descriptionLineHeight,
      },
      descriptionWrapper: {
        marginHorizontal: tokens.spacing.descriptionHorizontal,
        marginBottom: tokens.spacing.descriptionBottom,
      },
      closeIconBase: {
        minWidth: tokens.spacing.closeIconSize,
        minHeight: tokens.spacing.closeIconSize,
        padding: 6, // keep fixed or add token if needed, usually fixed for hitSlop area
      },
      closeIconDefault: {
        width: tokens.spacing.closeIconSize,
        height: tokens.spacing.closeIconSize,
      },
      popupSide: {
        width: tokens.layout.sideWidth,
        maxWidth: tokens.layout.maxWidth,
      },
      popupCenter: {
        minWidth: tokens.layout.minWidth,
        maxWidth: tokens.layout.centerMaxWidth,
      },
    }
  }, [tokens])

  const [mounted, setMounted] = React.useState(visible)
  const [interactionVisible, setInteractionVisible] = React.useState(visible)
  const [contentDistance, setContentDistance] = React.useState(0)
  const progress = React.useRef(new Animated.Value(visible ? 1 : 0)).current
  const animatingRef = React.useRef(false)
  const animationRef = React.useRef<Animated.CompositeAnimation | null>(null)
  const distanceRef = React.useRef(0)
  const pendingDistanceRef = React.useRef<number | null>(null)
  const pendingShowRef = React.useRef(false)
  const openFallbackTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevVisible = React.useRef(visible)

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
      if (show) {
        setMounted(true)
        setInteractionVisible(true)
        progress.setValue(0)
      } else {
        progress.setValue(1)
      }
      // 对齐 react-vant：进入使用 ease-out，退出使用 ease-in（近似 CSS cubic-bezier 0.25,0.1,0.25,1 / 0.42,0,1,1）
      const easing = show ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic)
      animationRef.current?.stop()
      const animation = Animated.timing(progress, {
        toValue: show ? 1 : 0,
        duration,
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
    [destroyOnClose, duration, isVertical, onClosed, onOpened, progress]
  )

  React.useEffect(() => {
    if (visible) {
      setMounted(true)
      setInteractionVisible(true)
      progress.setValue(0)
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
      runAnimation(false)
    }
  }, [clearOpenFallbackTimer, progress, runAnimation, shouldTranslate, visible])

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
  const distance = distanceRef.current || contentDistance

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
  const animatedContentStyle: Animated.WithAnimatedObject<ViewStyle> = React.useMemo(() => {
    const transform = contentAnimationStyle?.transform
    const baseTransform = Array.isArray(translateStyle.transform) ? translateStyle.transform : []
    const mergedTransform = transform && Array.isArray(transform) ? [...baseTransform, ...transform] : baseTransform
    return {
      ...translateStyle,
      ...contentAnimationStyle,
      transform: mergedTransform,
      opacity: progress,
    }
  }, [translateStyle, progress, contentAnimationStyle])

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
  const headerPaddingStyle =
    closeable && closeIconPosition.startsWith('top-')
      ? closeIconPosition.endsWith('right')
        ? { paddingRight: 44 }
        : { paddingLeft: 44 }
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
        wrapperStyle: [styles.titleWrapper, dynamicStyles.titleWrapper],
      })}
      {renderHeaderNode(description, {
        textStyle: [styles.description, dynamicStyles.description],
        wrapperStyle: [styles.descriptionWrapper, dynamicStyles.descriptionWrapper],
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
      ref={overlayRef}
      {...contentInteractionProps}
      onLayout={handleContentLayout}
      style={[
        dynamicStyles.popup,
        placement === 'center' ? dynamicStyles.popupCenter : null,
        isVertical ? styles.popupVertical : null,
        isHorizontal ? dynamicStyles.popupSide : null,
        buildRadius(round, placement, tokens.radius.round),
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
  titleWrapper: {
    // Moved to dynamicStyles
    marginHorizontal: 12,
    alignItems: 'center',
  },
  title: {
    // Moved to dynamicStyles
    marginHorizontal: 12,
    textAlign: 'center',
    includeFontPadding: false,
  },
  descriptionWrapper: {
    // Moved to dynamicStyles
  },
  description: {
    // Moved to dynamicStyles
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
