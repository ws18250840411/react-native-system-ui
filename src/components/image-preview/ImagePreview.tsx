import React from 'react'
import {
  Image as RNImage,
  Platform,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native'

import Popup from '../popup'
import Swiper, { type SwiperInstance } from '../swiper'
import type { ImagePreviewProps, ImagePreviewRef, ImagePreviewCloseReason, ImagePreviewImage } from './types'
import { useImagePreviewTokens } from './tokens'

const clampIndex = (index: number, total: number) => {
  if (total <= 0) return 0
  if (index < 0) return 0
  if (index > total - 1) return total - 1
  return index
}

const IS_WEB = Platform.OS === 'web'

const resolveImageSource = (image?: ImagePreviewImage) => {
  if (!image) return undefined
  if (typeof image === 'string') {
    return { uri: image }
  }
  return image
}

const ImagePreview = React.forwardRef<ImagePreviewRef, ImagePreviewProps>((props, ref) => {
  const {
    visible,
    images = [],
    startPosition = 0,
    swipeDuration = 300,
    lazyRender = false,
    lazyRenderBuffer = 1,
    showIndex = true,
    indexRender,
    showIndicators = false,
    closeable = false,
    closeIcon,
    closeIconPosition = 'top-right',
    closeOnlyClickCloseIcon = false,
    overlay = true,
    overlayStyle,
    closeOnBackPress,
    closeOnPopstate,
    zIndex,
    duration,
    onChange,
    onClose,
    onClosed,
    beforeClose,
  } = props

  const tokens = useImagePreviewTokens()
  const swiperRef = React.useRef<SwiperInstance>(null)
  const popupCloseReason = React.useRef<ImagePreviewCloseReason>('close')
  const tapStartRef = React.useRef<{ x: number; y: number } | null>(null)
  const tapMovedRef = React.useRef(false)
  const [active, setActive] = React.useState(() => clampIndex(startPosition, images.length))
  const activeRef = React.useRef(active)

  // 保证回调里拿到的 active 永远是最新的
  React.useEffect(() => {
    activeRef.current = active
  }, [active])

  // 避免每次 render 都为 string 图片创建新的 { uri } 对象
  const resolvedImages = React.useMemo(() => {
    return images.map(img => resolveImageSource(img))
  }, [images])

  const shouldRenderImage = React.useCallback((index: number) => {
    if (!lazyRender) return true
    if (images.length <= 1) return true
    const buffer = Math.max(0, lazyRenderBuffer | 0)
    return Math.abs(index - activeRef.current) <= buffer
  }, [images.length, lazyRender, lazyRenderBuffer])

  const runBeforeClose = React.useCallback(async (reason: ImagePreviewCloseReason) => {
    if (!beforeClose) return true
    const result = await beforeClose({ reason, index: active, image: images[active] })
    return result !== false
  }, [beforeClose, active, images])

  const finalizeClose = React.useCallback(() => {
    onClose?.({ index: active, image: images[active] })
  }, [active, images, onClose])

  const requestClose = React.useCallback(async (reason: ImagePreviewCloseReason, opts?: { bypassCheck?: boolean }) => {
    if (!opts?.bypassCheck) {
      const allow = await runBeforeClose(reason)
      if (!allow) {
        return
      }
    }
    finalizeClose()
  }, [finalizeClose, runBeforeClose])

  const handlePopupBeforeClose = React.useCallback(async (reason: 'close-icon' | 'overlay' | 'close') => {
    const mapped: ImagePreviewCloseReason =
      reason === 'close-icon'
        ? 'close-icon'
        : reason === 'overlay'
          ? 'overlay'
          : 'close'
    popupCloseReason.current = mapped
    return runBeforeClose(mapped)
  }, [runBeforeClose])

  const handlePopupClose = React.useCallback(() => {
    requestClose(popupCloseReason.current, { bypassCheck: true })
  }, [requestClose])

  const swipeToIndex = React.useCallback((index: number, animated = true) => {
    swiperRef.current?.swipeTo(index, animated)
  }, [])

  React.useImperativeHandle(ref, () => ({
    swipeTo: (index: number, animated = true) => {
      const next = clampIndex(index, images.length)
      activeRef.current = next
      setActive(next)
      swipeToIndex(next, animated)
    },
  }), [images.length, swipeToIndex])

  React.useEffect(() => {
    setActive(current => {
      const next = clampIndex(current, images.length)
      activeRef.current = next
      return next
    })
  }, [images.length])

  React.useEffect(() => {
    if (!visible) return
    const next = clampIndex(startPosition, images.length)
    activeRef.current = next
    setActive(next)
    const raf = requestAnimationFrame(() => {
      swipeToIndex(next, false)
    })
    return () => cancelAnimationFrame(raf)
  }, [images.length, startPosition, swipeToIndex, visible])

  const handleSwiperChange = React.useCallback((idx: number) => {
    if (activeRef.current === idx) return
    activeRef.current = idx
    setActive(idx)
    onChange?.(idx)
  }, [onChange])

  const handleImagePress = React.useCallback(() => {
    if (closeOnlyClickCloseIcon) return
    requestClose('content')
  }, [closeOnlyClickCloseIcon, requestClose])

  const TAP_MOVE_THRESHOLD_PX = 8
  const markTapStart = React.useCallback((x: number, y: number) => {
    tapStartRef.current = { x, y }
    tapMovedRef.current = false
  }, [])
  const markTapMove = React.useCallback((x: number, y: number) => {
    const start = tapStartRef.current
    if (!start) return
    const dx = x - start.x
    const dy = y - start.y
    if ((dx * dx + dy * dy) >= TAP_MOVE_THRESHOLD_PX * TAP_MOVE_THRESHOLD_PX) {
      tapMovedRef.current = true
    }
  }, [])
  const tryTapEnd = React.useCallback((x: number, y: number) => {
    const start = tapStartRef.current
    const moved = tapMovedRef.current
    tapStartRef.current = null
    tapMovedRef.current = false
    if (!start || moved) return
    const dx = x - start.x
    const dy = y - start.y
    if ((dx * dx + dy * dy) >= TAP_MOVE_THRESHOLD_PX * TAP_MOVE_THRESHOLD_PX) return
    handleImagePress()
  }, [handleImagePress])

  // 这些 handler 在每张图上都复用同一份引用，避免 children 每次都因 props 变化而重建
  const onSlideTouchStart = React.useCallback((e: any) => {
    const ne = e?.nativeEvent
    if (ne?.pageX != null && ne?.pageY != null) markTapStart(ne.pageX, ne.pageY)
  }, [markTapStart])
  const onSlideTouchMove = React.useCallback((e: any) => {
    const ne = e?.nativeEvent
    if (ne?.pageX != null && ne?.pageY != null) markTapMove(ne.pageX, ne.pageY)
  }, [markTapMove])
  const onSlideTouchEnd = React.useCallback((e: any) => {
    const ne = e?.nativeEvent
    if (ne?.pageX != null && ne?.pageY != null) tryTapEnd(ne.pageX, ne.pageY)
  }, [tryTapEnd])
  const onSlideTouchCancel = React.useCallback(() => {
    tapStartRef.current = null
    tapMovedRef.current = false
  }, [])

  const onSlideMouseDown = React.useCallback((e: any) => {
    const ne = e?.nativeEvent
    if (ne?.pageX != null && ne?.pageY != null) markTapStart(ne.pageX, ne.pageY)
  }, [markTapStart])
  const onSlideMouseMove = React.useCallback((e: any) => {
    const ne = e?.nativeEvent
    if (ne?.buttons !== 1) return
    if (ne?.pageX != null && ne?.pageY != null) markTapMove(ne.pageX, ne.pageY)
  }, [markTapMove])
  const onSlideMouseUp = React.useCallback((e: any) => {
    const ne = e?.nativeEvent
    if (ne?.pageX != null && ne?.pageY != null) tryTapEnd(ne.pageX, ne.pageY)
  }, [tryTapEnd])

  const slidePressableHandlers = React.useMemo(() => {
    const base: any = {
      onTouchStart: onSlideTouchStart,
      onTouchMove: onSlideTouchMove,
      onTouchEnd: onSlideTouchEnd,
      onTouchCancel: onSlideTouchCancel,
    }
    if (IS_WEB) {
      base.onMouseDown = onSlideMouseDown
      base.onMouseMove = onSlideMouseMove
      base.onMouseUp = onSlideMouseUp
    }
    return base
  }, [
    onSlideMouseDown,
    onSlideMouseMove,
    onSlideMouseUp,
    onSlideTouchCancel,
    onSlideTouchEnd,
    onSlideTouchMove,
    onSlideTouchStart,
  ])

  const renderIndex = () => {
    if (!showIndex || images.length === 0) return null
    return (
      <View style={styles.index} testID="rv-image-preview-index">
        <View style={[styles.indexBadge, { backgroundColor: tokens.colors.indexBackground }]}>
          {indexRender ? (
            indexRender({ index: active, len: images.length })
          ) : (
            <Text style={[styles.indexText, { color: tokens.colors.indexText }]}>{`${active + 1} / ${images.length}`}</Text>
          )}
        </View>
      </View>
    )
  }

  const renderIndicators = () => {
    if (!showIndicators || images.length <= 1) return null
    return (
      <View testID="rv-image-preview-indicators">
        <Swiper.PagIndicator
          total={images.length}
          current={active}
          activeColor={tokens.colors.indicatorActive}
          inactiveColor={tokens.colors.indicatorInactive}
          style={{ bottom: 32 }}
        />
      </View>
    )
  }

  return (
    <Popup
      visible={visible}
      overlay={overlay}
      overlayStyle={overlayStyle}
      closeOnOverlayPress={!closeOnlyClickCloseIcon}
      closeOnBackPress={closeOnBackPress}
      closeOnPopstate={closeOnPopstate}
      zIndex={zIndex}
      duration={duration}
      closeable={closeable}
      closeIcon={closeIcon}
      closeIconPosition={closeIconPosition}
      stopPropagation={false}
      round={false}
      overlayTestID="rv-image-preview-overlay"
      style={styles.popup}
      beforeClose={handlePopupBeforeClose}
      onClose={handlePopupClose}
      onClosed={onClosed}
    >
      <View style={[styles.content, { backgroundColor: tokens.colors.background }]}>
        {renderIndex()}
        {images.length === 0 ? (
          <View style={styles.empty} testID="rv-image-preview-empty" />
        ) : (
          <Swiper
            ref={swiperRef}
            style={styles.swiper}
            initialSwipe={clampIndex(startPosition, images.length)}
            loop={false}
            autoplay={false}
            duration={swipeDuration}
            touchable={images.length > 1}
            indicator={false}
            onChange={handleSwiperChange}
            testID="rv-image-preview-swiper"
          >
            {resolvedImages.map((source, idx) => (
              <Swiper.Item key={idx} style={styles.slide} testID={`rv-image-preview-slide-${idx}`}>
                <Pressable
                  style={styles.slidePressable}
                  // 不用 onPress（会在滑动切换时误触发），改为基于位移阈值判断“真正的 tap”
                  {...slidePressableHandlers}
                >
                  {shouldRenderImage(idx) ? (
                    <RNImage
                      source={source as any}
                      resizeMode="contain"
                      style={styles.image}
                    />
                  ) : (
                    <View style={styles.imagePlaceholder} />
                  )}
                </Pressable>
              </Swiper.Item>
            ))}
          </Swiper>
        )}
        {renderIndicators()}
      </View>
    </Popup>
  )
})

ImagePreview.displayName = 'ImagePreview'

export default ImagePreview

const styles = StyleSheet.create({
  popup: {
    padding: 0,
    borderRadius: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },
  swiper: { flex: 1 },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  slidePressable: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
  },
  empty: {
    flex: 1,
  },
  index: {
    position: 'absolute',
    top: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  indexBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  indexText: {
    fontSize: 14,
    fontWeight: '500',
  },
})
