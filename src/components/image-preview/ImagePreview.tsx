import React from 'react'
import { Image as RNImage, Platform, Pressable, StyleSheet, Text, View } from 'react-native'

import Popup from '../popup'
import Swiper, { type SwiperInstance } from '../swiper'
import type { ImagePreviewProps, ImagePreviewRef, ImagePreviewCloseReason } from './types'
import { useImagePreviewTokens } from './tokens'

const clampIndex = (index: number, total: number) =>
  total <= 0 ? 0 : Math.max(0, Math.min(total - 1, index))

const IS_WEB = Platform.OS === 'web'

const ImagePreview = React.forwardRef<ImagePreviewRef, ImagePreviewProps>((props, ref) => {
  const {
    visible,
    images = [],
    startPosition = 0,
    swipeDuration = 300,
    tokensOverride,
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

  const { colors } = useImagePreviewTokens(tokensOverride)
  const swiperRef = React.useRef<SwiperInstance>(null)
  const popupCloseReason = React.useRef<ImagePreviewCloseReason>('close')
  const tapStartRef = React.useRef<{ x: number; y: number } | null>(null)
  const tapMovedRef = React.useRef(false)
  const [active, setActive] = React.useState(() => clampIndex(startPosition, images.length))
  const safeActive = clampIndex(active, images.length)

  const resolvedImages = React.useMemo(
    () => images.map(img => (typeof img === 'string' ? { uri: img } : img)),
    [images]
  )

  React.useEffect(() => {
    setActive(current => clampIndex(current, images.length))
  }, [images.length])

  React.useEffect(() => {
    if (!visible) return
    const next = clampIndex(startPosition, images.length)
    setActive(next)
    const raf = requestAnimationFrame(() => {
      swiperRef.current?.swipeTo(next, false)
    })
    return () => cancelAnimationFrame(raf)
  }, [images.length, startPosition, visible])

  const runBeforeClose = async (reason: ImagePreviewCloseReason) => {
    if (!beforeClose) return true
    const result = await beforeClose({ reason, index: safeActive, image: images[safeActive] })
    return result !== false
  }

  const requestClose = async (reason: ImagePreviewCloseReason, bypassCheck = false) => {
    if (!bypassCheck) {
      const allow = await runBeforeClose(reason)
      if (!allow) return
    }
    onClose?.({ index: safeActive, image: images[safeActive] })
  }

  const handlePopupBeforeClose = async (reason: 'close-icon' | 'overlay' | 'close') => {
    const mapped: ImagePreviewCloseReason =
      reason === 'close-icon' ? 'close-icon' : reason === 'overlay' ? 'overlay' : 'close'
    popupCloseReason.current = mapped
    return runBeforeClose(mapped)
  }

  const handlePopupClose = () => {
    void requestClose(popupCloseReason.current, true)
  }

  React.useImperativeHandle(ref, () => ({
    swipeTo: (index: number, animated = true) => {
      const next = clampIndex(index, images.length)
      setActive(next)
      swiperRef.current?.swipeTo(next, animated)
    },
  }))

  const shouldRenderImage = (index: number) => {
    if (!lazyRender) return true
    const buffer = Math.max(0, lazyRenderBuffer | 0)
    return Math.abs(index - safeActive) <= buffer
  }

  const handleSwiperChange = (idx: number) => {
    if (safeActive === idx) return
    setActive(idx)
    onChange?.(idx)
  }

  const handleImagePress = () => {
    if (closeOnlyClickCloseIcon) return
    void requestClose('content')
  }

  const TAP_MOVE_THRESHOLD_PX = 8
  const resetTap = () => {
    tapStartRef.current = null
    tapMovedRef.current = false
  }
  const markTapStart = (x: number, y: number) => {
    tapStartRef.current = { x, y }
    tapMovedRef.current = false
  }
  const markTapMove = (x: number, y: number) => {
    const start = tapStartRef.current
    if (!start) return
    const dx = x - start.x
    const dy = y - start.y
    if (dx * dx + dy * dy >= TAP_MOVE_THRESHOLD_PX * TAP_MOVE_THRESHOLD_PX) {
      tapMovedRef.current = true
    }
  }
  const tryTapEnd = (x: number, y: number) => {
    const start = tapStartRef.current
    const moved = tapMovedRef.current
    resetTap()
    if (!start || moved) return
    const dx = x - start.x
    const dy = y - start.y
    if (dx * dx + dy * dy >= TAP_MOVE_THRESHOLD_PX * TAP_MOVE_THRESHOLD_PX) return
    handleImagePress()
  }

  const slidePressableHandlers: any = {
    onTouchStart: (e: any) => {
      const ne = e?.nativeEvent
      if (ne?.pageX != null && ne?.pageY != null) markTapStart(ne.pageX, ne.pageY)
    },
    onTouchMove: (e: any) => {
      const ne = e?.nativeEvent
      if (ne?.pageX != null && ne?.pageY != null) markTapMove(ne.pageX, ne.pageY)
    },
    onTouchEnd: (e: any) => {
      const ne = e?.nativeEvent
      if (ne?.pageX != null && ne?.pageY != null) tryTapEnd(ne.pageX, ne.pageY)
    },
    onTouchCancel: resetTap,
  }

  if (IS_WEB) {
    slidePressableHandlers.onMouseDown = (e: any) => {
      const ne = e?.nativeEvent
      if (ne?.pageX != null && ne?.pageY != null) markTapStart(ne.pageX, ne.pageY)
    }
    slidePressableHandlers.onMouseMove = (e: any) => {
      const ne = e?.nativeEvent
      if (ne?.buttons !== 1) return
      if (ne?.pageX != null && ne?.pageY != null) markTapMove(ne.pageX, ne.pageY)
    }
    slidePressableHandlers.onMouseUp = (e: any) => {
      const ne = e?.nativeEvent
      if (ne?.pageX != null && ne?.pageY != null) tryTapEnd(ne.pageX, ne.pageY)
    }
  }

  const indexNode =
    showIndex && images.length ? (
      <View style={styles.index} testID="rv-image-preview-index">
        <View style={[styles.indexBadge, { backgroundColor: colors.indexBackground }]}>
          {indexRender ? (
            indexRender({ index: safeActive, len: images.length })
          ) : (
            <Text style={[styles.indexText, { color: colors.indexText }]}>{`${safeActive + 1} / ${images.length}`}</Text>
          )}
        </View>
      </View>
    ) : null

  const indicatorsNode =
    showIndicators && images.length > 1 ? (
      <View testID="rv-image-preview-indicators">
        <Swiper.PagIndicator
          total={images.length}
          current={safeActive}
          activeColor={colors.indicatorActive}
          inactiveColor={colors.indicatorInactive}
          style={{ bottom: 32 }}
        />
      </View>
    ) : null

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
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        {indexNode}
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
        {indicatorsNode}
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
