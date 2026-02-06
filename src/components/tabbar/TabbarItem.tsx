import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import { isFunction, isPlainObject, isRenderable, isText } from '../../utils/validate'
import Badge from '../badge'
import { useTabbarContext } from './TabbarContext'
import { useTabbarTokens } from './tokens'
import type { TabbarItemProps, TabbarValue } from './types'
import type { BadgeProps } from '../badge/types'

const TabbarItemImpl: React.FC<TabbarItemProps> = props => {
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
    return null
  }

  const itemName = (name ?? index ?? 0) as TabbarValue
  const isActive = context.activeValue === itemName
  const color = isActive ? context.activeColor : context.inactiveColor
  const resolvedIconSize = iconSize ?? tokens.icon.size

  const applyIconTheme = useCallback((node: React.ReactNode) => {
    if (!React.isValidElement(node)) return node

    const element = node as React.ReactElement<Record<string, unknown>>
    const nextProps: Record<string, unknown> = {}
    const p = element.props ?? {}

    if (p['size'] == null) nextProps['size'] = resolvedIconSize
    if (p['fill'] == null) nextProps['fill'] = color
    if (p['color'] == null) nextProps['color'] = color

    if (p['style'] != null) {
      nextProps['style'] = [p['style'], { color }]
    }

    return React.cloneElement(element, nextProps)
  }, [color, resolvedIconSize])

  const renderIcon = useCallback(() => {
    if (!icon) return null
    const raw = isFunction(icon) ? icon(isActive) : icon
    return applyIconTheme(raw)
  }, [applyIconTheme, icon, isActive])

  const renderLabel = useCallback(
    () => (isFunction(children) ? children(isActive) : children),
    [children, isActive]
  )

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

  const renderBadge = useCallback(() => {
    if (isRenderable(badge)) {
      if (isText(badge)) {
        return <Badge content={badge} />
      }
      if (isPlainObject(badge)) {
        const badgeProps = badge as BadgeProps
        return <Badge {...badgeProps} dot={dot || badgeProps.dot} />
      }
      return badge as React.ReactNode
    }
    return <Badge dot />
  }, [badge, dot])

  const itemStyle = [
    styles.item,
    {
      height: tokens.layout.height,
      paddingVertical: tokens.layout.paddingVertical,
      opacity: disabled ? 0.5 : 1,
    },
    style,
  ]

  const labelStyle = [
    styles.label,
    {
      color,
      fontSize: context.fontSize,
      fontWeight: context.fontWeight,
      lineHeight: context.fontSize,
    },
    textStyle,
  ]

  return (
    <Pressable
      {...rest}
      {...ariaPress.interactionProps}
      style={itemStyle}
    >
      <View style={[styles.iconWrapper, iconStyle]}>
        {renderIcon()}
        {shouldRenderBadge && <View style={styles.badge}>{renderBadge()}</View>}
      </View>
      {isRenderable(children) ? (
        <Text style={labelStyle}>
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

const TabbarItem = React.memo(TabbarItemImpl)
TabbarItem.displayName = 'Tabbar.Item'

export default TabbarItem
