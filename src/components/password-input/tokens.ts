import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface PasswordInputTokens {
  colors: {
    border: string
    text: string
    muted: string
    error: string
    cursor: string
    background: string
    transparent: string
  }
  radii: {
    wrapper: number
    cellGutter: number
  }
  sizing: {
    cellHeight: number
    cellTextSize: number
    maskSize: number
    cursorWidth: number
    cursorHeightRatio: number
    cursorTopRatio: number
  }
  typography: {
    fontFamily: string
    cellTextWeight: TextStyle['fontWeight']
    infoSize: number
    infoLineHeight: number
    infoWeight: TextStyle['fontWeight']
  }
  opacity: {
    disabled: number
    hidden: number
  }
  spacing: {
    infoMarginTop: number
    none: number
  }
}

const createPasswordInputTokens = (foundations: Foundations): PasswordInputTokens => ({
  colors: {
    border: foundations.palette.default[100],
    text: foundations.palette.default[900],
    muted: foundations.palette.default[500],
    error: foundations.palette.danger[500],
    cursor: foundations.palette.default[800],
    background: foundations.surface ?? '#ffffff',
    transparent: 'transparent',
  },
  radii: {
    wrapper: foundations.radii.sm,
    cellGutter: foundations.radii.none,
  },
  sizing: {
    cellHeight: 50,
    cellTextSize: foundations.fontSize.xl,
    maskSize: 10,
    cursorWidth: StyleSheet.hairlineWidth || 1,
    cursorHeightRatio: 0.4,
    cursorTopRatio: 0.3,
  },
  typography: {
    fontFamily: foundations.typography.fontFamily,
    cellTextWeight: foundations.typography.weight.semiBold,
    infoSize: foundations.fontSize.sm,
    infoLineHeight: Math.round(
      foundations.fontSize.sm * foundations.typography.lineHeightMultiplier
    ),
    infoWeight: foundations.typography.weight.regular,
  },
  opacity: {
    disabled: 0.6,
    hidden: 0,
  },
  spacing: {
    infoMarginTop: foundations.spacing.sm,
    none: foundations.spacing.none,
  },
})

export const usePasswordInputTokens = createComponentTokensHook(
  'passwordInput',
  createPasswordInputTokens
)
