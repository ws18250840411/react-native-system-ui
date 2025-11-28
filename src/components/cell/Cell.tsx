import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useAriaPress } from '../../hooks'
import { Arrow } from '@react-vant/icons'

import { CellGroupContext } from './CellContext'
import type { CellProps } from './types'
import { useCellTokens } from './tokens'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    textAlign: 'right',
  },
  valueOnly: {
    textAlign: 'left',
  },
})

const arrowTransforms: Record<string, ViewStyle> = {
  left: { transform: [{ rotate: '180deg' }] },
  right: {},
  up: { transform: [{ rotate: '-90deg' }] },
  down: { transform: [{ rotate: '90deg' }] },
}

export const Cell = React.forwardRef<Pressable, CellProps>((props, ref) => {
  const {
    title,
    value,
    label,
    extra,
    icon,
    rightIcon,
    border = true,
    clickable,
    isLink,
    required,
    center,
    size = 'normal',
    arrowDirection = 'right',
    children,
    style,
    titleStyle,
    valueStyle,
    labelStyle,
    contentStyle,
    onPress,
    disabled,
    ...rest
  } = props

  const tokens = useCellTokens()
  const group = React.useContext(CellGroupContext)

  const showBorder = border && group.border
  const showArrow = (isLink ?? false) || clickable

  const isInteractive = (clickable || showArrow || typeof onPress === 'function') && !disabled

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    {
      backgroundColor: tokens.container.background,
      paddingVertical:
        size === 'large'
          ? tokens.container.largePaddingVertical
          : tokens.container.paddingVertical,
      paddingHorizontal: tokens.container.paddingHorizontal,
    },
    center && styles.center,
    showBorder && {
      borderColor: tokens.border.color,
      borderBottomWidth: tokens.border.width,
    },
    style,
  ]

  const renderValue = () => {
    if (value !== undefined) {
      return (
        <Text
          style={[
            styles.value,
            {
              color: tokens.typography.valueColor,
              fontSize: tokens.typography.valueSize,
            },
            !title && !children && styles.valueOnly,
            valueStyle,
          ]}
          numberOfLines={1}
        >
          {value}
        </Text>
      )
    }
    if (children) {
      return <View style={contentStyle}>{children}</View>
    }
    return null
  }

  const renderBody = () => (
    <>
      {icon ? (
        <View style={{ marginRight: tokens.spacing.iconGap }}>{icon}</View>
      ) : null}
      <View style={styles.body}>
        {(title || required) && (
          <View style={styles.titleRow}>
            {required ? (
              <Text
                style={{
                  color: tokens.typography.requiredColor,
                  marginRight: tokens.spacing.iconGap / 2,
                }}
              >
                *
              </Text>
            ) : null}
            {title ? (
              <Text
                style={[
                  {
                    color: tokens.typography.titleColor,
                    fontSize: tokens.typography.titleSize,
                    fontWeight: tokens.typography.titleWeight,
                  },
                  titleStyle,
                ]}
                numberOfLines={1}
              >
                {title}
              </Text>
            ) : null}
          </View>
        )}
        {label ? (
          <Text
            style={[
              {
                marginTop: tokens.spacing.labelMarginTop,
                color: tokens.typography.labelColor,
                fontSize: tokens.typography.labelSize,
              },
              labelStyle,
            ]}
            numberOfLines={2}
          >
            {label}
          </Text>
        ) : null}
      </View>
      <View style={{ marginLeft: tokens.spacing.valueGap, flexShrink: 1 }}>
        {renderValue()}
      </View>
      {extra ? (
        <View style={{ marginLeft: tokens.spacing.extraGap }}>{extra}</View>
      ) : null}
      {rightIcon
        ? rightIcon
        : showArrow && (
            <View style={arrowTransforms[arrowDirection]}> 
              <Arrow size={tokens.arrow.size} color={tokens.arrow.color} />
            </View>
          )}
    </>
  )

  if (!isInteractive) {
    return (
      <View style={containerStyles} {...rest}>
        {renderBody()}
      </View>
    )
  }

  const { android_ripple, onPress: _ignoredPress, ...viewProps } = rest as typeof rest & {
    android_ripple?: Pressable['props']['android_ripple']
  }

  const { interactionProps, states } = useAriaPress({
    disabled,
    onPress,
    extraProps: {
      accessibilityRole: 'button',
    },
  })

  return (
    <Pressable
      ref={ref}
      style={[containerStyles, { opacity: states.pressed ? 0.6 : 1 }]}
      android_ripple={android_ripple ?? { color: '#f2f3f5' }}
      {...interactionProps}
      {...viewProps}
    >
      {renderBody()}
    </Pressable>
  )
})

Cell.displayName = 'Cell'
