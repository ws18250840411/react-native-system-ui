import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import Badge from '../badge'
import { useTabbarTokens } from './tokens'
import { TabbarContext, useTabbarContext } from './TabbarContext'
import type { BadgeProps } from '../badge/types'
import type { TabbarItemProps, TabbarValue } from './types'

const isRenderable = (value: React.ReactNode) =>
  value !== undefined && value !== null && value !== false

const isBadgePropsLike = (value: unknown): value is BadgeProps => {
  if (!value || typeof value !== 'object') return false
  if (React.isValidElement(value)) return false
  if (Array.isArray(value)) return false
  const obj = value as Record<string, unknown>
  return (
    'content' in obj ||
    'dot' in obj ||
    'color' in obj ||
    'textColor' in obj ||
    'max' in obj ||
    'offset' in obj ||
    'showZero' in obj
  )
}

const TabbarItem: React.FC<TabbarItemProps> = props => {
  const {
    name,
    icon,
    badge,
    dot = false,
    onClick,
    textStyle,
    iconStyle,
    children,
    disabled = false,
    style,
    index,
    testID,
    iconSize,
    ...rest
  } = props
  const tokens = useTabbarTokens()
  const context = useTabbarContext()

  if (!context) {
    if (__DEV__) {
      console.warn('[TabbarItem] 需要作为 Tabbar 的子节点使用。')
    }
    return null
  }

  const itemName = (name ?? index ?? 0) as TabbarValue
  const isActive = context.activeValue === itemName
  const color = isActive ? context.activeColor : context.inactiveColor
  const resolvedIconSize = iconSize ?? tokens.icon.size

  const applyIconTheme = (node: React.ReactNode) => {
    if (!React.isValidElement(node)) return node

    // 兼容 react-native-system-icon（SvgProps + size/fill/color），尽量不覆盖用户显式传入
    const nextProps: Record<string, unknown> = {}
    const p: any = node.props ?? {}

    if (p.size == null) nextProps.size = resolvedIconSize
    if (p.fill == null) nextProps.fill = color
    if (p.color == null) nextProps.color = color

    // 有些自定义 icon 可能用 style 控制颜色（如 Text），这里也顺便注入
    if (p.style != null) {
      nextProps.style = [p.style, { color }]
    }

    return React.cloneElement(node, nextProps)
  }

  const renderIcon = () => {
    if (!icon) return null
    const raw = typeof icon === 'function' ? icon(isActive) : icon
    return applyIconTheme(raw)
  }

  const renderLabel = () => {
    if (!children) return null
    return typeof children === 'function' ? children(isActive) : children
  }

  const ariaPress = useAriaPress({
    disabled,
    onPress: () => {
      if (!disabled) {
        onClick?.()
        context.onSelect(itemName, index ?? 0)
      }
    },
    extraProps: {
      accessibilityRole: 'tab',
      accessibilityState: { selected: isActive, disabled },
      testID: testID ?? `rv-tabbar-item-${itemName}`,
    },
  })

  return (
    <Pressable
      {...rest}
      {...ariaPress.interactionProps}
      style={[
        styles.item,
        {
          height: tokens.layout.height,
          paddingVertical: 0,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View style={[styles.iconWrapper, iconStyle]}>
        {renderIcon()}
        {isRenderable(badge) || dot ? (
          <View style={styles.badge}>
            {isRenderable(badge)
              ? typeof badge === 'string' || typeof badge === 'number'
                ? <Badge content={badge} />
                : isBadgePropsLike(badge)
                  ? <Badge {...badge} dot={dot || badge.dot} />
                  : badge
              : <Badge dot />}
          </View>
        ) : null}
      </View>
      {children ? (
        <Text
          style={[
            styles.label,
            {
              color,
              fontSize: context.fontSize,
              fontWeight: context.fontWeight,
              lineHeight: context.fontSize,
            },
            textStyle,
          ]}
        >
          {renderLabel()}
        </Text>
      ) : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -12,
  },
  label: {
    includeFontPadding: false,
  },
})

TabbarItem.displayName = 'Tabbar.Item'

export default TabbarItem
