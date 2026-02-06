import React, { useContext } from 'react'
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native'

import { withAlpha } from '../../utils/color'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { ensureSpace } from '../../utils/string'
import { isFiniteNumber, isFunction, isNumber, isString, isText } from '../../utils/validate'
import { useAriaPress } from '../../hooks'
import type {
  ButtonProps,
  ButtonShadowLevel,
} from './types'
import { ButtonGroupContext } from './ButtonContext'
import { useButtonTokens } from './tokens'

const clampShadowLevel = (level: number): ButtonShadowLevel =>
  level <= 1 ? 1 : level >= 3 ? 3 : level as ButtonShadowLevel

const resolveSpinnerSize = (loadingSize: ButtonProps['loadingSize'], iconSize: number) =>
  isNumber(loadingSize) ? loadingSize : Math.max(iconSize, 16) * (loadingSize === 'large' ? 1.25 : 1)

export const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (props, forwardedRef) => {
    const group = useContext(ButtonGroupContext)

    const {
      text,
      children,
      icon,
      iconPosition: iconPositionProp,
      type: typeProp,
      size: sizeProp,
      color,
      textColor,
      plain: plainProp,
      block: blockProp,
      round: roundProp,
      square: squareProp,
      hairline: hairlineProp,
      shadow: shadowProp,
      loading: loadingProp,
      loadingText,
      loadingIndicator,
      loadingSize: loadingSizeProp,
      disabled: disabledProp,
      allowFontScaling: allowFontScalingProp,
      maxFontSizeMultiplier,
      rippleColor: rippleColorProp,
      contentStyle,
      textStyle,
      tokensOverride,
      style,
      ...pressableProps
    } = props

    const buttonTokens = useButtonTokens(tokensOverride)
    const type = typeProp ?? group?.type ?? buttonTokens.defaults.type
    const size = sizeProp ?? group?.size ?? buttonTokens.defaults.size
    const plain = plainProp ?? group?.plain ?? buttonTokens.defaults.plain
    const block = blockProp ?? group?.block ?? buttonTokens.defaults.block
    const round = roundProp ?? group?.round ?? buttonTokens.defaults.round
    const square = squareProp ?? group?.square ?? buttonTokens.defaults.square
    const hairline = hairlineProp ?? group?.hairline ?? buttonTokens.defaults.hairline
    const iconPosition =
      iconPositionProp ?? group?.iconPosition ?? buttonTokens.defaults.iconPosition
    const groupShadow = group?.shadow
    const shadowValue = shadowProp ?? groupShadow
    const disabled = disabledProp ?? group?.disabled ?? buttonTokens.defaults.disabled
    const loading = loadingProp ?? buttonTokens.defaults.loading
    const loadingSize = loadingSizeProp ?? buttonTokens.defaults.loadingSize
    const allowFontScaling = allowFontScalingProp ?? buttonTokens.defaults.allowFontScaling
    const tone = buttonTokens.colors.tones[type] ?? buttonTokens.colors.tones.default
    const sizeTokens = buttonTokens.sizing.sizes[size]

    let backgroundColor = color ?? tone.background
    let borderColor = color ?? tone.border
    let resolvedTextColor = textColor ?? (color ? '#ffffff' : tone.text)

    if (plain) {
      backgroundColor = buttonTokens.colors.backgroundPlain
      borderColor = color ?? tone.border
      resolvedTextColor = textColor ?? (type === 'default' && !color ? tone.text : color ?? tone.border)
    }

    const shouldRenderBorder = plain || type === 'default'
    const resolvedBorderWidth = shouldRenderBorder
      ? hairline ? buttonTokens.borders.hairlineWidth : buttonTokens.borders.width
      : 0

    const borderRadius = square ? 0 : round ? sizeTokens.height / 2 : sizeTokens.radius

    const isDisabled = disabled || loading

    const resolvedShadowLevel = isFiniteNumber(shadowValue)
      ? clampShadowLevel(shadowValue)
      : shadowValue === true ? clampShadowLevel(2) : undefined
    const shadowTokens = resolvedShadowLevel && !plain ? buttonTokens.shadows[resolvedShadowLevel] : undefined
    const shadowStyle = shadowTokens ? createPlatformShadow(shadowTokens) : undefined

    const iconGap = buttonTokens.spacing.iconGap
    const iconWrapperStyle = iconPosition === 'left'
      ? { marginRight: iconGap }
      : { marginLeft: iconGap }

    const renderIcon = () => {
      if (!icon) return null
      try {
        const iconElement = isFunction(icon)
          ? icon(resolvedTextColor, sizeTokens.iconSize)
          : icon

        return (
          <View style={[buttonTokens.layout.iconWrapper, iconWrapperStyle]}>
            {iconElement}
          </View>
        )
      } catch (error) {
        if (typeof __DEV__ !== 'undefined' && __DEV__) {
          console.warn('[Button] Failed to render icon:', error)
        }
        return null
      }
    }

    const renderLoading = () => (
      <View style={[buttonTokens.layout.iconWrapper, { marginRight: iconGap }]}>
        {loadingIndicator ?? (
          <ActivityIndicator
            size={isNumber(loadingSize) ? resolveSpinnerSize(loadingSize, sizeTokens.iconSize) : loadingSize}
            color={resolvedTextColor}
          />
        )}
      </View>
    )

    const label =
      loading && loadingText !== undefined
        ? loadingText
        : text !== undefined
          ? text
          : children

    const sharedTextStyle = {
      fontFamily: buttonTokens.typography.fontFamily,
      fontWeight: buttonTokens.typography.fontWeight,
      fontSize: sizeTokens.fontSize,
      lineHeight: sizeTokens.fontSize * buttonTokens.typography.lineHeightMultiplier,
      color: resolvedTextColor,
    }

    const renderText = () => {
      if (label == null) return null

      if (isText(label)) {
        const content =
          isString(label) ? ensureSpace(label, true) : String(label)

        return (
          <Text
            style={[buttonTokens.layout.text, sharedTextStyle, textStyle]}
            numberOfLines={1}
            allowFontScaling={allowFontScaling}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
          >
            {content}
          </Text>
        )
      }

      return label
    }

    const content = (
      <View style={[buttonTokens.layout.content, contentStyle]}>
        {loading ? (
          <>
            {renderLoading()}
            {renderText()}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && renderIcon()}
            {renderText()}
            {icon && iconPosition === 'right' && renderIcon()}
          </>
        )}
      </View>
    )

    const {
      onPress,
      onPressIn,
      onPressOut,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      accessibilityState,
      android_ripple: androidRippleProp,
      ...viewProps
    } = pressableProps

    const resolvedAccessibilityLabel =
      accessibilityLabel ??
      (isText(label)
        ? String(label)
        : undefined)

    const { interactionProps, states } = useAriaPress({
      disabled: isDisabled,
      onPress: onPress || undefined,
      onPressStart: onPressIn || undefined,
      onPressEnd: onPressOut || undefined,
    })

    const resolvedOpacity = disabled
      ? buttonTokens.states.disabledOpacity
      : loading
        ? buttonTokens.states.loadingOpacity
        : states.pressed
          ? buttonTokens.states.pressedOpacity
          : 1

    const containerStyle = {
      minHeight: sizeTokens.height,
      paddingHorizontal: sizeTokens.paddingHorizontal,
      borderRadius,
      backgroundColor,
      borderColor,
      borderWidth: resolvedBorderWidth,
      opacity: resolvedOpacity,
    }
    const rippleClipStyle =
      Platform.OS === 'android' && borderRadius > 0 && !shadowStyle
        ? { overflow: 'hidden' as const }
        : null
    const baseContainerStyle = [
      buttonTokens.layout.base,
      containerStyle,
      rippleClipStyle,
      block ? buttonTokens.layout.block : null,
      shadowStyle,
      style,
    ]

    const mergedAccessibilityState = {
      ...accessibilityState,
      disabled: isDisabled,
      busy: loading,
    }
    const defaultRippleColor =
      rippleColorProp ??
      (plain
        ? resolvedTextColor
        : type === 'default' && !color
          ? withAlpha(resolvedTextColor, 0.15)
          : buttonTokens.colors.ripple)
    const resolvedAndroidRipple =
      Platform.OS === 'android'
        ? androidRippleProp ?? { color: defaultRippleColor, borderless: false }
        : androidRippleProp

    return (
      <Pressable
        ref={forwardedRef}
        disabled={isDisabled}
        style={baseContainerStyle}
        android_ripple={resolvedAndroidRipple}
        {...interactionProps}
        accessibilityState={mergedAccessibilityState}
        accessibilityRole={accessibilityRole ?? 'button'}
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityHint={accessibilityHint}
        {...viewProps}
      >
        {content}
      </Pressable>
    )
  }
)

Button.displayName = 'Button'

export default Button
