import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { ButtonIconPosition, ButtonShadowLevel, ButtonSize, ButtonType } from './types'

interface ButtonTokens {
  defaults: {
    type: ButtonType
    size: ButtonSize
    plain: boolean
    block: boolean
    round: boolean
    square: boolean
    iconPosition: ButtonIconPosition
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

const createButtonTokens = (foundations: Foundations): ButtonTokens => {
  const { palette, spacing, radii, fontSize, opacity } = foundations

  const buildTone = (tone: keyof typeof palette, text?: string) => ({
    background: palette[tone][500],
    border: palette[tone][500],
    text: text ?? palette[tone].foreground ?? '#ffffff',
  })

  return {
    defaults: {
      type: 'default',
      size: 'normal',
      plain: false,
      block: false,
      round: false,
      square: false,
      iconPosition: 'left',
    },
    sizes: {
      large: {
        height: 50,
        fontSize: fontSize.lg,
        paddingHorizontal: spacing.xl,
        iconSize: fontSize.lg,
        radius: radii.md,
      },
      normal: {
        height: 44,
        fontSize: fontSize.md,
        paddingHorizontal: spacing.lg,
        iconSize: fontSize.md,
        radius: radii.sm,
      },
      small: {
        height: 32,
        fontSize: fontSize.sm,
        paddingHorizontal: spacing.md,
        iconSize: fontSize.sm,
        radius: radii.sm,
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
        radius: 4,
        offsetY: 2,
        elevation: 2,
      },
      2: {
        color: '#0f1a38',
        opacity: 0.15,
        radius: 6,
        offsetY: 3,
        elevation: 3,
      },
      3: {
        color: '#0f1a38',
        opacity: 0.2,
        radius: 10,
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
