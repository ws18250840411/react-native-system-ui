import * as React from 'react'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { FlexAlign, FlexJustify, FlexWrap } from './Flex'
import type { FlexDirection } from './FlexContext'

export interface FlexTokens {
  defaults: {
    direction: FlexDirection
    wrap: FlexWrap
    gutter: number | [number, number]
    align: FlexAlign
    justify: FlexJustify
    columns: number
  }
}

const createFlexTokens = (foundations: Foundations): FlexTokens => ({
  defaults: {
    direction: 'row',
    wrap: 'wrap',
    gutter: [foundations.spacing.md, 0],
    align: 'start',
    justify: 'start',
    columns: 24,
  },
})

export const useFlexTokens = (overrides?: DeepPartial<FlexTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createFlexTokens(foundations)
    const globalOverrides = components?.flex as DeepPartial<FlexTokens> | undefined
    const merged =
      globalOverrides && overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides ?? overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}
