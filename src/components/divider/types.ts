import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export type DividerType = 'horizontal' | 'vertical'
export type DividerContentPosition = 'left' | 'center' | 'right'

export interface DividerProps extends ViewProps {
  children?: React.ReactNode
  type?: DividerType
  dashed?: boolean
  hairline?: boolean
  contentPosition?: DividerContentPosition
  textStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<ViewStyle>
  lineColor?: string
}
