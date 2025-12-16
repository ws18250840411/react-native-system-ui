import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type {
  ButtonIconPosition,
  ButtonMode,
  ButtonShadowLevel,
  ButtonSize,
  ButtonType,
} from './types'

interface ButtonTokens {
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

const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

const hexToRgb = (input: string): [number, number, number] | null => {
  if (!hexRegex.test(input)) return null
  const normalized =
    input.length === 4
      ? `#${input[1]}${input[1]}${input[2]}${input[2]}${input[3]}${input[3]}`
      : input
  const intVal = parseInt(normalized.slice(1), 16)
  const r = (intVal >> 16) & 255
  const g = (intVal >> 8) & 255
  const b = intVal & 255
  return [r, g, b]
}

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map(value => {
      const clamped = Math.max(0, Math.min(255, Math.round(value)))
      const hex = clamped.toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    })
    .join('')}`

const mixColor = (colorA: string, colorB: string, ratio: number) => {
  const rgbA = hexToRgb(colorA)
  const rgbB = hexToRgb(colorB)
  if (!rgbA || !rgbB) return colorA
  const mix = rgbA.map((val, index) => val * (1 - ratio) + rgbB[index] * ratio) as [
    number,
    number,
    number,
  ]
  return rgbToHex(mix[0], mix[1], mix[2])
}

const lighten = (color: string, amount = 0.85) => mixColor(color, '#ffffff', amount)

const createButtonTokens = (foundations: Foundations): ButtonTokens => {
  const { palette, spacing, radii, fontSize, opacity } = foundations

  const buildTone = (tone: keyof typeof palette, text?: string) => {
    const baseBackground = palette[tone][500]
    const tonalBg = palette[tone][100] ?? lighten(baseBackground, 0.85)
    return {
      background: baseBackground,
      border: palette[tone][500],
      text: text ?? palette[tone].foreground ?? '#ffffff',
      tonalBackground: tonalBg,
      tonalBorder: palette[tone][200] ?? tonalBg,
      tonalText: palette[tone][700] ?? palette[tone][800] ?? '#111111',
    }
  }

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
        paddingHorizontal: spacing.xl,
        iconSize: fontSize.lg,
        radius: radii.sm,
      },
      normal: {
        height: 44,
        fontSize: fontSize.md,
        paddingHorizontal: spacing.lg,
        iconSize: fontSize.md,
        radius: radii.xs,
      },
      small: {
        height: 32,
        fontSize: fontSize.sm,
        paddingHorizontal: spacing.md,
        iconSize: fontSize.sm,
        radius: radii.xs,
      },
      mini: {
        height: 24,
        fontSize: fontSize.xs,
        paddingHorizontal: spacing.xs,
        iconSize: fontSize.xs,
        radius: radii.pill,
      },
    },
    spacing: {
      iconGap: spacing.sm,
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
        background: palette.default[50],
        border: palette.default[200],
        text: palette.default[700],
        tonalBackground: palette.default[100] ?? lighten(palette.default[200], 0.85),
        tonalBorder: palette.default[200],
        tonalText: palette.default[900] ?? '#111111',
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

export const useButtonTokens = (
  overrides?: DeepPartial<ButtonTokens>
): ButtonTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createButtonTokens(foundations)
    const componentOverrides = components?.button as
      | DeepPartial<ButtonTokens>
      | undefined
    const merged =
      componentOverrides && overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

export type { ButtonTokens }
