import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface NavBarTokens {
  defaults: {
    fixed: boolean
    placeholder: boolean
    border: boolean
    safeAreaInsetTop: boolean
  }
  colors: {
    background: string
    text: string
    description: string
    border: string
    icon: string
  }
  layout: {
    height: number
    paddingHorizontal: number
  }
  typography: {
    titleSize: number
    titleWeight: string | number
    descriptionSize: number
  }
}

const createTokens = (foundations: Foundations): NavBarTokens => {
  const { palette, spacing, fontSize } = foundations
  const surface = palette.default[50]
  return {
    defaults: {
      fixed: false,
      placeholder: false,
      border: true,
      safeAreaInsetTop: false,
    },
    colors: {
      background: surface,
      text: palette.default[900],
      description: palette.default[500],
      border: palette.default[200],
      icon: palette.default[700],
    },
    layout: {
      height: 52,
      paddingHorizontal: spacing.md,
    },
    typography: {
      titleSize: fontSize.lg,
      titleWeight: '600',
      descriptionSize: fontSize.sm,
    },
  }
}

export const useNavBarTokens = createComponentTokensHook('navBar', createTokens)
