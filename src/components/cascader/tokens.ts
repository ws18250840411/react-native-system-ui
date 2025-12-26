import * as React from "react"

import { useTheme } from "../../design-system"
import type { Foundations } from "../../design-system/tokens"
import type { DeepPartial } from "../../types"
import { deepMerge } from "../../utils/deepMerge"

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
  return {
    colors: {
      background: "#ffffff",
      headerText: "#323232",
      placeholder: "#969799",
      closeIcon: "#c8c9cc",
      closeIconActive: "#969799",
      tabText: "#323232",
      tabActive: palette.primary[500],
      tabInactive: "#969799",
      optionText: "#323232",
      optionDisabled: "#c8c9cc",
      optionActiveBackground: "#f2f3f5",
      optionActiveText: palette.primary[500],
      divider: "#ebedf0",
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

export const useCascaderTokens = (overrides?: DeepPartial<CascaderTokens>): CascaderTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.cascader as DeepPartial<CascaderTokens> | undefined
    const merged = componentOverrides && overrides ? deepMerge(componentOverrides, overrides) : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
