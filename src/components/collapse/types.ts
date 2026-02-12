import type { TextStyle, ViewStyle } from 'react-native'

export interface CollapseTokens {
  defaults: {
    accordion: boolean
    border: boolean
    iconPosition: 'left' | 'right'
    panelBorder: boolean
    panelIsLink: boolean
    panelSize: 'normal' | 'large'
    animationDuration: number
  }
  layout: {
    container: ViewStyle
    panel: ViewStyle
    hairline: ViewStyle
    headerWrapper: ViewStyle
    bodyWrapper: ViewStyle
    headerIconRow: ViewStyle
    bodyContent: ViewStyle
  }
  colors: {
    border: string
    title: string
    description: string
    background: string
    active: string
    arrow: string
    disabled: string
  }
  typography: {
    titleSize: number
    descriptionSize: number
    fontFamily: string
    titleWeight: NonNullable<TextStyle['fontWeight']>
  }
  panel: {
    borderRadius: number
  }
  spacing: {
    paddingVertical: number
    paddingHorizontal: number
    descriptionTop: number
    iconGap: number
  }
}
