import React from 'react'
import { Pressable, SafeAreaView, Text, View, type TextStyle } from 'react-native'
import { ArrowLeft } from 'react-native-system-icon'

import { useAriaPress } from '../../hooks'
import { createHairlineBorderBottom } from '../../utils/hairline'
import { isRenderable, isText } from '../../utils/validate'
import type { NavBarProps } from './types'
import { useNavBarTokens } from './tokens'

const NavBarBase: React.FC<NavBarProps> = props => {
  const {
    tokensOverride,
    title,
    description,
    children,
    leftText,
    rightText,
    leftIcon,
    rightIcon,
    leftArrow: leftArrowProp,
    fixed: fixedProp,
    placeholder: placeholderProp,
    zIndex: zIndexProp,
    border: borderProp,
    safeAreaInsetTop: safeAreaInsetTopProp,
    background: backgroundProp,
    tintColor,
    titleStyle,
    descriptionStyle,
    sideStyle,
    onPressLeft,
    onClickLeft,
    onPressRight,
    onClickRight,
    style,
    ...rest
  } = props

  const tokens = useNavBarTokens(tokensOverride)
  const leftArrow = leftArrowProp ?? tokens.defaults.leftArrow
  const fixed = fixedProp ?? tokens.defaults.fixed
  const placeholder = placeholderProp ?? tokens.defaults.placeholder
  const zIndex = zIndexProp ?? tokens.defaults.zIndex
  const border = borderProp ?? tokens.defaults.border
  const safeAreaInsetTop = safeAreaInsetTopProp ?? (fixed ? tokens.defaults.safeAreaInsetTop : false)
  const background = backgroundProp ?? tokens.colors.background

  const handlePressLeft = onPressLeft ?? onClickLeft
  const handlePressRight = onPressRight ?? onClickRight

  const [height, setHeight] = React.useState(tokens.sizing.height)

  const resolvedColor = tintColor ?? tokens.colors.text
  const sideColor = tintColor ?? tokens.colors.icon
  const leftAccessibilityLabel = isText(leftText) ? String(leftText) : '返回'
  const rightAccessibilityLabel = isText(rightText) ? String(rightText) : '操作'

  const leftPress = useAriaPress({
    disabled: !handlePressLeft,
    onPress: handlePressLeft,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityLabel: leftAccessibilityLabel,
    },
  })

  const rightPress = useAriaPress({
    disabled: !handlePressRight,
    onPress: handlePressRight,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityLabel: rightAccessibilityLabel,
    },
  })

  const renderLeft = () => {
    const arrowNode = leftArrow === true
      ? <ArrowLeft size={18} fill={sideColor} color={sideColor} />
      : (isRenderable(leftArrow) ? leftArrow : null)

    const hasAction = !!handlePressLeft
      || isRenderable(arrowNode)
      || isRenderable(leftText)
      || isRenderable(leftIcon)

    if (!hasAction) {
      return <View style={tokens.layout.sidePlaceholder} />
    }

    return (
      <Pressable
        hitSlop={8}
        testID="rv-navbar-left"
        style={[tokens.layout.side, sideStyle]}
        {...(handlePressLeft ? leftPress.interactionProps : {})}
      >
        {arrowNode}
        {leftIcon}
        {isRenderable(leftText)
          ? isText(leftText)
            ? <Text style={[tokens.layout.sideText, { color: sideColor }]}>{leftText}</Text>
            : leftText
          : null}
      </Pressable>
    )
  }

  const renderRight = () => {
    const hasAction = !!handlePressRight || isRenderable(rightText) || isRenderable(rightIcon)
    if (!hasAction) {
      return <View style={tokens.layout.sidePlaceholder} />
    }
    return (
      <Pressable
        hitSlop={8}
        testID="rv-navbar-right"
        style={[tokens.layout.side, tokens.layout.rightAlign, sideStyle]}
        {...(handlePressRight ? rightPress.interactionProps : {})}
      >
        {isRenderable(rightText)
          ? isText(rightText)
            ? <Text style={[tokens.layout.sideText, { color: sideColor }]}>{rightText}</Text>
            : rightText
          : null}
        {rightIcon}
      </Pressable>
    )
  }

  const centerContent = isRenderable(children) ? (
    children
  ) : (
    <View style={tokens.layout.titleWrapper}>
      {isRenderable(title)
        ? isText(title)
          ? (
            <Text
              style={[
                tokens.layout.title,
                {
                  color: resolvedColor,
                  fontSize: tokens.typography.titleSize,
                  fontWeight: tokens.typography.titleWeight as TextStyle['fontWeight'],
                },
                titleStyle,
              ]}
              numberOfLines={1}
            >
              {title}
            </Text>
          )
          : title
        : null}
      {isRenderable(description)
        ? isText(description)
          ? (
            <Text
              style={[
                tokens.layout.description,
                {
                  color: tintColor ?? tokens.colors.description,
                  fontSize: tokens.typography.descriptionSize,
                },
                descriptionStyle,
              ]}
              numberOfLines={1}
            >
              {description}
            </Text>
          )
          : description
        : null}
    </View>
  )

  const bar = (
    <View
      style={[
        tokens.layout.bar,
        {
          backgroundColor: background,
        },
        border ? createHairlineBorderBottom(tokens.colors.border) : null,
      ]}
      onLayout={event => {
        const nextHeight = event.nativeEvent.layout.height
        setHeight(prev => (prev === nextHeight ? prev : nextHeight))
      }}
    >
      {renderLeft()}
      <View style={tokens.layout.center}>{centerContent}</View>
      {renderRight()}
    </View>
  )

  const wrapped = safeAreaInsetTop ? (
    <SafeAreaView style={{ backgroundColor: background }}>{bar}</SafeAreaView>
  ) : (
    bar
  )

  const navContent = (
    <View
      {...rest}
      style={[
        tokens.layout.container,
        fixed && [tokens.layout.fixed, { zIndex }],
        style,
      ]}
    >
      {wrapped}
    </View>
  )

  return (
    <>
      {fixed && placeholder ? (
        <View testID="rv-navbar-placeholder" style={{ height }} />
      ) : null}
      {navContent}
    </>
  )
}

NavBarBase.displayName = 'NavBar'

export default NavBarBase
