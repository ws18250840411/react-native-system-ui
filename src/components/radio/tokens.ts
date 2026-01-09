import { StyleSheet } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { RadioTokens } from './types'

const createRadioTokens = (foundations: Foundations): RadioTokens => {
  const { palette, spacing, fontSize, typography } = foundations
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    defaults: {
      iconSize: 20,
      labelPosition: 'right',
      shape: 'round',
      labelDisabled: false,
      groupDisabled: false,
      groupDirection: 'vertical',
    },
    layout: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      labelWrapper: {
        flexShrink: 1,
      },
      icon: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      label: {
        includeFontPadding: false,
      },
      groupHorizontal: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
      },
      groupVertical: {
        flexDirection: 'column',
      },
      groupItem: {
        flexShrink: 0,
      },
    },
    colors: {
      border: palette.default[400],
      background: '#ffffff',
      checkedBackground: palette.primary[500],
      disabledBorder: palette.default[300],
      disabledBackground: palette.default[100],
      checkmark: onPrimary,
      label: palette.default.foreground ?? '#111827',
      labelDisabled: palette.default[400],
    },
    typography: {
      fontSize: fontSize.md,
      fontFamily: typography.fontFamily,
      fontWeight: String(typography.weight.medium),
      lineHeightMultiplier: typography.lineHeightMultiplier,
    },
    sizing: {
      dotScale: 0.5,
    },
    radii: {
      round: 999,
      square: 2,
    },
    borders: {
      width: StyleSheet.hairlineWidth,
    },
    spacing: {
      gap: spacing.sm,
      groupGap: spacing.sm,
    },
  }
}

export const useRadioTokens = createComponentTokensHook(
  'radio',
  createRadioTokens
)
