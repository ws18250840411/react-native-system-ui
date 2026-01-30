import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface UploaderTokens {
  size: number
  gap: number
  radius: number
  spacing: {
    placeholderPaddingHorizontal: number
    placeholderNameMarginTop: number
    statusGap: number
    uploadContentGap: number
    deleteOffset: number
    deletePaddingHorizontal: number
  }
  sizing: {
    deleteMinSize: number
  }
  opacity: {
    pressed: number
    disabled: number
  }
  radii: {
    deleteButton: number
  }
  typography: {
    placeholderIconSize: number
    placeholderNameSize: number
    statusTextSize: number
    uploadIconSize: number
    uploadTextSize: number
  }
  colors: {
    background: string
    border: string
    text: string
    icon: string
    deleteBackground: string
    deleteIcon: string
    maskBackground: string
    maskText: string
    failed: string
  }
}

const createTokens = (foundations: Foundations): UploaderTokens => {
  const { palette, spacing, radii, fontSize } = foundations
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    size: 80,
    gap: spacing.sm,
    radius: radii.md,
    spacing: {
      placeholderPaddingHorizontal: spacing.ssm,
      placeholderNameMarginTop: spacing.ssm,
      statusGap: spacing.xs,
      uploadContentGap: spacing.xs,
      deleteOffset: spacing.xs,
      deletePaddingHorizontal: spacing.xs,
    },
    sizing: {
      deleteMinSize: spacing.xl,
    },
    opacity: {
      pressed: 0.85,
      disabled: 0.65,
    },
    radii: {
      deleteButton: radii.lg,
    },
    typography: {
      placeholderIconSize: fontSize.xl,
      placeholderNameSize: 11,
      statusTextSize: fontSize.xs,
      uploadIconSize: 24,
      uploadTextSize: fontSize.xs,
    },
    colors: {
      background: palette.default[100],
      border: palette.default[200],
      text: palette.default[500],
      icon: palette.default[500],
      deleteBackground: 'rgba(0,0,0,0.65)',
      deleteIcon: onPrimary,
      maskBackground: 'rgba(0,0,0,0.45)',
      maskText: onPrimary,
      failed: palette.danger[500],
    },
  }
}

export const useUploaderTokens = createComponentTokensHook('uploader', createTokens)
