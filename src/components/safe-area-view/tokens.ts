import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface SafeAreaViewTokens {}

const createSafeAreaViewTokens = (_foundations: Foundations): SafeAreaViewTokens => {
  return {}
}

export const useSafeAreaViewTokens = createComponentTokensHook('safe-area-view', createSafeAreaViewTokens)
