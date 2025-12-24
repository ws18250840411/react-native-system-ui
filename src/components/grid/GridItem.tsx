import React from 'react'
import type { PressableStateCallbackType, TextStyle, ViewStyle } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import Badge from '../badge'
import { createHairlineView } from '../../utils/hairline'
import type { GridItemProps } from './types'
import { GridContext } from './GridContext'

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
    flexBasis: widthPercent as any, // TypeScript type workaround
    width: widthPercent as any,
    maxWidth: widthPercent as any,
    borderColor: tokens.colors.border,
  }

  // react-vant square 处理：当 square 为 true 时，使用 paddingTop 撑开高度实现正方形
  if (square) {
    baseItemStyle.height = 0
    baseItemStyle.paddingTop = widthPercent as any // 使用 paddingTop 撑开高度，实现正方形
  }

  // react-vant gutter 处理逻辑
  if (gutter) {
    baseItemStyle.paddingRight = gutter
    if (rowIndex > 0) {
      baseItemStyle.marginTop = gutter
    }
  }

  // react-vant 边框通过 content 的 ::after 伪元素实现
  // 在 React Native 中，我们使用独立 View 作为边框，统一使用 hairline 工具函数

  const contentOrientation = direction === 'horizontal' ? styles.horizontal : styles.vertical
  const reverseStyle = reverse
    ? direction === 'horizontal'
      ? styles.reverseRow
      : styles.reverseColumn
    : null

  // react-vant: contentStyle 处理
  // 官方实现：只在 square && gutter 时设置 contentStyle
  const contentBaseStyle: ViewStyle = {
    paddingHorizontal: tokens.spacing.paddingHorizontal,
    paddingVertical: tokens.spacing.paddingVertical,
    backgroundColor: tokens.colors.background,
  }

  // react-vant: &__content--square { position: absolute; top: 0; right: 0; left: 0; }
  if (square) {
    contentBaseStyle.position = 'absolute'
    contentBaseStyle.top = 0
    contentBaseStyle.right = 0
    contentBaseStyle.left = 0
  }

  // react-vant: 当 square && gutter 时，调整 right 和 bottom，设置 height: auto
  if (square && gutter) {
    contentBaseStyle.right = gutter
    contentBaseStyle.bottom = gutter
    contentBaseStyle.height = 'auto'
  }

  // 渲染边框（通过独立 View 实现）
  // react-vant: &__content::after { border-width: 0 var(--rv-border-width-base) var(--rv-border-width-base) 0; }
  // 当 border && gutter 时，使用 surround 类：border-width: var(--rv-border-width-base);
  const renderBorder = () => {
    if (!border) return null

    // 无 gutter 时，只显示右边和底部边框
    const borderViews: React.ReactNode[] = []

    // 右侧边框（非最后一列）
    if (!isLastColumn) {
      borderViews.push(
        <View
          key="right"
          style={createHairlineView({
            position: 'right',
            color: tokens.colors.border,
            top: 0,
            bottom: 0,
            right: 0,
          })}
        />
      )
    }

    // 底部边框（非最后一行）
    if (rowIndex < lastRowIndex) {
      borderViews.push(
        <View
          key="bottom"
          style={createHairlineView({
            position: 'bottom',
            color: tokens.colors.border,
            left: 0,
            right: 0,
            bottom: 0,
          })}
        />
      )
    }

    return borderViews.length > 0 ? <>{borderViews}</> : null
  }

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
      ? typeof icon === 'function'
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

    if (typeof text === 'string' || typeof text === 'number') {
      const textStyles: TextStyle = {
        color: tokens.colors.text,
        fontSize: tokens.typography.fontSize,
        lineHeight: tokens.typography.lineHeight,
        fontFamily: tokens.typography.fontFamily,
        fontWeight: tokens.typography.fontWeight as any, // TypeScript type workaround
      }

      return (
        <Text style={[styles.text, textStyles, textStyle]} numberOfLines={2}>
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
    const pressableStyle = (state: PressableStateCallbackType): ViewStyle[] => [
      baseItemStyle,
      style as ViewStyle,
      { opacity: state.pressed ? 0.85 : 1 },
    ]

    return (
      <Pressable
        style={pressableStyle}
        android_ripple={{ color: tokens.colors.active }}
        onPress={onPress}
        {...rest}
      >
        <View style={contentWrapperStyle}>
          {contentBody}
          {renderBorder()}
        </View>
      </Pressable>
    )
  }

  return (
    <View style={[baseItemStyle, style as ViewStyle]} {...rest}>
      <View style={contentWrapperStyle}>
        {contentBody}
        {renderBorder()}
      </View>
    </View>
  )
}

GridItem.displayName = 'GridItem'

const styles = StyleSheet.create({
  contentBase: {
    // react-vant: &__content { height: 100%; }
    // 在 React Native 中，我们使用 flex: 1 让 content 填充父容器
    // 这样自定义内容（如 Image）也能正确显示
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
})
