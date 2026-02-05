import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface ConfigProviderTokens {}

const createConfigProviderTokens = (_foundations: Foundations): ConfigProviderTokens => {
  return {}
}

export const useConfigProviderTokens = createComponentTokensHook(
  'configProvider',
  createConfigProviderTokens
)
