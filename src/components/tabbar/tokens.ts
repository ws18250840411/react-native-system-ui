import * as React from 'react'
import type { TextStyle } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

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
      // 与 Vant 默认一致：placeholder 默认关闭；safe-area 由 Tabbar 在 fixed 时默认开启
      placeholder: false,
      safeAreaInsetBottom: false,
    },
    colors: {
      background: palette.default[50] ?? '#ffffff',
      // 对齐 Vant 默认色值（更利于“看起来一致”）
      border: '#ebedf0',
      active: '#3f45ff',
      inactive: '#7d7e80',
    },
    layout: {
      // 对齐官方默认观感（Vant Tabbar）：50 高度、无左右 padding
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

export const useTabbarTokens = (
  overrides?: DeepPartial<TabbarTokens>,
): TabbarTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createTokens(foundations)
    const componentOverrides = components?.tabbar as DeepPartial<TabbarTokens> | undefined
    const merged = componentOverrides && overrides
      ? deepMerge(componentOverrides, overrides)
      : componentOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
