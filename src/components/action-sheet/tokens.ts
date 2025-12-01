import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface ActionSheetTokens {
  colors: {
    background: string
    title: string
    description: string
    item: string
    subitem: string
    cancel: string
    disabled: string
    border: string
  }
  spacing: {
    horizontal: number
    vertical: number
    cancelGap: number
  }
  typography: {
    title: number
    item: number
    description: number
  }
}

const createTokens = (foundations: Foundations): ActionSheetTokens => {
  const { palette, spacing, fontSize } = foundations
  return {
    colors: {
      background: palette.background?.base ?? '#ffffff',
      title: palette.default[900],
      description: palette.default[500],
      item: palette.default[900],
      subitem: palette.default[500],
      cancel: palette.default[900],
      disabled: palette.default[400],
      border: palette.default[200],
    },
    spacing: {
      horizontal: spacing.md,
      vertical: spacing.sm,
      cancelGap: spacing.sm,
    },
    typography: {
      title: fontSize.lg,
      item: fontSize.md,
      description: fontSize.sm,
    },
  }
}

export const useActionSheetTokens = (
  overrides?: DeepPartial<ActionSheetTokens>,
): ActionSheetTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.actionSheet as DeepPartial<ActionSheetTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
