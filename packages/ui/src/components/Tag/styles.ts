import { StyleSheet } from 'react-native'

import { createThemeModule } from '../../theme'

export type TagSize = 'large' | 'medium' | 'small' | 'mini'

interface TagVars {
  sizes: Record<TagSize, { paddingHorizontal: number; paddingVertical: number; fontSize: number; minHeight: number }>
  radius: number
  roundRadius: number
  squareRadius: number
  gap: number
}

const size = (h: number, ph: number, pv: number, font: number) => ({
  minHeight: h,
  paddingHorizontal: ph,
  paddingVertical: pv,
  fontSize: font,
})

export const tagTheme = createThemeModule<TagVars, StyleSheet.NamedStyles<{ container: any; text: any; close: any }>>({
  vars: (tokens) => ({
    sizes: {
      large: size(32, tokens.spacing.lg, tokens.spacing.xs, tokens.typography.fontSizeMd),
      medium: size(28, tokens.spacing.md, tokens.spacing.xs, tokens.typography.fontSizeSm),
      small: size(24, tokens.spacing.sm, tokens.spacing.none, tokens.typography.fontSizeSm),
      mini: size(20, tokens.spacing.xs, tokens.spacing.none, tokens.typography.fontSizeSm),
    },
    radius: tokens.radii.sm,
    roundRadius: tokens.radii.pill,
    squareRadius: tokens.radii.none,
    gap: tokens.spacing.xs,
  }),
  styles: (vars) =>
    StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
      },
      text: {
        textAlign: 'center',
      },
      close: {
        marginLeft: vars.gap,
      },
    }),
})
