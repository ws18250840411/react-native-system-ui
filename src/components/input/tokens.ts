import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { FieldClearTrigger, FieldInputAlign } from '../field/types'

export interface InputTokens {
  defaults: {
    inputAlign: FieldInputAlign
    clearTrigger: FieldClearTrigger
    border: boolean
  }
  spacing: {
    paddingHorizontal: number
    paddingVertical: number
  }
  colors: {
    background: string
  }
}

const createInputTokens = (foundations: Foundations): InputTokens => ({
  defaults: {
    inputAlign: 'left',
    clearTrigger: 'focus',
    border: true,
  },
  spacing: {
    paddingHorizontal: foundations.spacing.md,
    paddingVertical: foundations.spacing.sm,
  },
  colors: {
    background: 'transparent',
  },
})

export const useInputTokens = createComponentTokensHook('input', createInputTokens)
