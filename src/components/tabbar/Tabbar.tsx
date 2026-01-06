import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { mergeTokensOverride } from '../../design-system'
import { useControllableValue } from '../../hooks'
import { createHairlineBorderTop } from '../../utils/hairline'
import { TabbarContext } from './TabbarContext'
import { useTabbarTokens } from './tokens'
import type { TabbarItemProps, TabbarProps, TabbarValue } from './types'

const TabbarBase: React.FC<TabbarProps> = props => {
  const tokens = useTabbarTokens(props.tokensOverride)
  const {
    children,
    value,
    defaultValue,
    fixed = tokens.defaults.fixed,
    border = tokens.defaults.border,
    zIndex = 1,
    activeColor,
    inactiveColor,
    background = tokens.colors.background,
    placeholder = tokens.defaults.placeholder,
    safeAreaInsetBottom,
    iconSize = tokens.icon.size,
    tokensOverride,
    style,
    contentStyle,
    onChange,
    ...rest
  } = props

  // 与 Vant 行为对齐：fixed 时默认开启 safe-area-inset-bottom
  const enableSafeAreaInsetBottom = safeAreaInsetBottom ?? fixed

  const items = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<TabbarItemProps>[]
  const firstName = items.length ? ((items[0].props.name ?? 0) as TabbarValue) : undefined
  const [activeValue, setActiveValue] = useControllableValue<TabbarValue>(props, {
    defaultValue: firstName,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const currentName =
    activeValue === undefined || activeValue === null
      ? firstName
      : items.some((item, index) => (item.props.name ?? index) === activeValue)
        ? activeValue
        : firstName

  const [barHeight, setBarHeight] = React.useState(tokens.layout.height)
  const contextValue = {
    activeValue: currentName,
    activeColor: activeColor ?? tokens.colors.active,
    inactiveColor: inactiveColor ?? tokens.colors.inactive,
    fontSize: tokens.typography.fontSize,
    fontWeight: tokens.typography.fontWeight,
    onSelect: (name: TabbarValue, index: number) => setActiveValue(name, index),
  }

  const clonedChildren = items.map((item, index) => {
    const name = (item.props.name ?? index) as TabbarValue
    return React.cloneElement(item, {
      key: item.key ?? name,
      name,
      index,
      iconSize,
      tokensOverride: mergeTokensOverride(tokensOverride, item.props.tokensOverride),
    })
  })

  if (items.length === 0) return null

  const bar = (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: background,
          paddingHorizontal: tokens.layout.paddingHorizontal,
          minHeight: tokens.layout.height,
        },
        border ? createHairlineBorderTop(tokens.colors.border) : null,
        contentStyle,
      ]}
    >
      <TabbarContext.Provider value={contextValue}>
        <View style={[styles.row, { minHeight: tokens.layout.height }]} accessibilityRole="tablist">
          {clonedChildren}
        </View>
      </TabbarContext.Provider>
    </View>
  )

  return (
    <>
      {fixed && placeholder ? <View testID="rv-tabbar-placeholder" style={{ height: barHeight }} /> : null}
      <View
        {...rest}
        style={[styles.container, fixed && [styles.fixed, { zIndex }], style]}
        onLayout={event => setBarHeight(event.nativeEvent.layout.height)}
      >
        {enableSafeAreaInsetBottom ? (
          <SafeAreaView style={{ backgroundColor: background }}>{bar}</SafeAreaView>
        ) : (
          bar
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bar: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  fixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
})

TabbarBase.displayName = 'Tabbar'

export default TabbarBase
