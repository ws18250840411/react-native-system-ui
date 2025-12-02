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
    minHeight: 24,
  },
  value: {
    textAlign: 'right',
  },
  valueOnly: {
    textAlign: 'left',
  },
  valueContainer: {
    flexShrink: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  valueOnlyContainer: {
    alignItems: 'flex-start',
  },
  valueCenter: {
    justifyContent: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
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
  const onlyValue = !title && !children

  const showBorder = border && group.border && !group.isLast
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
      if (typeof value === 'string' || typeof value === 'number') {
        return (
          <Text
            style={[
              styles.value,
              onlyValue && styles.valueOnly,
              {
                color: tokens.typography.valueColor,
                fontSize:
                  size === 'large'
                    ? tokens.typography.largeValueSize
                    : tokens.typography.valueSize,
              },
              valueStyle,
            ]}
            numberOfLines={1}
          >
            {value}
          </Text>
        )
      }
      return <>{value}</>
    }
    if (children) {
      return (
        <View style={[{ justifyContent: center ? 'center' : 'flex-start' }, contentStyle]}>
          {children}
        </View>
      )
    }
    return null
  }

  const renderBody = () => (
    <>
      {icon ? (
        <View
          style={[
            styles.iconWrapper,
            {
              marginRight: tokens.spacing.iconGap,
              height: tokens.icon.size,
              width: tokens.icon.size,
            },
          ]}
        >
          {icon}
        </View>
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
                    fontSize:
                      size === 'large'
                        ? tokens.typography.largeTitleSize
                        : tokens.typography.titleSize,
                    fontWeight: tokens.typography.titleWeight,
                    lineHeight: tokens.typography.lineHeight,
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
                fontSize:
                  size === 'large'
                    ? tokens.typography.largeLabelSize
                    : tokens.typography.labelSize,
                lineHeight: tokens.typography.lineHeight - 2,
              },
              labelStyle,
            ]}
            numberOfLines={2}
          >
            {label}
          </Text>
        ) : null}
      </View>
      <View
        style={[
          styles.valueContainer,
          { marginLeft: tokens.spacing.valueGap },
          onlyValue && styles.valueOnlyContainer,
          center && styles.valueCenter,
        ]}
      >
        {value !== undefined && typeof value === 'string' ? (
          <Text
            style={[
              styles.value,
              onlyValue && styles.valueOnly,
              {
                color: tokens.typography.valueColor,
                fontSize:
                  size === 'large'
                    ? tokens.typography.largeValueSize
                    : tokens.typography.valueSize,
                lineHeight: tokens.typography.lineHeight,
              },
              valueStyle,
            ]}
            numberOfLines={1}
          >
            {value}
          </Text>
        ) : (
          renderValue()
        )}
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
