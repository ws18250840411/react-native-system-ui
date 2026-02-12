import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

import type { DeepPartial } from '../../types'

export type DividerContentPosition = 'left' | 'center' | 'right'

export interface DividerTokens {
  defaults: {
    dashed: boolean
    hairline: boolean
    contentPosition: DividerContentPosition
  }
  layout: {
    container: ViewStyle
    contentWrapper: ViewStyle
    text: TextStyle
    hairlineWrapper: ViewStyle
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
  sizing: {
    sideMinFlex: number
  }
  borders: {
    thickness: number
  }
  spacing: {
    vertical: number
    contentPadding: number
  }
}

export interface DividerProps extends ViewProps {
  children?: React.ReactNode
  
  type?: 'horizontal' | 'vertical'
  orientation?: 'horizontal' | 'vertical'
  dashed?: boolean
  hairline?: boolean
  contentPosition?: DividerContentPosition
  textStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  lineColor?: string
  tokensOverride?: DeepPartial<DividerTokens>
}
