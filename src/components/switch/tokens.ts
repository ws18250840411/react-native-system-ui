import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { SwitchTokens } from './types'

const createSwitchTokens = (foundations: Foundations): SwitchTokens => {
  const { palette, opacity } = foundations
  return {
    defaults: {
      size: 28,
      disabled: false,
      activeValue: true,
      inactiveValue: false,
    },
    colors: {
      activeTrack: palette.primary[500],
      inactiveTrack: palette.default[200],
      handle: '#ffffff',
    },
    opacity: {
      disabled: opacity.disabled,
      pressed: opacity.pressed,
    },
  }
}

export const useSwitchTokens = createComponentTokensHook('switch', createSwitchTokens)
