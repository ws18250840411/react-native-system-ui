import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { TabsAlign, TabsType } from './types'

export interface TabsTokens {
  defaults: {
    type: TabsType
    align: TabsAlign
    ellipsis: boolean
    swipeThreshold: number
    animated: boolean
    duration: number
    lazyRender: boolean
    enableStickyShadow: boolean
  }
  colors: {
    text: string
    textActive: string
    textDisabled: string
    description: string
    descriptionActive: string
    border: string
    indicator: string
    cardBackground: string
    cardActiveBackground: string
    cardBorder: string
    cardActiveBorder: string
    capsuleBackground: string
    capsuleActiveBackground: string
    capsuleBorder: string
    capsuleActiveBorder: string
    capsuleText: string
    capsuleActiveText: string
    jumboBackground: string
    jumboActiveBackground: string
    jumboBorder: string
    jumboActiveBorder: string
    jumboDescription: string
    jumboDescriptionActive: string
  }
  nav: {
    height: number
    paddingHorizontal: number
    paddingVertical: number
    gap: number
    background: string
  }
  typography: {
    titleSize: number
    titleWeight: string | number
    descriptionSize: number
  }
  indicator: {
    height: number
    radius: number
    width: number
  }
  card: {
    radius: number
    paddingHorizontal: number
    paddingVertical: number
  }
  capsule: {
    radius: number
    paddingHorizontal: number
    paddingVertical: number
    minHeight: number
  }
  jumbo: {
    radius: number
    paddingHorizontal: number
    paddingVertical: number
  }
}

const createTokens = (foundations: Foundations): TabsTokens => {
  const { palette, spacing, fontSize } = foundations
  return {
    defaults: {
      type: 'line',
      align: 'center',
      ellipsis: true,
      swipeThreshold: 5,
      animated: true,
      duration: 160,
      lazyRender: true,
      enableStickyShadow: true,
    },
    colors: {
      text: palette.default[700],
      textActive: palette.primary[600],
      textDisabled: palette.default[400],
      description: palette.default[500],
      descriptionActive: palette.default[600],
      border: palette.default[200],
      indicator: palette.primary[600],
      cardBackground: '#f3f4f6',
      cardActiveBackground: '#ffffff',
      cardBorder: palette.default[200],
      cardActiveBorder: palette.primary[500],
      capsuleBackground: '#ffffff',
      capsuleActiveBackground: palette.primary[50],
      capsuleBorder: palette.default[200],
      capsuleActiveBorder: palette.primary[400],
      capsuleText: palette.default[700],
      capsuleActiveText: palette.primary[600],
      jumboBackground: '#f5f6f8',
      jumboActiveBackground: '#ffffff',
      jumboBorder: 'transparent',
      jumboActiveBorder: palette.primary[400],
      jumboDescription: palette.default[500],
      jumboDescriptionActive: palette.primary[500],
    },
    nav: {
      height: 48,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      gap: spacing.sm,
      background: palette.background?.base ?? '#ffffff',
    },
    typography: {
      titleSize: fontSize.md,
      titleWeight: '500',
      descriptionSize: fontSize.sm,
    },
    indicator: {
      height: 3,
      radius: 999,
      width: 0,
    },
    card: {
      radius: 18,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    capsule: {
      radius: 999,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      minHeight: 40,
    },
    jumbo: {
      radius: 16,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
  }
}

export const useTabsTokens = (
  overrides?: DeepPartial<TabsTokens>,
): TabsTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.tabs as DeepPartial<TabsTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
