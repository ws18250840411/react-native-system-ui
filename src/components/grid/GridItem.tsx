import React from 'react'
import { Pressable, View, type DimensionValue, type ViewStyle } from 'react-native'
import { Text } from '../../design-system/Text'
import Badge from '../badge'
import { createHairlineView } from '../../utils/hairline'
import { isRenderable, isText } from '../../utils/base'
import { renderTextOrNode } from '../../utils/render'
import type { GridDirection, GridItemProps, GridTokens } from './types'

type GridItemRuntimeProps = GridItemProps & {
  gridItemIndex?: number
  gridTokens?: GridTokens
  gridColumnNum?: number
  gridGutter?: number
  gridBorder?: boolean
  gridCenter?: boolean
  gridSquare?: boolean
  gridDirection?: GridDirection
  gridReverse?: boolean
  gridClickable?: boolean
  gridIconSize?: number
  gridIconColor?: string
  gridCount?: number
  gridContainerWidth?: number
}

const GridItemImpl: React.FC<GridItemRuntimeProps> = p => {
  const { gridItemIndex = 0, gridTokens, gridColumnNum, gridGutter = 0, gridBorder = false, gridCenter = false, gridSquare = false, gridDirection = 'vertical', gridReverse = false, gridClickable = false, gridIconSize, gridIconColor, gridCount = 0, gridContainerWidth = 0, text, icon, iconColor: icp, badge, dot, contentStyle, textStyle, children, style, onPress, ...rest } = p; if (!gridTokens || !gridColumnNum || gridColumnNum <= 0) throw new Error('GridItem must be used within Grid'); const t = gridTokens; const cn = gridColumnNum; const ilc = (gridItemIndex + 1) % cn === 0; const ri = Math.floor(gridItemIndex / cn); const lri = Math.floor((gridCount - 1) / cn); const cws = [t.layout.itemContentBase, gridDirection === 'horizontal' ? t.layout.itemHorizontal : t.layout.itemVertical, gridCenter && t.layout.itemCenter, gridReverse ? (gridDirection === 'horizontal' ? t.layout.itemReverseRow : t.layout.itemReverseColumn) : null, gridSquare ? t.layout.itemContentSquare : null, { paddingHorizontal: t.spacing.paddingHorizontal, paddingVertical: t.spacing.paddingVertical, backgroundColor: t.colors.background }, contentStyle]; const ht = isRenderable(text); const ric = icp ?? gridIconColor ?? t.colors.text
  let ie: React.ReactNode = null; if (!children && (icon || badge || dot)) { const { style: bws, ...br } = badge ?? {}; const mk = gridDirection === 'vertical' ? (gridReverse ? 'marginTop' : 'marginBottom') : (gridReverse ? 'marginLeft' : 'marginRight'); const iws = [t.layout.iconWrapper, ht && { [mk]: t.spacing.iconGap }]; const ino = typeof icon === 'function' ? icon(gridIconSize ?? t.defaults.iconSize, ric) : icon; const wrappedIcon = <View style={iws}>{ino}</View>; ie = (badge || dot) ? <Badge dot={dot} {...br} style={gridCenter ? [bws, { alignSelf: 'center' }] : bws}>{wrappedIcon}</Badge> : wrappedIcon }
  const te = !children && ht ? (isText(text) ? <Text style={[t.layout.text, { color: t.colors.text, fontSize: t.typography.fontSize, lineHeight: t.typography.lineHeight, fontFamily: t.typography.fontFamily, fontWeight: t.typography.fontWeight }, textStyle]} numberOfLines={t.defaults.textNumberOfLines}>{text}</Text> : text) : null
  const icn = children ? (isText(children) ? renderTextOrNode(children, [t.layout.text, { color: t.colors.text, fontSize: t.typography.fontSize, lineHeight: t.typography.lineHeight, fontFamily: t.typography.fontFamily, fontWeight: t.typography.fontWeight }, textStyle]) : children) : <>{ie}{te}</>
  const rb = gridBorder && !gridGutter && !ilc ? <View style={[t.layout.itemBorderRight, createHairlineView({ position: 'right', color: t.colors.border, top: 0, bottom: 0, right: 0 })]} /> : null; const bb = gridBorder && !gridGutter && ri < lri ? <View style={[t.layout.itemBorderBottom, createHairlineView({ position: 'bottom', color: t.colors.border, left: 0, right: 0, bottom: 0 })]} /> : null; const cnt = <View style={cws}>{icn}{rb}{bb}</View>; const bis: ViewStyle = gridGutter > 0 && gridContainerWidth > 0 ? { width: (gridContainerWidth - (cn - 1) * gridGutter) / cn, flexGrow: 0, flexShrink: 0 } : { flexBasis: `${100 / cn}%` as DimensionValue, flexGrow: 0, flexShrink: 1, minWidth: 0, minHeight: 0 }; const ii = gridClickable || !!onPress
  if (ii) return <Pressable accessibilityRole="button" style={(ps) => [bis, typeof style === 'function' ? style(ps) : style, { opacity: ps.pressed ? t.defaults.pressedOpacity : 1 }]} android_ripple={{ color: t.colors.active }} onPress={onPress} {...rest}>{cnt}</Pressable>
  return <View style={[bis, typeof style === 'function' ? style({ pressed: false }) : style]} {...rest}>{cnt}</View>
}
export const GridItem = React.memo(GridItemImpl)
GridItem.displayName = 'GridItem'
