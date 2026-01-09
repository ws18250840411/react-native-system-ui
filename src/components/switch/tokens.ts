import { createComponentTokensHook } from '../../design-system'
import { type Foundations } from '../../design-system/tokens'
import { StyleSheet } from 'react-native'
import type { SwitchTokens } from './types'

const createSwitchTokens = (foundations: Foundations): SwitchTokens => {
  const { palette, opacity } = foundations
  const borderWidth = Math.max(1, StyleSheet.hairlineWidth)
  return {
    defaults: {
      size: 30,
      disabled: false,
      loading: false,
      activeValue: true,
      inactiveValue: false,
    },
    layout: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      track: {
        position: 'relative',
      },
      handleOuter: {
        position: 'absolute',
      },
      handleInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    colors: {
      activeTrack: palette.primary[500],
      inactiveTrack: '#ffffff',
      handle: '#ffffff',
      border: palette.default[300],
    },
    borders: {
      width: borderWidth,
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
