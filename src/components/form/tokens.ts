import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
export interface FormTokens {
  defaults: { showValidateMessage: boolean; defaultValidationMessage: string }
}
const createFormTokens = (_foundations: Foundations): FormTokens => ({ defaults: { showValidateMessage: true, defaultValidationMessage: 'Validation failed' } })
export const useFormTokens = createComponentTokensHook('form', createFormTokens)
