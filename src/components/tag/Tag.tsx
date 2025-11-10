import React from 'react'
import type { PressableStateCallbackType } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Close } from '@react-vant/icons'

import { tagStyles } from './styles'
import type { TagProps } from './types'
import { useTagTokens } from './useTagTokens'

const isRenderable = (value: React.ReactNode) => value !== null && value !== undefined

export const Tag: React.FC<TagProps> = props => {
  const tokens = useTagTokens()
  const {
    children,
    type = tokens.defaults.type,
    size = tokens.defaults.size,
    plain = tokens.defaults.plain,
    round = tokens.defaults.round,
    mark = tokens.defaults.mark,
    color,
    textColor,
    show = true,
    closeable,
    closeIcon,
    onClose,
    onPress,
    textStyle,
    style,
    ...rest
  } = props

  if (!show) {
    return null
  }

  const tone = tokens.toneMap[type] ?? tokens.toneMap.default
  const sizeTokens = tokens.sizes[size]
  const backgroundColor = plain
    ? tokens.colors.plainBackground
    : color ?? tone.background
  const resolvedTextColor = textColor
    ? textColor
    : plain
      ? color ?? tone.background
      : tone.text

  const borderColor = plain ? color ?? tone.background : 'transparent'
  const borderWidth = plain ? StyleSheet.hairlineWidth : 0

  const resolvedRadius = round ? tokens.radius.round : sizeTokens.borderRadius

  const baseContainerStyle = [
    tagStyles.container,
    {
      backgroundColor,
      paddingHorizontal: sizeTokens.paddingHorizontal,
      paddingVertical: sizeTokens.paddingVertical,
      borderRadius: resolvedRadius,
      borderWidth,
      borderColor,
    },
    mark && {
      borderTopLeftRadius: tokens.radius.markLeading,
      borderBottomLeftRadius: tokens.radius.markLeading,
      borderTopRightRadius: resolvedRadius,
      borderBottomRightRadius: resolvedRadius,
    },
    style,
  ]

  const labelStyle = [
    tagStyles.text,
    {
      color: resolvedTextColor,
      fontSize: sizeTokens.fontSize,
      lineHeight: sizeTokens.fontSize * tokens.typography.lineHeightMultiplier,
      fontFamily: tokens.typography.fontFamily,
      fontWeight: tokens.typography.fontWeight,
    },
    textStyle,
  ]

  const renderLabel = () => {
    if (!isRenderable(children)) {
      return null
    }
    if (typeof children === 'string' || typeof children === 'number') {
      return <Text style={labelStyle}>{children}</Text>
    }
    return children
  }

  const renderClose = () => {
    if (!closeable) return null

    const iconNode = typeof closeIcon === 'function'
      ? closeIcon(resolvedTextColor, tokens.close.size)
      : closeIcon

    return (
      <Pressable
        accessibilityRole="button"
        hitSlop={8}
        style={[tagStyles.close, { marginLeft: tokens.close.gap }]}
        onPress={event => {
          event.stopPropagation?.()
          onClose?.()
        }}
      >
        {iconNode ?? (
          <Close color={resolvedTextColor} style={{ fontSize: tokens.close.size }} />
        )}
      </Pressable>
    )
  }

  if (onPress) {
    const pressableStyle = ({ pressed }: PressableStateCallbackType) => [
      ...baseContainerStyle,
      {
        opacity: pressed ? 0.85 : 1,
      },
    ]

    return (
      <Pressable style={pressableStyle} onPress={onPress} {...rest}>
        {renderLabel()}
        {renderClose()}
      </Pressable>
    )
  }

  return (
    <View style={baseContainerStyle} {...rest}>
      {renderLabel()}
      {renderClose()}
    </View>
  )
}

Tag.displayName = 'Tag'
