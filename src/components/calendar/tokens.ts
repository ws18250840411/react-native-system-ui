import type { TextStyle } from 'react-native'

import { createComponentTokensHook } from "../../design-system"
import { type Foundations } from "../../design-system/tokens"
import type { CalendarTokens } from "./types"

export const createCalendarTokens = (foundations: Foundations): CalendarTokens => {
  const { palette, spacing, radii, fontSize, typography } = foundations
  const onPrimary = palette.primary.foreground ?? "#ffffff"
  return {
    defaults: {
      type: "single",
      title: "选择日期",
      showSubtitle: true,
      showHeader: true,
      showConfirm: {
        single: false,
        range: true,
        multiple: true,
      },
      confirmText: "确定",
      weekStartsOn: 0,
      weekdays: ["日", "一", "二", "三", "四", "五", "六"],
      allowSameDay: false,
      poppable: false,
      closeOnClickOverlay: true,
      closeOnConfirm: true,
      popupPlacement: "bottom",
      popupRound: true,
    },
    layout: {
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      headerCenter: {
        alignItems: "center",
        flex: 1,
      },
      navText: {
        textAlign: "center",
      },
      headerTitle: {
        textAlign: "center",
      },
      headerSubtitle: {
        textAlign: "center",
      },
      weekRow: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      weekLabelItem: {
        width: `${100 / 7}%`,
        alignItems: "center",
      },
      weekLabel: {
        textAlign: "center",
      },
      days: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      dayButton: {
        width: `${100 / 7}%`,
        alignItems: "center",
      },
      dayText: {
        textAlign: "center",
      },
      dayPlaceholder: {
        width: `${100 / 7}%`,
      },
      confirmButton: {
        alignItems: "center",
      },
      confirmText: {
        textAlign: "center",
      },
    },
    colors: {
      text: palette.default[800],
      weekend: palette.danger[500],
      disabled: palette.default[300],
      background: "#ffffff",
      selectedBackground: palette.primary[500],
      selectedText: onPrimary,
      rangeBackground: palette.primary[100],
      headerSubtitle: palette.default[600],
      confirmText: onPrimary,
    },
    typography: {
      headerTitleSize: fontSize.md,
      headerTitleWeight: typography.weight.semiBold as TextStyle['fontWeight'],
      headerSubtitleSize: fontSize.sm,
      confirmTextWeight: typography.weight.semiBold as TextStyle['fontWeight'],
    },
    sizing: {
      dayMinWidth: 32,
      navButtonSize: fontSize.md,
    },
    radii: {
      day: radii.sm,
      container: radii.lg,
      confirmButton: 20,
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
  }
}

export const useCalendarTokens = createComponentTokensHook(
  "calendar",
  createCalendarTokens
)
