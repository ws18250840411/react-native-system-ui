import React, { useMemo } from 'react'
import { Text, View } from 'react-native'

import { mergeTokensOverride } from '../../design-system'
import { useControllableValue } from '../../hooks'
import type { SidebarItemProps, SidebarProps } from './types'
import { SidebarContext } from './SidebarContext'
import { useSidebarTokens } from './tokens'
import { createHairlineView, renderTextOrNode } from '../../utils'
import { isRenderable } from '../../utils/validate'

const SidebarBaseImpl: React.FC<SidebarProps> = props => {
  const { children, sideStyle, style, tokensOverride, ...rest } = props
  const tokens = useSidebarTokens(tokensOverride)

  const sidebarItems = useMemo(() => {
    const validItems: { element: React.ReactElement<SidebarItemProps>; index: number }[] = []
    const childrenArray = React.Children.toArray(children)
    for (let index = 0; index < childrenArray.length; index++) {
      const child = childrenArray[index]
      if (!React.isValidElement<SidebarItemProps>(child)) continue
      validItems.push({ element: child, index })
    }
    return validItems
  }, [children])

  const firstIndex = sidebarItems[0]?.index ?? 0
  const [activeIndex, setActiveIndex] = useControllableValue<number>(props, {
    defaultValue: firstIndex,
    valuePropName: 'value',
    defaultValuePropName: 'defaultValue',
    trigger: 'onChange',
  })

  const currentIndex = useMemo(() => {
    let resolvedIndex = firstIndex
    for (let index = 0; index < sidebarItems.length; index++) {
      if (sidebarItems[index].index === activeIndex) {
        resolvedIndex = activeIndex
        break
      }
    }
    return resolvedIndex
  }, [activeIndex, firstIndex, sidebarItems])

  const contextValue = useMemo(() => ({
    activeIndex: currentIndex,
    onSelect: setActiveIndex,
  }), [currentIndex, setActiveIndex])

  const clonedItems = useMemo(
    () => sidebarItems.map(item => {
      const key = item.element.key ?? item.index
      const merged = mergeTokensOverride(tokensOverride, item.element.props.tokensOverride)
      return React.cloneElement(item.element, { key, index: item.index, tokensOverride: merged })
    }),
    [sidebarItems, tokensOverride]
  )

  const activeItem = sidebarItems.find(item => item.index === currentIndex)?.element

  const activeContentStyle = activeItem?.props?.contentStyle
  const activeContent = activeItem?.props?.children
  const activeContentNode = !isRenderable(activeContent) ? null : renderTextOrNode(activeContent)

  const containerStyle = [
    tokens.layout.container,
    { backgroundColor: tokens.colors.background },
    style,
  ]

  const sideContainerStyle = [
    tokens.layout.side,
    {
      width: tokens.sizing.width,
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
        <View style={createHairlineView({ position: 'right', color: tokens.colors.border, top: 0, bottom: 0 })} />
      </View>
      <View style={[tokens.layout.content, activeContentStyle]}>
        {activeContentNode}
      </View>
    </View>
  )
}

const SidebarBase = React.memo(SidebarBaseImpl)
SidebarBase.displayName = 'Sidebar'

export default SidebarBase
