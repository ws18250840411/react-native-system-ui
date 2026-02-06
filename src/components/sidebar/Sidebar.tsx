import React, { useMemo } from 'react'
import { Text, View } from 'react-native'

import { mergeTokensOverride } from '../../design-system'
import { useControllableValue } from '../../hooks'
import type { SidebarItemProps, SidebarProps } from './types'
import { SidebarContext } from './SidebarContext'
import { useSidebarTokens } from './tokens'
import { isText } from '../../utils'

const SidebarBase: React.FC<SidebarProps> = props => {
  const { children, sideStyle, style, tokensOverride, ...rest } = props
  const tokens = useSidebarTokens(tokensOverride)

  const items = useMemo(() => {
    const out: { element: React.ReactElement<SidebarItemProps>; index: number }[] = []
    const list = React.Children.toArray(children)
    for (let i = 0; i < list.length; i++) {
      const child = list[i]
      if (!React.isValidElement<SidebarItemProps>(child)) continue
      out.push({ element: child, index: i })
    }
    return out
  }, [children])

  const firstIndex = items[0]?.index ?? 0
  const [activeIndex, setActiveIndex] = useControllableValue<number>(props, {
    defaultValue: firstIndex,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const currentIndex = useMemo(() => {
    let next = firstIndex
    for (let i = 0; i < items.length; i++) {
      if (items[i].index === activeIndex) {
        next = activeIndex
        break
      }
    }
    return next
  }, [activeIndex, firstIndex, items])

  const contextValue = useMemo(() => ({
    activeIndex: currentIndex,
    onSelect: setActiveIndex,
  }), [currentIndex, setActiveIndex])

  const clonedItems = useMemo(
    () => items.map(item => {
      const key = item.element.key ?? item.index
      const merged = mergeTokensOverride(tokensOverride, item.element.props.tokensOverride)
      return React.cloneElement(item.element, { key, index: item.index, tokensOverride: merged })
    }),
    [items, tokensOverride]
  )

  const activeItem = items.find(item => item.index === currentIndex)?.element

  const activeContentStyle = activeItem?.props?.contentStyle
  const activeContent = activeItem?.props?.children
  const activeContentNode = activeContent == null || activeContent === false
    ? null
    : isText(activeContent)
      ? <Text>{activeContent}</Text>
      : activeContent

  const containerStyle = [
    tokens.layout.container,
    { backgroundColor: tokens.colors.background },
    style,
  ]

  const sideContainerStyle = [
    tokens.layout.side,
    {
      width: tokens.sizing.width,
      borderRightColor: tokens.colors.border,
    },
    sideStyle,
  ]

  return (
    <View {...rest} style={containerStyle}>
      <View
        style={sideContainerStyle}
        accessibilityRole="tablist"
      >
        <SidebarContext.Provider value={contextValue}>
          {clonedItems}
        </SidebarContext.Provider>
      </View>
      <View style={[tokens.layout.content, activeContentStyle]}>
        {activeContentNode}
      </View>
    </View>
  )
}

SidebarBase.displayName = 'Sidebar'

export default SidebarBase
