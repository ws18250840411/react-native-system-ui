import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useControllableValue } from '../../hooks'
import type { SidebarItemProps, SidebarProps } from './types'
import { SidebarContext } from './SidebarContext'
import { useSidebarTokens } from './tokens'

const SidebarBase: React.FC<SidebarProps> = props => {
  const tokens = useSidebarTokens()
  const { children, value, defaultValue, sideStyle, onChange, style, ...rest } = props

  const items = React.useMemo(() => {
    return React.Children.toArray(children)
      .map((child, index) => {
        if (!React.isValidElement<SidebarItemProps>(child)) return null
        return { element: child, index }
      })
      .filter(Boolean) as { element: React.ReactElement<SidebarItemProps>; index: number }[]
  }, [children])

  const firstIndex = items[0]?.index ?? 0
  const [activeIndex, setActiveIndex] = useControllableValue<number>(props, {
    defaultValue: firstIndex,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const currentIndex = React.useMemo(() => {
    const exists = items.some(item => item.index === activeIndex)
    return exists ? activeIndex : firstIndex
  }, [activeIndex, firstIndex, items])

  const contextValue = React.useMemo(
    () => ({
      activeIndex: currentIndex,
      onSelect: setActiveIndex,
    }),
    [currentIndex, setActiveIndex]
  )

  const clonedItems = React.useMemo(() => {
    return items.map(item =>
      React.cloneElement(item.element, {
        key: item.element.key ?? item.index,
        index: item.index,
      })
    )
  }, [items])

  const activeItem = React.useMemo(() => {
    return items.find(item => item.index === currentIndex)?.element
  }, [currentIndex, items])

  const activeContentStyle = activeItem?.props?.contentStyle
  const activeContentNode = React.useMemo(() => {
    const content = activeItem?.props?.children
    if (content === null || content === undefined || content === false) return null
    if (typeof content === 'string' || typeof content === 'number') {
      return <Text>{content}</Text>
    }
    return content
  }, [activeItem])

  return (
    <View
      {...rest}
      style={[styles.container, { backgroundColor: tokens.colors.background }, style]}
    >
      <View
        style={[
          styles.side,
          {
            width: tokens.layout.width,
            borderRightWidth: StyleSheet.hairlineWidth,
            borderRightColor: tokens.colors.border,
          },
          sideStyle,
        ]}
      >
        <SidebarContext.Provider value={contextValue}>
          {clonedItems}
        </SidebarContext.Provider>
      </View>
      <View style={[styles.content, { backgroundColor: tokens.colors.background }, activeContentStyle]}>
        {activeContentNode}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  side: {
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
})

SidebarBase.displayName = 'Sidebar'

export default SidebarBase
