import { StyleSheet } from 'react-native'

import { createThemeModule } from '../../theme'

export type ButtonSizeToken = 'large' | 'normal' | 'small' | 'mini'

type ButtonVars = {
  sizes: Record<ButtonSizeToken, { height: number; paddingHorizontal: number; fontSize: number }>
  gap: number
  radius: number
  squareRadius: number
  pillRadius: number
}

type ButtonStyles = StyleSheet.NamedStyles<{
  container: any
  content: any
  text: any
  icon: any
}>

export const buttonTheme = createThemeModule<ButtonVars, ButtonStyles>({
  vars: (tokens) => ({
    sizes: {
      large: {
        height: 52,
        paddingHorizontal: tokens.spacing.xl,
        fontSize: tokens.typography.fontSizeLg,
      },
      normal: {
        height: 44,
        paddingHorizontal: tokens.spacing.lg,
        fontSize: tokens.typography.fontSizeMd,
      },
      small: {
        height: 36,
        paddingHorizontal: tokens.spacing.md,
        fontSize: tokens.typography.fontSizeSm,
      },
      mini: {
        height: 30,
        paddingHorizontal: tokens.spacing.sm,
        fontSize: tokens.typography.fontSizeSm,
      },
    },
    gap: tokens.spacing.xs,
    radius: tokens.radii.md,
    squareRadius: tokens.radii.none,
    pillRadius: tokens.radii.pill,
  }),
  styles: (vars) =>
    StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      text: {
        textAlign: 'center',
      },
    }),
})
