import { createComponentTokensHook } from '../../design-system/createComponentTokensHook'
import type { Foundations } from '../../design-system/tokens'

export interface OverlayTokens {
  layer: {
    zIndex: number
  }
}

const createOverlayTokens = (_foundations: Foundations): OverlayTokens => ({
  layer: {
    zIndex: 9999,
  },
})

export const useOverlayTokens = createComponentTokensHook('overlay', createOverlayTokens)
