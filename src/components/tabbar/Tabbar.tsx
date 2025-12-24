import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { useControllableValue } from '../../hooks'
import { createHairlineBorderTop } from '../../utils/hairline'
import { TabbarContext } from './TabbarContext'
import { useTabbarTokens } from './tokens'
import type { TabbarItemProps, TabbarProps, TabbarValue } from './types'

const TabbarBase: React.FC<TabbarProps> = props => {
  const tokens = useTabbarTokens()
  const {
    children,
    value,
    defaultValue,
    fixed = tokens.defaults.fixed,
    border = tokens.defaults.border,
    zIndex = 99,
    activeColor,
    inactiveColor,
    background = tokens.colors.background,
    placeholder = tokens.defaults.placeholder,
    safeAreaInsetBottom = fixed ? tokens.defaults.safeAreaInsetBottom : false,
    style,
    contentStyle,
    onChange,
    ...rest
  } = props

  const items = React.useMemo(() => {
    return React.Children.toArray(children)
      .map((child, index) => {
        if (!React.isValidElement<TabbarItemProps>(child)) return null
        const itemProps = child.props
        const name = (itemProps.name ?? index) as TabbarValue
        return {
          element: child,
          index,
          name,
        }
      })
      .filter(Boolean) as { element: React.ReactElement<TabbarItemProps>; index: number; name: TabbarValue }[]
  }, [children])

  const firstName = items[0]?.name
  const [activeValue, setActiveValue] = useControllableValue<TabbarValue>(props, {
    defaultValue: firstName,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const currentName = React.useMemo(() => {
    if (activeValue === undefined || activeValue === null) {
      return firstName
    }
    const exists = items.some(item => item.name === activeValue)
    return exists ? activeValue : firstName
  }, [activeValue, firstName, items])

  const [barHeight, setBarHeight] = React.useState(tokens.layout.height)

  const handleSelect = React.useCallback(
    (name: TabbarValue, index: number) => {
      setActiveValue(name, index)
    },
    [setActiveValue]
  )

  const contextValue = React.useMemo(
    () => ({
      activeValue: currentName,
      activeColor: activeColor ?? tokens.colors.active,
      inactiveColor: inactiveColor ?? tokens.colors.inactive,
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      onSelect: handleSelect,
    }),
    [
      activeColor,
      currentName,
      handleSelect,
      inactiveColor,
      tokens.colors.active,
      tokens.colors.inactive,
      tokens.typography.fontSize,
      tokens.typography.fontWeight,
    ],
  )

  const clonedChildren = React.useMemo(() => {
    return items.map(item =>
      React.cloneElement(item.element, {
        key: item.element.key ?? item.name,
        name: item.name,
        index: item.index,
      })
    )
  }, [items])

  const navContent = (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: background,
          paddingHorizontal: tokens.layout.paddingHorizontal,
        },
        border ? createHairlineBorderTop(tokens.colors.border) : null,
        contentStyle,
      ]}
    >
      <TabbarContext.Provider value={contextValue}>
        <View style={styles.row} accessibilityRole="tablist">
          {clonedChildren}
        </View>
      </TabbarContext.Provider>
    </View>
  )

  const safeAreaWrapped = safeAreaInsetBottom ? (
    <SafeAreaView style={{ backgroundColor: background }}>{navContent}</SafeAreaView>
  ) : (
    navContent
  )

  if (items.length === 0) {
    return null
  }

  return (
    <>
      {fixed && placeholder ? <View testID="rv-tabbar-placeholder" style={{ height: barHeight }} /> : null}
      <View
        {...rest}
        style={[styles.container, fixed && [styles.fixed, { zIndex }], style]}
        onLayout={event => setBarHeight(event.nativeEvent.layout.height)}
      >
        {safeAreaWrapped}
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
