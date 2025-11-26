import React from 'react'
import type { ViewStyle } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useAriaPress } from '../../hooks'
import { Arrow } from '@react-vant/icons'

import { CellGroupContext } from './CellContext'
import type { CellProps } from './types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ebedf0',
  },
  large: {
    paddingVertical: 14,
  },
  icon: {
    marginRight: 8,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  required: {
    color: '#ee0a24',
    marginRight: 4,
  },
  title: {
    fontSize: 16,
    color: '#323233',
    flexShrink: 1,
  },
  label: {
    marginTop: 4,
    fontSize: 14,
    color: '#969799',
  },
  value: {
    fontSize: 16,
    color: '#969799',
    textAlign: 'right',
  },
  valueOnly: {
    textAlign: 'left',
  },
  extra: {
    marginLeft: 8,
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

  const group = React.useContext(CellGroupContext)

  const showBorder = border && group.border
  const showArrow = (isLink ?? false) || clickable

  const isInteractive = (clickable || showArrow || typeof onPress === 'function') && !disabled

  const containerStyles = [
    styles.container,
    size === 'large' && styles.large,
    center && styles.center,
    showBorder && styles.border,
    style,
  ]

  const renderValue = () => {
    if (value !== undefined) {
      return (
        <Text
          style={[
            styles.value,
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
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <View style={styles.body}>
        {(title || required) && (
          <View style={styles.titleRow}>
            {required && <Text style={styles.required}>*</Text>}
            {title ? (
              <Text style={[styles.title, titleStyle]} numberOfLines={1}>
                {title}
              </Text>
            ) : null}
          </View>
        )}
        {label ? (
          <Text style={[styles.label, labelStyle]} numberOfLines={2}>
            {label}
          </Text>
        ) : null}
      </View>
      <View style={{ marginLeft: 12, flexShrink: 1 }}>{renderValue()}</View>
      {extra ? <View style={styles.extra}>{extra}</View> : null}
      {rightIcon
        ? rightIcon
        : showArrow && (
            <View style={arrowTransforms[arrowDirection]}> 
              <Arrow size={16} color="#c8c9cc" />
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
