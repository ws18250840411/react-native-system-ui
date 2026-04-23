import React from 'react'
import { Pressable, View, type ViewStyle } from 'react-native'
import { useAriaPress } from '../../hooks/aria/useAriaPress'
import type { SpaceAlign, SpaceGap, SpaceJustify, SpaceProps, SpaceSizePreset } from './types'
import { useSpaceTokens } from './tokens'
import { parseNumberLike } from '../../utils/number'
import { isFiniteNumber, isFunction, isRenderable } from '../../utils/base'
import { renderTextOrNode } from '../../utils/render'

const alignMap = { start: 'flex-start', end: 'flex-end', center: 'center', baseline: 'baseline', stretch: 'stretch' } as const
const justifyMap = { start: 'flex-start', end: 'flex-end', center: 'center', between: 'space-between', around: 'space-around', evenly: 'space-evenly' } as const

const parseSpaceSize = (v: number | string | undefined, presets: Record<SpaceSizePreset, number>) => {
  if (v === undefined) return presets.normal
  if (isFiniteNumber(v)) return v
  if (typeof v === 'string' && v in presets) return presets[v as SpaceSizePreset]
  return parseNumberLike(v, presets.normal) ?? presets.normal
}

const parseGap = (v: SpaceGap | undefined, presets: Record<SpaceSizePreset, number>): [number, number] => {
  if (Array.isArray(v)) return [parseSpaceSize(v[0], presets), parseSpaceSize(v[1], presets)]
  const p = parseSpaceSize(v, presets)
  return [p, p]
}

export const Space = React.memo((props: SpaceProps) => {
  const { children, gap, size: sizeP, direction: dirP, align: alignP, justify: justP = 'start', wrap: wrapP, block: blockP, fill: fillP, divider, tokensOverride, style, onClick, ...rest } = props; const tokens = useSpaceTokens(tokensOverride)
  const hor = (dirP ?? tokens.defaults.direction) === 'horizontal'; const wrap = wrapP ?? tokens.defaults.wrap; const [hG, vG] = parseGap(gap ?? sizeP ?? tokens.defaults.gapPreset, tokens.sizing.presets); const hGap = Math.max(0, hG); const vGap = Math.max(0, vG)
  const justStretch = justP === 'stretch'; const justStyle: Exclude<SpaceJustify, 'stretch'> = justStretch ? 'start' : justP; const block = blockP ?? !hor; const align: SpaceAlign = alignP ?? (hor ? 'center' : 'stretch'); const fillOrJust = hor && ((fillP ?? false) || justStretch)
  const boxStyle: ViewStyle = { flexDirection: hor ? 'row' : 'column', flexWrap: hor && wrap ? 'wrap' : 'nowrap', alignItems: alignMap[align], justifyContent: justifyMap[justStyle], width: block ? '100%' : undefined, columnGap: hor ? hGap : undefined, rowGap: vGap }; const txtStyle = { fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.fontSize }; const arr = React.Children.toArray(children).filter(isRenderable); const content: React.ReactNode[] = []
  for (let i = 0; i < arr.length; i++) { const child = arr[i]; const key: React.Key = React.isValidElement(child) && child.key != null ? child.key : i; const flexS: ViewStyle | undefined = fillOrJust ? { flexGrow: 1, flexBasis: 0, minWidth: 0 } : !hor && (fillP || block) ? { width: '100%' } : undefined; content.push(<View key={key} style={flexS}>{renderTextOrNode(child, txtStyle)}</View>); if (divider && i < arr.length - 1) content.push(<View key={`divider-${String(key)}`}>{renderTextOrNode(divider, txtStyle)}</View>) }
  const inter = isFunction(onClick); const { interactionProps, states } = useAriaPress({ disabled: !inter, onPress: onClick, extraProps: inter ? { accessibilityRole: 'button' } : undefined }); if (inter) return <Pressable style={[tokens.layout.container, boxStyle, style, states.pressed && { opacity: 0.85 }]} {...interactionProps} {...rest}>{content}</Pressable>; return <View style={[tokens.layout.container, boxStyle, style]} {...rest}>{content}</View>
})
Space.displayName = 'Space'
