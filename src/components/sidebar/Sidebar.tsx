import React, { useContext, useMemo } from 'react'
import { View } from 'react-native'
import { mergeTokensOverride } from '../../design-system/mergeTokensOverride'
import useControllableValue from '../../hooks/useControllableValue'
import { useDirection } from '../config-provider/useDirection'
import type { SidebarItemProps, SidebarProps } from './types'
import { useSidebarTokens } from './tokens'
import { createHairlineView } from '../../utils/hairline'
import { renderTextOrNode } from '../../utils/render'
import { isRenderable } from '../../utils/base'

export interface SidebarContextValue {
  activeIndex: number
  onSelect: (index: number) => void
}

export const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export const useSidebarContext = () => useContext(SidebarContext)

const SidebarBaseImpl: React.FC<SidebarProps> = props => {
  const { children, sideStyle, style, tokensOverride, ...rest } = props; const tokens = useSidebarTokens(tokensOverride); const dir = useDirection(); const sidebarItems = useMemo(() => { const items: { element: React.ReactElement<SidebarItemProps>; index: number }[] = []; React.Children.toArray(children).forEach((child, i) => { if (React.isValidElement<SidebarItemProps>(child)) items.push({ element: child, index: i }) }); return items }, [children]); const firstIdx = sidebarItems[0]?.index ?? 0; const [activeIndex, setActiveIndex] = useControllableValue<number>(props, { defaultValue: firstIdx, valuePropName: 'value', defaultValuePropName: 'defaultValue', trigger: 'onChange' }); const curIdx = useMemo(() => { for (const item of sidebarItems) { if (item.index === activeIndex) return activeIndex }; return firstIdx }, [activeIndex, firstIdx, sidebarItems]); const ctxVal = useMemo(() => ({ activeIndex: curIdx, onSelect: setActiveIndex }), [curIdx, setActiveIndex]); const cloned = useMemo(() => sidebarItems.map(item => React.cloneElement(item.element, { key: item.element.key ?? item.index, index: item.index, tokensOverride: mergeTokensOverride(tokensOverride, item.element.props.tokensOverride) })), [sidebarItems, tokensOverride]); const activeItem = sidebarItems.find(item => item.index === curIdx)?.element; const contentTxtStyle = useMemo(() => ({ fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.contentFontSize, fontWeight: tokens.typography.fontWeight }), [tokens.typography.fontFamily, tokens.typography.contentFontSize, tokens.typography.fontWeight]); const activeContent = !isRenderable(activeItem?.props?.children) ? null : renderTextOrNode(activeItem!.props.children, contentTxtStyle); return <View {...rest} style={[tokens.layout.container, { backgroundColor: tokens.colors.background }, style]}><View style={[tokens.layout.side, { width: tokens.sizing.width }, sideStyle]} accessibilityRole="tablist"><SidebarContext.Provider value={ctxVal}>{cloned}</SidebarContext.Provider><View style={createHairlineView({ position: dir === 'rtl' ? 'left' : 'right', color: tokens.colors.border, top: 0, bottom: 0 })} /></View><View style={[tokens.layout.content, activeItem?.props?.contentStyle]}>{activeContent}</View></View>
}

const SidebarBase = React.memo(SidebarBaseImpl)
export default SidebarBase
