import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { FieldClearTrigger, FieldControlAlign, FieldFormatTrigger, FieldInputAlign } from './types'

export interface FieldTokens {
  defaults: {
    labelWidth: number
    labelAlign: FieldInputAlign
    inputAlign: FieldInputAlign
    controlAlign: FieldControlAlign
    clearTrigger: FieldClearTrigger
    formatTrigger: FieldFormatTrigger
    rows: number
    textareaLineHeight: number
  }
  colors: {
    label: string
    input: string
    placeholder: string
    error: string
    disabled: string
    intro: string
    tooltip: string
    clear: string
    rightIcon: string
    wordLimit: string
  }
  spacing: {
    labelGap: number
    leftIconGap: number
    rightIconGap: number
    prefixGap: number
    suffixGap: number
    messageMarginTop: number
    introMarginTop: number
    wordLimitMarginTop: number
  }
  typography: {
    labelSize: number
    inputSize: number
    placeholderSize: number
    messageSize: number
    introSize: number
    wordLimitSize: number
  }
  sizes: {
    icon: number
    clearIcon: number
    textareaMinHeight: number
  }
}

const createFieldTokens = (foundations: Foundations): FieldTokens => {
  const { palette, spacing, fontSize, typography } = foundations

  return {
    defaults: {
      labelWidth: 96,
      labelAlign: 'left',
      inputAlign: 'left',
      controlAlign: 'left',
      clearTrigger: 'focus',
      formatTrigger: 'onChange',
      rows: 2,
      textareaLineHeight: Math.round(fontSize.md * typography.lineHeightMultiplier),
    },
    colors: {
      label: palette.default[700],
      input: palette.default[800],
      placeholder: palette.default[500],
      error: palette.danger[500],
      disabled: palette.default[500],
      intro: palette.default[600],
      tooltip: palette.default[500],
      clear: palette.default[500],
      rightIcon: palette.default[500],
      wordLimit: palette.default[700],
    },
    spacing: {
      labelGap: spacing.sm,
      leftIconGap: spacing.md,
      rightIconGap: spacing.xs,
      prefixGap: spacing.xs,
      suffixGap: spacing.xs,
      messageMarginTop: spacing.xs,
      introMarginTop: spacing.xs,
      wordLimitMarginTop: spacing.xs,
    },
    typography: {
      labelSize: fontSize.sm,
      inputSize: fontSize.md,
      placeholderSize: fontSize.md,
      messageSize: 12,
      introSize: 12,
      wordLimitSize: fontSize.sm,
    },
    sizes: {
      icon: 16,
      clearIcon: 16,
      textareaMinHeight: 60,
    },
  }
}

export const useFieldTokens = (overrides?: DeepPartial<FieldTokens>): FieldTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createFieldTokens(foundations)
    const componentOverrides = components?.field as DeepPartial<FieldTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
