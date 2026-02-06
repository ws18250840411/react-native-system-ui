import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface FormTokens {
  defaults: {
    showValidateMessage: boolean
    defaultValidationMessage: string
  }
}

const createFormTokens = (_foundations: Foundations): FormTokens => ({
  defaults: {
    showValidateMessage: true,
    defaultValidationMessage: '表单验证未通过',
  },
})

export const useFormTokens = createComponentTokensHook('form', createFormTokens)
