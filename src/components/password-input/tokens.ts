import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface PasswordInputTokens {}

const createPasswordInputTokens = (_foundations: Foundations): PasswordInputTokens => {
  return {}
}

export const usePasswordInputTokens = createComponentTokensHook('password-input', createPasswordInputTokens)
