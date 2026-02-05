import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface SwiperTokens {}

const createSwiperTokens = (_foundations: Foundations): SwiperTokens => {
  return {}
}

export const useSwiperTokens = createComponentTokensHook('swiper', createSwiperTokens)
