import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { BadgeTokens } from './types'

const createBadgeTokens = ({
  palette,
  spacing,
  fontSize,
  radii,
  typography,
}: Foundations): BadgeTokens => {
  const dotSize = 8
  return {
  defaults: {
    dot: false,
    showZero: true,
    pressedOpacity: 0.9,
  },
  layout: {
    wrapper: {
      position: 'relative',
      alignSelf: 'flex-start',
    },
    badgeAbsolute: {
      position: 'absolute',
      top: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    },
    badgeStandalone: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressableStandalone: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
    },
    text: {
      textAlign: 'center',
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
      icon: {
        alignItems: 'center',
        justifyContent: 'center',
      },
  },
  colors: {
    background: palette.danger[500],
    dot: palette.danger[500],
    text: palette.danger.foreground ?? '#fff',
    border: '#fff',
  },
  typography: {
    fontSize: fontSize.xs,
    fontWeight: typography.weight.bold,
    fontFamily: typography.fontFamily,
    lineHeight: fontSize.xs * typography.lineHeightMultiplier,
  },
  sizing: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    dotSize,
  },
  radii: {
    badge: radii.pill,
    dot: dotSize / 2,
  },
  borders: {
    width: 1,
  },
  }
}

export const useBadgeTokens = createComponentTokensHook('badge', createBadgeTokens)
