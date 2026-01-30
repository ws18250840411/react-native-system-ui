import type { NotifyTokens, NotifyType, NotifyPosition } from './types'

export const notifyDefaults = {
  type: 'primary' as NotifyType,
  position: 'top' as NotifyPosition,
  duration: 3000,
  closeOnClick: false,
  animationDuration: 220,
  safeAreaInsetTop: true,
  safeAreaInsetBottom: true,
} satisfies NotifyTokens['defaults']
