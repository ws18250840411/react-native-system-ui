import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { hexToRgb } from '../../utils/color'
import type {
  ButtonIconPosition,
  ButtonMode,
  ButtonShadowLevel,
  ButtonSize,
  ButtonType,
} from './types'

export interface ButtonTokens {
  defaults: {
    type: ButtonType
    size: ButtonSize
    plain: boolean
    block: boolean
    round: boolean
    square: boolean
    iconPosition: ButtonIconPosition
    mode: ButtonMode
  }
  sizes: Record<
    ButtonSize,
    {
      height: number
      fontSize: number
      paddingHorizontal: number
      iconSize: number
      radius: number
    }
  >
  spacing: {
    iconGap: number
  }
  colors: {
    ripple: string
    backgroundTransparent: string
    backgroundPlain: string
    textDark: string
    textLight: string
  }
  states: {
    disabledOpacity: number
    loadingOpacity: number
    pressedOpacity: number
  }
  border: {
    width: number
    hairlineWidth: number
  }
  toneMap: Record<
    ButtonType,
    {
      background: string
      border: string
      text: string
      tonalBackground: string
      tonalBorder: string
      tonalText: string
    }
  >
  shadow: Record<
    ButtonShadowLevel,
    {
      color: string
      opacity: number
      radius: number
      offsetY: number
      elevation: number
    }
  >
}

const isDarkThemeBackground = (color: string) => {
  const rgb = hexToRgb(color)
  return !!rgb && (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 < 140
}

const createButtonTokens = (foundations: Foundations): ButtonTokens => {
  const { palette, spacing, radii, fontSize, opacity } = foundations

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
      iconPosition: 'left',
      mode: 'contained',
    },
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
    spacing: {
      iconGap: spacing.sm,
    },
    colors: {
      ripple: 'rgba(255,255,255,0.35)',
      backgroundTransparent: 'transparent',
      backgroundPlain: defaultBackground,
      textDark: '#ffffff',
      textLight: '#111111',
    },
    states: {
      disabledOpacity: opacity.disabled,
      loadingOpacity: opacity.loading,
      pressedOpacity: opacity.pressed,
    },
    border: {
      width: 1,
      hairlineWidth: 0.5,
    },
    toneMap: {
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
    shadow: {
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
