import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface UploaderTokens {
  size: number
  gap: number
  radius: number
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
  const { palette, spacing, radii } = foundations
  const onPrimary = palette.primary.foreground ?? '#ffffff'
  return {
    size: 80,
    gap: spacing.sm,
    radius: radii.md,
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
