import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
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
    border: false,
  },
  spacing: {
    paddingHorizontal: foundations.spacing.md,
    paddingVertical: foundations.spacing.sm,
  },
  colors: {
    background: 'transparent',
  },
})

export const useInputTokens = (
  overrides?: DeepPartial<InputTokens>,
): InputTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createInputTokens(foundations)
    const componentOverrides = components?.input as
      | DeepPartial<InputTokens>
      | undefined
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
