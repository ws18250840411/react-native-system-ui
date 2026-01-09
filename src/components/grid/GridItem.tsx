import React from 'react'
import {
  Pressable,
  Text,
  View,
  type DimensionValue,
  type ViewStyle,
} from 'react-native'

import Badge from '../badge'
import { createHairlineView } from '../../utils/hairline'
import { isFunction, isRenderable, isText } from '../../utils/validate'
import type { GridItemProps } from './types'
import { GridContext } from './GridContext'

export const GridItem: React.FC<GridItemProps> = props => {
  const context = React.useContext(GridContext)
  if (!context) throw new Error('GridItem must be used within Grid')

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
  } = props as GridItemProps & { gridItemIndex?: number }

  const { tokens, columnNum, gutter, border, center, square, direction, reverse, clickable, iconSize, iconColor, count } = context

  const widthPercent = `${100 / columnNum}%` as DimensionValue
  const isLastColumn = (gridItemIndex + 1) % columnNum === 0
  const rowIndex = Math.floor(gridItemIndex / columnNum)
  const lastRowIndex = Math.floor((count - 1) / columnNum)

  const contentWrapperStyle = [
    tokens.layout.itemContentBase,
    direction === 'horizontal' ? tokens.layout.itemHorizontal : tokens.layout.itemVertical,
    center && tokens.layout.itemCenter,
    reverse ? (direction === 'horizontal' ? tokens.layout.itemReverseRow : tokens.layout.itemReverseColumn) : null,
    {
      paddingHorizontal: tokens.spacing.paddingHorizontal,
      paddingVertical: tokens.spacing.paddingVertical,
      backgroundColor: tokens.colors.background,
    },
    square ? tokens.layout.itemContentSquare : null,
    square && gutter ? { right: gutter, bottom: gutter, height: 'auto' as any } : null,
    contentStyle,
  ]

  const hasText = isRenderable(text)
  const resolvedIconColor = iconColorProp ?? iconColor ?? tokens.colors.text

  let iconElement = null
  if (icon || badge || dot) {
    const marginKey = direction === 'vertical'
      ? (reverse ? 'marginTop' : 'marginBottom')
      : (reverse ? 'marginLeft' : 'marginRight')

    const iconWrapperStyle = [
      tokens.layout.iconWrapper,
      hasText && { [marginKey]: tokens.spacing.iconGap },
    ]
    const iconNode = isFunction(icon) ? icon(iconSize, resolvedIconColor) : icon
    const content = <View style={iconWrapperStyle}>{iconNode}</View>
    iconElement = (badge || dot) ? <Badge dot={dot} {...badge}>{content}</Badge> : content
  }

  const textElement = hasText ? (
    isText(text) ? (
      <Text
        style={[
          tokens.layout.text,
          {
            color: tokens.colors.text,
            fontSize: tokens.typography.fontSize,
            lineHeight: tokens.typography.lineHeight,
            fontFamily: tokens.typography.fontFamily,
            fontWeight: tokens.typography.fontWeight as any,
          },
          textStyle
        ]}
        numberOfLines={2}
      >
        {text}
      </Text>
    ) : text
  ) : null

  const rightBorder = border && !gutter && !isLastColumn && (
    <View
      style={[
        tokens.layout.itemBorderRight,
        createHairlineView({ position: 'right', color: tokens.colors.border, top: 0, bottom: 0, right: 0 }),
      ]}
    />
  )

  const bottomBorder = border && !gutter && rowIndex < lastRowIndex && (
    <View
      style={[
        tokens.layout.itemBorderBottom,
        createHairlineView({ position: 'bottom', color: tokens.colors.border, left: 0, right: 0, bottom: 0 }),
      ]}
    />
  )

  const content = (
    <View style={contentWrapperStyle}>
      {children ?? <>{iconElement}{textElement}</>}
      {rightBorder}
      {bottomBorder}
    </View>
  )

  const baseItemStyle: ViewStyle = {
    flexBasis: widthPercent,
    width: widthPercent,
    maxWidth: widthPercent,
    aspectRatio: square ? 1 : undefined,
    paddingRight: gutter ? gutter : undefined,
    marginTop: gutter && rowIndex > 0 ? gutter : undefined,
  }

  const isInteractive = clickable || isFunction(onPress)

  if (isInteractive) {
    return (
      <Pressable
        style={({ pressed }) => [
          baseItemStyle,
          style as ViewStyle,
          { opacity: pressed ? tokens.defaults.pressedOpacity : 1 },
        ]}
        android_ripple={{ color: tokens.colors.active }}
        onPress={onPress}
        {...rest}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View style={[baseItemStyle, style as ViewStyle]} {...rest}>
      {content}
    </View>
  )
}

GridItem.displayName = 'GridItem'
