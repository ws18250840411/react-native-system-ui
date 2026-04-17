import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import { createHairlineView } from '../../utils/hairline'
import { Cell as CellBase } from './Cell'
import type { CellGroupProps } from './types'
import { useCellTokens } from './tokens'

export interface CellGroupContextValue {
  border: boolean
  inset: boolean
  isLast: boolean
}

export const CellGroupContext = React.createContext<CellGroupContextValue>({
  border: true,
  inset: false,
  isLast: false,
})

const isCellElement = (child: React.ReactNode) => {
  if (!React.isValidElement(child)) return false
  if (child.type === CellBase) return true
  return (child.type as unknown as { displayName?: string }).displayName === 'Cell'
}

export const CellGroup = React.memo<CellGroupProps>(({ children, title, border, inset, card, style, bodyStyle, tokensOverride }) => {
  const tokens = useCellTokens(tokensOverride); const rBorder = border ?? tokens.defaults.groupBorder; const showInset = (inset ?? tokens.defaults.groupInset) || (card ?? tokens.defaults.groupCard); const rCard = card ?? tokens.defaults.groupCard; const showOuter = rBorder && !showInset; const chArr = useMemo(() => React.Children.toArray(children), [children]); const lastIdx = useMemo(() => { for (let i = chArr.length - 1; i >= 0; i--) { if (isCellElement(chArr[i])) return i }; return -1 }, [chArr]); const ctrStyle = useMemo(() => [{ marginBottom: rCard ? 0 : tokens.sizing.groupMarginBottom }, style], [rCard, style, tokens.sizing.groupMarginBottom]); const insStyle = useMemo(() => ({ overflow: 'hidden' as const, borderRadius: tokens.radii.groupInset, marginHorizontal: tokens.sizing.groupInsetMarginHorizontal, backgroundColor: tokens.colors.background }), [tokens.colors.background, tokens.radii.groupInset, tokens.sizing.groupInsetMarginHorizontal]); const bodyStyleArr = [{ backgroundColor: tokens.colors.groupBodyBackground }, showInset ? insStyle : null, rCard ? tokens.layout.groupCardShadow : null, bodyStyle]; const rTitle = useMemo(() => title ? <Text style={{ color: tokens.colors.groupTitle, fontSize: tokens.typography.groupTitleSize, paddingHorizontal: tokens.sizing.groupTitlePaddingHorizontal, paddingVertical: tokens.sizing.groupTitlePaddingVertical }}>{title}</Text> : null, [title, tokens.colors.groupTitle, tokens.sizing.groupTitlePaddingHorizontal, tokens.sizing.groupTitlePaddingVertical, tokens.typography.groupTitleSize]); const rCh = useMemo(() => chArr.map((ch, i) => { const key = React.isValidElement(ch) && ch.key != null ? ch.key : i; return <CellGroupContext.Provider key={key} value={{ border: rBorder, inset: showInset, isLast: isCellElement(ch) ? i === lastIdx : false }}>{ch}</CellGroupContext.Provider> }), [chArr, lastIdx, rBorder, showInset]); return <View style={ctrStyle}>{rTitle}<View style={bodyStyleArr}>{rCh}{showOuter ? <>{(['top', 'bottom'] as const).map(pos => <View key={pos} style={createHairlineView({ position: pos, color: tokens.colors.border, left: 0, right: 0, enabled: tokens.borders.width > 0, width: tokens.borders.width })} />)}</> : null}</View></View>
})
