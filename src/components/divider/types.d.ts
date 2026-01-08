import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type DividerType = 'horizontal' | 'vertical'
export type DividerContentPosition = 'left' | 'center' | 'right'

export interface DividerTokens {
  defaults: {
    type: DividerType
    dashed: boolean
    hairline: boolean
    contentPosition: DividerContentPosition
  }
  colors: {
    line: string
    text: string
  }
  typography: {
    fontSize: number
    lineHeight: number
    fontFamily: string
    fontWeight: TextStyle['fontWeight']
  }
  spacing: {
    vertical: number
    horizontal: number
    contentPadding: number
  }
  line: {
    thickness: number
    sideMinFlex: number
  }
  vertical: {
    minHeight: number
  }
}

export interface DividerProps extends ViewProps {
  children?: React.ReactNode
  type?: DividerType
  dashed?: boolean
  hairline?: boolean
  contentPosition?: DividerContentPosition
  textStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  lineColor?: string
  tokensOverride?: DeepPartial<DividerTokens>
}
