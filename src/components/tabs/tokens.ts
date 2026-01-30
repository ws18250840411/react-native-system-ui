import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { TextStyle } from 'react-native'
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
    cardActiveText: string
    capsuleBackground: string
    capsuleActiveBackground: string
    capsuleBorder: string
    capsuleActiveBorder: string
    capsuleText: string
    capsuleActiveText: string
    badgeText: string
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
    titleWeight: NonNullable<TextStyle['fontWeight']>
    titleActiveWeight: NonNullable<TextStyle['fontWeight']>
    descriptionSize: number
    jumboTitleSize: number
    jumboLineHeight: number
    badgeTextSize: number
  }
  spacing: {
    navSidePaddingHorizontal: number
    navBottomMarginTop: number
    descriptionMarginTop: number
    jumboDescriptionMarginTop: number
    badgeMarginTop: number
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
  const { palette, spacing, fontSize, radii } = foundations
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    defaults: {
      type: 'line',
      align: 'center',
      ellipsis: true,
      swipeThreshold: 5,
      animated: true,
      duration: 300,
      lazyRender: true,
    },
    colors: {
      text: palette.default[700],
      textActive: palette.primary[600],
      textDisabled: palette.default[400],
      description: palette.default[500],
      descriptionActive: palette.default[600],
      descriptionBackground: palette.default[100],
      descriptionActiveBackground: palette.primary[600],
      border: palette.default[200],
      indicator: palette.primary[600],
      cardBackground: '#ffffff',
      cardActiveBackground: palette.primary[600],
      cardBorder: palette.primary[600],
      cardActiveBorder: palette.primary[600],
      cardActiveText: onPrimary,
      capsuleBackground: 'transparent',
      capsuleActiveBackground: palette.primary[600],
      capsuleBorder: 'transparent',
      capsuleActiveBorder: 'transparent',
      capsuleText: palette.default[700],
      capsuleActiveText: onPrimary,
      badgeText: palette.default[500],
      jumboBackground: palette.default[50],
      jumboActiveBackground: '#ffffff',
      jumboBorder: 'transparent',
      jumboActiveBorder: palette.primary[400],
      jumboDescription: palette.default[500],
      jumboDescriptionActive: onPrimary,
      jumboDescriptionBackground: palette.default[100],
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
      titleSize: fontSize.sm,
      titleWeight: foundations.typography.weight.medium,
      titleActiveWeight: foundations.typography.weight.semiBold,
      descriptionSize: fontSize.xs,
      jumboTitleSize: fontSize.md,
      jumboLineHeight: Math.round(fontSize.md * 1.6),
      badgeTextSize: fontSize.xxs,
    },
    spacing: {
      navSidePaddingHorizontal: spacing.sm,
      navBottomMarginTop: spacing.sm,
      descriptionMarginTop: spacing.xxs,
      jumboDescriptionMarginTop: spacing.sm,
      badgeMarginTop: spacing.xs,
    },
    indicator: {
      height: 3,
      radius: 999,
      width: 40,
      offset: spacing.md,
    },
    card: {
      radius: radii.xs,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      height: 30,
      marginHorizontal: spacing.md,
    },
    capsule: {
      radius: 999,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.ssm,
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

export const useTabsTokens = createComponentTokensHook('tabs', createTokens)
