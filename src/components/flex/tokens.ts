import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
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

const createFlexTokens = (_foundations: Foundations): FlexTokens => ({
  defaults: {
    direction: 'row',
    wrap: 'nowrap',
    gutter: 0,
    align: 'start',
    justify: 'start',
    columns: 24,
  },
})

export const useFlexTokens = createComponentTokensHook('flex', createFlexTokens)
