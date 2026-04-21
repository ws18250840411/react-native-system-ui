import type * as React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

export interface OverlayTokens { layer?: { zIndex?: number } }

export interface OverlayProps {
    isOpen?: boolean
    visible?: boolean
    children?: React.ReactNode
    useRNModalOnAndroid?: boolean
    useRNModal?: boolean
    onRequestClose?: () => void
    isKeyboardDismissable?: boolean
    animationPreset?: 'fade' | 'slide' | 'none'
    style?: StyleProp<ViewStyle>
}
