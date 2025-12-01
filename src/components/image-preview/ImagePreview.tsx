import React from 'react'
import {
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native'

import Popup from '../popup'
import type { ImagePreviewProps, ImagePreviewRef, ImagePreviewCloseReason, ImagePreviewImage } from './types'
import { useImagePreviewTokens } from './tokens'

const clampIndex = (index: number, total: number) => {
  if (total <= 0) return 0
  if (index < 0) return 0
  if (index > total - 1) return total - 1
  return index
}

const FALLBACK_WIDTH = 375
const FALLBACK_HEIGHT = 667

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
  const scrollRef = React.useRef<ScrollView>(null)
  const popupCloseReason = React.useRef<ImagePreviewCloseReason>('close')
  const { width: windowWidth, height: windowHeight } = useWindowDimensions()
  const viewportWidth = windowWidth || FALLBACK_WIDTH
  const viewportHeight = windowHeight || FALLBACK_HEIGHT
  const [active, setActive] = React.useState(() => clampIndex(startPosition, images.length))

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
    const mapped: ImagePreviewCloseReason = reason === 'close-icon' ? 'close-icon' : 'close'
    popupCloseReason.current = mapped
    return runBeforeClose(mapped)
  }, [runBeforeClose])

  const handlePopupClose = React.useCallback(() => {
    requestClose(popupCloseReason.current, { bypassCheck: true })
  }, [requestClose])

  const scrollToIndex = React.useCallback((index: number, animated = true) => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ x: index * viewportWidth, animated })
  }, [viewportWidth])

  React.useImperativeHandle(ref, () => ({
    swipeTo: (index: number, animated = true) => {
      const next = clampIndex(index, images.length)
      setActive(next)
      scrollToIndex(next, animated)
    },
  }), [images.length, scrollToIndex])

  React.useEffect(() => {
    setActive(current => clampIndex(current, images.length))
  }, [images.length])

  React.useEffect(() => {
    if (!visible) return
    const next = clampIndex(startPosition, images.length)
    setActive(next)
    const timer = setTimeout(() => {
      scrollToIndex(next, false)
    }, 0)
    return () => clearTimeout(timer)
  }, [images.length, scrollToIndex, startPosition, visible])

  React.useEffect(() => {
    onChange?.(active)
  }, [active, onChange])

  const handleMomentumEnd = React.useCallback((event: any) => {
    if (images.length === 0) return
    const { contentOffset, layoutMeasurement } = event.nativeEvent
    const layoutWidth = layoutMeasurement?.width || viewportWidth
    const index = clampIndex(Math.round(contentOffset.x / (layoutWidth || 1)), images.length)
    setActive(index)
  }, [images.length, viewportWidth])

  const handleImagePress = React.useCallback(() => {
    if (closeOnlyClickCloseIcon) return
    requestClose('content')
  }, [closeOnlyClickCloseIcon, requestClose])

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
      <View style={styles.indicators} testID="rv-image-preview-indicators">
        {images.map((_, idx) => (
          <View
            key={idx}
            testID={`rv-image-preview-indicator-${idx}`}
            style={[
              styles.indicatorDot,
              { backgroundColor: idx === active ? tokens.colors.indicatorActive : tokens.colors.indicatorInactive },
            ]}
          />
        ))}
      </View>
    )
  }

  return (
    <Popup
      visible={visible}
      overlay={overlay}
      overlayStyle={overlayStyle}
      closeOnOverlayPress={false}
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
      onClickOverlay={() => requestClose('overlay')}
      beforeClose={handlePopupBeforeClose}
      onClose={handlePopupClose}
      onClosed={onClosed}
    >
      <View style={[styles.content, { backgroundColor: tokens.colors.background }]}>
        {renderIndex()}
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          onMomentumScrollEnd={handleMomentumEnd}
          testID="rv-image-preview-scroll"
        >
          {images.length === 0 ? (
            <View style={[styles.slide, { width: viewportWidth, height: viewportHeight }]}
              testID="rv-image-preview-empty"
            />
          ) : (
            images.map((image, idx) => (
              <Pressable
                key={idx}
                style={[styles.slide, { width: viewportWidth, height: viewportHeight }]}
                onPress={handleImagePress}
                testID={`rv-image-preview-slide-${idx}`}
              >
                <RNImage
                  source={resolveImageSource(image) as any}
                  resizeMode="contain"
                  style={[styles.image, { width: viewportWidth, height: viewportHeight }]}
                />
              </Pressable>
            ))
          )}
        </ScrollView>
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
  scroll: {
    flex: 1,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
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
  indicators: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
})
