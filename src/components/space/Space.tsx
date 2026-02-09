import React from 'react'
import { Pressable, View, type ViewStyle } from 'react-native'
import { useAriaPress } from '../../hooks'
import type { SpaceAlign, SpaceGap, SpaceJustify, SpaceProps, SpaceSizePreset } from './types'
import { resolveGapInput, useSpaceTokens } from './tokens'
import { parseNumberLike, isFiniteNumber, isFunction, isRenderable, renderTextOrNode } from '../../utils'

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
  const { children, gap, size: sizeProp, direction: directionProp, align: alignProp, justify: justifyProp = 'start', wrap: wrapProp, block: blockProp, fill: fillProp, divider, tokensOverride, style, onClick, ...rest } = props
  const tokens = useSpaceTokens(tokensOverride)
  const isHorizontal = (directionProp ?? tokens.defaults.direction) === 'horizontal'
  const wrap = wrapProp ?? tokens.defaults.wrap
  const gapInput = resolveGapInput(gap, sizeProp, tokens.defaults.gapPreset)
  const [resolvedHorizontalGap, resolvedVerticalGap] = parseGap(gapInput, tokens.sizing.presets)
  const horizontalGap = Math.max(0, resolvedHorizontalGap)
  const verticalGap = Math.max(0, resolvedVerticalGap)
  const shouldJustify = justifyProp === 'stretch'
  const justifyForStyle: Exclude<SpaceJustify, 'stretch'> = shouldJustify ? 'start' : justifyProp
  const shouldBlock = blockProp ?? !isHorizontal
  const resolvedAlign: SpaceAlign = alignProp ?? (isHorizontal ? 'center' : 'stretch')
  const shouldFillOrMaxAlign = isHorizontal && ((fillProp ?? false) || shouldJustify)
  const containerBoxStyle: ViewStyle = {
    flexDirection: isHorizontal ? 'row' : 'column',
    flexWrap: isHorizontal && wrap ? 'wrap' : 'nowrap',
    alignItems: alignMap[resolvedAlign],
    justifyContent: justifyMap[justifyForStyle],
    width: shouldBlock ? '100%' : undefined,
    columnGap: isHorizontal ? horizontalGap : undefined,
    rowGap: verticalGap,
  }
  const defaultTextStyle = { fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.fontSize }
  const childrenArray = React.Children.toArray(children).filter(isRenderable)
  const content: React.ReactNode[] = []
  for (let i = 0; i < childrenArray.length; i++) {
    const child = childrenArray[i]
    const key: React.Key = React.isValidElement(child) && child.key != null ? child.key : i
    const flexStyle: ViewStyle | undefined = shouldFillOrMaxAlign ? { flexGrow: 1, flexBasis: 0, minWidth: 0 } : !isHorizontal && (fillProp || shouldBlock) ? { width: '100%' } : undefined
    content.push(<View key={key} style={flexStyle}>{renderTextOrNode(child, defaultTextStyle)}</View>)
    if (divider && i < childrenArray.length - 1) content.push(<View key={`divider-${String(key)}`}>{renderTextOrNode(divider, defaultTextStyle)}</View>)
  }
  const isInteractive = isFunction(onClick)
  const { interactionProps, states } = useAriaPress({ disabled: !isInteractive, onPress: onClick, extraProps: isInteractive ? { accessibilityRole: 'button' } : undefined })
  if (isInteractive) return <Pressable style={[tokens.layout.container, containerBoxStyle, style, states.pressed && { opacity: 0.85 }]} {...interactionProps} {...rest}>{content}</Pressable>
  return <View style={[tokens.layout.container, containerBoxStyle, style]} {...rest}>{content}</View>
})
Space.displayName = 'Space'
