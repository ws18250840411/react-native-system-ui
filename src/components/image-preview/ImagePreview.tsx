import React from 'react'
import { Image as RNImage, Platform, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native'

import Popup from '../popup'
import Swiper, { type SwiperInstance } from '../swiper'
import type { ImagePreviewProps, ImagePreviewRef, ImagePreviewCloseReason } from './types'
import { useImagePreviewTokens } from './tokens'

const clampIndex = (index: number, total: number) =>
  total <= 0 ? 0 : Math.max(0, Math.min(total - 1, index))

const IS_WEB = Platform.OS === 'web'
const TAP_MOVE_THRESHOLD_PX = 8
const TAP_MOVE_THRESHOLD_SQ = TAP_MOVE_THRESHOLD_PX * TAP_MOVE_THRESHOLD_PX

type PressableHandlers = Pick<
  React.ComponentProps<typeof Pressable>,
  'onTouchStart' | 'onTouchMove' | 'onTouchEnd' | 'onTouchCancel'
> & {
  onMouseDown?: (event: any) => void
  onMouseMove?: (event: any) => void
  onMouseUp?: (event: any) => void
}

const SlideContent = React.memo(
  (props: {
    source: ImageSourcePropType
    rendered: boolean
    pressableHandlers: PressableHandlers
  }) => {
    const { source, rendered, pressableHandlers } = props
    return (
      <Pressable style={styles.slidePressable} {...pressableHandlers}>
        {rendered ? (
          <RNImage source={source} resizeMode="contain" style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </Pressable>
    )
  },
  (prev, next) =>
    prev.source === next.source &&
    prev.rendered === next.rendered &&
    prev.pressableHandlers === next.pressableHandlers,
)

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
  const latestRef = React.useRef({
    images,
    index: safeActive,
    beforeClose,
    onClose,
  })
  latestRef.current = {
    images,
    index: safeActive,
    beforeClose,
    onClose,
  }

  const resolvedImages = React.useMemo(
    () => images.map(img => (typeof img === 'string' ? { uri: img } : img)) as ImageSourcePropType[],
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

  const runBeforeClose = React.useCallback(async (reason: ImagePreviewCloseReason) => {
    const { beforeClose: currentBeforeClose, images: currentImages, index } = latestRef.current
    if (!currentBeforeClose) return true
    const result = await currentBeforeClose({ reason, index, image: currentImages[index] })
    return result !== false
  }, [])

  const emitClose = React.useCallback(
    async (reason: ImagePreviewCloseReason, bypassCheck = false) => {
      const { onClose: currentOnClose, images: currentImages, index } = latestRef.current
      if (!bypassCheck) {
        const allow = await runBeforeClose(reason)
        if (!allow) return
      }
      currentOnClose?.({ index, image: currentImages[index] })
    },
    [runBeforeClose],
  )

  const handlePopupBeforeClose = React.useCallback(
    async (reason: 'close-icon' | 'overlay' | 'close') => {
      const mapped: ImagePreviewCloseReason =
        reason === 'close-icon' ? 'close-icon' : reason === 'overlay' ? 'overlay' : 'close'
      popupCloseReason.current = mapped
      return runBeforeClose(mapped)
    },
    [runBeforeClose],
  )

  const handlePopupClose = React.useCallback(() => {
    void emitClose(popupCloseReason.current, true)
  }, [emitClose])

  React.useImperativeHandle(ref, () => ({
    swipeTo: (index: number, animated = true) => {
      const next = clampIndex(index, images.length)
      setActive(next)
      swiperRef.current?.swipeTo(next, animated)
    },
  }))

  const handleSwiperChange = (idx: number) => {
    if (safeActive === idx) return
    setActive(idx)
    onChange?.(idx)
  }

  const handleImagePress = () => {
    if (closeOnlyClickCloseIcon) return
    void emitClose('content')
  }

  const resetTap = React.useCallback(() => {
    tapStartRef.current = null
    tapMovedRef.current = false
  }, [])

  const markTapStart = React.useCallback((x: number, y: number) => {
    tapStartRef.current = { x, y }
    tapMovedRef.current = false
  }, [])

  const markTapMove = React.useCallback((x: number, y: number) => {
    const start = tapStartRef.current
    if (!start) return
    const dx = x - start.x
    const dy = y - start.y
    if (dx * dx + dy * dy >= TAP_MOVE_THRESHOLD_SQ) {
      tapMovedRef.current = true
    }
  }, [])

  const tryTapEnd = React.useCallback((x: number, y: number) => {
    const start = tapStartRef.current
    const moved = tapMovedRef.current
    resetTap()
    if (!start || moved) return
    const dx = x - start.x
    const dy = y - start.y
    if (dx * dx + dy * dy >= TAP_MOVE_THRESHOLD_SQ) return
    handleImagePress()
  }, [handleImagePress, resetTap])

  const pressableHandlers = React.useMemo<PressableHandlers>(() => {
    const handlers: PressableHandlers = {
      onTouchStart: e => {
        const ne = (e as any)?.nativeEvent
        if (ne?.pageX != null && ne?.pageY != null) markTapStart(ne.pageX, ne.pageY)
      },
      onTouchMove: e => {
        const ne = (e as any)?.nativeEvent
        if (ne?.pageX != null && ne?.pageY != null) markTapMove(ne.pageX, ne.pageY)
      },
      onTouchEnd: e => {
        const ne = (e as any)?.nativeEvent
        if (ne?.pageX != null && ne?.pageY != null) tryTapEnd(ne.pageX, ne.pageY)
      },
      onTouchCancel: resetTap,
    }

    if (IS_WEB) {
      handlers.onMouseDown = (e: any) => {
        const ne = e?.nativeEvent
        if (ne?.pageX != null && ne?.pageY != null) markTapStart(ne.pageX, ne.pageY)
      }
      handlers.onMouseMove = (e: any) => {
        const ne = e?.nativeEvent
        if (ne?.buttons !== 1) return
        if (ne?.pageX != null && ne?.pageY != null) markTapMove(ne.pageX, ne.pageY)
      }
      handlers.onMouseUp = (e: any) => {
        const ne = e?.nativeEvent
        if (ne?.pageX != null && ne?.pageY != null) tryTapEnd(ne.pageX, ne.pageY)
      }
    }

    return handlers
  }, [markTapMove, markTapStart, resetTap, tryTapEnd])

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

  const lazyBuffer = lazyRender ? Math.max(0, lazyRenderBuffer | 0) : 0

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
                <SlideContent
                  source={source}
                  rendered={!lazyRender || Math.abs(idx - safeActive) <= lazyBuffer}
                  pressableHandlers={pressableHandlers}
                />
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
