import { StyleSheet } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { hexToRgb } from '../../utils'
import type { ButtonTokens } from './types'

const isDarkThemeBackground = (color: string) => {
  const rgb = hexToRgb(color)
  return !!rgb && (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 < 140
}

const createButtonTokens = (foundations: Foundations): ButtonTokens => {
  const { palette, spacing, radii, fontSize, typography, opacity } = foundations

  const buildTone = (tone: keyof typeof palette, text?: string) => {
    const ramp = palette[tone]
    const baseBackground = ramp[500]
    return {
      background: baseBackground,
      border: baseBackground,
      text: text ?? ramp.foreground ?? '#ffffff',
      tonalBackground: ramp[100],
      tonalBorder: ramp[200],
      tonalText: ramp[700] ?? ramp[800] ?? '#111111',
    }
  }

  const darkTheme = isDarkThemeBackground(palette.default[50])
  const baseRadius = Math.max(0, Math.round(radii.xs / 2))
  const defaultBackground = darkTheme ? palette.default[100] : '#ffffff'
  const defaultBorder = darkTheme ? palette.default[300] : '#ebedf0'
  const defaultText = darkTheme ? palette.default.foreground ?? '#f4f6fb' : '#323233'

  return {
    defaults: {
      type: 'default',
      size: 'normal',
      plain: false,
      block: false,
      round: false,
      square: false,
      hairline: false,
      iconPosition: 'left',
      loading: false,
      loadingSize: 'small',
      disabled: false,
      allowFontScaling: true,
    },
    layout: {
      base: {
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
      },
      block: {
        alignSelf: 'stretch',
        width: '100%',
      },
      content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontWeight: '400',
      },
    },
    colors: {
      ripple: 'rgba(255,255,255,0.35)',
      backgroundTransparent: 'transparent',
      backgroundPlain: defaultBackground,
      textDark: '#ffffff',
      textLight: '#111111',
      tones: {
        default: {
          background: defaultBackground,
          border: defaultBorder,
          text: defaultText,
          tonalBackground:
            darkTheme ? palette.default[200] : palette.default[100],
          tonalBorder: defaultBorder,
          tonalText: defaultText,
        },
        primary: buildTone('primary'),
        info: buildTone('info'),
        success: buildTone('success'),
        warning: buildTone('warning', palette.warning.foreground ?? '#ffffff'),
        danger: buildTone('danger'),
      },
    },
    typography: {
      fontFamily: typography.fontFamily,
      lineHeightMultiplier: typography.lineHeightMultiplier,
      fontWeight: typography.weight.medium,
    },
    sizing: {
      sizes: {
        large: {
          height: 50,
          fontSize: fontSize.lg,
          paddingHorizontal: fontSize.lg,
          iconSize: fontSize.lg,
          radius: baseRadius,
        },
        normal: {
          height: 44,
          fontSize: fontSize.sm,
          paddingHorizontal: fontSize.md,
          iconSize: fontSize.sm,
          radius: baseRadius,
        },
        small: {
          height: 32,
          fontSize: fontSize.xs,
          paddingHorizontal: fontSize.xs,
          iconSize: fontSize.xs,
          radius: baseRadius,
        },
        mini: {
          height: 24,
          fontSize: fontSize.xxs,
          paddingHorizontal: fontSize.xxs,
          iconSize: fontSize.xxs,
          radius: baseRadius,
        },
      },
    },
    borders: {
      width: 1,
      hairlineWidth: StyleSheet.hairlineWidth,
    },
    spacing: {
      iconGap: spacing.sm,
      groupGap: spacing.xs,
    },
    states: {
      disabledOpacity: opacity.disabled,
      loadingOpacity: opacity.loading,
      pressedOpacity: 0.75,
    },
    shadows: {
      1: {
        color: '#0f1a38',
        opacity: 0.12,
        radius: 2,
        offsetY: 2,
        elevation: 2,
      },
      2: {
        color: '#0f1a38',
        opacity: 0.15,
        radius: 4,
        offsetY: 3,
        elevation: 3,
      },
      3: {
        color: '#0f1a38',
        opacity: 0.2,
        radius: 6,
        offsetY: 4,
        elevation: 5,
      },
    },
  }
}

export const useButtonTokens = createComponentTokensHook(
  'button',
  createButtonTokens
)
