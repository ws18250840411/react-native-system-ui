import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { PickerToolbarPosition } from './types'
import type { TextStyle } from 'react-native'

export interface PickerTokens {
  defaults: {
    itemHeight: number
    visibleItemCount: number
    showToolbar: boolean
    toolbarPosition: PickerToolbarPosition
  }
  colors: {
    background: string
    indicator: string
    text: string
    textMuted: string
    textDisabled: string
    confirm: string
    cancel: string
    mask: string
    loadingMask: string
  }
  spacing: {
    toolbarHeight: number
    actionPadding: number
  }
  typography: {
    optionSize: number
    toolbarSize: number
    fontFamily: string
    optionWeight: TextStyle['fontWeight']
    toolbarWeight: TextStyle['fontWeight']
  }
  radius: {
    toolbar: number
    container: number
  }
}

const createPickerTokens = (foundations: Foundations): PickerTokens => {
  const { palette, spacing, fontSize, typography, radii } = foundations
  return {
    defaults: {
      itemHeight: 44,
      visibleItemCount: 6,
      showToolbar: true,
      toolbarPosition: 'top',
    },
    colors: {
      background: '#ffffff',
      indicator: palette.default[200] ?? '#ebedf0',
      text: palette.default[900],
      textMuted: palette.default[900],
      textDisabled: palette.default[400],
      confirm: palette.primary[600],
      cancel: palette.default[600],
      mask: '#ffffff',
      loadingMask: 'rgba(255,255,255,0.65)',
    },
    spacing: {
      toolbarHeight: 44,
      actionPadding: spacing.lg,
    },
    typography: {
      optionSize: fontSize.md,
      toolbarSize: fontSize.md,
      fontFamily: typography.fontFamily,
      optionWeight: typography.weight.regular,
      toolbarWeight: typography.weight.medium,
    },
    radius: {
      toolbar: radii.none,
      container: radii.xs,
    },
  }
}

export const usePickerTokens = createComponentTokensHook('picker', createPickerTokens)
