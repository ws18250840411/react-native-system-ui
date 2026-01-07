import { createComponentTokensHook } from "../../design-system"
import { type Foundations } from "../../design-system/tokens"

export interface CalendarTokens {
  colors: {
    text: string
    weekend: string
    disabled: string
    background: string
    selectedBackground: string
    selectedText: string
    rangeBackground: string
    headerSubtitle: string
    confirmText: string
  }
  spacing: {
    row: number
    column: number
    containerPadding: number
    headerMarginBottom: number
    weekRowMarginBottom: number
    navPaddingHorizontal: number
    dayPaddingVertical: number
    confirmMarginTop: number
    confirmPaddingVertical: number
  }
  radii: {
    day: number
    container: number
    confirmButton: number
  }
  typography: {
    headerTitleSize: number
    headerTitleWeight: string
    headerSubtitleSize: number
    confirmTextWeight: string
  }
  sizing: {
    dayMinWidth: number
    navButtonSize: number
  }
}

const createCalendarTokens = (foundations: Foundations): CalendarTokens => {
  const { palette, spacing, radii, fontSize, typography } = foundations
  const onPrimary = palette.primary.foreground ?? "#ffffff"
  return {
    colors: {
      text: palette.default[800],
      weekend: palette.danger[500],
      disabled: palette.default[300],
      background: '#ffffff',
      selectedBackground: palette.primary[500],
      selectedText: onPrimary,
      rangeBackground: palette.primary[100],
      headerSubtitle: palette.default[600],
      confirmText: onPrimary,
    },
    spacing: {
      row: spacing.xs,
      column: spacing.xs,
      containerPadding: spacing.lg,
      headerMarginBottom: spacing.md,
      weekRowMarginBottom: spacing.sm,
      navPaddingHorizontal: spacing.sm,
      dayPaddingVertical: 6,
      confirmMarginTop: spacing.lg,
      confirmPaddingVertical: 10,
    },
    radii: {
      day: radii.sm,
      container: radii.lg,
      confirmButton: 20,
    },
    typography: {
      headerTitleSize: fontSize.md,
      headerTitleWeight: String(typography.weight.semiBold),
      headerSubtitleSize: fontSize.sm,
      confirmTextWeight: String(typography.weight.semiBold),
    },
    sizing: {
      dayMinWidth: 32,
      navButtonSize: fontSize.md,
    },
  }
}

export const useCalendarTokens = createComponentTokensHook(
  "calendar",
  createCalendarTokens
)
