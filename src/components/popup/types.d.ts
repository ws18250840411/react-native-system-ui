import type { Animated, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'
import type { DeepPartial } from '../../types'
import type { PopupTokens } from './tokens'

export type PopupPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center'
export type PopupCloseIconPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export interface PopupProps extends ViewProps {
  visible: boolean
  position?: PopupPlacement
  placement?: PopupPlacement
  title?: React.ReactNode
  description?: React.ReactNode
  tokensOverride?: DeepPartial<PopupTokens>
  overlay?: boolean
  overlayStyle?: StyleProp<ViewStyle>
  overlayAccessibilityLabel?: string
  closeOnOverlayPress?: boolean
  closeOnClickOverlay?: boolean
  overlayTestID?: string
  closeable?: boolean
  closeIcon?: React.ReactNode
  closeIconPosition?: PopupCloseIconPosition
  stopPropagation?: boolean
  round?: boolean
  safeArea?: boolean
  safeAreaInsetTop?: boolean
  safeAreaInsetBottom?: boolean
  lockScroll?: boolean
  destroyOnClose?: boolean
  duration?: number
  zIndex?: number
  closeOnBackPress?: boolean
  closeOnPopstate?: boolean
  children?: React.ReactNode
  beforeClose?: (reason: 'close-icon' | 'overlay' | 'close') => boolean | Promise<boolean>
  onClickOverlay?: () => void
  onClose?: () => void
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
  contentAnimationStyle?: Animated.WithAnimatedObject<ViewStyle>
}
