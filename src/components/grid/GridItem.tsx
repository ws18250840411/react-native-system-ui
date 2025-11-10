import React from 'react'
import type { PressableStateCallbackType, TextStyle, ViewStyle } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import Badge from '../badge'
import type { GridItemProps } from './types'
import { GridContext } from './GridContext'
import { gridStyles } from './styles'

interface GridItemInternalProps extends GridItemProps {
  gridItemIndex?: number
}

const isRenderable = (value: React.ReactNode) =>
  value !== undefined && value !== null && value !== false

export const GridItem: React.FC<GridItemInternalProps> = props => {
  const context = React.useContext(GridContext)
  if (!context) {
    throw new Error('GridItem must be used within Grid')
  }

  const {
    gridItemIndex = 0,
    text,
    icon,
    iconColor: iconColorProp,
    badge,
    dot,
    contentStyle,
    textStyle,
    children,
    style,
    onPress,
    ...rest
  } = props

  const {
    columnNum,
    gutter,
    border,
    center,
    square,
    direction,
    reverse,
    clickable,
    iconSize,
    iconColor,
    count,
    tokens,
  } = context

  const widthPercent = `${100 / columnNum}%`
  const isLastColumn = (gridItemIndex + 1) % columnNum === 0
  const rowIndex = Math.floor(gridItemIndex / columnNum)
  const lastRowIndex = Math.floor((count - 1) / columnNum)

  const baseItemStyle: ViewStyle = {
    width: widthPercent,
    maxWidth: widthPercent,
    paddingHorizontal: gutter ? gutter / 2 : 0,
    paddingVertical: gutter ? gutter / 2 : 0,
    borderColor: tokens.colors.border,
  }

  if (border && !isLastColumn) {
    baseItemStyle.borderRightWidth = StyleSheet.hairlineWidth
  }
  if (border && rowIndex < lastRowIndex) {
    baseItemStyle.borderBottomWidth = StyleSheet.hairlineWidth
  }

  const contentOrientation = direction === 'horizontal' ? gridStyles.horizontal : gridStyles.vertical
  const reverseStyle = reverse
    ? direction === 'horizontal'
      ? gridStyles.reverseRow
      : gridStyles.reverseColumn
    : null

  const contentBaseStyle: ViewStyle = {
    paddingHorizontal: tokens.spacing.paddingHorizontal,
    paddingVertical: tokens.spacing.paddingVertical,
    backgroundColor: tokens.colors.background,
  }

  if (square) {
    contentBaseStyle.aspectRatio = 1
    contentBaseStyle.width = '100%'
  }

  const contentWrapperStyle = [
    gridStyles.contentBase,
    contentOrientation,
    center && gridStyles.center,
    reverseStyle,
    contentBaseStyle,
    contentStyle,
  ]

  const resolvedIconColor = iconColorProp ?? iconColor ?? tokens.colors.text

  const renderIcon = () => {
    if (!icon && !badge && !dot) {
      return null
    }

    const iconNode = icon
      ? typeof icon === 'function'
        ? icon(iconSize, resolvedIconColor)
        : icon
      : null

    const iconWrapperStyle: ViewStyle = [
      gridStyles.iconWrapper,
    ]

    if (direction === 'vertical' && !reverse) {
      iconWrapperStyle.push({ marginBottom: 8 })
    }
    if (direction === 'horizontal' && !reverse) {
      iconWrapperStyle.push({ marginRight: 8 })
    }

    const content = iconNode ? (
      <View style={iconWrapperStyle}>{iconNode}</View>
    ) : (
      <View style={iconWrapperStyle} />
    )

    if (badge || dot) {
      return (
        <Badge dot={dot} {...badge}>
          {content}
        </Badge>
      )
    }

    return content
  }

  const renderText = () => {
    if (!isRenderable(text)) {
      return null
    }

    if (typeof text === 'string' || typeof text === 'number') {
      const textStyles: TextStyle = {
        color: tokens.colors.text,
        fontSize: tokens.typography.fontSize,
        lineHeight: tokens.typography.lineHeight,
        fontFamily: tokens.typography.fontFamily,
        fontWeight: tokens.typography.fontWeight,
      }

      return (
        <Text style={[gridStyles.text, textStyles, textStyle]} numberOfLines={2}>
          {text}
        </Text>
      )
    }

    return text
  }

  const isInteractive = clickable || typeof onPress === 'function'

  const contentBody = children ?? (
    <>
      {renderIcon()}
      {renderText()}
    </>
  )

  if (isInteractive) {
    const pressableStyle = ({ pressed }: PressableStateCallbackType) => [
      baseItemStyle,
      style,
      { opacity: pressed ? 0.85 : 1 },
    ]

    return (
      <Pressable
        style={pressableStyle}
        android_ripple={{ color: tokens.colors.active }}
        onPress={onPress}
        {...rest}
      >
        <View style={contentWrapperStyle}>{contentBody}</View>
      </Pressable>
    )
  }

  return (
    <View style={[baseItemStyle, style]} {...rest}>
      <View style={contentWrapperStyle}>{contentBody}</View>
    </View>
  )
}

GridItem.displayName = 'GridItem'
