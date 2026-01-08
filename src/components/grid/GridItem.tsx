import React from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import Badge from '../badge'
import { createHairlineView } from '../../utils/hairline'
import { isFunction, isRenderable, isText } from '../../utils/validate'
import type { GridItemProps } from './types'
import { GridContext } from './GridContext'

type GridItemInternalProps = GridItemProps & {
  gridItemIndex?: number
}

export const GridItem: React.FC<GridItemProps> = props => {
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
  } = props as GridItemInternalProps

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
    flexBasis: widthPercent as any,
    width: widthPercent as any,
    maxWidth: widthPercent as any,
    borderColor: tokens.colors.border,
  }

  if (square) {
    baseItemStyle.aspectRatio = 1
  }

  if (gutter) {
    baseItemStyle.paddingRight = gutter
    if (rowIndex > 0) {
      baseItemStyle.marginTop = gutter
    }
  }

  const contentOrientation = direction === 'horizontal' ? styles.horizontal : styles.vertical
  const reverseStyle = reverse
    ? direction === 'horizontal'
      ? styles.reverseRow
      : styles.reverseColumn
    : null

  const contentBaseStyle: ViewStyle = {
    paddingHorizontal: tokens.spacing.paddingHorizontal,
    paddingVertical: tokens.spacing.paddingVertical,
    backgroundColor: tokens.colors.background,
    // 需要相对定位，以便绝对定位的边框 View 能正确显示
    position: 'relative',
    // 确保边框 View 不会被裁剪
    overflow: 'visible',
  }

  if (square) {
    contentBaseStyle.position = 'absolute'
    contentBaseStyle.top = 0
    contentBaseStyle.right = 0
    contentBaseStyle.left = 0
    // 确保有完整的高度，以便边框能正确显示
    contentBaseStyle.bottom = 0
  }

  if (square && gutter) {
    contentBaseStyle.right = gutter
    contentBaseStyle.bottom = gutter
    contentBaseStyle.height = 'auto'
  }

  // 只有没有gutter时才显示边框，有gutter时不需要边框
  const showRightBorder = border && !gutter && !isLastColumn
  const showBottomBorder = border && !gutter && rowIndex < lastRowIndex

  const contentWrapperStyle = [
    styles.contentBase,
    contentOrientation,
    center && styles.center,
    reverseStyle,
    contentBaseStyle,
    contentStyle,
  ]

  const resolvedIconColor = iconColorProp ?? iconColor ?? tokens.colors.text

  const renderIcon = () => {
    if (!icon && !badge && !dot) {
      return null
    }

    const hasText = isRenderable(text)
    const iconNode = icon
      ? isFunction(icon)
        ? icon(iconSize, resolvedIconColor)
        : icon
      : null

    const iconWrapperStyle = [
      styles.iconWrapper,
      hasText && direction === 'vertical' && !reverse ? { marginBottom: 8 } : null, // 8px (var(--rv-padding-xs))
      hasText && direction === 'vertical' && reverse ? { marginTop: 8 } : null,
      hasText && direction === 'horizontal' && !reverse ? { marginRight: 8 } : null,
      hasText && direction === 'horizontal' && reverse ? { marginLeft: 8 } : null,
    ]

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

    if (isText(text)) {
      const textStyles: TextStyle = {
        color: tokens.colors.text,
        fontSize: tokens.typography.fontSize,
        lineHeight: tokens.typography.lineHeight,
        fontFamily: tokens.typography.fontFamily,
        fontWeight: tokens.typography.fontWeight as any,
      }

      return (
        <Text style={[styles.text, textStyles, textStyle]} numberOfLines={2}>
          {text}
        </Text>
      )
    }

    return text
  }

  const isInteractive = clickable || isFunction(onPress)
  const contentBody = children ?? (
    <>
      {renderIcon()}
      {renderText()}
    </>
  )

  const renderBorders = () => (
    <>
      {showRightBorder && (
        <View
          style={[
            styles.borderRight,
            createHairlineView({
              position: 'right',
              color: tokens.colors.border,
              top: 0,
              bottom: 0,
              right: 0,
            }),
          ]}
        />
      )}
      {showBottomBorder && (
        <View
          style={[
            styles.borderBottom,
            createHairlineView({
              position: 'bottom',
              color: tokens.colors.border,
              left: 0,
              right: 0,
              bottom: 0,
            }),
          ]}
        />
      )}
    </>
  )

  const content = (
    <View style={contentWrapperStyle}>
      {contentBody}
      {renderBorders()}
    </View>
  )

  if (isInteractive) {
    return (
      <Pressable
        style={({ pressed }) => [baseItemStyle, style as ViewStyle, { opacity: pressed ? 0.85 : 1 }]}
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

const styles = StyleSheet.create({
  contentBase: {
    flex: 1,
    justifyContent: 'center',
  },
  vertical: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  reverseColumn: {
    flexDirection: 'column-reverse',
  },
  reverseRow: {
    flexDirection: 'row-reverse',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  borderRight: {
    width: 1,
  },
  borderBottom: {
    height: 1,
  },
})
