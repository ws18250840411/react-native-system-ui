import React, { useMemo } from 'react'
import { Platform, View } from 'react-native'
import { useFlexTokens } from './tokens'
import type { FlexProps } from './types'

export interface FlexContextValue {
  horizontalGap: number
  verticalGap: number
  columns: number
}
export const FlexContext = React.createContext<FlexContextValue>({ horizontalGap: 0, verticalGap: 0, columns: 24 })

const alignMap = { start: 'flex-start', center: 'center', end: 'flex-end', baseline: 'baseline', stretch: 'stretch' } as const
const justifyMap = { start: 'flex-start', end: 'flex-end', center: 'center', around: 'space-around', between: 'space-between' } as const

const FlexImpl: React.FC<FlexProps> = props => {
  const { tokensOverride, children, direction: dirP, wrap: wrapP, gutter: gutP, align: alignP, justify: justP, style, columns: colP } = props; const tokens = useFlexTokens(tokensOverride)
  const dir = dirP ?? tokens.defaults.direction; const wrap = wrapP ?? tokens.defaults.wrap; const gut = gutP ?? tokens.defaults.gutter; const align = alignP ?? tokens.defaults.align; const just = justP ?? tokens.defaults.justify; const cols = Math.max(1, colP ?? tokens.defaults.columns)
  const [hR, vR] = Array.isArray(gut) ? gut : [gut, 0]; const hG = Math.max(0, hR ?? 0); const vG = Math.max(0, vR ?? 0); const web = Platform.OS === 'web'
  const ctx = useMemo(() => ({ horizontalGap: hG, verticalGap: vG, columns: cols }), [hG, vG, cols])
  return <FlexContext.Provider value={ctx}><View style={[tokens.layout.container, { flexDirection: dir, flexWrap: wrap, alignItems: alignMap[align], justifyContent: justifyMap[just], marginHorizontal: !web && hG ? -hG / 2 : undefined, marginVertical: !web && vG ? -vG / 2 : undefined, columnGap: web ? hG : undefined, rowGap: web ? vG : undefined }, style]}>{children}</View></FlexContext.Provider>
}

export const Flex = React.memo(FlexImpl)
