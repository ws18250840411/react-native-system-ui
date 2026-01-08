import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

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
    disabled = false,
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
      style={[styles.item, { height: tokens.layout.itemHeight }, style]}
    >
      <View style={styles.indicatorWrapper}>
        {isActive ? (
          <View
            style={[
              styles.indicator,
              {
                width: tokens.layout.indicatorWidth,
                borderRadius: tokens.layout.indicatorWidth,
                backgroundColor: tokens.colors.indicator,
              },
            ]}
          />
        ) : null}
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          {isRenderable(title)
            ? isText(title)
              ? (
                <Text
                  style={[
                    {
                      color: titleColor,
                      fontSize: tokens.typography.fontSize,
                      fontWeight: tokens.typography.fontWeight as any,
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
            <View style={[styles.badge, badgeStyle]}>
              {isText(badge) ? (
                <Badge content={badge} />
              ) : (
                badge
              )}
            </View>
          ) : null}
          {dot ? (
            <View style={[styles.dot, { backgroundColor: tokens.colors.indicator }]} />
          ) : null}
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  indicatorWrapper: {
    width: 12,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingVertical: 12,
  },
  indicator: {
    height: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    marginLeft: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
})

SidebarItem.displayName = 'Sidebar.Item'

export default SidebarItem
