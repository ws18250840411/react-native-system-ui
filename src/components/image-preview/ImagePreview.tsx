import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Image as RNImage, Platform, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native'
import Popup from '../popup'
import Swiper, { type SwiperInstance } from '../swiper'
import type { ImagePreviewProps, ImagePreviewRef, ImagePreviewCloseReason } from './types'
import { useImagePreviewTokens } from './tokens'
import { isString, isText } from '../../utils/validate'

const clampIndex = (index: number, total: number) => total <= 0 ? 0 : Math.max(0, Math.min(total - 1, index))
const indicatorSpacing = { bottom: 32 }
const IS_WEB = Platform.OS === 'web'
const TOUCH_MOVE_THRESHOLD = 8
const TOUCH_MOVE_THRESHOLD_SQUARED = TOUCH_MOVE_THRESHOLD * TOUCH_MOVE_THRESHOLD

type PressableHandlers = Pick<React.ComponentProps<typeof Pressable>, 'onTouchStart' | 'onTouchMove' | 'onTouchEnd' | 'onTouchCancel'> & {
  onMouseDown?: (e: { nativeEvent?: { pageX?: number; pageY?: number } }) => void
  onMouseMove?: (e: { nativeEvent?: { pageX?: number; pageY?: number; buttons?: number } }) => void
  onMouseUp?: (e: { nativeEvent?: { pageX?: number; pageY?: number } }) => void
}

const ImageSlide = React.memo((props: { source: ImageSourcePropType; rendered: boolean; pressableHandlers: PressableHandlers; index: number; total: number }) => {
  const { source, rendered, pressableHandlers, index, total } = props
  return (
    <Pressable accessibilityRole="image" accessibilityLabel={`image ${index + 1} of ${total}`} style={S.slidePressable} {...pressableHandlers}>
      {rendered ? <RNImage source={source} resizeMode="contain" style={S.image} accessible accessibilityRole="image" /> : <View style={S.imagePlaceholder} />}
    </Pressable>
  )
}, (prev, next) => prev.source === next.source && prev.rendered === next.rendered && prev.pressableHandlers === next.pressableHandlers && prev.index === next.index && prev.total === next.total)

const ImagePreviewImpl = (props: ImagePreviewProps, ref: React.ForwardedRef<ImagePreviewRef>) => {
  const { visible, images = [], startPosition = 0, tokensOverride, lazyRender = false, lazyRenderBuffer = 1, showIndex = true, indexRender, showIndicators = false, closeable = false, closeIcon, closeIconPosition = 'top-right', closeOnlyClickCloseIcon = false, overlay = true, overlayStyle, closeOnBackPress, closeOnPopstate, zIndex, duration, safeAreaInsetTop = true, safeAreaInsetBottom = true, onChange, onClose, onClosed, beforeClose } = props; const { colors, layout, radii, typography, spacing } = useImagePreviewTokens(tokensOverride); const swiperRef = useRef<SwiperInstance>(null); const pendingCloseReason = useRef<ImagePreviewCloseReason>('close'); const touchStartRef = useRef<{ x: number; y: number } | null>(null); const touchMovedRef = useRef(false); const imgLen = images.length; const [activeIndex, setActiveIndex] = useState(() => clampIndex(startPosition, imgLen)); const safeIdx = clampIndex(activeIndex, imgLen); const latestRef = useRef({ images, index: safeIdx, beforeClose, onClose }); latestRef.current = { images, index: safeIdx, beforeClose, onClose }; const resolvedImages: ImageSourcePropType[] = useMemo(() => images.map(img => isString(img) ? { uri: img } : img), [images]); useEffect(() => { setActiveIndex(cur => clampIndex(cur, imgLen)) }, [imgLen]); useEffect(() => { if (!visible) return; const next = clampIndex(startPosition, imgLen); setActiveIndex(next); if (typeof requestAnimationFrame !== 'undefined') { const raf = requestAnimationFrame(() => { swiperRef.current?.swipeTo(next, false) }); return () => cancelAnimationFrame(raf) } }, [imgLen, startPosition, visible]); const runBeforeClose = useCallback(async (reason: ImagePreviewCloseReason) => { const { beforeClose: bc, images: imgs, index } = latestRef.current; if (!bc) return true; const res = await bc({ reason, index, image: imgs[index] }); return res !== false }, []); const executeClose = useCallback(async (reason: ImagePreviewCloseReason, bypassBeforeClose = false) => { const { onClose: oc, images: imgs, index } = latestRef.current; if (!bypassBeforeClose) { const allowed = await runBeforeClose(reason); if (!allowed) return }; oc?.({ index, image: imgs[index] }) }, [runBeforeClose]); const handlePopupBeforeClose = useCallback(async (reason: 'close-icon' | 'overlay' | 'close') => { pendingCloseReason.current = reason; return runBeforeClose(reason) }, [runBeforeClose]); const handlePopupClose = useCallback(() => { void executeClose(pendingCloseReason.current, true) }, [executeClose]); useImperativeHandle(ref, () => ({ swipeTo: (index: number, anim = true) => { const next = clampIndex(index, imgLen); setActiveIndex(next); swiperRef.current?.swipeTo(next, anim) } }), [imgLen]); const onChangeRef = useRef(onChange); onChangeRef.current = onChange; const safeIdxRef = useRef(safeIdx); safeIdxRef.current = safeIdx; const handleSwiperChange = useCallback((index: number) => { if (safeIdxRef.current === index) return; setActiveIndex(index); onChangeRef.current?.(index) }, []); const handleImagePress = useCallback(() => { if (closeOnlyClickCloseIcon) return; void executeClose('content') }, [closeOnlyClickCloseIcon, executeClose]); const resetTouch = useCallback(() => { touchStartRef.current = null; touchMovedRef.current = false }, []); const handleTouchStart = useCallback((x: number, y: number) => { touchStartRef.current = { x, y }; touchMovedRef.current = false }, []); const handleTouchMove = useCallback((x: number, y: number) => { const start = touchStartRef.current; if (!start) return; const dx = x - start.x; const dy = y - start.y; if (dx * dx + dy * dy >= TOUCH_MOVE_THRESHOLD_SQUARED) touchMovedRef.current = true }, []); const handleTouchEnd = useCallback((x: number, y: number) => { const start = touchStartRef.current; const moved = touchMovedRef.current; resetTouch(); if (!start || moved) return; const dx = x - start.x; const dy = y - start.y; if (dx * dx + dy * dy >= TOUCH_MOVE_THRESHOLD_SQUARED) return; handleImagePress() }, [handleImagePress, resetTouch]); const pressableHandlers: PressableHandlers = useMemo(() => { const handlers: PressableHandlers = { onTouchStart: e => { const { pageX, pageY } = e.nativeEvent; if (pageX != null && pageY != null) handleTouchStart(pageX, pageY) }, onTouchMove: e => { const { pageX, pageY } = e.nativeEvent; if (pageX != null && pageY != null) handleTouchMove(pageX, pageY) }, onTouchEnd: e => { const { pageX, pageY } = e.nativeEvent; if (pageX != null && pageY != null) handleTouchEnd(pageX, pageY) }, onTouchCancel: resetTouch }; if (IS_WEB) { handlers.onMouseDown = e => { const nativeEvent = e.nativeEvent; if (nativeEvent?.pageX != null && nativeEvent?.pageY != null) handleTouchStart(nativeEvent.pageX, nativeEvent.pageY) }; handlers.onMouseMove = e => { const nativeEvent = e.nativeEvent; if (nativeEvent?.buttons !== 1) return; if (nativeEvent?.pageX != null && nativeEvent?.pageY != null) handleTouchMove(nativeEvent.pageX, nativeEvent.pageY) }; handlers.onMouseUp = e => { const nativeEvent = e.nativeEvent; if (nativeEvent?.pageX != null && nativeEvent?.pageY != null) handleTouchEnd(nativeEvent.pageX, nativeEvent.pageY) } }; return handlers }, [handleTouchMove, handleTouchStart, resetTouch, handleTouchEnd]); const renderIndex = useCallback((current: number, total: number) => !showIndex || total === 0 ? null : (
    <View style={[S.index, { top: spacing.indexTop }]} testID="rv-image-preview-index">
      <View style={[S.indexBadge, { backgroundColor: colors.indexBackground, borderRadius: radii.indexBadge, paddingHorizontal: spacing.indexPaddingHorizontal, paddingVertical: spacing.indexPaddingVertical }]}>
        {!indexRender ? <Text style={[S.indexText, { color: colors.indexText, fontFamily: typography.fontFamily, fontSize: typography.indexTextSize }]}>{`${current + 1} / ${total}`}</Text> : (() => { const node = indexRender({ index: current, len: total }); return isText(node) ? <Text style={[S.indexText, { color: colors.indexText, fontFamily: typography.fontFamily, fontSize: typography.indexTextSize }]}>{node}</Text> : node })()}
      </View>
    </View>
  ), [colors.indexBackground, colors.indexText, indexRender, radii.indexBadge, showIndex, spacing.indexPaddingHorizontal, spacing.indexPaddingVertical, spacing.indexTop, typography.fontFamily, typography.indexTextSize]); const lazyBuffer = lazyRender ? Math.max(0, lazyRenderBuffer | 0) : 0; const renderIndicator = useCallback((total: number, current: number) => (<>{renderIndex(current, total)}{showIndicators && total > 1 && <Swiper.PagIndicator total={total} current={current} activeColor={colors.indicatorActive} inactiveColor={colors.indicatorInactive} style={indicatorSpacing} testID="rv-image-preview-indicators" />}</>), [colors.indicatorActive, colors.indicatorInactive, renderIndex, showIndicators])
  return (
    <Popup visible={visible} overlay={overlay} overlayStyle={overlayStyle} closeOnOverlayPress={!closeOnlyClickCloseIcon} closeOnBackPress={closeOnBackPress} closeOnPopstate={closeOnPopstate} zIndex={zIndex} duration={duration} closeable={closeable} closeIcon={closeIcon} closeIconPosition={closeIconPosition} stopPropagation={false} round={false} safeAreaInsetTop={safeAreaInsetTop} safeAreaInsetBottom={safeAreaInsetBottom} overlayTestID="rv-image-preview-overlay" style={[S.popup, { backgroundColor: colors.transparent, padding: layout.popupPadding, borderRadius: layout.popupRadius }]} beforeClose={handlePopupBeforeClose} onClose={handlePopupClose} onClosed={onClosed}>
      <View style={[S.content, { backgroundColor: colors.background }]}>
        {imgLen === 1 && renderIndex(0, 1)}
        {imgLen === 0 ? <View style={S.empty} testID="rv-image-preview-empty" /> : (
          <Swiper ref={swiperRef} style={S.swiper} initialSwipe={clampIndex(startPosition, imgLen)} loop={false} autoplay={false} touchable={imgLen > 1} indicator={renderIndicator} onChange={handleSwiperChange} testID="rv-image-preview-swiper">
            {resolvedImages.map((source, index) => (
              <Swiper.Item key={index} style={S.slide} testID={`rv-image-preview-slide-${index}`}>
                <ImageSlide source={source} rendered={!lazyRender || Math.abs(index - safeIdx) <= lazyBuffer} pressableHandlers={pressableHandlers} index={index} total={resolvedImages.length} />
              </Swiper.Item>
            ))}
          </Swiper>
        )}
      </View>
    </Popup>
  )
}

const ImagePreviewForwardRef = React.forwardRef<ImagePreviewRef, ImagePreviewProps>(ImagePreviewImpl)
const ImagePreview = React.memo(ImagePreviewForwardRef)
export default ImagePreview
const S = StyleSheet.create({ popup: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' }, content: { flex: 1 }, swiper: { flex: 1 }, slide: { justifyContent: 'center', alignItems: 'center', flex: 1 }, slidePressable: { flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }, image: { width: '100%', height: '100%' }, imagePlaceholder: { width: '100%', height: '100%' }, empty: { flex: 1 }, index: { position: 'absolute', left: 0, right: 0, alignItems: 'center', zIndex: 1 }, indexBadge: {}, indexText: { fontWeight: '500' } })
