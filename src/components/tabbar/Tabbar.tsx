import React, { useCallback, useMemo, useState } from 'react'
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import { mergeTokensOverride } from '../../design-system'
import { useControllableValue } from '../../hooks'
import { createHairlineBorderTop } from '../../utils/hairline'
import { SafeAreaView } from '../safe-area-view'
import { TabbarContext } from './TabbarContext'
import { useTabbarTokens } from './tokens'
import type { TabbarItemProps, TabbarProps, TabbarValue } from './types'

const TabbarBaseImpl: React.FC<TabbarProps> = props => {
  const { children, value, defaultValue, fixed: fixedProp, border: borderProp, zIndex = 1, activeColor, inactiveColor, background: backgroundProp, placeholder: placeholderProp, safeAreaInsetBottom, iconSize: iconSizeProp, tokensOverride, style, contentStyle, onChange, ...rest } = props
  const tokens = useTabbarTokens(tokensOverride)
  const fixed = fixedProp ?? tokens.defaults.fixed
  const border = borderProp ?? tokens.defaults.border
  const background = backgroundProp ?? tokens.colors.background
  const placeholder = placeholderProp ?? tokens.defaults.placeholder
  const iconSize = iconSizeProp ?? tokens.icon.size
  const enableSafeAreaBottom = safeAreaInsetBottom ?? fixed
  const items = useMemo(() => React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<TabbarItemProps>[], [children])
  const firstItemName = items.length ? ((items[0].props.name ?? 0) as TabbarValue) : undefined
  const [activeValue, setActiveValue] = useControllableValue<TabbarValue>(props, { defaultValue: firstItemName, valuePropName: 'value', defaultValuePropName: 'defaultValue', trigger: 'onChange' })
  const itemNames = items.map((item, i) => (item.props.name ?? i) as TabbarValue)
  const currentName = activeValue === undefined || activeValue === null ? firstItemName : itemNames.some((name) => name === activeValue) ? activeValue : firstItemName
  const [barHeight, setBarHeight] = useState(tokens.layout.height)
  const enablePlaceholder = fixed && placeholder
  const handleLayout = useCallback((event: LayoutChangeEvent) => { if (!enablePlaceholder) return; const newHeight = event.nativeEvent.layout.height; setBarHeight((prev) => (Math.abs(prev - newHeight) < 0.5 ? prev : newHeight)) }, [enablePlaceholder])
  const onSelect = useCallback((name: TabbarValue, index: number) => setActiveValue(name, index), [setActiveValue])
  const contextValue = useMemo(() => ({ activeValue: currentName, activeColor: activeColor ?? tokens.colors.active, inactiveColor: inactiveColor ?? tokens.colors.inactive, fontSize: tokens.typography.fontSize, fontWeight: tokens.typography.fontWeight, onSelect }), [activeColor, currentName, inactiveColor, onSelect, tokens.colors.active, tokens.colors.inactive, tokens.typography.fontSize, tokens.typography.fontWeight])
  const clonedChildren = useMemo(() => items.map((item, i) => { const name = (item.props.name ?? i) as TabbarValue; return React.cloneElement(item, { key: item.key ?? name, name, index: i, iconSize, tokensOverride: mergeTokensOverride(tokensOverride, item.props.tokensOverride) }) }), [iconSize, items, tokensOverride])
  if (items.length === 0) return null
  const ContainerWrapper = enableSafeAreaBottom ? SafeAreaView : View
  const placeholderStyle = { height: barHeight }
  const containerStyle = [S.c, fixed && [S.f, { zIndex }], style]
  const barStyle = [S.b, { backgroundColor: background, paddingHorizontal: tokens.layout.paddingHorizontal, minHeight: tokens.layout.height }, border ? createHairlineBorderTop(tokens.colors.border) : null, contentStyle]
  const rowStyle = [S.r, { minHeight: tokens.layout.height }]
  return <>{enablePlaceholder && <View testID="rv-tabbar-placeholder" style={placeholderStyle} />}<View {...rest} style={containerStyle} onLayout={handleLayout}><ContainerWrapper style={barStyle}><TabbarContext.Provider value={contextValue}><View style={rowStyle} accessibilityRole="tablist">{clonedChildren}</View></TabbarContext.Provider></ContainerWrapper></View></>
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
