import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface SidebarTokens {
  colors: {
    background: string
    border: string
    title: string
    titleActive: string
    disabled: string
    indicator: string
  }
  layout: {
    width: number
    itemHeight: number
    indicatorWidth: number
  }
  typography: {
    fontSize: number
    fontWeight: string | number
  }
}

const createTokens = (foundations: Foundations): SidebarTokens => {
  const { palette, fontSize } = foundations
  return {
    colors: {
      background: '#ffffff',
      border: palette.default[200],
      title: palette.default[800],
      titleActive: palette.primary[600],
      disabled: palette.default[400],
      indicator: palette.primary[600],
    },
    layout: {
      width: 120,
      itemHeight: 48,
      indicatorWidth: 4,
    },
    typography: {
      fontSize: fontSize.sm,
      fontWeight: '500',
    },
  }
}

export const useSidebarTokens = createComponentTokensHook('sidebar', createTokens)
