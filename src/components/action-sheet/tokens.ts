import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { ActionSheetTokens } from './types'

const centered = { alignItems: 'center', justifyContent: 'center' } as const

export const createActionSheetTokens = (foundations: Foundations): ActionSheetTokens => {
  const { palette, spacing, fontSize } = foundations
  const white = '#ffffff'
  return {
    defaults: {
      closeOnClickAction: false,
      closeable: true,
      round: true,
      safeAreaInsetBottom: true,
      overlay: true,
      lockScroll: true,
    },
    layout: {
      popup: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
      },
      panel: {
        width: '100%',
        maxHeight: '80%',
      },
      header: {
        position: 'relative',
        flexDirection: 'row',
        ...centered,
        paddingHorizontal: 16,
      },
      titleContainer: {
        flex: 1,
        ...centered,
      },
      title: {
        fontWeight: '600',
        textAlign: 'center',
      },
      titleNode: centered,
      closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 48,
        height: 48,
        ...centered,
      },
      descriptionContainer: {
        paddingTop: 12,
        paddingBottom: 20,
        paddingHorizontal: 16,
      },
      description: {
        textAlign: 'center',
        lineHeight: 20,
      },
      descriptionNode: centered,
      actions: {
        width: '100%',
      },
      item: {
        ...centered,
        width: '100%',
      },
      itemWithIcon: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
      itemTextWrapper: centered,
      itemText: {
        lineHeight: 24,
      },
      subname: {
        marginTop: 4,
        fontSize: 12,
        lineHeight: 18,
      },
      subnameNode: {
        marginTop: 4,
      },
      icon: {
        marginRight: 12,
      },
      cancelGap: {
        width: '100%',
        marginBottom: 0,
      },
      cancel: centered,
      cancelText: {
        lineHeight: 24,
      },
    },
    colors: {
      background: white,
      title: palette.default[900],
      description: palette.default[500],
      item: palette.default[900],
      subitem: palette.default[500],
      cancel: palette.default[900],
      disabled: palette.default[400],
      border: palette.default[200],
      itemBackground: white,
      itemPressedBackground: palette.default[100],
      cancelBackground: white,
      cancelGapBackground: palette.default[100] ?? '#f1f2f5',
    },
    typography: {
      title: fontSize.lg,
      item: fontSize.md,
      description: fontSize.sm,
    },
    spacing: {
      horizontal: spacing.md,
      vertical: 14,
      cancelGap: 8,
    },
  }
}

export const useActionSheetTokens = createComponentTokensHook(
  'actionSheet',
  createActionSheetTokens
)
