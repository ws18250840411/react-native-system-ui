import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Image as RNImage, Platform, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native'

import Popup from '../popup'
import Swiper, { type SwiperInstance } from '../swiper'
import type { ImagePreviewProps, ImagePreviewRef, ImagePreviewCloseReason } from './types'
import { useImagePreviewTokens } from './tokens'
import { isString } from '../../utils/validate'

const clampIndex = (index: number, total: number) =>
  total <= 0 ? 0 : Math.max(0, Math.min(total - 1, index))

const IS_WEB = Platform.OS === 'web'
const TAP_MOVE_THRESHOLD_PX = 8
const TAP_MOVE_THRESHOLD_SQ = TAP_MOVE_THRESHOLD_PX * TAP_MOVE_THRESHOLD_PX

type PressableHandlers = Pick<
  React.ComponentProps<typeof Pressable>,
  'onTouchStart' | 'onTouchMove' | 'onTouchEnd' | 'onTouchCancel'
> & {
  onMouseDown?: (event: { nativeEvent?: { pageX?: number; pageY?: number } }) => void
  onMouseMove?: (event: { nativeEvent?: { pageX?: number; pageY?: number; buttons?: number } }) => void
  onMouseUp?: (event: { nativeEvent?: { pageX?: number; pageY?: number } }) => void
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
    safeAreaInsetTop = true,
    safeAreaInsetBottom = true,
    onChange,
    onClose,
    onClosed,
    beforeClose,
  } = props

  const { colors, layout, radii, typography, spacing } = useImagePreviewTokens(tokensOverride)
  const swiperRef = useRef<SwiperInstance>(null)
  const popupCloseReason = useRef<ImagePreviewCloseReason>('close')
  const tapStartRef = useRef<{ x: number; y: number } | null>(null)
  const tapMovedRef = useRef(false)
  const imagesLen = images.length
  const [active, setActive] = useState(() => clampIndex(startPosition, imagesLen))
  const safeActive = clampIndex(active, imagesLen)
  const latestRef = useRef({
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

  const resolvedImages: ImageSourcePropType[] = images.map(img => (isString(img) ? { uri: img } : img))

  useEffect(() => {
    setActive(current => clampIndex(current, imagesLen))
  }, [imagesLen])

  useEffect(() => {
    if (!visible) return
    const next = clampIndex(startPosition, imagesLen)
    setActive(next)
    if (typeof requestAnimationFrame !== 'undefined') {
      const raf = requestAnimationFrame(() => {
        swiperRef.current?.swipeTo(next, false)
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [imagesLen, startPosition, visible])

  const runBeforeClose = useCallback(async (reason: ImagePreviewCloseReason) => {
    const { beforeClose: currentBeforeClose, images: currentImages, index } = latestRef.current
    if (!currentBeforeClose) return true
    const result = await currentBeforeClose({ reason, index, image: currentImages[index] })
    return result !== false
  }, [])

  const emitClose = useCallback(
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

  const handlePopupBeforeClose = useCallback(
    async (reason: 'close-icon' | 'overlay' | 'close') => {
      const mapped: ImagePreviewCloseReason =
        reason === 'close-icon' ? 'close-icon' : reason === 'overlay' ? 'overlay' : 'close'
      popupCloseReason.current = mapped
      return runBeforeClose(mapped)
    },
    [runBeforeClose],
  )

  const handlePopupClose = useCallback(() => {
    void emitClose(popupCloseReason.current, true)
  }, [emitClose])

  useImperativeHandle(ref, () => ({
    swipeTo: (index: number, animated = true) => {
      const next = clampIndex(index, imagesLen)
      setActive(next)
      swiperRef.current?.swipeTo(next, animated)
    },
  }), [imagesLen])

  const handleSwiperChange = useCallback((idx: number) => {
    if (safeActive === idx) return
    setActive(idx)
    onChange?.(idx)
  }, [onChange, safeActive])

  const handleImagePress = useCallback(() => {
    if (closeOnlyClickCloseIcon) return
    void emitClose('content')
  }, [closeOnlyClickCloseIcon, emitClose])

  const resetTap = useCallback(() => {
    tapStartRef.current = null
    tapMovedRef.current = false
  }, [])

  const markTapStart = useCallback((x: number, y: number) => {
    tapStartRef.current = { x, y }
    tapMovedRef.current = false
  }, [])

  const markTapMove = useCallback((x: number, y: number) => {
    const start = tapStartRef.current
    if (!start) return
    const dx = x - start.x
    const dy = y - start.y
    if (dx * dx + dy * dy >= TAP_MOVE_THRESHOLD_SQ) {
      tapMovedRef.current = true
    }
  }, [])

  const tryTapEnd = useCallback((x: number, y: number) => {
    const start = tapStartRef.current
    const moved = tapMovedRef.current
    resetTap()
    if (!start || moved) return
    const dx = x - start.x
    const dy = y - start.y
    if (dx * dx + dy * dy >= TAP_MOVE_THRESHOLD_SQ) return
    handleImagePress()
  }, [handleImagePress, resetTap])

  const pressableHandlers: PressableHandlers = {
    onTouchStart: e => {
      const { pageX, pageY } = e.nativeEvent
      if (pageX != null && pageY != null) markTapStart(pageX, pageY)
    },
    onTouchMove: e => {
      const { pageX, pageY } = e.nativeEvent
      if (pageX != null && pageY != null) markTapMove(pageX, pageY)
    },
    onTouchEnd: e => {
      const { pageX, pageY } = e.nativeEvent
      if (pageX != null && pageY != null) tryTapEnd(pageX, pageY)
    },
    onTouchCancel: resetTap,
  }

  if (IS_WEB) {
    pressableHandlers.onMouseDown = e => {
      const ne = e.nativeEvent
      if (ne?.pageX != null && ne?.pageY != null) markTapStart(ne.pageX, ne.pageY)
    }
    pressableHandlers.onMouseMove = e => {
      const ne = e.nativeEvent
      if (ne?.buttons !== 1) return
      if (ne?.pageX != null && ne?.pageY != null) markTapMove(ne.pageX, ne.pageY)
    }
    pressableHandlers.onMouseUp = e => {
      const ne = e.nativeEvent
      if (ne?.pageX != null && ne?.pageY != null) tryTapEnd(ne.pageX, ne.pageY)
    }
  }

  const renderIndex = useCallback(
    (current: number, total: number) => {
      if (!showIndex || total === 0) return null
      const indexText = `${current + 1} / ${total}`
      return (
        <View style={[styles.index, { top: spacing.indexTop }]} testID="rv-image-preview-index">
          <View
            style={[
              styles.indexBadge,
              {
                backgroundColor: colors.indexBackground,
                borderRadius: radii.indexBadge,
                paddingHorizontal: spacing.indexPaddingHorizontal,
                paddingVertical: spacing.indexPaddingVertical,
              },
            ]}
          >
            {indexRender ? (
              indexRender({ index: current, len: total })
            ) : (
              <Text style={[styles.indexText, { color: colors.indexText, fontSize: typography.indexTextSize }]}>
                {indexText}
              </Text>
            )}
          </View>
        </View>
      )
    },
    [
      colors.indexBackground,
      colors.indexText,
      indexRender,
      radii.indexBadge,
      showIndex,
      spacing.indexPaddingHorizontal,
      spacing.indexPaddingVertical,
      spacing.indexTop,
      typography.indexTextSize,
    ],
  )

  const lazyBuffer = lazyRender ? Math.max(0, lazyRenderBuffer | 0) : 0

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
      safeAreaInsetTop={safeAreaInsetTop}
      safeAreaInsetBottom={safeAreaInsetBottom}
      overlayTestID="rv-image-preview-overlay"
      style={[
        styles.popup,
        { backgroundColor: colors.transparent, padding: layout.popupPadding, borderRadius: layout.popupRadius },
      ]}
      beforeClose={handlePopupBeforeClose}
      onClose={handlePopupClose}
      onClosed={onClosed}
    >
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        {imagesLen === 1 ? renderIndex(0, 1) : null}
        {imagesLen === 0 ? (
          <View style={styles.empty} testID="rv-image-preview-empty" />
        ) : (
          <Swiper
            ref={swiperRef}
            style={styles.swiper}
            initialSwipe={clampIndex(startPosition, imagesLen)}
            loop={false}
            autoplay={false}
            duration={swipeDuration}
            touchable={imagesLen > 1}
            indicator={(total, current) => (
              <>
                {renderIndex(current, total)}
                {showIndicators && total > 1 && (
                  <Swiper.PagIndicator
                    total={total}
                    current={current}
                    activeColor={colors.indicatorActive}
                    inactiveColor={colors.indicatorInactive}
                    style={{ bottom: 32 }}
                    testID="rv-image-preview-indicators"
                  />
                )}
              </>
            )}
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
      </View>
    </Popup>
  )
})

ImagePreview.displayName = 'ImagePreview'

export default ImagePreview

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
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
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  indexBadge: {},
  indexText: {
    fontWeight: '500',
  },
})
