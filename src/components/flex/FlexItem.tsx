import React from 'react'
import { Platform, View, type ViewStyle } from 'react-native'

import { FlexContext } from './FlexContext'
import type { FlexItemProps } from './types'
import { isNumber } from '../../utils/validate'

type FlexStyle = {
  flex?: number
  flexGrow?: number
  flexShrink?: number
  flexBasis?: number | 'auto'
}

const parseFlex = (value?: number | string): FlexStyle | undefined => {
  if (isNumber(value)) return { flex: value }
  if (!value) return undefined

  const str = value.trim()
  if (!str) return undefined
  if (str === 'auto') return { flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }
  if (str === 'none') return { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' }

  const num = Number(str)
  if (isNumber(num)) return { flex: num }

  const parts = str.split(/\s+/)
  if (parts.length >= 2) {
    const [grow, shrink] = parts.map(Number)
    if (isNumber(grow) && isNumber(shrink)) {
      const basisStr = parts.slice(2).join(' ')
      let flexBasis: FlexStyle['flexBasis']
      if (basisStr === 'auto') flexBasis = 'auto'
      else if (basisStr) {
        const pxMatch = basisStr.match(/^(-?\d+(?:\.\d+)?)px$/)
        const basisNum = pxMatch ? Number(pxMatch[1]) : Number(basisStr)
        if (isNumber(basisNum)) {
          flexBasis = basisNum
        }
      }
      return { flexGrow: grow, flexShrink: shrink, flexBasis }
    }
  }
  return undefined
}

export const FlexItem: React.FC<FlexItemProps> = ({ span, flex, style, children }) => {
  const { horizontalGap, verticalGap, columns } = React.useContext(FlexContext)
  const supportsGap = Platform.OS === 'web'

  if (isNumber(span) && span <= 0) return null

  const widthStyle: ViewStyle = {}
  if (isNumber(span)) {
    const safeColumns = Math.max(1, columns)
    const percent = Math.min(Math.max(span, 0), safeColumns) / safeColumns
    widthStyle.width = `${percent * 100}%`
    widthStyle.flexGrow = 0
    widthStyle.flexShrink = 0
  }

  return (
    <View
      style={[
        supportsGap ? null : { paddingHorizontal: horizontalGap / 2, paddingVertical: verticalGap / 2 },
        widthStyle,
        parseFlex(flex),
        style,
      ]}
    >
      {children}
    </View>
  )
}
