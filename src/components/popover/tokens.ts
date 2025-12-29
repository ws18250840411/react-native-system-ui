import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface PopoverTokens {
  colors: {
    background: string
    text: string
    backgroundDark?: string
    textDark?: string
    shadow: string
    overlay: string
  }
  radii: {
    panel: number
  }
  shadow: {
    radius: number
    offsetY: number
    opacity: number
  }
  layout?: {
    viewportMargin: number
    arrowSize: number
    actionPanelMinWidth: number
    customPanelMinWidth: number
  }
  spacing?: {
    customPanelPadding: number
    actionPanelPaddingVertical: number
    actionPaddingHorizontal: number
    actionGap: number
  }
  sizing?: {
    actionHeight: number
    actionIconWidth: number
  }
  typography?: {
    actionFontSize: number
  }
  opacity?: {
    actionPressed: number
    actionDisabled: number
  }
  motion?: {
    hiddenScale: number
  }
}

const createTokens = (foundations: Foundations): PopoverTokens => {
  const { palette, radii, spacing } = foundations
  return {
    colors: {
      background: '#ffffff',
      text: palette.default[900],
      backgroundDark: '#4a4a4a',
      textDark: '#ffffff',
      shadow: '#000000',
      overlay: 'rgba(0,0,0,0.2)',
    },
    radii: {
      panel: radii.md,
    },
    shadow: {
      radius: 8,
      offsetY: 4,
      opacity: 0.1,
    },
    layout: {
      viewportMargin: spacing.sm,
      arrowSize: 6,
      actionPanelMinWidth: 128,
      customPanelMinWidth: 160,
    },
    spacing: {
      customPanelPadding: 12,
      actionPanelPaddingVertical: 4,
      actionPaddingHorizontal: 12,
      actionGap: spacing.sm,
    },
    sizing: {
      actionHeight: 44,
      actionIconWidth: 20,
    },
    typography: {
      actionFontSize: foundations.fontSize.sm,
    },
    opacity: {
      actionPressed: foundations.opacity.pressed,
      actionDisabled: 0.5,
    },
    motion: {
      hiddenScale: 0.96,
    },
  }
}

export const usePopoverTokens = (
  overrides?: DeepPartial<PopoverTokens>,
): PopoverTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.popover as DeepPartial<PopoverTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
