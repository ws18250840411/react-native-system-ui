import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useAriaPress } from '../../hooks/aria/useAriaPress'
import { isRenderable, isText } from '../../utils/base'
import Badge from '../badge'
import { useSidebarTokens } from './tokens'
import type { SidebarItemProps } from './types'

type SidebarItemRuntimeProps = SidebarItemProps & {
  active?: boolean
  onSelect?: (index: number) => void
}

const SidebarItemImpl: React.FC<SidebarItemRuntimeProps> = props => {
  const { title, badge, disabled: disabledProp, dot, onClick, textStyle, badgeStyle, contentStyle: _contentStyle, style, index = 0, children: _children, tokensOverride, active = false, onSelect, ...rest } = props; const tokens = useSidebarTokens(tokensOverride); const disabled = disabledProp ?? tokens.defaults.disabled; const titleClr = disabled ? tokens.colors.disabled : active ? tokens.colors.titleActive : tokens.colors.title; const press = useAriaPress({ disabled, onPress: () => { onClick?.(index); onSelect?.(index) }, extraProps: { accessibilityRole: 'tab', accessibilityState: { selected: active, disabled }, testID: `rv-sidebar-item-${index}` } }); const indStyle = [tokens.layout.indicator, { width: tokens.sizing.indicatorWidth, borderRadius: tokens.sizing.indicatorWidth, backgroundColor: tokens.colors.indicator }]; const titleNode = isRenderable(title) ? isText(title) ? <Text style={[tokens.layout.title, { color: titleClr, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.fontSize, fontWeight: tokens.typography.fontWeight }, textStyle]}>{title}</Text> : title : null; const badgeNode = isRenderable(badge) ? <View style={[tokens.layout.badge, badgeStyle]}>{isText(badge) ? <Badge content={badge} /> : badge}</View> : null; const dotNode = dot ? <View style={[tokens.layout.dot, { backgroundColor: tokens.colors.indicator }]} /> : null; return <Pressable {...rest} {...press.interactionProps} style={[tokens.layout.item, { height: tokens.sizing.itemHeight }, style]}><View style={tokens.layout.indicatorWrapper}>{active && <View style={indStyle} />}</View><View style={tokens.layout.itemContent}><View style={tokens.layout.titleRow}>{titleNode}{badgeNode}{dotNode}</View></View></Pressable>
}

const SidebarItem = React.memo(SidebarItemImpl)
export default SidebarItem
