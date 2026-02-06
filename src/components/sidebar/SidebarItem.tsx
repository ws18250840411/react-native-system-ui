import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import { isRenderable, isText } from '../../utils'
import Badge from '../badge'
import { useSidebarContext } from './SidebarContext'
import { useSidebarTokens } from './tokens'
import type { SidebarItemProps } from './types'

const SidebarItemImpl: React.FC<SidebarItemProps> = props => {
  const {
    title,
    badge,
    disabled: disabledProp,
    dot,
    onClick,
    textStyle,
    badgeStyle,
    contentStyle: _contentStyle,
    style,
    index = 0,
    children: _children,
    tokensOverride,
    ...rest
  } = props
  const tokens = useSidebarTokens(tokensOverride)
  const context = useSidebarContext()

  if (!context) {
    return null
  }

  const disabled = disabledProp ?? tokens.defaults.disabled
  const isActive = context.activeIndex === index
  const titleColor = disabled
    ? tokens.colors.disabled
    : isActive
      ? tokens.colors.titleActive
      : tokens.colors.title

  const press = useAriaPress({
    disabled,
    onPress: () => {
      onClick?.(index)
      context.onSelect(index)
    },
    extraProps: {
      accessibilityRole: 'tab',
      accessibilityState: { selected: isActive, disabled },
      testID: `rv-sidebar-item-${index}`,
    },
  })

  const indicatorStyle = [
    tokens.layout.indicator,
    {
      width: tokens.sizing.indicatorWidth,
      borderRadius: tokens.sizing.indicatorWidth,
      backgroundColor: tokens.colors.indicator,
    },
  ]

  const titleNode = isRenderable(title)
    ? isText(title)
      ? (
        <Text
          style={[
            tokens.layout.title,
            {
              color: titleColor,
              fontSize: tokens.typography.fontSize,
              fontWeight: tokens.typography.fontWeight,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )
      : title
    : null

  const badgeNode = isRenderable(badge)
    ? (
      <View style={[tokens.layout.badge, badgeStyle]}>
        {isText(badge) ? (
          <Badge content={badge} />
        ) : (
          badge
        )}
      </View>
    )
    : null

  const dotNode = dot ? (
    <View style={[tokens.layout.dot, { backgroundColor: tokens.colors.indicator }]} />
  ) : null

  return (
    <Pressable
      {...rest}
      {...press.interactionProps}
      style={[tokens.layout.item, { height: tokens.sizing.itemHeight }, style]}
    >
      <View style={tokens.layout.indicatorWrapper}>
        {isActive && <View style={indicatorStyle} />}
      </View>
      <View style={tokens.layout.itemContent}>
        <View style={tokens.layout.titleRow}>
          {titleNode}
          {badgeNode}
          {dotNode}
        </View>
      </View>
    </Pressable>
  )
}

const SidebarItem = React.memo(SidebarItemImpl)
SidebarItem.displayName = 'Sidebar.Item'

export default SidebarItem
