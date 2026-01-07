import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import type { SwitchTokens } from './types'

const createSwitchTokens = (foundations: Foundations): SwitchTokens => {
  const { palette, opacity } = foundations
  const surface = palette.default[50]
  return {
    defaults: {
      size: 30,
    },
    colors: {
      activeTrack: palette.primary[500],
      inactiveTrack: surface,
      handle: surface,
      border: palette.default[300],
    },
    opacity: {
      disabled: opacity.disabled,
      pressed: opacity.pressed,
    },
    animation: {
      duration: 200,
    },
    shadow: {
      outer: {
        color: '#000000',
        opacity: 0.06,
        radius: 3,
        offsetY: 3,
        elevation: 3,
      },
      inner: {
        color: '#000000',
        opacity: 0.12,
        radius: 2,
        offsetY: 2,
        elevation: 2,
      },
    },
    loader: {
      size: 13,
    },
  }
}

export const useSwitchTokens = createComponentTokensHook('switch', createSwitchTokens)
