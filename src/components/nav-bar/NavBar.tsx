import React from 'react'
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ArrowLeft } from 'react-native-system-icon'

import { useAriaPress } from '../../hooks'
import { createHairlineBorderBottom } from '../../utils/hairline'
import type { NavBarProps } from './types'
import { useNavBarTokens } from './tokens'

const isRenderableNode = (node: React.ReactNode) => node !== null && node !== undefined && node !== false
const isTextLikeNode = (node: React.ReactNode): node is string | number =>
  typeof node === 'string' || typeof node === 'number'

const NavBarBase: React.FC<NavBarProps> = props => {
  const tokens = useNavBarTokens()
  const {
    title,
    description,
    children,
    leftText,
    rightText,
    leftIcon,
    rightIcon,
    leftArrow = true,
    fixed = tokens.defaults.fixed,
    placeholder = tokens.defaults.placeholder,
    zIndex = 1,
    border = tokens.defaults.border,
    safeAreaInsetTop = fixed ? tokens.defaults.safeAreaInsetTop : false,
    background = tokens.colors.background,
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

  const handlePressLeft = onPressLeft ?? onClickLeft
  const handlePressRight = onPressRight ?? onClickRight

  const [height, setHeight] = React.useState(tokens.layout.height)

  const resolvedColor = tintColor ?? tokens.colors.text
  const sideColor = tintColor ?? tokens.colors.icon

  const hasLeftArrow = leftArrow !== false && leftArrow !== null && leftArrow !== undefined
  const hasLeftAction = Boolean(handlePressLeft) || hasLeftArrow || isRenderableNode(leftText) || isRenderableNode(leftIcon)
  const hasRightAction = Boolean(handlePressRight) || isRenderableNode(rightText) || isRenderableNode(rightIcon)

  const leftPress = useAriaPress({
    disabled: !handlePressLeft,
    onPress: handlePressLeft,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityLabel: '返回',
    },
  })

  const rightPress = useAriaPress({
    disabled: !handlePressRight,
    onPress: handlePressRight,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityLabel: '操作',
    },
  })

  const renderLeft = () => {
    const arrowNode =
      leftArrow === false || leftArrow === null || leftArrow === undefined
        ? null
        : typeof leftArrow === 'boolean'
          ? <ArrowLeft size={18} fill={sideColor} color={sideColor} />
          : leftArrow

    if (!hasLeftAction) {
      return <View style={styles.sidePlaceholder} />
    }

    return (
      <Pressable
        hitSlop={8}
        testID="rv-navbar-left"
        style={[styles.side, sideStyle]}
        {...(handlePressLeft ? leftPress.interactionProps : {})}
      >
        {arrowNode}
        {leftIcon}
        {isRenderableNode(leftText)
          ? isTextLikeNode(leftText)
            ? <Text style={[styles.sideText, { color: sideColor }]}>{leftText}</Text>
            : leftText
          : null}
      </Pressable>
    )
  }

  const renderRight = () => {
    if (!hasRightAction) {
      return <View style={styles.sidePlaceholder} />
    }
    return (
      <Pressable
        hitSlop={8}
        testID="rv-navbar-right"
        style={[styles.side, styles.rightAlign, sideStyle]}
        {...(handlePressRight ? rightPress.interactionProps : {})}
      >
        {isRenderableNode(rightText)
          ? isTextLikeNode(rightText)
            ? <Text style={[styles.sideText, { color: sideColor }]}>{rightText}</Text>
            : rightText
          : null}
        {rightIcon}
      </Pressable>
    )
  }

  const centerContent = isRenderableNode(children) ? (
    children
  ) : (
    <View style={styles.titleWrapper}>
      {isRenderableNode(title)
        ? isTextLikeNode(title)
          ? (
              <Text
                style={[
                  styles.title,
                  {
                    color: resolvedColor,
                    fontSize: tokens.typography.titleSize,
                    fontWeight: tokens.typography.titleWeight,
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
      {isRenderableNode(description)
        ? isTextLikeNode(description)
          ? (
              <Text
                style={[
                  styles.description,
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
        styles.bar,
        {
          backgroundColor: background,
          paddingHorizontal: tokens.layout.paddingHorizontal,
        },
        border ? createHairlineBorderBottom(tokens.colors.border) : null,
      ]}
      onLayout={event => setHeight(event.nativeEvent.layout.height)}
    >
      {renderLeft()}
      <View style={styles.center}>{centerContent}</View>
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
      style={[styles.container, fixed && [styles.fixed, { zIndex }], style]}
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  side: {
    minWidth: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rightAlign: {
    justifyContent: 'flex-end',
  },
  sidePlaceholder: {
    minWidth: 60,
  },
  sideText: {
    fontSize: 16,
  },
  titleWrapper: {
    alignItems: 'center',
  },
  title: {
    includeFontPadding: false,
  },
  description: {
    marginTop: 2,
    includeFontPadding: false,
  },
  fixed: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
})

NavBarBase.displayName = 'NavBar'

export default NavBarBase
