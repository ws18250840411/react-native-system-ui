import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { CircleTokens } from './types'

export const createCircleTokens = (foundations: Foundations): CircleTokens => ({
  defaults: {
    rate: 0,
    size: 100,
    strokeWidth: 6,
    fill: 'transparent',
    clockwise: true,
    startPosition: 'top',
    lineCap: 'round',
    animated: true,
    animationDuration: 300,
  },
  layout: {
    root: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      position: 'absolute',
      left: 0,
      top: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      textAlign: 'center',
    },
    webRing: {
      position: 'absolute',
      left: 0,
      top: 0,
    },
    webInner: {
      position: 'absolute',
    },
  },
  colors: {
    color: foundations.palette.primary[500],
    layerColor: foundations.palette.default[200],
    text: foundations.palette.default[800],
  },
  typography: {
    fontSize: foundations.fontSize.sm,
    lineHeight: Math.round(foundations.fontSize.sm * foundations.typography.lineHeightMultiplier),
  },
})

export const useCircleTokens = createComponentTokensHook('circle', createCircleTokens)

