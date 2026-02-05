import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface FormTokens {}

const createFormTokens = (_foundations: Foundations): FormTokens => {
  return {}
}

export const useFormTokens = createComponentTokensHook('form', createFormTokens)
