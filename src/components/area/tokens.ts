import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface AreaTokens {
  defaults: {
    columnsNum: 1 | 2 | 3
    interactionMode: 'freeze' | 'sync'
  }
}

const createAreaTokens = (_foundations: Foundations): AreaTokens => ({
  defaults: {
    columnsNum: 3,
    interactionMode: 'sync',
  },
})

export const useAreaTokens = createComponentTokensHook('area', createAreaTokens)
