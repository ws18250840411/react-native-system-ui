import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface SwiperTokens {
  defaults: {
    autoplayInterval: number
    scrollEventThrottle: number
  }
  layer: {
    zIndex: number
    elevation: number
  }
}

const createSwiperTokens = (_foundations: Foundations): SwiperTokens => ({
  defaults: {
    autoplayInterval: 3000,
    scrollEventThrottle: 16,
  },
  layer: {
    zIndex: 10,
    elevation: 10,
  },
})

export const useSwiperTokens = createComponentTokensHook('swiper', createSwiperTokens)
