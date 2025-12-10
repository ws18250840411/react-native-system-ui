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
    inputLineHeight: number
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
      // 统一使用 72px（可通过 props 或主题覆写）
      labelWidth: 72,
      labelAlign: 'left',
      inputAlign: 'left',
      controlAlign: 'left',
      clearTrigger: 'focus',
      formatTrigger: 'onChange',
      rows: 2,
      // TextArea 行高参考 Web 默认 20px，便于按 px 换算 rows
      textareaLineHeight: 20,
    },
    colors: {
      label: palette.default[700],
      input: palette.default[800],
      // 对齐 React Vant placeholder 变量 @gray-5 (#c8c9cc)
      placeholder: '#c8c9cc',
      error: palette.danger[500],
      disabled: palette.default[500],
      intro: palette.default[600],
      tooltip: palette.default[500],
      clear: palette.default[500],
      rightIcon: palette.default[500],
      // React Vant 字数统计文案约为 #646566
      wordLimit: '#646566',
    },
    spacing: {
      // labelGap 设为 0，确保总宽度即为 labelWidth
      labelGap: spacing.none,
      leftIconGap: spacing.xs, // 4
      rightIconGap: spacing.sm * 1, // 8
      prefixGap: spacing.sm * 1, // 8
      suffixGap: spacing.sm * 1, // 8
      messageMarginTop: spacing.none,
      introMarginTop: spacing.none,
      wordLimitMarginTop: spacing.none,
    },
    typography: {
      labelSize: fontSize.sm,
      inputSize: fontSize.sm,
      inputLineHeight: 24,
      placeholderSize: fontSize.sm,
      messageSize: 12,
      introSize: 12,
      // 对齐官方 12px
      wordLimitSize: fontSize.xs,
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
