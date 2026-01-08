import React from 'react'
import { View } from 'react-native'

import { FlexContext } from './FlexContext'
import type { FlexItemProps } from './types'
import { isNumber } from '../../utils/validate'

type FlexStyle = {
  flex?: number
  flexGrow?: number
  flexShrink?: number
  flexBasis?: number | 'auto'
}

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

  if (isNumber(value)) {
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

  if (isNumber(span) && span <= 0) {
    return null
  }

  const widthStyle: any = {}
  if (isNumber(span)) {
    const resolvedColumns = columns > 0 ? columns : 1
    const percent = Math.min(Math.max(span, 0), resolvedColumns) / resolvedColumns
    widthStyle.width = `${percent * 100}%`
    widthStyle.flexGrow = 0
    widthStyle.flexShrink = 0
  }

  return (
    <View
      style={[
        { paddingHorizontal: horizontalGap / 2, paddingVertical: verticalGap / 2 },
        widthStyle,
        parseFlex(flex),
        style,
      ]}
    >
      {children}
    </View>
  )
}
