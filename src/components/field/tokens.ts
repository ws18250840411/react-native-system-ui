import { StyleSheet } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { FieldClearTrigger, FieldControlAlign, FieldFormatTrigger, FieldInputAlign } from './types'

const fieldLayout = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  input: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    outlineStyle: 'solid',
    outlineWidth: 0,
    outlineColor: 'transparent',
    backgroundColor: 'transparent',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  textarea: {
    flex: 1,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    outlineStyle: 'solid',
    outlineWidth: 0,
    outlineColor: 'transparent',
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
  },
  children: {
    justifyContent: 'center',
  },
  leftIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefix: {
    justifyContent: 'center',
  },
  suffix: {
    justifyContent: 'center',
  },
  affixText: {
    includeFontPadding: false,
  },
  clearIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
    minWidth: 0,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },
  tooltip: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {},
  wordLimit: {},
})

export interface FieldTokens {
  layout: typeof fieldLayout
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
    controlMinHeight: number
  }
}

const createFieldTokens = (foundations: Foundations): FieldTokens => {
  const { palette, spacing, fontSize } = foundations

  return {
    layout: fieldLayout,
    defaults: {
      labelWidth: 72,
      labelAlign: 'left',
      inputAlign: 'left',
      controlAlign: 'left',
      clearTrigger: 'focus',
      formatTrigger: 'onChange',
      rows: 2,
      textareaLineHeight: 20,
    },
    colors: {
      label: palette.default[700],
      input: palette.default[800],
      placeholder: palette.default[300] ?? '#c8c9cc',
      error: palette.danger[500],
      disabled: palette.default[500],
      intro: palette.default[600],
      tooltip: palette.default[500],
      clear: palette.default[500],
      rightIcon: palette.default[500],
      wordLimit: palette.default[600] ?? '#646566',
    },
    spacing: {
      labelGap: spacing.none,
      leftIconGap: spacing.xs,
      rightIconGap: spacing.sm * 1,
      prefixGap: spacing.sm * 1,
      suffixGap: spacing.sm * 1,
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
      wordLimitSize: fontSize.xs,
    },
    sizes: {
      icon: 16,
      clearIcon: 16,
      textareaMinHeight: 60,
      controlMinHeight: 24,
    },
  }
}

export const useFieldTokens = createComponentTokensHook('field', createFieldTokens)
