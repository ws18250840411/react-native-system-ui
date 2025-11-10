import type { Foundations } from '../../design-system'

import type { TagSize, TagType } from './types'

export interface TagTokens {
  defaults: {
    type: TagType
    size: TagSize
    plain: boolean
    round: boolean
    mark: boolean
  }
  toneMap: Record<TagType, { background: string; text: string }>
  sizes: Record< TagSize, { fontSize: number; paddingHorizontal: number; paddingVertical: number; borderRadius: number }>
  radius: {
    round: number
    markLeading: number
  }
  colors: {
    plainBackground: string
  }
  close: {
    size: number
    gap: number
  }
  typography: {
    fontFamily: string
    lineHeightMultiplier: number
    fontWeight: string
  }
}

const buildTone = (
  palette: Foundations['palette'],
  key: keyof Foundations['palette'],
  fallbackText?: string,
) => ({
  background: palette[key][500],
  text: fallbackText ?? palette[key].foreground ?? '#ffffff',
})

export const createTagTokens = (foundations: Foundations): TagTokens => {
  const { palette, spacing, fontSize, radii, typography } = foundations

  return {
    defaults: {
      type: 'default',
      size: 'small',
      plain: false,
      round: false,
      mark: false,
    },
    toneMap: {
      default: {
        background: palette.default[200],
        text: palette.default.foreground ?? '#1f2937',
      },
      primary: buildTone(palette, 'primary'),
      success: buildTone(palette, 'success'),
      warning: buildTone(
        palette,
        'warning',
        palette.warning.foreground ?? palette.warning[900],
      ),
      danger: buildTone(palette, 'danger'),
    },
    sizes: {
      mini: {
        fontSize: fontSize.xs,
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.none,
        borderRadius: radii.xs,
      },
      small: {
        fontSize: fontSize.sm,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xxs,
        borderRadius: radii.xs,
      },
      medium: {
        fontSize: fontSize.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: radii.sm,
      },
      large: {
        fontSize: fontSize.md,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: radii.md,
      },
    },
    radius: {
      round: radii.pill,
      markLeading: radii.none,
    },
    colors: {
      plainBackground: '#ffffff',
    },
    close: {
      size: fontSize.sm,
      gap: spacing.xs,
    },
    typography: {
      fontFamily: typography.fontFamily,
      lineHeightMultiplier: typography.lineHeightMultiplier,
      fontWeight: typography.weight.medium,
    },
  }
}
