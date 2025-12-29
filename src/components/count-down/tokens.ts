import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'

export interface CountDownTokens {
  text: {
    color: string
    fontSize: number
    lineHeight: number
    fontFamily: string
    fontWeight: string | number
  }
}

export const createCountDownTokens = (foundations: Foundations): CountDownTokens => {
  const { palette, fontSize, typography } = foundations
  const size = fontSize.sm

  return {
    text: {
      color: palette.default[800],
      fontSize: size,
      lineHeight: 20,
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.regular,
    },
  }
}

export const useCountDownTokens = (overrides?: DeepPartial<CountDownTokens>) => {
  const { foundations, components } = useTheme()

  return React.useMemo(() => {
    const base = createCountDownTokens(foundations)
    const componentOverrides = components?.countDown
    const mergedOverrides =
      componentOverrides && overrides ? deepMerge(componentOverrides, overrides) : componentOverrides ?? overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [components, foundations, overrides])
}
