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
    labelWidth: 88, // 约 6.2em，贴合 react-vant
    clearTrigger: 'focus',
    inputAlign: 'left',
    textareaLineHeight: foundations.fontSize.md * foundations.typography.lineHeightMultiplier,
    controlAlign: 'flex-start',
  },
  colors: {
    text: '#323233',
    disabledText: '#c8c9cc',
    placeholder: '#c8c9cc',
    label: '#646566',
    border: '#ebedf0',
    clearIcon: '#c8c9cc',
    error: foundations.palette.danger[500],
    description: '#969799',
    background: '#ffffff', // 与 react-vant 一致，单元格白底
    counter: '#969799',
    extra: '#969799',
    prefix: '#969799',
    suffix: foundations.palette.primary[500],
  },
  spacing: {
    // 介于 rv cell 的 10px 与当前主题 spacing 之间取中值，贴近 react-vant
    paddingVertical: Math.round((foundations.spacing.sm + foundations.spacing.md) / 2),
    paddingVerticalLarge: Math.round((foundations.spacing.sm + foundations.spacing.md) / 2),
    paddingHorizontal: foundations.spacing.lg, // 16，贴近 rv 默认 16px
    labelGap: foundations.spacing.sm, // 8
    iconGap: foundations.spacing.sm,
    prefixGap: foundations.spacing.xs,
    suffixGap: foundations.spacing.xs,
    extraGap: foundations.spacing.sm,
    messageMarginTop: 4,
    descriptionMarginTop: 4,
    counterMarginTop: 4,
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
