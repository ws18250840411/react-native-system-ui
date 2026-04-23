import type React from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type CircleStartPosition = 'top' | 'right' | 'bottom' | 'left'
export type CircleLineCap = 'round' | 'butt' | 'square'

export interface CircleTokens {
  defaults: {
    rate: number
    size: number
    strokeWidth: number
    fill: string
    clockwise: boolean
    startPosition: CircleStartPosition
    lineCap: CircleLineCap
    animated: boolean
    animationDuration: number
  }
  layout: {
    root: ViewStyle
    content: ViewStyle
    text: TextStyle
    webRing: ViewStyle
    webInner: ViewStyle
  }
  colors: {
    color: string
    layerColor: string
    text: string
  }
  typography: {
    fontSize: number
    lineHeight: number
  }
}

export interface CircleProps {
  
  rate?: number | string
  
  size?: number | string
  
  strokeWidth?: number | string
  
  color?: string
  
  layerColor?: string
  
  fill?: string
  
  clockwise?: boolean
  
  startPosition?: CircleStartPosition
  
  lineCap?: CircleLineCap
  
  animated?: boolean
  
  animationDuration?: number
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  tokensOverride?: DeepPartial<CircleTokens>
}

