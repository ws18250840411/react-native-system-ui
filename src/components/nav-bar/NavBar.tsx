import React, { useCallback, useState } from 'react'
import { Pressable, Text, View, type LayoutChangeEvent } from 'react-native'
import { ArrowLeft } from 'react-native-system-icon'

import { useAriaPress } from '../../hooks'
import { createHairlineBorderBottom } from '../../utils/hairline'
import { isRenderable, isText, renderTextOrNode } from '../../utils'
import { SafeAreaView } from '../safe-area-view'
import type { NavBarProps } from './types'
import { useNavBarTokens } from './tokens'

const NavBarBaseImpl: React.FC<NavBarProps> = props => {
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
  const safeAreaInsetTop = safeAreaInsetTopProp ?? fixed
  const background = backgroundProp ?? tokens.colors.background

  const handlePressLeft = onPressLeft ?? onClickLeft
  const handlePressRight = onPressRight ?? onClickRight

  const [height, setHeight] = useState(tokens.sizing.height)
  const enablePlaceholder = fixed && placeholder
  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!enablePlaceholder) return
      const nextHeight = event.nativeEvent.layout.height
      setHeight(prev => (Math.abs(prev - nextHeight) < 0.5 ? prev : nextHeight))
    },
    [enablePlaceholder],
  )

  const resolvedColor = tintColor ?? tokens.colors.text
  const sideColor = tintColor ?? tokens.colors.icon
  const leftAccessibilityLabel = isText(leftText) ? `${leftText}` : '返回'
  const rightAccessibilityLabel = isText(rightText) ? `${rightText}` : '操作'

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
      : (isRenderable(leftArrow) && leftArrow)

    const hasAction = !!handlePressLeft
      || isRenderable(arrowNode)
      || isRenderable(leftText)
      || isRenderable(leftIcon)

    if (!hasAction) {
      return <View style={tokens.layout.sidePlaceholder} />
    }

    const content = (
      <>
        {arrowNode}
        {leftIcon}
        {isRenderable(leftText)
          ? isText(leftText)
            ? (
              <Text numberOfLines={1} style={[tokens.layout.sideText, { color: sideColor }]}>
                {leftText}
              </Text>
            )
            : leftText
          : null}
      </>
    )

    if (!handlePressLeft) {
      return (
        <View testID="rv-navbar-left" style={[tokens.layout.side, sideStyle]}>
          {content}
        </View>
      )
    }

    return (
      <Pressable
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        testID="rv-navbar-left"
        style={[tokens.layout.side, sideStyle]}
        {...leftPress.interactionProps}
      >
        {content}
      </Pressable>
    )
  }

  const renderRight = () => {
    const hasAction = !!handlePressRight || isRenderable(rightText) || isRenderable(rightIcon)
    if (!hasAction) {
      return <View style={tokens.layout.sidePlaceholder} />
    }

    const content = (
      <>
        {isRenderable(rightText) && renderTextOrNode(rightText, [tokens.layout.sideText, { color: sideColor }], { numberOfLines: 1 })}
        {rightIcon}
      </>
    )

    if (!handlePressRight) {
      return (
        <View testID="rv-navbar-right" style={[tokens.layout.side, tokens.layout.rightAlign, sideStyle]}>
          {content}
        </View>
      )
    }

    return (
      <Pressable
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        testID="rv-navbar-right"
        style={[tokens.layout.side, tokens.layout.rightAlign, sideStyle]}
        {...rightPress.interactionProps}
      >
        {content}
      </Pressable>
    )
  }

  const centerContent = isRenderable(children) ? children : (
    <View style={tokens.layout.titleWrapper}>
      {isRenderable(title) && renderTextOrNode(title, [
        tokens.layout.title,
        {
          color: resolvedColor,
          fontSize: tokens.typography.titleSize,
          fontWeight: tokens.typography.titleWeight,
        },
        titleStyle,
      ], { numberOfLines: 1 })}
      {isRenderable(description) && renderTextOrNode(description, [
        tokens.layout.description,
        {
          color: tintColor ?? tokens.colors.description,
          fontSize: tokens.typography.descriptionSize,
        },
        descriptionStyle,
      ], { numberOfLines: 1 })}
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
      onLayout={safeAreaInsetTop ? undefined : handleLayout}
    >
      {renderLeft()}
      <View style={tokens.layout.center}>{centerContent}</View>
      {renderRight()}
    </View>
  )

  const wrapped = safeAreaInsetTop ? (
    <SafeAreaView onLayout={handleLayout} style={{ backgroundColor: background }}>
      {bar}
    </SafeAreaView>
  ) : (
    bar
  )

  const navContent = (
    <View
      {...rest}
      accessibilityRole={'navigation' as any}
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
      {enablePlaceholder && <View testID="rv-navbar-placeholder" style={{ height }} />}
      {navContent}
    </>
  )
}

const NavBarBase = React.memo(NavBarBaseImpl)
NavBarBase.displayName = 'NavBar'

export default NavBarBase
