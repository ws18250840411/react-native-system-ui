import React, { useCallback, useMemo, useState } from 'react'
import { Pressable, Text, View, type LayoutChangeEvent, type ViewStyle } from 'react-native'

import { isNumericLike, isRenderable } from '../../utils'
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

  const { visible, formattedContent } = useMemo(() => {
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

  const [size, setSize] = useState({ width: 0, height: 0 })

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout
      setSize(prev => (prev.width === width && prev.height === height ? prev : { width, height }))
    },
    []
  )

  const transformStyle = useMemo(() => {
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
  }, [dot, hasChildren, size.height, size.width, tokens.sizing.dotSize])

  const baseBadgeStyle = useMemo(() => (
    dot
      ? {
        width: tokens.sizing.dotSize,
        height: tokens.sizing.dotSize,
        borderRadius: tokens.radii.dot,
        backgroundColor: color ?? tokens.colors.dot,
      }
      : {
        minWidth: tokens.sizing.minWidth,
        minHeight: tokens.sizing.height,
        paddingHorizontal: tokens.sizing.paddingHorizontal,
        paddingVertical: tokens.sizing.paddingVertical,
        borderRadius: tokens.radii.badge,
        borderWidth: tokens.borders.width,
        borderColor: tokens.colors.border,
        backgroundColor: color ?? tokens.colors.background,
      }
  ), [
    color,
    dot,
    tokens.borders.width,
    tokens.colors.background,
    tokens.colors.border,
    tokens.colors.dot,
    tokens.radii.badge,
    tokens.radii.dot,
    tokens.sizing.dotSize,
    tokens.sizing.height,
    tokens.sizing.minWidth,
    tokens.sizing.paddingHorizontal,
    tokens.sizing.paddingVertical,
  ])

  const mergedTextStyle = [
    tokens.layout.text,
    {
      color: textColor ?? tokens.colors.text,
      fontSize: tokens.typography.fontSize,
      lineHeight: tokens.typography.lineHeight,
      fontFamily: tokens.typography.fontFamily,
      fontWeight: tokens.typography.fontWeight,
    },
    userTextStyle,
  ]

  const offsetStyle = useMemo(() => {
    if (!offset) return undefined
    const [x, y] = offset
    return (hasChildren ? { right: x, top: y } : { marginLeft: x, marginTop: y }) as ViewStyle
  }, [hasChildren, offset])

  const badgeElement = !visible ? null : (
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
      {!dot && (React.isValidElement(formattedContent) ? formattedContent : (
        <Text style={mergedTextStyle}>{formattedContent}</Text>
      ))}
    </View>
  )

  if (hasChildren) {
    return onPress ? (
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
    ) : (
      <View ref={ref} style={[tokens.layout.wrapper, style]} {...rest}>
        {children}
        {badgeElement}
      </View>
    )
  }

  if (!visible) return null

  return onPress ? (
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
  ) : (
    React.cloneElement(badgeElement as React.ReactElement<any>, { ref, ...rest })
  )
})

Badge.displayName = 'Badge'
