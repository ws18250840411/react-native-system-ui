import { createComponentTokensHook } from "../../design-system"
import { type Foundations } from "../../design-system/tokens"

export interface CascaderTokens {
  colors: {
    background: string
    headerText: string
    placeholder: string
    closeIcon: string
    closeIconActive: string
    tabText: string
    tabActive: string
    tabInactive: string
    optionText: string
    optionDisabled: string
    optionActiveBackground: string
    optionActiveText: string
    divider: string
  }
  spacing: {
    headerPaddingHorizontal: number
    tabNavPaddingHorizontal: number
    tabNavPaddingVertical: number
    tabPaddingHorizontal: number
    optionPaddingVertical: number
    optionPaddingHorizontal: number
    optionListPaddingTop: number
    optionListPaddingBottom: number
  }
  sizing: {
    indicatorHeight: number
    optionMinHeight: number
    optionListHeight: number
    headerHeight: number
    closeIconSize: number
    selectedIconSize: number
  }
  radii: {
    option: number
  }
}

const createTokens = (foundations: Foundations): CascaderTokens => {
  const { palette, spacing, radii } = foundations
  const surface = palette.default[50]
  const surfaceMuted = palette.default[100]
  return {
    colors: {
      background: surface,
      headerText: palette.default[900],
      placeholder: palette.default[500],
      closeIcon: palette.default[300],
      closeIconActive: palette.default[500],
      tabText: palette.default[900],
      tabActive: palette.primary[500],
      tabInactive: palette.default[500],
      optionText: palette.default[900],
      optionDisabled: palette.default[300],
      optionActiveBackground: surfaceMuted,
      optionActiveText: palette.primary[500],
      divider: palette.default[200],
    },
    spacing: {
      headerPaddingHorizontal: spacing.lg,
      tabNavPaddingHorizontal: 6,
      tabNavPaddingVertical: 2,
      tabPaddingHorizontal: 10,
      optionPaddingVertical: 10,
      optionPaddingHorizontal: spacing.lg,
      optionListPaddingTop: 6,
      optionListPaddingBottom: 0,
    },
    sizing: {
      indicatorHeight: 3,
      optionMinHeight: 40,
      optionListHeight: 384,
      headerHeight: 48,
      closeIconSize: 22,
      selectedIconSize: 18,
    },
    radii: {
      option: radii.sm,
    },
  }
}

export const useCascaderTokens = createComponentTokensHook(
  "cascader",
  createTokens
)
