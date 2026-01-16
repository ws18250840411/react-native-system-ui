import { Platform, type ViewStyle } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { NavBarTokens } from './types'

export const createNavBarTokens = ({
  palette,
  spacing,
  fontSize,
}: Foundations): NavBarTokens => {
  const fixedPosition: ViewStyle['position'] =
    Platform.OS === 'web' ? ('fixed' as unknown as ViewStyle['position']) : 'absolute'
  return {
    defaults: {
      fixed: false,
      placeholder: false,
      border: true,
      safeAreaInsetTop: false,
      leftArrow: false,
      zIndex: 1,
    },
    layout: {
      container: {
        width: '100%',
      },
      bar: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 48,
        paddingHorizontal: spacing.md,
      },
      center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
      },
      side: {
        minWidth: 60,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      },
      rightAlign: {
        justifyContent: 'flex-end',
      },
      sidePlaceholder: {
        minWidth: 60,
      },
      sideText: {
        fontSize: 16,
      },
      titleWrapper: {
        alignItems: 'center',
      },
      title: {
        includeFontPadding: false,
      },
      description: {
        marginTop: 2,
        includeFontPadding: false,
      },
      fixed: {
        position: fixedPosition,
        top: 0,
        left: 0,
        right: 0,
      },
    },
    colors: {
      background: '#ffffff',
      text: palette.default[900],
      description: palette.default[500],
      border: palette.default[200],
      icon: palette.default[700],
    },
    typography: {
      titleSize: fontSize.lg,
      titleWeight: '600',
      descriptionSize: fontSize.sm,
    },
    sizing: {
      height: 52,
    },
  }
}

export const useNavBarTokens = createComponentTokensHook(
  'navBar',
  createNavBarTokens
)
