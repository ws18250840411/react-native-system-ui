import React, { useContext } from 'react'
import { View, type ViewStyle } from 'react-native'
import { FlexContext } from './FlexContext'
import type { FlexItemProps } from './types'
import { isNumber } from '../../utils/base'

type FlexStyle = { flex?: number; flexGrow?: number; flexShrink?: number; flexBasis?: number | 'auto' }
const parseFlex = (v?: number | string): FlexStyle | undefined => {
  if (isNumber(v)) return { flex: v }; if (!v) return undefined; const str = v.trim(); if (!str) return undefined; if (str === 'auto') return { flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }; if (str === 'none') return { flexGrow: 0, flexShrink: 0, flexBasis: 'auto' }; const num = Number(str); if (isNumber(num)) return { flex: num }; const parts = str.split(/\s+/); if (parts.length >= 2) { const [grow, shrink] = parts.map(Number); if (isNumber(grow) && isNumber(shrink)) { const basisStr = parts.slice(2).join(' '); let flexBasis: FlexStyle['flexBasis']; if (basisStr === 'auto') flexBasis = 'auto'; else if (basisStr) { const pxMatch = basisStr.match(/^(-?\d+(?:\.\d+)?)px$/); const basisNum = pxMatch ? Number(pxMatch[1]) : Number(basisStr); if (isNumber(basisNum)) flexBasis = basisNum }; return { flexGrow: grow, flexShrink: shrink, flexBasis } } }; return undefined
}

const FlexItemImpl: React.FC<FlexItemProps> = ({ span, flex, style: s, children: c }) => {
  const { columns: cols } = useContext(FlexContext); if (isNumber(span) && span <= 0) return null; const ws: ViewStyle = {}; if (isNumber(span)) { const sc = Math.max(1, cols); const p = Math.min(Math.max(span, 0), sc) / sc; ws.flexBasis = `${p * 100}%`; ws.flexGrow = 0; ws.flexShrink = 1 }; return <View style={[ws, parseFlex(flex), s]}>{c}</View>
}
export const FlexItem = React.memo(FlexItemImpl)
FlexItem.displayName = 'FlexItem'
