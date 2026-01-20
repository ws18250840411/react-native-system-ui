import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { OverlayTokens } from './types'

export const createOverlayTokens = (_foundations: Foundations): OverlayTokens => ({
  defaults: {
    visible: false,
    duration: 300,
    lockScroll: true,
    closeOnBackPress: false,
    testID: 'rv-overlay',
    accessibilityLabel: '关闭遮罩',
  },
  layout: {
    portal: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  colors: {
    backdrop: 'rgba(0, 0, 0, 0.7)',
  },
})

export const useOverlayTokens = createComponentTokensHook('overlay', createOverlayTokens)
