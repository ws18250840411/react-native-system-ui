import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface OverlayTokens {
  colors: {
    backdrop: string
  }
  animationDuration: number
}

export const createOverlayTokens = (_foundations: Foundations): OverlayTokens => ({
  colors: {
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
  animationDuration: 300,
})

export const useOverlayTokens = createComponentTokensHook('overlay', createOverlayTokens)
