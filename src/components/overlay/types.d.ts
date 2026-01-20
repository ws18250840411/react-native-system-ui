import type * as React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export interface OverlayTokens {
    defaults: {
        visible: boolean
        duration: number
        lockScroll: boolean
        closeOnBackPress: boolean
        testID: string
        accessibilityLabel: string
    }
    layout: {
        portal: ViewStyle
        overlay: ViewStyle
    }
    colors: {
        backdrop: string
    }
}

export interface OverlayProps {
    visible?: boolean
    color?: string
    duration?: number | string
    lockScroll?: boolean
    closeOnBackPress?: boolean
    onPress?: () => void
    onClick?: () => void
    style?: StyleProp<ViewStyle>
    testID?: string
    accessibilityLabel?: string
    zIndex?: number | string
    tokensOverride?: DeepPartial<OverlayTokens>
    children?: React.ReactNode
}
