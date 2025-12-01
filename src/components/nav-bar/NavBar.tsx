import React from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { useAriaPress } from '../../hooks'
import Icon from '../icon'
import type { NavBarProps } from './types'
import { useNavBarTokens } from './tokens'

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
    zIndex = 99,
    border = tokens.defaults.border,
    safeAreaInsetTop = fixed ? tokens.defaults.safeAreaInsetTop : false,
    background = tokens.colors.background,
    tintColor,
    titleStyle,
    descriptionStyle,
    sideStyle,
    onPressLeft,
    onPressRight,
    style,
    ...rest
  } = props

  const [height, setHeight] = React.useState(tokens.layout.height)

  const resolvedColor = tintColor ?? tokens.colors.text
  const sideColor = tintColor ?? tokens.colors.icon

  const hasLeftAction = Boolean(leftText || leftIcon || leftArrow || onPressLeft)
  const hasRightAction = Boolean(rightText || rightIcon || onPressRight)

  const leftPress = useAriaPress({
    disabled: !onPressLeft,
    onPress: onPressLeft,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityLabel: '返回',
    },
  })

  const rightPress = useAriaPress({
    disabled: !onPressRight,
    onPress: onPressRight,
    extraProps: {
      accessibilityRole: 'button',
      accessibilityLabel: '操作',
    },
  })

  const renderLeft = () => {
    const arrowNode = leftArrow
      ? typeof leftArrow === 'boolean'
        ? <Icon name="arrow-left" size={18} color={sideColor} />
        : leftArrow
      : null

    if (!hasLeftAction) {
      return <View style={styles.sidePlaceholder} />
    }

    return (
      <Pressable
        hitSlop={8}
        testID="rv-navbar-left"
        style={[styles.side, sideStyle]}
        {...(onPressLeft ? leftPress.interactionProps : {})}
      >
        {arrowNode}
        {leftIcon}
        {leftText ? (
          <Text style={[styles.sideText, { color: sideColor }]}>{leftText}</Text>
        ) : null}
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
        {...(onPressRight ? rightPress.interactionProps : {})}
      >
        {rightText ? (
          <Text style={[styles.sideText, { color: sideColor }]}>{rightText}</Text>
        ) : null}
        {rightIcon}
      </Pressable>
    )
  }

  const centerContent = children ? (
    children
  ) : (
    <View style={styles.titleWrapper}>
      {title ? (
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
      ) : null}
      {description ? (
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
      ) : null}
    </View>
  )

  const bar = (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: background,
          paddingHorizontal: tokens.layout.paddingHorizontal,
          borderBottomWidth: border ? StyleSheet.hairlineWidth : 0,
          borderBottomColor: tokens.colors.border,
        },
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
})

NavBarBase.displayName = 'NavBar'

export default NavBarBase
