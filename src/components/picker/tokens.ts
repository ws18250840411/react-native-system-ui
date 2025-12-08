import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { PickerToolbarPosition } from './types'

export interface PickerTokens {
  defaults: {
    itemHeight: number
    visibleItemCount: number
    showToolbar: boolean
    toolbarPosition: PickerToolbarPosition
    swipeDuration: number
    maskType: 'gradient' | 'solid'
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
  }
  spacing: {
    toolbarHeight: number
    actionPadding: number
  }
  typography: {
    optionSize: number
    toolbarSize: number
    fontFamily: string
    optionWeight: string | number
    toolbarWeight: string | number
  }
  radius: {
    toolbar: number
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
      swipeDuration: 1000,
      maskType: 'gradient',
    },
    colors: {
      background: palette.background?.base ?? '#ffffff',
      indicator: palette.default[200],
      text: palette.default[900],
      textMuted: palette.default[600],
      textDisabled: palette.default[400],
      confirm: palette.primary[600],
      cancel: palette.default[600],
      mask: 'rgba(255,255,255,0.9)',
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
    },
  }
}

export const usePickerTokens = (overrides?: DeepPartial<PickerTokens>): PickerTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createPickerTokens(foundations)
    const globalOverrides = components?.picker as DeepPartial<PickerTokens> | undefined
    const merged = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
