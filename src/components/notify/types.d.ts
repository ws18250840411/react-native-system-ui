import type * as React from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type NotifyType = 'primary' | 'success' | 'danger' | 'warning'
export type NotifyPosition = 'top' | 'bottom'

export interface NotifyTokens {
  defaults: {
    type: NotifyType
    position: NotifyPosition
    duration: number
    closeOnClick: boolean
    animationDuration: number
    safeAreaInsetTop: boolean
    safeAreaInsetBottom: boolean
  }
  layout: {
    portal: ViewStyle
    container: ViewStyle
    safeArea: ViewStyle
    content: ViewStyle
    text: TextStyle
  }
  colors: {
    variants: Record<NotifyType, { background: string; text: string }>
  }
  typography: {
    fontFamily: string
    fontSize: number
    lineHeight: number
  }
  sizing: {
    minHeight: number
  }
  spacing: {
    paddingVertical: number
    paddingHorizontal: number
    none: number
  }
}

export interface NotifyProps {
  visible: boolean
  message?: React.ReactNode
  type?: NotifyType
  duration?: number
  position?: NotifyPosition
  offset?: number
  color?: string
  background?: string
  safeAreaInsetTop?: boolean
  safeAreaInsetBottom?: boolean
  zIndex?: number
  closeOnClick?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  tokensOverride?: DeepPartial<NotifyTokens>
  onClick?: () => void
  onClose?: () => void
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
}

