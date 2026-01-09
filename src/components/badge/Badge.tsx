import React from 'react'
import { Pressable, Text, View, type LayoutChangeEvent, type ViewStyle } from 'react-native'

import { isNumericLike } from '../../utils/number'
import { isRenderable } from '../../utils/validate'
import { useBadgeTokens } from './tokens'
import type { BadgeProps } from './types'

export const Badge = React.forwardRef<View, BadgeProps>((props, ref) => {
  const {
    children,
    content,
    color,
    textColor,
    dot: dotProp,
    max,
    offset,
    showZero,
    badgeStyle,
    textStyle: userTextStyle,
    onPress,
    style,
    tokensOverride,
    ...rest
  } = props

  const tokens = useBadgeTokens(tokensOverride)
  const dot = dotProp ?? tokens.defaults.dot
  const resolvedShowZero = showZero ?? tokens.defaults.showZero
  const hasChildren = React.Children.count(children) > 0

  const { visible, formattedContent } = React.useMemo(() => {
    const numericContent = isNumericLike(content) ? Number(content) : null
    const shouldHide = numericContent === 0 && !resolvedShowZero
    const isVisible = dot || (isRenderable(content) && !shouldHide)

    if (!isVisible || dot) return { visible: isVisible, formattedContent: null }

    const numericMax = isNumericLike(max) ? Number(max) : null
    const finalContent =
      numericContent !== null && numericMax !== null && numericContent > numericMax
        ? `${numericMax}+`
        : content

    return { visible: true, formattedContent: finalContent }
  }, [content, dot, max, resolvedShowZero])

  const [size, setSize] = React.useState({ width: 0, height: 0 })

  const handleLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout
      if (width !== size.width || height !== size.height) {
        setSize({ width, height })
      }
    },
    [size.width, size.height]
  )

  const transformStyle = React.useMemo(() => {
    if (!hasChildren) return undefined
    if (dot) {
      const half = tokens.sizing.dotSize / 2
      return { transform: [{ translateX: half }, { translateY: -half }] }
    }
    if (size.width === 0) return { opacity: 0 }
    return {
      transform: [
        { translateX: size.width / 2 },
        { translateY: -size.height / 2 },
      ],
    }
  }, [hasChildren, dot, tokens.sizing.dotSize, size.width, size.height])

  const baseBadgeStyle = React.useMemo(() => {
    if (dot) {
      return {
        width: tokens.sizing.dotSize,
        height: tokens.sizing.dotSize,
        borderRadius: tokens.radii.dot,
        backgroundColor: color ?? tokens.colors.dot,
      }
    }
    return {
      minWidth: tokens.sizing.minWidth,
      minHeight: tokens.sizing.height,
      paddingHorizontal: tokens.sizing.paddingHorizontal,
      paddingVertical: tokens.sizing.paddingVertical,
      borderRadius: tokens.radii.badge,
      borderWidth: tokens.borders.width,
      borderColor: tokens.colors.border,
      backgroundColor: color ?? tokens.colors.background,
    }
  }, [dot, color, tokens])

  const mergedTextStyle = React.useMemo(
    () => [
      tokens.layout.text,
      {
        color: textColor ?? tokens.colors.text,
        fontSize: tokens.typography.fontSize,
        lineHeight: tokens.typography.lineHeight,
        fontFamily: tokens.typography.fontFamily,
        fontWeight: tokens.typography.fontWeight,
      },
      userTextStyle,
    ],
    [textColor, tokens, userTextStyle]
  )

  const offsetStyle = React.useMemo(() => {
    if (!offset) return undefined
    const [x, y] = offset
    return (hasChildren
      ? { right: x, top: y }
      : { marginLeft: x, marginTop: y }) as ViewStyle
  }, [offset, hasChildren])

  const badgeElement = React.useMemo(() => {
    if (!visible) return null

    return (
      <View
        pointerEvents={hasChildren ? 'none' : 'auto'}
        onLayout={hasChildren && !dot ? handleLayout : undefined}
        style={[
          hasChildren ? tokens.layout.badgeAbsolute : tokens.layout.badgeStandalone,
          baseBadgeStyle,
          transformStyle,
          offsetStyle,
          badgeStyle,
          !hasChildren ? style : undefined,
        ]}
      >
        {!dot &&
          (React.isValidElement(formattedContent) ? (
            formattedContent
          ) : (
            <Text style={mergedTextStyle}>{formattedContent}</Text>
          ))}
      </View>
    )
  }, [
    visible,
    hasChildren,
    dot,
    handleLayout,
    baseBadgeStyle,
    transformStyle,
    offsetStyle,
    badgeStyle,
    style,
    formattedContent,
    mergedTextStyle,
  ])

  if (hasChildren) {
    if (onPress) {
      return (
        <Pressable
          ref={ref}
          onPress={onPress}
          style={({ pressed }) => [
            tokens.layout.wrapper,
            style,
            pressed && { opacity: tokens.defaults.pressedOpacity },
          ]}
          {...rest}
        >
          {children}
          {badgeElement}
        </Pressable>
      )
    }

    return (
      <View ref={ref} style={[tokens.layout.wrapper, style]} {...rest}>
        {children}
        {badgeElement}
      </View>
    )
  }

  if (!visible) return null

  if (onPress) {
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        style={({ pressed }) => [
          tokens.layout.pressableStandalone,
          pressed && { opacity: tokens.defaults.pressedOpacity },
        ]}
        {...rest}
      >
        {badgeElement}
      </Pressable>
    )
  }

  return React.cloneElement(badgeElement as React.ReactElement<any>, { ref, ...rest })
})

Badge.displayName = 'Badge'
