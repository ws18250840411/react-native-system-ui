import React, { useContext, useMemo } from 'react'
import { Pressable, View, type DimensionValue, type ViewStyle } from 'react-native'
import { Text } from '../../design-system/Text'
import Badge from '../badge'
import { createHairlineView } from '../../utils/hairline'
import { isFunction, isRenderable, isText } from '../../utils/base'
import { renderTextOrNode } from '../../utils/render'
import type { GridItemProps } from './types'
import { GridContext } from './Grid'

const GridItemImpl: React.FC<GridItemProps> = p => {
  const ctx = useContext(GridContext); if (!ctx) throw new Error('GridItem must be used within Grid'); const { gridItemIndex = 0, text, icon, iconColor: icp, badge, dot, contentStyle, textStyle, children, style, onPress, ...rest } = p as GridItemProps & { gridItemIndex?: number }; const { tokens: t, columnNum: cn, gutter: g, border: b, center: c, square: sq, direction: d, reverse: r, clickable: cl, iconSize: is, iconColor: ic, count, containerWidth: cw } = ctx; const ilc = (gridItemIndex + 1) % cn === 0; const ri = Math.floor(gridItemIndex / cn); const lri = Math.floor((count - 1) / cn); const cws = [t.layout.itemContentBase, d === 'horizontal' ? t.layout.itemHorizontal : t.layout.itemVertical, c && t.layout.itemCenter, r ? (d === 'horizontal' ? t.layout.itemReverseRow : t.layout.itemReverseColumn) : null, sq ? t.layout.itemContentSquare : null, { paddingHorizontal: t.spacing.paddingHorizontal, paddingVertical: t.spacing.paddingVertical, backgroundColor: t.colors.background }, contentStyle]; const ht = isRenderable(text); const ric = icp ?? ic ?? t.colors.text
  const icn = useMemo(() => {
    if (children) return isText(children) ? renderTextOrNode(children, [t.layout.text, { color: t.colors.text, fontSize: t.typography.fontSize, lineHeight: t.typography.lineHeight, fontFamily: t.typography.fontFamily, fontWeight: t.typography.fontWeight }, textStyle]) : children; let ie: React.ReactNode = null; if (icon || badge || dot) { const { style: bws, ...br } = badge ?? {}; const mk = d === 'vertical' ? (r ? 'marginTop' : 'marginBottom') : (r ? 'marginLeft' : 'marginRight'); const iws = [t.layout.iconWrapper, ht && { [mk]: t.spacing.iconGap }]; const ino = isFunction(icon) ? icon(is, ric) : icon; const cnt = <View style={iws}>{ino}</View>; ie = (badge || dot) ? <Badge dot={dot} {...br} style={c ? [bws, { alignSelf: 'center' }] : bws}>{cnt}</Badge> : cnt }; const te = ht && (isText(text) ? <Text style={[t.layout.text, { color: t.colors.text, fontSize: t.typography.fontSize, lineHeight: t.typography.lineHeight, fontFamily: t.typography.fontFamily, fontWeight: t.typography.fontWeight }, textStyle]} numberOfLines={t.defaults.textNumberOfLines}>{text}</Text> : text); return <>{ie}{te}</>
  }, [badge, c, children, d, dot, ht, icon, is, ric, r, text, textStyle, t.colors.text, t.defaults.textNumberOfLines, t.layout.iconWrapper, t.layout.text, t.spacing.iconGap, t.typography.fontFamily, t.typography.fontSize, t.typography.fontWeight, t.typography.lineHeight])
  const rb = b && !g && !ilc ? <View style={[t.layout.itemBorderRight, createHairlineView({ position: 'right', color: t.colors.border, top: 0, bottom: 0, right: 0 })]} /> : null; const bb = b && !g && ri < lri ? <View style={[t.layout.itemBorderBottom, createHairlineView({ position: 'bottom', color: t.colors.border, left: 0, right: 0, bottom: 0 })]} /> : null; const cnt = <View style={cws}>{icn}{rb}{bb}</View>; const bis: ViewStyle = g > 0 && cw > 0 ? { width: (cw - (cn - 1) * g) / cn, flexGrow: 0, flexShrink: 0 } : { flexBasis: `${100 / cn}%` as DimensionValue, flexGrow: 0, flexShrink: 1, minWidth: 0, minHeight: 0 }; const ii = cl || isFunction(onPress)
  if (ii) return <Pressable accessibilityRole="button" style={(ps) => [bis, typeof style === 'function' ? style(ps) : style, { opacity: ps.pressed ? t.defaults.pressedOpacity : 1 }]} android_ripple={{ color: t.colors.active }} onPress={onPress} {...rest}>{cnt}</Pressable>
  return <View style={[bis, typeof style === 'function' ? style({ pressed: false }) : style]} {...rest}>{cnt}</View>
}
export const GridItem = React.memo(GridItemImpl)
GridItem.displayName = 'GridItem'
