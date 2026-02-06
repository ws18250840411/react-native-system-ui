import React, { useCallback, useMemo, useState } from 'react'
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native'

import { mergeTokensOverride } from '../../design-system'
import { useControllableValue } from '../../hooks'
import { createHairlineBorderTop } from '../../utils/hairline'
import { SafeAreaView } from '../safe-area-view'
import { TabbarContext } from './TabbarContext'
import { useTabbarTokens } from './tokens'
import type { TabbarItemProps, TabbarProps, TabbarValue } from './types'

const TabbarBase: React.FC<TabbarProps> = props => {
  const {
    children,
    value,
    defaultValue,
    fixed: fixedProp,
    border: borderProp,
    zIndex = 1,
    activeColor,
    inactiveColor,
    background: backgroundProp,
    placeholder: placeholderProp,
    safeAreaInsetBottom,
    iconSize: iconSizeProp,
    tokensOverride,
    style,
    contentStyle,
    onChange,
    ...rest
  } = props

  const tokens = useTabbarTokens(tokensOverride)

  const fixed = fixedProp ?? tokens.defaults.fixed
  const border = borderProp ?? tokens.defaults.border
  const background = backgroundProp ?? tokens.colors.background
  const placeholder = placeholderProp ?? tokens.defaults.placeholder
  const iconSize = iconSizeProp ?? tokens.icon.size

  const enableSafeAreaInsetBottom = safeAreaInsetBottom ?? fixed

  const items = useMemo(
    () => React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<TabbarItemProps>[],
    [children]
  )
  const firstName = items.length ? ((items[0].props.name ?? 0) as TabbarValue) : undefined
  const [activeValue, setActiveValue] = useControllableValue<TabbarValue>(props, {
    defaultValue: firstName,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const itemNames = items.map((item, index) => (item.props.name ?? index) as TabbarValue)
  const currentName = activeValue === undefined || activeValue === null
    ? firstName
    : itemNames.some((name) => name === activeValue)
      ? activeValue
      : firstName

  const [barHeight, setBarHeight] = useState(tokens.layout.height)
  const enablePlaceholder = fixed && placeholder
  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!enablePlaceholder) return
      const nextHeight = event.nativeEvent.layout.height
      setBarHeight((prev) => (Math.abs(prev - nextHeight) < 0.5 ? prev : nextHeight))
    },
    [enablePlaceholder],
  )
  const onSelect = useCallback(
    (name: TabbarValue, index: number) => setActiveValue(name, index),
    [setActiveValue],
  )
  const contextValue = useMemo(() => ({
    activeValue: currentName,
    activeColor: activeColor ?? tokens.colors.active,
    inactiveColor: inactiveColor ?? tokens.colors.inactive,
    fontSize: tokens.typography.fontSize,
    fontWeight: tokens.typography.fontWeight,
    onSelect,
  }), [
    activeColor,
    currentName,
    inactiveColor,
    onSelect,
    tokens.colors.active,
    tokens.colors.inactive,
    tokens.typography.fontSize,
    tokens.typography.fontWeight,
  ])

  const clonedChildren = useMemo(
    () =>
      items.map((item, index) => {
        const name = (item.props.name ?? index) as TabbarValue
        return React.cloneElement(item, {
          key: item.key ?? name,
          name,
          index,
          iconSize,
          tokensOverride: mergeTokensOverride(tokensOverride, item.props.tokensOverride),
        })
      }),
    [iconSize, items, tokensOverride]
  )

  if (items.length === 0) return null

  const ContentWrapper = enableSafeAreaInsetBottom ? SafeAreaView : View

  const placeholderStyle = { height: barHeight }
  const containerStyle = [styles.container, fixed && [styles.fixed, { zIndex }], style]
  const barStyle = [
    styles.bar,
    {
      backgroundColor: background,
      paddingHorizontal: tokens.layout.paddingHorizontal,
      minHeight: tokens.layout.height,
    },
    border ? createHairlineBorderTop(tokens.colors.border) : null,
    contentStyle,
  ]
  const rowStyle = [styles.row, { minHeight: tokens.layout.height }]

  return (
    <>
      {enablePlaceholder && <View testID="rv-tabbar-placeholder" style={placeholderStyle} />}
      <View
        {...rest}
        style={containerStyle}
        onLayout={handleLayout}
      >
        <ContentWrapper
          style={barStyle}
        >
          <TabbarContext.Provider value={contextValue}>
            <View style={rowStyle} accessibilityRole="tablist">
              {clonedChildren}
            </View>
          </TabbarContext.Provider>
        </ContentWrapper>
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
