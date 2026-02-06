import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type LayoutChangeEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
  type ViewProps,
} from 'react-native'

import type { DeepPartial } from '../../types'
import { SafeAreaView } from '../safe-area-view'
import { addPopStateListener, nativeDriverEnabled } from '../../platform'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { isRenderable, isText } from '../../utils/validate'
import { Cross } from 'react-native-system-icon'
import Portal from '../portal/Portal'
import { useAriaOverlay, useOverlayStack } from '../../hooks'
import type { PopupTokens } from './tokens'
import { usePopupTokens } from './tokens'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const EASING_IN_CUBIC = Easing.bezier(0.55, 0.055, 0.675, 0.19)
const EASING_OUT_CIRC = Easing.bezier(0.075, 0.82, 0.165, 1.0)

export type PopupPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center'
export type PopupCloseIconPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'

export interface PopupProps extends ViewProps {
  visible: boolean
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
  opts: { safeArea: boolean; safeAreaInsetTop: boolean; safeAreaInsetBottom: boolean },
  onSafeAreaTopLayout?: (event: LayoutChangeEvent) => void
) => {
  if (opts.safeArea) {
    return <SafeAreaView>{children}</SafeAreaView>
  }
  return (
    <>
      {opts.safeAreaInsetTop ? (
        <SafeAreaView
          edge="top"
          onLayout={onSafeAreaTopLayout}
          pointerEvents="none"
        />
      ) : null}
      {children}
      {opts.safeAreaInsetBottom && (
        <SafeAreaView edge="bottom" pointerEvents="none" />
      )}
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
    destroyOnClose = true,
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

  const shadow = useMemo(() => createPlatformShadow(tokens.shadow), [tokens.shadow.color, tokens.shadow.elevation, tokens.shadow.offsetY, tokens.shadow.opacity, tokens.shadow.radius])

  const dynamicStyles = useMemo(() => ({
    popup: {
      backgroundColor: tokens.colors.background,
      padding: tokens.spacing.padding,
      ...shadow,
    } as ViewStyle,
    title: {
      color: tokens.colors.title,
      fontSize: tokens.typography.titleSize,
      fontWeight: tokens.typography.titleWeight,
      marginHorizontal: tokens.spacing.descriptionHorizontal,
      textAlign: 'center',
    } as TextStyle,
    titleWrapper: {
      marginTop: tokens.spacing.titleTop,
      marginBottom: tokens.spacing.titleBottom,
      marginHorizontal: tokens.spacing.descriptionHorizontal,
      alignItems: 'center',
    } as ViewStyle,
    description: {
      color: tokens.colors.description,
      fontSize: tokens.typography.descriptionSize,
      lineHeight: tokens.typography.descriptionLineHeight,
    } as TextStyle,
    descriptionWrapper: {
      marginHorizontal: tokens.spacing.descriptionHorizontal,
      marginBottom: tokens.spacing.descriptionBottom,
    } as ViewStyle,
    closeIconBase: {
      minWidth: tokens.spacing.closeIconSize,
      minHeight: tokens.spacing.closeIconSize,
      padding: tokens.spacing.closeIconPadding,
    } as ViewStyle,
    closeIconDefault: {
      width: tokens.spacing.closeIconSize,
      height: tokens.spacing.closeIconSize,
    } as ViewStyle,
    popupSide: {
      width: tokens.layout.sideWidth,
      maxWidth: tokens.layout.maxWidth,
    } as ViewStyle,
    popupCenter: {
      minWidth: tokens.layout.minWidth,
      maxWidth: tokens.layout.centerMaxWidth,
    } as ViewStyle,
  }), [
    shadow,
    tokens.colors.background,
    tokens.colors.description,
    tokens.colors.title,
    tokens.layout.centerMaxWidth,
    tokens.layout.maxWidth,
    tokens.layout.minWidth,
    tokens.layout.sideWidth,
    tokens.spacing.closeIconPadding,
    tokens.spacing.closeIconSize,
    tokens.spacing.descriptionBottom,
    tokens.spacing.descriptionHorizontal,
    tokens.spacing.padding,
    tokens.spacing.titleBottom,
    tokens.spacing.titleTop,
    tokens.typography.descriptionLineHeight,
    tokens.typography.descriptionSize,
    tokens.typography.titleSize,
    tokens.typography.titleWeight,
  ])

  const [mounted, setMounted] = useState(visible)
  const [interactionVisible, setInteractionVisible] = useState(visible)
  const isOpen = visible || interactionVisible
  const canCloseOnOverlay = shouldCloseOnOverlay && (onClose || beforeClose)
  const progress = useRef(new Animated.Value(0)).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)
  const animationSeqRef = useRef(0)
  const prevVisible = useRef(visible)
  const closingRef = useRef(false)

  const isVertical = placement === 'top' || placement === 'bottom'
  const isHorizontal = placement === 'left' || placement === 'right'
  const direction = placement === 'top' || placement === 'left' ? -1 : 1

  const runAnimation = useCallback(
    (show: boolean) => {
      animationSeqRef.current += 1
      const currentSeq = animationSeqRef.current
      const easing = show ? EASING_OUT_CIRC : EASING_IN_CUBIC
      animationRef.current?.stop()
      const animation = Animated.timing(progress, {
        toValue: show ? 1 : 0,
        duration,
        easing,
        useNativeDriver: nativeDriverEnabled,
        isInteraction: false,
      })
      animationRef.current = animation

      animation.start(({ finished }) => {
        if (!finished || currentSeq !== animationSeqRef.current) return
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
    [destroyOnClose, duration, onClosed, onOpened, progress]
  )

  useEffect(() => {
    if (visible) {
      setMounted(true)
      setInteractionVisible(true)
      runAnimation(true)
    } else {
      if (!prevVisible.current) return
      runAnimation(false)
    }
  }, [runAnimation, visible])

  useEffect(() => {
    if (visible && !prevVisible.current) {
      onOpen?.()
    }
    prevVisible.current = visible
  }, [onOpen, visible])

  useEffect(
    () => () => {
      animationRef.current?.stop()
    },
    []
  )

  const requestClose = useCallback(
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

  useEffect(() => {
    if (!closeOnPopstate) {
      return
    }
    const handler = () => {
      if (!visible) return
      requestClose('close')
    }
    return addPopStateListener(handler)
  }, [closeOnPopstate, requestClose, visible])

  const handleStackClose = useCallback(() => {
    requestClose('close')
  }, [requestClose])

  const { zIndex: stackZIndex } = useOverlayStack({
    visible: isOpen,
    onClose: handleStackClose,
    closeOnBack: closeOnBackPress,
    lockScroll,
    zIndex,
    type: 'popup',
  })

  const { overlayRef, overlayProps } = useAriaOverlay({
    isOpen,
    onClose: () => requestClose('overlay'),
    isDismissable: shouldCloseOnOverlay,
    overlayProps: {
      ...(Platform.OS === 'android' ? {} : { accessibilityRole: 'dialog' }),
      accessibilityLiveRegion: 'polite',
    },
  })

  const { onLayout: overlayOnLayout, ...overlayRestProps } = overlayProps

  const contentInteractionProps = stopPropagation
    ? { ...overlayRestProps, onStartShouldSetResponder: () => true }
    : overlayRestProps

  const config = placementConfig[placement]
  const radiusStyle = buildRadius(round, placement, tokens.radius.round)

  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const translateDistance =
    placement === 'left' || placement === 'right'
      ? windowWidth
      : placement === 'top' || placement === 'bottom'
        ? windowHeight
        : 0

  const translateTransform = useMemo(() => {
    if (!shouldTranslate) return null
    const outputRange: [number, number] = [translateDistance * direction, 0]
    return config.axis === 'y'
      ? { translateY: progress.interpolate({ inputRange: [0, 1], outputRange }) }
      : { translateX: progress.interpolate({ inputRange: [0, 1], outputRange }) }
  }, [config.axis, direction, progress, shouldTranslate, translateDistance])

  const baseTransform = useMemo(
    () => translateTransform ? [translateTransform] : [],
    [translateTransform]
  )

  const animatedContentStyle: Animated.WithAnimatedObject<ViewStyle> = useMemo(() => {
    const extraTransform = contentAnimationStyle?.transform
    const transform = Array.isArray(extraTransform) ? [...baseTransform, ...extraTransform] : baseTransform
    const baseStyle = { ...contentAnimationStyle, transform }
    if (placement === 'center') {
      return { ...baseStyle, opacity: progress }
    }
    if (contentAnimationStyle?.opacity == null) {
      return { ...baseStyle, opacity: 1 }
    }
    return baseStyle
  }, [baseTransform, contentAnimationStyle, placement, progress])

  const handleContentLayout = overlayOnLayout

  const [safeAreaTopHeight, setSafeAreaTopHeight] = useState(0)
  const handleSafeAreaTopLayout = useCallback(
    (event: LayoutChangeEvent) => {
      setSafeAreaTopHeight(event.nativeEvent.layout.height)
    },
    [],
  )

  const shouldRender = mounted || visible
  const hidden = !isOpen

  const hasCustomCloseIcon = closeIcon != null

  const hasHeader = isRenderable(title) || isRenderable(description)
  const headerPadding = tokens.spacing.closeIconRight + tokens.spacing.closeIconSize
  const headerPaddingStyle =
    closeable && closeIconPosition.startsWith('top-')
      ? closeIconPosition.endsWith('right')
        ? { paddingRight: headerPadding }
        : { paddingLeft: headerPadding }
      : undefined

  const closeIconTopValue = closeIconPosition.includes('top')
    ? tokens.spacing.closeIconTop + safeAreaTopHeight
    : undefined
  const closeIconBottomValue = closeIconPosition.includes('bottom')
    ? tokens.spacing.closeIconTop
    : undefined

  const closeIconVerticalStyle = closeIconBottomValue !== undefined
    ? { bottom: closeIconBottomValue }
    : { top: closeIconTopValue }
  const closeIconHorizontalStyle = closeIconPosition.endsWith('left')
    ? { left: tokens.spacing.closeIconRight }
    : { right: tokens.spacing.closeIconRight }

  const headerNode = useMemo(() => {
    if (!hasHeader) return null
    return (
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
    )
  }, [description, dynamicStyles.description, dynamicStyles.descriptionWrapper, dynamicStyles.title, dynamicStyles.titleWrapper, hasHeader, headerPaddingStyle, title])

  const contentBody = useMemo(() => (hasHeader ? (
    <>
      {headerNode}
      {children}
    </>
  ) : (
    children
  )), [children, hasHeader, headerNode])

  const closeIconNode = useMemo(() => {
    if (!closeable) return null
    return (
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
    )
  }, [
    closeIcon,
    closeIconHorizontalStyle,
    closeIconVerticalStyle,
    closeable,
    dynamicStyles.closeIconBase,
    dynamicStyles.closeIconDefault,
    hasCustomCloseIcon,
    requestClose,
    tokens.colors.closeIcon,
  ])

  const content = useMemo(() => (
    <Animated.View
      ref={overlayRef as unknown as React.Ref<React.ElementRef<typeof View>>}
      {...contentInteractionProps}
      onLayout={handleContentLayout}
      renderToHardwareTextureAndroid={Platform.OS === 'android'}
      shouldRasterizeIOS={Platform.OS === 'ios'}
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
      {closeIconNode}
      {renderWithSafeArea(
        contentBody,
        { safeArea, safeAreaInsetTop, safeAreaInsetBottom },
        safeAreaInsetTop ? handleSafeAreaTopLayout : undefined
      )}
    </Animated.View>
  ), [
    animatedContentStyle,
    closeIconNode,
    contentBody,
    contentInteractionProps,
    dynamicStyles.popup,
    dynamicStyles.popupCenter,
    dynamicStyles.popupSide,
    handleContentLayout,
    handleSafeAreaTopLayout,
    hidden,
    isHorizontal,
    isVertical,
    overlayRef,
    placement,
    radiusStyle,
    rest,
    safeArea,
    safeAreaInsetBottom,
    safeAreaInsetTop,
    style,
  ])

  if (!shouldRender) return null

  const resolvedZIndex = stackZIndex ?? zIndex

  return (
    <Portal>
      <View
        style={[
          styles.portalRoot,
          webFixedRootStyle,
          resolvedZIndex ? { zIndex: resolvedZIndex } : undefined,
        ]}
        pointerEvents="box-none"
      >
        <View
          style={[styles.container, config.container]}
          pointerEvents={isOpen ? 'auto' : 'none'}
          accessibilityViewIsModal={isOpen}
          accessibilityLiveRegion="polite"
          onAccessibilityEscape={() => requestClose('close')}
        >
          {overlay && isOpen ? (
            <AnimatedPressable
              testID={overlayTestID}
              style={[
                styles.overlay,
                { backgroundColor: tokens.colors.overlay, opacity: progress },
                overlayStyle,
              ]}
              renderToHardwareTextureAndroid={Platform.OS === 'android'}
              shouldRasterizeIOS={Platform.OS === 'ios'}
              pointerEvents={isOpen ? 'auto' : 'none'}
              {...(canCloseOnOverlay
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
          {!overlay && lockScroll && isOpen ? (
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
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockLayer: {
    ...StyleSheet.absoluteFillObject,
  },
})

const webFixedRootStyle: ViewStyle | undefined =
  Platform.OS === 'web'
    ? ({ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      } as unknown as ViewStyle)
    : undefined

Popup.displayName = 'Popup'

export default Popup
