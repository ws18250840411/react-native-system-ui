import type * as React from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'
import type { PopupProps } from '../popup/Popup'

export type ActionSheetCloseAction = 'action' | 'cancel' | 'close' | 'close-icon' | 'overlay'

export interface ActionSheetAction {
  key?: React.Key
  name?: React.ReactNode
  subname?: React.ReactNode
  color?: string
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: (action: ActionSheetAction) => void
  callback?: (action: ActionSheetAction) => void
}

export interface ActionSheetTokens {
  defaults: {
    closeOnClickAction: boolean
    closeable: boolean
    round: boolean
    safeAreaInsetBottom: boolean
    overlay: boolean
    lockScroll: boolean
  }
  layout: {
    popup: ViewStyle
    panel: ViewStyle
    header: ViewStyle
    titleContainer: ViewStyle
    title: TextStyle
    titleNode: ViewStyle
    closeButton: ViewStyle
    descriptionContainer: ViewStyle
    description: TextStyle
    descriptionNode: ViewStyle
    actions: ViewStyle
    item: ViewStyle
    itemWithIcon: ViewStyle
    itemTextWrapper: ViewStyle
    itemText: TextStyle
    subname: TextStyle
    subnameNode: ViewStyle
    icon: ViewStyle
    cancelGap: ViewStyle
    cancel: ViewStyle
    cancelText: TextStyle
  }
  colors: {
    background: string
    title: string
    description: string
    item: string
    subitem: string
    cancel: string
    disabled: string
    border: string
    itemBackground: string
    itemPressedBackground: string
    cancelBackground: string
    cancelGapBackground: string
  }
  typography: {
    title: number
    item: number
    description: number
  }
  spacing: {
    horizontal: number
    vertical: number
    cancelGap: number
  }
}

export interface ActionSheetProps extends Omit<PopupProps, 'children'> {
  title?: React.ReactNode
  description?: React.ReactNode
  cancelText?: React.ReactNode
  actions?: ActionSheetAction[]
  closeOnClickAction?: boolean
  closeOnSelect?: boolean
  children?: React.ReactNode
  onSelect?: (action: ActionSheetAction, index: number) => void
  onCancel?: () => void
  beforeClose?: (action: ActionSheetCloseAction) => boolean | Promise<boolean>
  tokensOverride?: DeepPartial<ActionSheetTokens>
}
