import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import Badge from '../badge'
import { useTabbarTokens } from './tokens'
import { useTabbarContext } from './TabbarContext'
import type { BadgeProps } from '../badge/types'
import type { TabbarItemProps, TabbarValue } from './types'

const isRenderable = (value: unknown) =>
  value != null && value !== false

const isBadgeProps = (value: unknown): value is BadgeProps =>
  Boolean(value) &&
  typeof value === 'object' &&
  !React.isValidElement(value) &&
  !Array.isArray(value)

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
    tokensOverride,
    ...rest
  } = props
  const tokens = useTabbarTokens(tokensOverride)
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

    const nextProps: any = {}
    const p: any = (node as any).props ?? {}

    if (p.size == null) nextProps.size = resolvedIconSize
    if (p.fill == null) nextProps.fill = color
    if (p.color == null) nextProps.color = color

    if (p.style != null) {
      nextProps.style = [p.style, { color }]
    }

    return React.cloneElement(node as any, nextProps)
  }

  const renderIcon = () => {
    if (!icon) return null
    const raw = typeof icon === 'function' ? icon(isActive) : icon
    return applyIconTheme(raw)
  }

  const renderLabel = () => {
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

  const shouldRenderBadge = dot || isRenderable(badge)

  const renderBadge = () => {
    if (isRenderable(badge)) {
      if (typeof badge === 'string' || typeof badge === 'number') {
        return <Badge content={badge} />
      }
      if (isBadgeProps(badge)) {
        return <Badge {...badge} dot={dot || badge.dot} />
      }
      return badge as React.ReactNode
    }
    return <Badge dot />
  }

  return (
    <Pressable
      {...rest}
      {...ariaPress.interactionProps}
      style={[
        styles.item,
        {
          height: tokens.layout.height,
          paddingVertical: tokens.layout.paddingVertical,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View style={[styles.iconWrapper, iconStyle]}>
        {renderIcon()}
        {shouldRenderBadge ? <View style={styles.badge}>{renderBadge()}</View> : null}
      </View>
      {isRenderable(children) ? (
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
