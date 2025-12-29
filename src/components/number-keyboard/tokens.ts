import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface NumberKeyboardTokens {
  colors: {
    background: string
    title: string
    keyBackground: string
    keyActiveBackground: string
    keyText: string
    keyTextActive: string
    closeBackground: string
    closeText: string
    border: string
  }
  spacing: {
    paddingHorizontal: number
    paddingVertical: number
    keyGap: number
    titlePadding: number
  }
  sizing: {
    keyHeight: number
    closeHeight: number
    fontSize: number
  }
  radii: {
    key: number
  }
  shadow: {
    color: string
    opacity: number
    radius: number
    offsetY: number
    elevation: number
  }
}

const createTokens = (foundations: Foundations): NumberKeyboardTokens => {
  const { palette, spacing, radii, fontSize } = foundations
  const surface = palette.default[50] ?? '#ffffff'
  return {
    colors: {
      background: palette.default[100],
      title: palette.default[700],
      keyBackground: surface,
      keyActiveBackground: palette.default[100],
      keyText: palette.default[900],
      keyTextActive: palette.primary[600],
      closeBackground: palette.primary[600],
      closeText: palette.primary.foreground ?? '#ffffff',
      border: palette.default[200],
    },
    spacing: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      keyGap: spacing.xs,
      titlePadding: spacing.md,
    },
    sizing: {
      keyHeight: 54,
      closeHeight: 44,
      fontSize: 28,
    },
    radii: {
      key: radii.xs,
    },
    shadow: {
      color: '#000000',
      opacity: 0.08,
      radius: 6,
      offsetY: 0,
      elevation: 6,
    },
  }
}

export const useNumberKeyboardTokens = (
  overrides?: DeepPartial<NumberKeyboardTokens>,
): NumberKeyboardTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.numberKeyboard
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
