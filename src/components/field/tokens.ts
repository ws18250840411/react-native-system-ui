import * as React from 'react'
import { StyleSheet } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface FieldTokens {
  defaults: {
    labelWidth: number
    clearTrigger: 'always' | 'focus'
    inputAlign: 'left' | 'center' | 'right'
    textareaLineHeight: number
    controlAlign: 'flex-start' | 'center' | 'flex-end'
  }
  colors: {
    text: string
    disabledText: string
    placeholder: string
    label: string
    border: string
    clearIcon: string
    error: string
    description: string
    background: string
    counter: string
    extra: string
    prefix: string
    suffix: string
  }
  spacing: {
    paddingVertical: number
    paddingVerticalLarge: number
    paddingHorizontal: number
    labelGap: number
    iconGap: number
    prefixGap: number
    suffixGap: number
    extraGap: number
    messageMarginTop: number
    descriptionMarginTop: number
    counterMarginTop: number
  }
  typography: {
    fontSize: number
    labelSize: number
    helperSize: number
    counterSize: number
  }
  border: {
    width: number
  }
  states: {
    disabledOpacity: number
  }
  arrow: {
    size: number
    color: string
  }
}

const createFieldTokens = (foundations: Foundations): FieldTokens => ({
  defaults: {
    labelWidth: 96,
    clearTrigger: 'focus',
    inputAlign: 'left',
    textareaLineHeight: foundations.fontSize.md * foundations.typography.lineHeightMultiplier,
    controlAlign: 'center',
  },
  colors: {
    text: foundations.palette.default[900],
    disabledText: foundations.palette.default[400],
    placeholder: foundations.palette.default[400],
    label: foundations.palette.default[600],
    border: foundations.palette.default[200],
    clearIcon: foundations.palette.default[300],
    error: foundations.palette.danger[500],
    description: foundations.palette.default[500],
    background: '#ffffff',
    counter: foundations.palette.default[400],
    extra: foundations.palette.default[500],
    prefix: foundations.palette.default[500],
    suffix: foundations.palette.primary[500],
  },
  spacing: {
    paddingVertical: foundations.spacing.sm,
    paddingVerticalLarge: foundations.spacing.md,
    paddingHorizontal: foundations.spacing.md,
    labelGap: foundations.spacing.md,
    iconGap: foundations.spacing.xs,
    prefixGap: foundations.spacing.xs,
    suffixGap: foundations.spacing.xs,
    extraGap: foundations.spacing.sm,
    messageMarginTop: foundations.spacing.xs,
    descriptionMarginTop: foundations.spacing.xs,
    counterMarginTop: foundations.spacing.xs,
  },
  typography: {
    fontSize: foundations.fontSize.md,
    labelSize: foundations.fontSize.sm,
    helperSize: foundations.fontSize.xs,
    counterSize: foundations.fontSize.xs,
  },
  border: {
    width: StyleSheet.hairlineWidth,
  },
  states: {
    disabledOpacity: 0.5,
  },
  arrow: {
    size: foundations.fontSize.md,
    color: foundations.palette.default[400],
  },
})

export const useFieldTokens = (
  overrides?: DeepPartial<FieldTokens>,
): FieldTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createFieldTokens(foundations)
    const componentOverrides = components?.field as
      | DeepPartial<FieldTokens>
      | undefined
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
