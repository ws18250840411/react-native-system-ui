import React, { useContext, useMemo } from 'react'
import {
  Pressable,
  Text,
  View,
  type DimensionValue,
  type ViewStyle,
} from 'react-native'

import Badge from '../badge'
import { createHairlineView, isFunction, isRenderable, isText } from '../../utils'
import type { GridItemProps } from './types'
import { GridContext } from './GridContext'

export const GridItem: React.FC<GridItemProps> = props => {
  const context = useContext(GridContext)
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

  const widthPercent = useMemo(() => `${100 / columnNum}%` as DimensionValue, [columnNum])
  const isLastColumn = useMemo(() => (gridItemIndex + 1) % columnNum === 0, [columnNum, gridItemIndex])
  const rowIndex = useMemo(() => Math.floor(gridItemIndex / columnNum), [columnNum, gridItemIndex])
  const lastRowIndex = useMemo(() => Math.floor((count - 1) / columnNum), [columnNum, count])

  const contentWrapperStyle = useMemo(() => ([
    tokens.layout.itemContentBase,
    direction === 'horizontal' ? tokens.layout.itemHorizontal : tokens.layout.itemVertical,
    center && tokens.layout.itemCenter,
    reverse ? (direction === 'horizontal' ? tokens.layout.itemReverseRow : tokens.layout.itemReverseColumn) : null,
    square ? tokens.layout.itemContentSquare : null,
    {
      paddingHorizontal: tokens.spacing.paddingHorizontal,
      paddingVertical: tokens.spacing.paddingVertical,
      backgroundColor: tokens.colors.background,
    },
    contentStyle,
  ]), [
    center,
    contentStyle,
    direction,
    reverse,
    square,
    tokens.colors.background,
    tokens.layout.itemContentBase,
    tokens.layout.itemContentSquare,
    tokens.layout.itemHorizontal,
    tokens.layout.itemReverseColumn,
    tokens.layout.itemReverseRow,
    tokens.layout.itemVertical,
    tokens.layout.itemCenter,
    tokens.spacing.paddingHorizontal,
    tokens.spacing.paddingVertical,
  ])

  const hasText = isRenderable(text)
  const resolvedIconColor = useMemo(
    () => iconColorProp ?? iconColor ?? tokens.colors.text,
    [iconColor, iconColorProp, tokens.colors.text]
  )

  const innerContent = useMemo(() => {
    if (children) return children

    let iconElement: React.ReactNode = null
    if (icon || badge || dot) {
      const { style: badgeWrapperStyle, ...badgeRest } = badge ?? {}
      const marginKey = direction === 'vertical'
        ? (reverse ? 'marginTop' : 'marginBottom')
        : (reverse ? 'marginLeft' : 'marginRight')

      const iconWrapperStyle = [
        tokens.layout.iconWrapper,
        hasText && { [marginKey]: tokens.spacing.iconGap },
      ]
      const iconNode = isFunction(icon) ? icon(iconSize, resolvedIconColor) : icon
      const content = <View style={iconWrapperStyle}>{iconNode}</View>
      iconElement = (badge || dot) ? (
        <Badge
          dot={dot}
          {...badgeRest}
          style={center ? [badgeWrapperStyle, { alignSelf: 'center' }] : badgeWrapperStyle}
        >
          {content}
        </Badge>
      ) : content
    }

    const textElement = hasText && (
      isText(text) ? (
        <Text
          style={[
            tokens.layout.text,
            {
              color: tokens.colors.text,
              fontSize: tokens.typography.fontSize,
              lineHeight: tokens.typography.lineHeight,
              fontFamily: tokens.typography.fontFamily,
              fontWeight: tokens.typography.fontWeight,
            },
            textStyle
          ]}
          numberOfLines={tokens.defaults.textNumberOfLines}
        >
          {text}
        </Text>
      ) : text
    )

    return <>{iconElement}{textElement}</>
  }, [
    badge,
    center,
    children,
    direction,
    dot,
    hasText,
    icon,
    iconSize,
    resolvedIconColor,
    reverse,
    text,
    textStyle,
    tokens.colors.text,
    tokens.defaults.textNumberOfLines,
    tokens.layout.iconWrapper,
    tokens.layout.text,
    tokens.spacing.iconGap,
    tokens.typography.fontFamily,
    tokens.typography.fontSize,
    tokens.typography.fontWeight,
    tokens.typography.lineHeight,
  ])

  const rightBorder = useMemo(() => (
    border && !gutter && !isLastColumn ? (
      <View
        style={[
          tokens.layout.itemBorderRight,
          createHairlineView({ position: 'right', color: tokens.colors.border, top: 0, bottom: 0, right: 0 }),
        ]}
      />
    ) : null
  ), [border, gutter, isLastColumn, tokens.colors.border, tokens.layout.itemBorderRight])

  const bottomBorder = useMemo(() => (
    border && !gutter && rowIndex < lastRowIndex ? (
      <View
        style={[
          tokens.layout.itemBorderBottom,
          createHairlineView({ position: 'bottom', color: tokens.colors.border, left: 0, right: 0, bottom: 0 }),
        ]}
      />
    ) : null
  ), [border, gutter, lastRowIndex, rowIndex, tokens.colors.border, tokens.layout.itemBorderBottom])

  const content = useMemo(() => (
    <View style={contentWrapperStyle}>
      {innerContent}
      {rightBorder}
      {bottomBorder}
    </View>
  ), [bottomBorder, contentWrapperStyle, innerContent, rightBorder])

  const baseItemStyle: ViewStyle = useMemo(() => ({
    width: widthPercent,
    flexGrow: 0,
    flexShrink: 0,
    paddingRight: gutter ? gutter : undefined,
    marginTop: gutter && rowIndex > 0 ? gutter : undefined,
  }), [gutter, rowIndex, widthPercent])

  const isInteractive = clickable || isFunction(onPress)

  if (isInteractive) {
    return (
      <Pressable
        style={(pressableState) => [
          baseItemStyle,
          typeof style === 'function' ? style(pressableState) : style,
          { opacity: pressableState.pressed ? tokens.defaults.pressedOpacity : 1 },
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
    <View
      style={[
        baseItemStyle,
        typeof style === 'function'
          ? style({ pressed: false })
          : style,
      ]}
      {...rest}
    >
      {content}
    </View>
  )
}

GridItem.displayName = 'GridItem'
