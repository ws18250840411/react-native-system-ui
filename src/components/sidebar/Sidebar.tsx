import React from 'react'
import { Text, View } from 'react-native'

import { mergeTokensOverride } from '../../design-system'
import { useControllableValue } from '../../hooks'
import type { SidebarItemProps, SidebarProps } from './types'
import { SidebarContext } from './SidebarContext'
import { useSidebarTokens } from './tokens'
import { isText } from '../../utils/validate'

const SidebarBase: React.FC<SidebarProps> = props => {
  const { children, value, defaultValue, sideStyle, onChange, style, tokensOverride, ...rest } = props
  const tokens = useSidebarTokens(tokensOverride)

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

  const currentIndex = items.some(item => item.index === activeIndex) ? activeIndex : firstIndex

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
        tokensOverride: mergeTokensOverride(tokensOverride, item.element.props.tokensOverride),
      })
    )
  }, [items, tokensOverride])

  const activeItem = React.useMemo(() => {
    return items.find(item => item.index === currentIndex)?.element
  }, [currentIndex, items])

  const activeContentStyle = activeItem?.props?.contentStyle
  const activeContent = activeItem?.props?.children
  const activeContentNode =
    activeContent == null || activeContent === false
      ? null
      : isText(activeContent)
        ? <Text>{activeContent}</Text>
        : activeContent

  return (
    <View
      {...rest}
      style={[
        tokens.layout.container,
        { backgroundColor: tokens.colors.background },
        style,
      ]}
    >
      <View
        style={[
          tokens.layout.side,
          {
            width: tokens.sizing.width,
            borderRightColor: tokens.colors.border,
          },
          sideStyle,
        ]}
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
