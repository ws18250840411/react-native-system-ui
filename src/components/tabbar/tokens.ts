import type { TextStyle } from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'

export interface TabbarTokens {
  defaults: {
    fixed: boolean
    border: boolean
    placeholder: boolean
    safeAreaInsetBottom: boolean
  }
  colors: {
    background: string
    border: string
    active: string
    inactive: string
  }
  layout: {
    height: number
    paddingHorizontal: number
    paddingVertical: number
  }
  icon: {
    size: number
  }
  typography: {
    fontSize: number
    fontWeight: TextStyle['fontWeight']
  }
}

const createTokens = (foundations: Foundations): TabbarTokens => {
  const { palette, spacing, fontSize } = foundations
  return {
    defaults: {
      fixed: true,
      border: true,
      
      placeholder: false,
      safeAreaInsetBottom: false,
    },
    colors: {
      background: '#ffffff',
      border: palette.default[200],
      active: palette.primary[600],
      inactive: palette.default[600],
    },
    layout: {
      
      height: 50,
      paddingHorizontal: 0,
      paddingVertical: spacing.xs,
    },
    icon: {
      size: 22,
    },
    typography: {
      fontSize: fontSize.sm,
      fontWeight: '400',
    },
  }
}

export const useTabbarTokens = createComponentTokensHook('tabbar', createTokens)
