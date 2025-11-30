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
    tabActive: string
    tabInactive: string
    optionText: string
    optionDisabled: string
    optionActiveBackground: string
    optionActiveText: string
    divider: string
  }
  spacing: {
    padding: number
    tabGap: number
    optionPaddingVertical: number
    optionPaddingHorizontal: number
  }
  sizing: {
    indicatorHeight: number
    optionMinHeight: number
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
      headerText: palette.default[900],
      placeholder: palette.default[500],
      tabActive: palette.primary[600],
      tabInactive: palette.default[700],
      optionText: palette.default[900],
      optionDisabled: palette.default[400],
      optionActiveBackground: palette.primary[50],
      optionActiveText: palette.primary[600],
      divider: palette.default[100],
    },
    spacing: {
      padding: spacing.md,
      tabGap: spacing.xs,
      optionPaddingVertical: spacing.sm,
      optionPaddingHorizontal: spacing.md,
    },
    sizing: {
      indicatorHeight: 2,
      optionMinHeight: 44,
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
