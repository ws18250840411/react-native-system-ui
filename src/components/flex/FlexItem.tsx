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

type FlexStyle = Pick<ViewStyle, 'flex' | 'flexGrow' | 'flexShrink' | 'flexBasis'>

const parseFlexBasis = (value: string): FlexStyle['flexBasis'] => {
  if (value === 'auto') {
    return 'auto'
  }

  const pxMatch = value.match(/^(-?\d+(?:\.\d+)?)px$/)
  if (pxMatch) {
    return Number(pxMatch[1])
  }

  const basisNumber = Number(value)
  return Number.isNaN(basisNumber) ? undefined : basisNumber
}

const parseFlex = (value?: number | string): FlexStyle | undefined => {
  if (value === undefined) {
    return undefined
  }

  if (typeof value === 'number') {
    return { flex: value }
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }

  if (trimmed === 'auto') {
    return { flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }
  }

  if (trimmed === 'none') {
    return { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' }
  }

  const numeric = Number(trimmed)
  if (!Number.isNaN(numeric)) {
    return { flex: numeric }
  }

  const parts = trimmed.split(/\s+/)
  if (parts.length >= 2) {
    const grow = Number(parts[0])
    const shrink = Number(parts[1])

    if (!Number.isNaN(grow) && !Number.isNaN(shrink)) {
      const style: FlexStyle = { flexGrow: grow, flexShrink: shrink }
      const basisInput = parts.slice(2).join(' ')
      if (basisInput) {
        style.flexBasis = parseFlexBasis(basisInput)
      }
      return style
    }
  }

  return undefined
}

export const FlexItem: React.FC<FlexItemProps> = ({
  span,
  flex,
  style,
  children,
}) => {
  const { horizontalGap, verticalGap, columns } = React.useContext(FlexContext)

  if (typeof span === 'number' && span <= 0) {
    return null
  }

  const widthStyle: ViewStyle = {}

  if (typeof span === 'number') {
    const resolvedColumns = columns > 0 ? columns : 1
    const percent =
      Math.min(Math.max(span, 0), resolvedColumns) / resolvedColumns
    widthStyle.width = `${percent * 100}%`
    widthStyle.flexGrow = 0
    widthStyle.flexShrink = 0
  }

  const flexStyle = parseFlex(flex)

  const itemStyle: StyleProp<ViewStyle> = [
    {
      paddingHorizontal: horizontalGap / 2,
      paddingVertical: verticalGap / 2,
    },
    widthStyle,
    flexStyle,
    style,
  ]

  return <View style={itemStyle}>{children}</View>
}
