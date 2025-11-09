import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { View } from 'react-native'

import { FlexContext } from './FlexContext'

export interface FlexItemProps {
  span?: number
  flex?: number | string
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

const parseFlex = (value?: number | string) => {
  if (value === undefined) {
    return undefined
  }
  if (typeof value === 'number') {
    return value
  }
  const parsed = Number(value)
  return Number.isNaN(parsed) ? undefined : parsed
}

export const FlexItem: React.FC<FlexItemProps> = ({
  span,
  flex,
  style,
  children,
}) => {
  const { horizontalGap, verticalGap, columns } = React.useContext(FlexContext)

  if (span === 0) {
    return null
  }

  const widthStyle: ViewStyle = {}

  if (typeof span === 'number') {
    const percent = Math.min(Math.max(span, 0), columns) / columns
    widthStyle.width = `${percent * 100}%`
    widthStyle.flexGrow = 0
    widthStyle.flexShrink = 0
  }

  const flexValue = parseFlex(flex)
  if (flexValue !== undefined) {
    widthStyle.flex = flexValue
    if (flexValue > 0 && span === undefined) {
      delete widthStyle.width
    }
  }

  const itemStyle: StyleProp<ViewStyle> = [
    {
      paddingHorizontal: horizontalGap / 2,
      paddingVertical: verticalGap / 2,
    },
    widthStyle,
    style,
  ]

  return <View style={itemStyle}>{children}</View>
}
