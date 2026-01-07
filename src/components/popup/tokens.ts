import type { ViewStyle, TextStyle } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface PopupTokens {
  colors: {
    overlay: string
    background: string
    title: string
    description: string
    closeIcon: string
  }
  radius: {
    round: number
    shadow: number
  }
  spacing: {
    padding: number
    titleTop: number
    titleBottom: number
    descriptionHorizontal: number
    descriptionBottom: number
    closeIconTop: number
    closeIconRight: number
    closeIconSize: number
  }
  typography: {
    titleSize: number
    titleWeight: TextStyle['fontWeight']
    descriptionSize: number
    descriptionLineHeight: number
  }
  shadow: {
    color: string
    opacity: number
    radius: number
    offsetY: number
    elevation: number
  }
  layout: {
    maxWidth: number
    minWidth: number
    centerMaxWidth: number
    sideWidth: ViewStyle['width']
  }
}

export const createPopupTokens = (foundations: Foundations): PopupTokens => {
  const { palette, spacing, radii, fontSize, typography } = foundations

  return {
    colors: {
      overlay: 'rgba(0,0,0,0.5)',
      background: '#ffffff',
      title: palette.default[900],
      description: palette.default[500],
      closeIcon: palette.default[300],
    },
    radius: {
      round: radii.lg,
      shadow: 18,
    },
    spacing: {
      padding: spacing.lg,
      titleTop: spacing.xl,
      titleBottom: spacing.md,
      descriptionHorizontal: spacing.xl,
      descriptionBottom: spacing.md,
      closeIconTop: spacing.md,
      closeIconRight: spacing.md,
      closeIconSize: 36,
    },
    typography: {
      titleSize: fontSize.md,
      titleWeight: typography.weight.medium,
      descriptionSize: fontSize.sm,
      descriptionLineHeight: 20,
    },
    shadow: {
      color: 'rgba(0,0,0,0.25)',
      opacity: 0.35,
      radius: 18,
      offsetY: 8,
      elevation: 24,
    },
    layout: {
      maxWidth: 420,
      minWidth: 260,
      centerMaxWidth: 360,
      sideWidth: '80%',
    },
  }
}

export const usePopupTokens = createComponentTokensHook('popup', createPopupTokens)
