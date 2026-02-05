import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface PortalTokens {}

const createPortalTokens = (_foundations: Foundations): PortalTokens => {
  return {}
}

export const usePortalTokens = createComponentTokensHook('portal', createPortalTokens)
