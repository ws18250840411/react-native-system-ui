import React, { useMemo } from 'react'
import { View } from 'react-native'
import { mergeTokensOverride } from '../../design-system'
import { useControllableValue } from '../../hooks'
import { useDirection } from '../config-provider/useDirection'
import type { SidebarItemProps, SidebarProps } from './types'
import { SidebarContext } from './SidebarContext'
import { useSidebarTokens } from './tokens'
import { createHairlineView, renderTextOrNode } from '../../utils'
import { isRenderable } from '../../utils/validate'

const SidebarBaseImpl: React.FC<SidebarProps> = props => {
  const { children, sideStyle, style, tokensOverride, ...rest } = props
  const tokens = useSidebarTokens(tokensOverride)
  const dir = useDirection()
  const sidebarItems = useMemo(() => { const items: { element: React.ReactElement<SidebarItemProps>; index: number }[] = []; React.Children.toArray(children).forEach((child, index) => { if (React.isValidElement<SidebarItemProps>(child)) items.push({ element: child, index }) }); return items }, [children])
  const firstIndex = sidebarItems[0]?.index ?? 0
  const [activeIndex, setActiveIndex] = useControllableValue<number>(props, { defaultValue: firstIndex, valuePropName: 'value', defaultValuePropName: 'defaultValue', trigger: 'onChange' })
  const currentIndex = useMemo(() => { for (const item of sidebarItems) { if (item.index === activeIndex) return activeIndex } return firstIndex }, [activeIndex, firstIndex, sidebarItems])
  const contextValue = useMemo(() => ({ activeIndex: currentIndex, onSelect: setActiveIndex }), [currentIndex, setActiveIndex])
  const clonedItems = useMemo(() => sidebarItems.map(item => React.cloneElement(item.element, { key: item.element.key ?? item.index, index: item.index, tokensOverride: mergeTokensOverride(tokensOverride, item.element.props.tokensOverride) })), [sidebarItems, tokensOverride])
  const activeItem = sidebarItems.find(item => item.index === currentIndex)?.element
  const contentTextStyle = useMemo(() => ({ fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.contentFontSize, fontWeight: tokens.typography.fontWeight }), [tokens.typography.fontFamily, tokens.typography.contentFontSize, tokens.typography.fontWeight])
  const activeContentNode = !isRenderable(activeItem?.props?.children) ? null : renderTextOrNode(activeItem!.props.children, contentTextStyle)
  return (
    <View {...rest} style={[tokens.layout.container, { backgroundColor: tokens.colors.background }, style]}>
      <View style={[tokens.layout.side, { width: tokens.sizing.width }, sideStyle]} accessibilityRole="tablist">
        <SidebarContext.Provider value={contextValue}>{clonedItems}</SidebarContext.Provider>
        <View style={createHairlineView({ position: dir === 'rtl' ? 'left' : 'right', color: tokens.colors.border, top: 0, bottom: 0 })} />
      </View>
      <View style={[tokens.layout.content, activeItem?.props?.contentStyle]}>{activeContentNode}</View>
    </View>
  )
}

const SidebarBase = React.memo(SidebarBaseImpl)
export default SidebarBase
