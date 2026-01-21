import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { getHairlineWidth } from '../../utils'
import type { TagTokens } from './types'

const buildTone = (
  palette: Foundations['palette'],
  key: keyof Foundations['palette'],
  fallbackText?: string
) => ({
  background: palette[key][500],
  text: fallbackText ?? palette[key].foreground ?? '#ffffff',
})

export const createTagTokens = (foundations: Foundations): TagTokens => {
  const { palette, radii, typography, opacity, spacing } = foundations

  return {
    defaults: {
      type: 'default',
      size: 'small',
      plain: false,
      round: false,
      mark: false,
      show: true,
      pressedOpacity: opacity.pressed,
    },
    layout: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
      },
      close: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    colors: {
      plainBackground: '#ffffff',
      toneMap: {
        default: buildTone(palette, 'default', '#ffffff'),
        primary: buildTone(palette, 'primary'),
        success: buildTone(palette, 'success'),
        warning: buildTone(palette, 'warning', palette.warning.foreground ?? palette.warning[900]),
        danger: buildTone(palette, 'danger'),
      },
    },
    typography: {
      fontFamily: typography.fontFamily,
      lineHeightMultiplier: typography.lineHeightMultiplier,
      fontWeight: typography.weight.medium,
    },
    sizing: {
      sizes: {
        mini: {
          fontSize: 10,
          paddingHorizontal: 4,
          paddingVertical: 0,
          borderRadius: 2,
          lineHeight: 16,
        },
        small: {
          fontSize: 12,
          paddingHorizontal: 4,
          paddingVertical: 0,
          borderRadius: 2,
          lineHeight: 16,
        },
        medium: {
          fontSize: 12,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
          lineHeight: 16,
        },
        large: {
          fontSize: 14,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 4,
          lineHeight: 16,
        },
      },
      closeIconSize: 12,
    },
    radii: {
      round: radii.pill,
      markLeading: radii.none,
    },
    borders: {
      width: getHairlineWidth(),
    },
    spacing: {
      closeGap: 2,
      closeHitSlop: spacing.sm,
    },
  }
}

export const useTagTokens = createComponentTokensHook('tag', createTagTokens)

