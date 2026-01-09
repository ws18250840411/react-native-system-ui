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
  /**
   * 进度百分比（0-100）
   */
  rate?: number | string
  /**
   * 圆环尺寸，默认 100
   */
  size?: number | string
  /**
   * 圆环宽度，默认 6
   */
  strokeWidth?: number | string
  /**
   * 进度条颜色
   */
  color?: string
  /**
   * 轨道颜色
   */
  layerColor?: string
  /**
   * 圆环内部填充色
   */
  fill?: string
  /**
   * 是否顺时针
   * @default true
   */
  clockwise?: boolean
  /**
   * 起始位置
   * @default 'top'
   */
  startPosition?: CircleStartPosition
  /**
   * 线帽
   * @default 'round'
   */
  lineCap?: CircleLineCap
  /**
   * 是否开启过渡动画（Native 端生效）
   * @default true
   */
  animated?: boolean
  /**
   * 动画时长（ms）
   * @default 300
   */
  animationDuration?: number
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  children?: React.ReactNode
  tokensOverride?: DeepPartial<CircleTokens>
}

