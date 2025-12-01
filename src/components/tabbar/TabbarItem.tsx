import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import { useTabbarTokens } from './tokens'
import { TabbarContext, useTabbarContext } from './TabbarContext'
import type { TabbarItemProps, TabbarValue } from './types'

const TabbarItem: React.FC<TabbarItemProps> = props => {
  const {
    name,
    icon,
    badge,
    textStyle,
    iconStyle,
    children,
    disabled = false,
    style,
    index,
    testID,
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

  const renderIcon = () => {
    if (!icon) return null
    return typeof icon === 'function' ? icon(isActive) : icon
  }

  const renderLabel = () => {
    if (!children) return null
    return typeof children === 'function' ? children(isActive) : children
  }

  const ariaPress = useAriaPress({
    disabled,
    onPress: () => {
      if (!disabled) {
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
          paddingVertical: tokens.layout.paddingVertical,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <View style={[styles.iconWrapper, iconStyle]}>
        {renderIcon()}
        {badge ? <View style={styles.badge}>{badge}</View> : null}
      </View>
      {children ? (
        <Text
          style={[
            styles.label,
            {
              color,
              fontSize: context.fontSize,
              fontWeight: context.fontWeight,
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
