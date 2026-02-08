import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import { createHairlineView } from '../../utils'
import { Cell as CellBase } from './Cell'
import { CellGroupContext } from './CellContext'
import type { CellGroupProps } from './types'
import { useCellTokens } from './tokens'

const isCellElement = (child: React.ReactNode) => {
  if (!React.isValidElement(child)) return false
  if (child.type === CellBase) return true
  return (child.type as unknown as { displayName?: string }).displayName === 'Cell'
}

export const CellGroup = React.memo<CellGroupProps>(({ children, title, border, inset, card, style, bodyStyle, tokensOverride }) => {
  const tokens = useCellTokens(tokensOverride)
  const resolvedBorder = border ?? tokens.defaults.groupBorder
  const showInset = (inset ?? tokens.defaults.groupInset) || (card ?? tokens.defaults.groupCard)
  const resolvedCard = card ?? tokens.defaults.groupCard
  const showOuterBorder = resolvedBorder && !showInset
  const childArray = useMemo(() => React.Children.toArray(children), [children])
  const lastCellIndex = useMemo(() => { for (let i = childArray.length - 1; i >= 0; i--) { if (isCellElement(childArray[i])) return i } return -1 }, [childArray])
  const containerStyle = useMemo(() => [{ marginBottom: resolvedCard ? 0 : tokens.sizing.groupMarginBottom }, style], [resolvedCard, style, tokens.sizing.groupMarginBottom])
  const insetStyle = useMemo(() => ({ overflow: 'hidden' as const, borderRadius: tokens.radii.groupInset, marginHorizontal: tokens.sizing.groupInsetMarginHorizontal, backgroundColor: tokens.colors.background }), [tokens.colors.background, tokens.radii.groupInset, tokens.sizing.groupInsetMarginHorizontal])
  const bodyContainerStyle = [{ backgroundColor: tokens.colors.groupBodyBackground }, showInset ? insetStyle : null, resolvedCard ? tokens.layout.groupCardShadow : null, bodyStyle]
  const renderedTitle = useMemo(() => title ? <Text style={{ color: tokens.colors.groupTitle, fontSize: tokens.typography.groupTitleSize, paddingHorizontal: tokens.sizing.groupTitlePaddingHorizontal, paddingVertical: tokens.sizing.groupTitlePaddingVertical }}>{title}</Text> : null, [title, tokens.colors.groupTitle, tokens.sizing.groupTitlePaddingHorizontal, tokens.sizing.groupTitlePaddingVertical, tokens.typography.groupTitleSize])
  const renderedChildren = useMemo(() => childArray.map((child, index) => {
    const key = React.isValidElement(child) && child.key != null ? child.key : index
    return <CellGroupContext.Provider key={key} value={{ border: resolvedBorder, inset: showInset, isLast: isCellElement(child) ? index === lastCellIndex : false }}>{child}</CellGroupContext.Provider>
  }), [childArray, lastCellIndex, resolvedBorder, showInset])
  return (
    <View style={containerStyle}>
      {renderedTitle}
      <View style={bodyContainerStyle}>
        {renderedChildren}
        {showOuterBorder ? <>{(['top', 'bottom'] as const).map(pos => <View key={pos} style={createHairlineView({ position: pos, color: tokens.colors.border, left: 0, right: 0, enabled: tokens.borders.width > 0, width: tokens.borders.width })} />)}</> : null}
      </View>
    </View>
  )
})
