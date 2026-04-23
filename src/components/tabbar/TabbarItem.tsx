import React from 'react'
import { Pressable, StyleSheet, Text, View, type TextStyle } from 'react-native'
import { useAriaPress } from '../../hooks/aria/useAriaPress'
import { isPlainObject, isRenderable, isText } from '../../utils/base'
import Badge from '../badge'
import { useTabbarTokens } from './tokens'
import type { TabbarItemProps, TabbarValue } from './types'
import type { BadgeProps } from '../badge/types'

type TabbarItemRuntimeProps = TabbarItemProps & {
  active?: boolean
  activeColor?: string
  inactiveColor?: string
  labelFontSize?: number
  labelFontWeight?: TextStyle['fontWeight']
  onSelect?: (name: TabbarValue, index: number) => void
}

const TabbarItemImpl: React.FC<TabbarItemRuntimeProps> = p => {
  const { name, icon, badge, dot = false, onClick, textStyle, iconStyle, children, disabled = false, style, index, testID, iconSize, tokensOverride, active = false, activeColor, inactiveColor, labelFontSize, labelFontWeight, onSelect, ...rest } = p; const t = useTabbarTokens(tokensOverride); const in_ = (name ?? index ?? 0) as TabbarValue; const c = active ? (activeColor ?? t.colors.active) : (inactiveColor ?? t.colors.inactive); const ris = iconSize ?? t.icon.size; const adaptIcon = (node: React.ReactNode) => { if (isText(node)) return <Text style={{ color: c, fontSize: ris }}>{node}</Text>; if (!React.isValidElement(node)) return node; const el = node as React.ReactElement<Record<string, unknown>>; const nextProps: Record<string, unknown> = {}; const rawProps = el.props ?? {}; if (rawProps.size == null) nextProps.size = ris; if (rawProps.fill == null) nextProps.fill = c; if (rawProps.color == null) nextProps.color = c; if (rawProps.style != null) nextProps.style = [rawProps.style, { color: c }]; return React.cloneElement(el, nextProps) }; const renderedIcon = !icon ? null : adaptIcon(typeof icon === 'function' ? icon(active) : icon); const label = typeof children === 'function' ? children(active) : children; const ap = useAriaPress({ disabled, onPress: () => { if (!disabled) { onClick?.(); onSelect?.(in_, index ?? 0) } }, extraProps: { accessibilityRole: 'tab', accessibilityState: { selected: active, disabled }, testID: testID ?? `rv-tabbar-item-${in_}` } }); let badgeNode: React.ReactNode = null; if (dot || isRenderable(badge)) { if (isRenderable(badge)) { if (isText(badge)) badgeNode = <Badge content={badge} />; else if (isPlainObject(badge)) { const bp = badge as BadgeProps; badgeNode = <Badge {...bp} dot={dot || bp.dot} /> } else badgeNode = badge as React.ReactNode } else badgeNode = <Badge dot /> } const itemStyle = [S.i, { height: t.layout.height, paddingVertical: t.layout.paddingVertical, opacity: disabled ? 0.5 : 1 }, style]; const labelStyle = [S.l, { color: c, fontSize: labelFontSize ?? t.typography.fontSize, fontWeight: labelFontWeight ?? t.typography.fontWeight, lineHeight: labelFontSize ?? t.typography.fontSize }, textStyle]; return <Pressable {...rest} {...ap.interactionProps} style={itemStyle}><View style={[S.iw, iconStyle]}>{renderedIcon}{badgeNode && <View style={S.b}>{badgeNode}</View>}</View>{isRenderable(label) ? isText(label) ? <Text style={labelStyle}>{label}</Text> : label : null}</Pressable>
}

const S = StyleSheet.create({
  i: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  iw: { alignItems: 'center', justifyContent: 'center' },
  b: { position: 'absolute', top: -4, right: -12 },
  l: { includeFontPadding: false },
})

const TabbarItem = React.memo(TabbarItemImpl)
TabbarItem.displayName = 'Tabbar.Item'

export default TabbarItem
