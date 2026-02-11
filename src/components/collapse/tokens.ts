import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { CollapseTokens } from './types'

export const createCollapseTokens = (foundations: Foundations): CollapseTokens => {
  const { palette, spacing, fontSize, typography, radii } = foundations
  const surface = foundations.surface ?? '#ffffff'

  return {
    defaults: {
      accordion: false,
      border: true,
      iconPosition: 'right',
      panelBorder: true,
      panelIsLink: true,
      panelSize: 'normal',
      animationDuration: 200,
    },
    layout: {
      container: {
        position: 'relative',
      },
      panel: {
        position: 'relative',
      },
      hairline: {
        position: 'absolute',
      },
      headerWrapper: {
        position: 'relative',
      },
      bodyWrapper: {
        position: 'relative',
        overflow: 'hidden',
      },
      headerIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      bodyContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      },
    },
    colors: {
      border: palette.default[200],
      title: palette.default[800],
      description: palette.default[500],
      background: surface,
      active: palette.default[50],
      arrow: palette.default[400],
      disabled: palette.default[400],
    },
    typography: {
      titleSize: fontSize.md,
      descriptionSize: fontSize.sm,
      fontFamily: typography.fontFamily,
      titleWeight: typography.weight.medium,
    },
    panel: {
      borderRadius: radii.sm,
    },
    spacing: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      descriptionTop: spacing.xs,
      iconGap: 8,
    },
  }
}

export const useCollapseTokens = createComponentTokensHook('collapse', createCollapseTokens)
