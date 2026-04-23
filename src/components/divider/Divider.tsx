import React from 'react'
import { View } from 'react-native'
import { createHairlineView } from '../../utils/hairline'
import { isRenderable } from '../../utils/base'
import { renderTextOrNode } from '../../utils/render'
import { useDividerTokens } from './tokens'
import type { DividerProps } from './types'

const DividerImpl: React.FC<DividerProps> = props => {
  const { tokensOverride, children, type: typeP, orientation: oriP, dashed: dashP, hairline: hlP, contentPosition: posP, textStyle, contentStyle, lineColor, style, ...rest } = props; const tokens = useDividerTokens(tokensOverride)
  const dash = dashP ?? tokens.defaults.dashed; const hl = hlP ?? tokens.defaults.hairline; const pos = posP ?? tokens.defaults.contentPosition; const ori = typeP ?? oriP ?? 'horizontal'; const clr = lineColor ?? tokens.colors.line; const bStyle = dash ? 'dashed' : 'solid'; const hasCnt = ori === 'horizontal' && isRenderable(children)
  const cnt = hasCnt ? renderTextOrNode(children, [tokens.layout.text, { color: tokens.colors.text, fontSize: tokens.typography.fontSize, lineHeight: tokens.typography.lineHeight, fontFamily: tokens.typography.fontFamily, fontWeight: tokens.typography.fontWeight }, textStyle]) : null
  const leftG = pos === 'left' ? tokens.sizing.sideMinFlex : 1; const rightG = pos === 'right' ? tokens.sizing.sideMinFlex : 1
  const line = (g: number) => hl ? <View style={[tokens.layout.hairlineWrapper, { flexGrow: g }]}><View style={[createHairlineView({ position: 'bottom', color: clr, left: 0, right: 0, bottom: 0 }), { borderStyle: bStyle }]} /></View> : <View style={{ flexGrow: g, flexShrink: 1, height: tokens.borders.thickness, borderBottomWidth: tokens.borders.thickness, borderBottomColor: clr, borderStyle: bStyle }} />
  if (ori === 'vertical') { const vLine = hl ? <View style={[tokens.layout.hairlineWrapper, { width: tokens.borders.thickness, height: '100%' }]}><View style={[createHairlineView({ position: 'left', color: clr, top: 0, bottom: 0, left: 0 }), { borderStyle: bStyle }]} /></View> : <View style={{ width: tokens.borders.thickness, height: '100%', borderLeftWidth: tokens.borders.thickness, borderLeftColor: clr, borderStyle: bStyle }} />; return <View accessibilityRole={'separator' as any} style={[tokens.layout.container, { marginVertical: tokens.spacing.vertical, flexDirection: 'column' }, style]} {...rest}>{vLine}</View> }
  return <View accessibilityRole={'separator' as any} style={[tokens.layout.container, { marginVertical: tokens.spacing.vertical }, style]} {...rest}>{line(hasCnt ? leftG : 1)}{hasCnt && <><View style={[tokens.layout.contentWrapper, { paddingHorizontal: tokens.spacing.contentPadding }, contentStyle]}>{cnt}</View>{line(rightG)}</>}</View>
}

export const Divider = React.memo(DividerImpl)
Divider.displayName = 'Divider'
