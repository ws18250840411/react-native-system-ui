import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface OverlayTokens {}

const createOverlayTokens = (_foundations: Foundations): OverlayTokens => {
  return {}
}

export const useOverlayTokens = createComponentTokensHook('overlay', createOverlayTokens)
