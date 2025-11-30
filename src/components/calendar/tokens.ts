import * as React from "react"

import { useTheme } from "../../design-system"
import type { DeepPartial } from "../../types"
import type { Foundations } from "../../design-system/tokens"
import { deepMerge } from "../../utils/deepMerge"

export interface CalendarTokens {
  colors: {
    text: string
    weekend: string
    disabled: string
    background: string
    selectedBackground: string
    selectedText: string
    rangeBackground: string
  }
  spacing: {
    row: number
    column: number
  }
  radii: {
    day: number
  }
}

const createCalendarTokens = (foundations: Foundations): CalendarTokens => {
  const { palette, spacing, radii } = foundations
  return {
    colors: {
      text: palette.default[800],
      weekend: palette.danger[500],
      disabled: palette.default[300],
      background: "#fff",
      selectedBackground: palette.primary[500],
      selectedText: "#fff",
      rangeBackground: palette.primary[100],
    },
    spacing: {
      row: spacing.xs,
      column: spacing.xs,
    },
    radii: {
      day: radii.sm,
    },
  }
}

export const useCalendarTokens = (overrides?: DeepPartial<CalendarTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createCalendarTokens(foundations)
    const componentOverrides = components?.calendar as DeepPartial<CalendarTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
