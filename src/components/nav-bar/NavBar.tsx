import React, { useCallback, useState } from 'react'
import { Pressable, Text, View, type LayoutChangeEvent } from 'react-native'
import { ArrowLeft } from 'react-native-system-icon'
import { useAriaPress } from '../../hooks'
import { useLocale } from '../config-provider/useLocale'
import { useDirection } from '../config-provider/useDirection'
import { createHairlineView } from '../../utils/hairline'
import { isRenderable, isText, renderTextOrNode } from '../../utils'
import { SafeAreaView } from '../safe-area-view'
import type { NavBarProps } from './types'
import { useNavBarTokens } from './tokens'

const NavBarBaseImpl: React.FC<NavBarProps> = props => {
  const { tokensOverride, title, description, children, leftText, rightText, leftIcon, rightIcon, leftArrow: leftArrowProp, fixed: fixedProp, placeholder: placeholderProp, zIndex: zIndexProp, border: borderProp, safeAreaInsetTop: safeAreaInsetTopProp, background: backgroundProp, tintColor, titleStyle, descriptionStyle, sideStyle, onPressLeft, onClickLeft, onPressRight, onClickRight, style, ...rest } = props
  const locale = useLocale()
  const dir = useDirection()
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
  const handleLayout = useCallback((event: LayoutChangeEvent) => { if (!enablePlaceholder) return; const nextHeight = event.nativeEvent.layout.height; setHeight(prev => (Math.abs(prev - nextHeight) < 0.5 ? prev : nextHeight)) }, [enablePlaceholder])
  const resolvedColor = tintColor ?? tokens.colors.text
  const sideColor = tintColor ?? tokens.colors.icon
  const leftPress = useAriaPress({ disabled: !handlePressLeft, onPress: handlePressLeft, extraProps: { accessibilityRole: 'button', accessibilityLabel: isText(leftText) ? `${leftText}` : (locale?.vanNavBar?.back ?? 'Back') } })
  const rightPress = useAriaPress({ disabled: !handlePressRight, onPress: handlePressRight, extraProps: { accessibilityRole: 'button', accessibilityLabel: isText(rightText) ? `${rightText}` : (locale?.vanNavBar?.action ?? 'Actions') } })
  const renderSide = (side: 'left' | 'right') => {
    const isLeft = side === 'left'
    const sideText = isLeft ? leftText : rightText
    const sideIcon = isLeft ? leftIcon : rightIcon
    const press = isLeft ? leftPress : rightPress
    const handler = isLeft ? handlePressLeft : handlePressRight
    const arrowNode = isLeft ? (leftArrow === true ? <ArrowLeft size={18} fill={sideColor} color={sideColor} style={dir === 'rtl' ? { transform: [{ scaleX: -1 }] } : undefined} /> : (isRenderable(leftArrow) && leftArrow)) : null
    const hasAction = !!handler || isRenderable(arrowNode) || isRenderable(sideText) || isRenderable(sideIcon)
    if (!hasAction) return <View style={tokens.layout.sidePlaceholder} />
    const content = <>{arrowNode}{isRenderable(sideIcon) ? sideIcon : null}{isRenderable(sideText) ? isText(sideText) ? <Text numberOfLines={1} style={[tokens.layout.sideText, { color: sideColor, fontFamily: tokens.typography.fontFamily }]}>{sideText}</Text> : sideText : null}</>
    const sideStyles = [tokens.layout.side, !isLeft && tokens.layout.rightAlign, sideStyle]
    if (!handler) return <View testID={`rv-navbar-${side}`} style={sideStyles}>{content}</View>
    return <Pressable hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }} testID={`rv-navbar-${side}`} style={sideStyles} {...press.interactionProps}>{content}</Pressable>
  }
  const centerContent = isRenderable(children) ? children : (
    <View style={tokens.layout.titleWrapper}>
      {isRenderable(title) && renderTextOrNode(title, [tokens.layout.title, { color: resolvedColor, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.titleSize, fontWeight: tokens.typography.titleWeight }, titleStyle], { numberOfLines: 1 })}
      {isRenderable(description) && renderTextOrNode(description, [tokens.layout.description, { color: tintColor ?? tokens.colors.description, fontFamily: tokens.typography.fontFamily, fontSize: tokens.typography.descriptionSize }, descriptionStyle], { numberOfLines: 1 })}
    </View>
  )
  const navbarBar = (
    <View style={[tokens.layout.bar, { backgroundColor: background }]} onLayout={safeAreaInsetTop ? undefined : handleLayout}>
      {renderSide('left')}
      <View style={tokens.layout.center}>{centerContent}</View>
      {renderSide('right')}
      {border && <View style={createHairlineView({ position: 'bottom', color: tokens.colors.border, left: 0, right: 0 })} />}
    </View>
  )
  const wrappedBar = safeAreaInsetTop ? <SafeAreaView onLayout={handleLayout} style={{ backgroundColor: background }}>{navbarBar}</SafeAreaView> : navbarBar
  return (
    <>
      {enablePlaceholder && <View testID="rv-navbar-placeholder" style={{ height }} />}
      <View {...rest} accessibilityRole={'navigation' as any} style={[tokens.layout.container, fixed && [tokens.layout.fixed, { zIndex }], style]}>{wrappedBar}</View>
    </>
  )
}

const NavBarBase = React.memo(NavBarBaseImpl)
NavBarBase.displayName = 'NavBar'
export default NavBarBase
