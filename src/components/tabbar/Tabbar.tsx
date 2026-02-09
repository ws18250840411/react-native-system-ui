import React, { useCallback, useMemo, useState } from 'react'
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import { mergeTokensOverride } from '../../design-system'
import { useControllableValue } from '../../hooks'
import { createHairlineView } from '../../utils/hairline'
import { SafeAreaView } from '../safe-area-view'
import { TabbarContext } from './TabbarContext'
import { useTabbarTokens } from './tokens'
import type { TabbarItemProps, TabbarProps, TabbarValue } from './types'

const TabbarBaseImpl: React.FC<TabbarProps> = props => {
  const { children, value, defaultValue, fixed: fixedP, border: borderP, zIndex = 1, activeColor, inactiveColor, background: bgP, placeholder: placeP, safeAreaInsetBottom, iconSize: iconSzP, tokensOverride, style, contentStyle, onChange, ...rest } = props; const tokens = useTabbarTokens(tokensOverride); const fixed = fixedP ?? tokens.defaults.fixed; const border = borderP ?? tokens.defaults.border; const background = bgP ?? tokens.colors.background; const placeholder = placeP ?? tokens.defaults.placeholder; const iconSize = iconSzP ?? tokens.icon.size; const enableSafeBottom = safeAreaInsetBottom ?? fixed; const items = useMemo(() => React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<TabbarItemProps>[], [children]); const firstName = items.length ? ((items[0].props.name ?? 0) as TabbarValue) : undefined; const [activeValue, setActiveValue] = useControllableValue<TabbarValue>(props, { defaultValue: firstName, valuePropName: 'value', defaultValuePropName: 'defaultValue', trigger: 'onChange' }); const itemNames = items.map((item, i) => (item.props.name ?? i) as TabbarValue); const currentName = activeValue === undefined || activeValue === null ? firstName : itemNames.some(n => n === activeValue) ? activeValue : firstName; const [barHeight, setBarHeight] = useState(tokens.layout.height); const enablePlaceholder = fixed && placeholder; const handleLayout = useCallback((event: LayoutChangeEvent) => { if (!enablePlaceholder) return; const h = event.nativeEvent.layout.height; setBarHeight(prev => (Math.abs(prev - h) < 0.5 ? prev : h)) }, [enablePlaceholder]); const onSelect = useCallback((name: TabbarValue, index: number) => setActiveValue(name, index), [setActiveValue]); const ctxVal = useMemo(() => ({ activeValue: currentName, activeColor: activeColor ?? tokens.colors.active, inactiveColor: inactiveColor ?? tokens.colors.inactive, fontSize: tokens.typography.fontSize, fontWeight: tokens.typography.fontWeight, onSelect }), [activeColor, currentName, inactiveColor, onSelect, tokens.colors.active, tokens.colors.inactive, tokens.typography.fontSize, tokens.typography.fontWeight]); const cloned = useMemo(() => items.map((item, i) => { const name = (item.props.name ?? i) as TabbarValue; return React.cloneElement(item, { key: item.key ?? name, name, index: i, iconSize, tokensOverride: mergeTokensOverride(tokensOverride, item.props.tokensOverride) }) }), [iconSize, items, tokensOverride]); if (items.length === 0) return null; const ContainerWrap = enableSafeBottom ? SafeAreaView : View; const placeStyle = { height: barHeight }; const ctrStyle = [S.c, fixed && [S.f, { zIndex }], style]; const barStyle = [S.b, { backgroundColor: background, paddingHorizontal: tokens.layout.paddingHorizontal, minHeight: tokens.layout.height }, contentStyle]; const rowStyle = [S.r, { minHeight: tokens.layout.height }]; return <>{enablePlaceholder && <View testID="rv-tabbar-placeholder" style={placeStyle} />}<View {...rest} style={ctrStyle} onLayout={handleLayout}><ContainerWrap style={barStyle}><TabbarContext.Provider value={ctxVal}><View style={rowStyle} accessibilityRole="tablist">{cloned}</View></TabbarContext.Provider>{border && <View style={createHairlineView({ position: 'top', color: tokens.colors.border, left: 0, right: 0 })} />}</ContainerWrap></View></>
}

const S = StyleSheet.create({
  c: { width: '100%' },
  b: { width: '100%' },
  r: { flexDirection: 'row' },
  f: { position: 'absolute', left: 0, right: 0, bottom: 0 },
})

const TabbarBase = React.memo(TabbarBaseImpl)
TabbarBase.displayName = 'Tabbar'

export default TabbarBase
