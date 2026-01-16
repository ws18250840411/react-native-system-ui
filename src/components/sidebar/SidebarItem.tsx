import React from 'react'
import { Pressable, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import { isRenderable, isText } from '../../utils/validate'
import Badge from '../badge'
import { useSidebarContext } from './SidebarContext'
import { useSidebarTokens } from './tokens'
import type { SidebarItemProps } from './types'

const SidebarItem: React.FC<SidebarItemProps> = props => {
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
    if (__DEV__) {
      console.warn('[SidebarItem] 需要作为 Sidebar 子节点使用。')
    }
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

  return (
    <Pressable
      {...rest}
      {...press.interactionProps}
      style={[tokens.layout.item, { height: tokens.sizing.itemHeight }, style]}
    >
      <View style={tokens.layout.indicatorWrapper}>
        {isActive ? (
          <View
            style={[
              tokens.layout.indicator,
              {
                width: tokens.sizing.indicatorWidth,
                borderRadius: tokens.sizing.indicatorWidth,
                backgroundColor: tokens.colors.indicator,
              },
            ]}
          />
        ) : null}
      </View>
      <View style={tokens.layout.itemContent}>
        <View style={tokens.layout.titleRow}>
          {isRenderable(title)
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
            : null}
          {isRenderable(badge) ? (
            <View style={[tokens.layout.badge, badgeStyle]}>
              {isText(badge) ? (
                <Badge content={badge} />
              ) : (
                badge
              )}
            </View>
          ) : null}
          {dot ? (
            <View style={[tokens.layout.dot, { backgroundColor: tokens.colors.indicator }]} />
          ) : null}
        </View>
      </View>
    </Pressable>
  )
}

SidebarItem.displayName = 'Sidebar.Item'

export default SidebarItem
