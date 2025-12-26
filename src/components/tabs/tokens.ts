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
  }
  colors: {
    text: string
    textActive: string
    textDisabled: string
    description: string
    descriptionActive: string
    descriptionBackground: string
    descriptionActiveBackground: string
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
    jumboDescriptionBackground: string
    jumboDescriptionActiveBackground: string
  }
  tabList: {
    height: number
    paddingHorizontal: number
    paddingVertical: number
    paddingBottom: number
    background: string
  }
  typography: {
    titleSize: number
    titleWeight: string | number
    titleActiveWeight: string | number
    descriptionSize: number
    jumboTitleSize: number
    jumboLineHeight: number
  }
  indicator: {
    height: number
    radius: number
    width: number
    offset: number
  }
  card: {
    radius: number
    paddingHorizontal: number
    paddingVertical: number
    height: number
    marginHorizontal: number
  }
  capsule: {
    radius: number
    paddingHorizontal: number
    paddingVertical: number
  }
  jumbo: {
    radius: number
    paddingHorizontal: number
    paddingVertical: number
    height: number
    descriptionPaddingHorizontal: number
    descriptionPaddingVertical: number
    descriptionRadius: number
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
      // 与 React Vant 保持一致，默认 300ms 动画时间
      duration: 300,
      lazyRender: true,
    },
    colors: {
      text: palette.default[700],
      textActive: palette.primary[600],
      textDisabled: palette.default[400],
      description: palette.default[500],
      descriptionActive: palette.default[600],
      descriptionBackground: '#f2f3f5',
      descriptionActiveBackground: palette.primary[600],
      border: palette.default[200],
      indicator: palette.primary[600],
      cardBackground: '#ffffff',
      cardActiveBackground: palette.primary[600],
      cardBorder: palette.primary[600],
      cardActiveBorder: palette.primary[600],
      capsuleBackground: 'transparent',
      capsuleActiveBackground: palette.primary[600],
      capsuleBorder: 'transparent',
      capsuleActiveBorder: 'transparent',
      capsuleText: palette.default[700],
      // 激活胶囊文字强制白色，贴合 React Vant
      capsuleActiveText: '#ffffff',
      jumboBackground: '#f5f6f8',
      jumboActiveBackground: '#ffffff',
      jumboBorder: 'transparent',
      jumboActiveBorder: palette.primary[400],
      jumboDescription: palette.default[500],
      // 选中描述文字设为白色以保证对比
      jumboDescriptionActive: '#ffffff',
      jumboDescriptionBackground: '#f2f3f5',
      jumboDescriptionActiveBackground: palette.primary[500],
    },
    tabList: {
      height: 44,
      paddingHorizontal: spacing.lg,
      paddingVertical: 0,
      paddingBottom: spacing.md,
      background: '#ffffff',
    },
    typography: {
      // 对齐 React Vant：常规 14px，描述 12px，巨幕标题 16px
      titleSize: fontSize.sm,
      titleWeight: foundations.typography.weight.medium,
      titleActiveWeight: foundations.typography.weight.semiBold,
      descriptionSize: fontSize.xs,
      jumboTitleSize: fontSize.md,
      jumboLineHeight: Math.round(fontSize.md * 1.6),
    },
    indicator: {
      height: 3,
      radius: 999,
      width: 40,
      offset: spacing.md,
    },
    card: {
      radius: 18,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      height: 30,
      marginHorizontal: spacing.md,
    },
    capsule: {
      radius: 999,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    jumbo: {
      radius: 16,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      height: 64,
      descriptionPaddingHorizontal: spacing.sm,
      descriptionPaddingVertical: spacing.xxs,
      descriptionRadius: 10,
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
