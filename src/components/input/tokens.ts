import { createComponentTokensHook } from '../../design-system/createComponentTokensHook'
import type { Foundations } from '../../design-system/tokens'
import type { InputTokens } from './types'

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
