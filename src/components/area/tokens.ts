import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'

export interface AreaTokens {}

const createAreaTokens = (_foundations: Foundations): AreaTokens => ({})

export const useAreaTokens = createComponentTokensHook('area', createAreaTokens)
