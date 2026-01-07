import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { FlexTokens } from './types'

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
