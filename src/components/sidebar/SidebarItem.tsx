import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import Badge from '../badge'
import type { SidebarItemProps } from './types'
import { useSidebarContext } from './SidebarContext'
import { useSidebarTokens } from './tokens'

const isRenderable = (value: React.ReactNode) =>
  value !== undefined && value !== null && value !== false

const SidebarItem: React.FC<SidebarItemProps> = props => {
  const {
    title,
    badge,
    disabled = false,
    dot,
    onClick,
    textStyle,
    badgeStyle,
    contentStyle,
    style,
    index = 0,
    children,
    ...rest
  } = props
  const tokens = useSidebarTokens()
  const context = useSidebarContext()

  if (!context) {
    if (__DEV__) {
      console.warn('[SidebarItem] 需要作为 Sidebar 子节点使用。')
    }
    return null
  }

  const isActive = context.activeIndex === index

  const press = useAriaPress({
    disabled,
    onPress: () => {
      if (!disabled) {
        onClick?.(index)
        context.onSelect(index)
      }
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
            style={{
              width: tokens.layout.indicatorWidth,
              height: 20,
              borderRadius: tokens.layout.indicatorWidth,
              backgroundColor: tokens.colors.indicator,
            }}
          />
        ) : null}
      </View>
      <View style={[styles.content, contentStyle]}>
        <View style={styles.titleRow}>
          {isRenderable(title)
            ? typeof title === 'string' || typeof title === 'number'
              ? (
                <Text
                  style={[
                    styles.title,
                    {
                      color: isActive ? tokens.colors.titleActive : tokens.colors.title,
                    },
                    disabled && { color: tokens.colors.disabled },
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
              {typeof badge === 'string' || typeof badge === 'number' ? (
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
        {isRenderable(children) ? (
          <View style={styles.subContent}>
            {typeof children === 'string' || typeof children === 'number'
              ? <Text style={styles.subText}>{children}</Text>
              : children}
          </View>
        ) : null}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  badge: {
    marginLeft: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  subContent: {
    marginTop: 4,
  },
  subText: {
    color: '#666',
    fontSize: 14,
  },
})

SidebarItem.displayName = 'Sidebar.Item'

export default SidebarItem
