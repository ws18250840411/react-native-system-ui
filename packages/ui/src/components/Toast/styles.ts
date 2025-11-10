import { StyleSheet } from 'react-native'

import { createThemeModule } from '../../theme'

export type ToastPosition = 'top' | 'middle' | 'bottom'

interface ToastVars {
  paddingHorizontal: number
  paddingVertical: number
  gap: number
  borderRadius: number
}

export const toastTheme = createThemeModule<ToastVars, StyleSheet.NamedStyles<{ overlay: any; container: any; message: any; icon: any }>>({
  vars: (tokens) => ({
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.sm,
    gap: tokens.spacing.xs,
    borderRadius: tokens.radii.lg,
  }),
  styles: (vars, tokens) =>
    StyleSheet.create({
      overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        pointerEvents: 'box-none',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: tokens.spacing.lg,
      },
      container: {
        backgroundColor: tokens.colors.toastBackground,
        borderRadius: vars.borderRadius,
        paddingHorizontal: vars.paddingHorizontal,
        paddingVertical: vars.paddingVertical,
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '80%',
      },
      message: {
        color: tokens.colors.toastText,
      },
      icon: {
        marginRight: vars.gap,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
})
