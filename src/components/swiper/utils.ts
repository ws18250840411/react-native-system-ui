import { clamp, isFiniteNumber } from '../../utils'
import type { SwiperProps } from './types'

export const FALLBACK_WIDTH = 375
export const FALLBACK_HEIGHT = 667

export const runAfterFrames = (frames: number, fn: () => void) => {
  const raf =
    typeof requestAnimationFrame !== 'undefined'
      ? requestAnimationFrame
      : (cb: FrameRequestCallback) => {
        setTimeout(() => cb(Date.now()), 16)
        return 0
      }
  let left = Math.max(1, frames)
  const step = () => {
    left -= 1
    if (left <= 0) {
      fn()
      return
    }
    raf(step)
  }
  raf(step)
}

export type WebCancelableEvent = {
  preventDefault?: () => void
  stopPropagation?: () => void
  nativeEvent?: {
    preventDefault?: () => void
    stopPropagation?: () => void
  }
}

export const stopWebEvent = (event: WebCancelableEvent) => {
  event.preventDefault?.()
  event.stopPropagation?.()
  event.nativeEvent?.preventDefault?.()
  event.nativeEvent?.stopPropagation?.()
}

export const getInitialSwipeValue = (initialSwipe: SwiperProps['initialSwipe']): number => {
  return isFiniteNumber(initialSwipe) ? initialSwipe : 0
}

export const getDurationMs = (duration: SwiperProps['duration']): number => {
  return isFiniteNumber(duration) ? Math.max(0, duration) : 0
}

export const getSlideSizePct = (slideSize: SwiperProps['slideSize']): number => {
  return isFiniteNumber(slideSize) ? clamp(slideSize, 1, 100) : 100
}

export const getTrackOffsetPct = (trackOffset: SwiperProps['trackOffset']): number => {
  return isFiniteNumber(trackOffset) ? clamp(trackOffset, 0, 100) : 0
}
