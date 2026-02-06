import React, { useContext, useMemo } from 'react'
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
import { isFiniteNumber, isFunction, isString, renderTextOrNode } from '../../utils'
import { useAriaPress } from '../../hooks'
import type {
  ButtonProps,
  ButtonShadowLevel,
} from './types'
import { ButtonGroupContext } from './ButtonContext'
import { useButtonTokens } from './tokens'

const clampShadowLevel = (level: number): ButtonShadowLevel =>
  level <= 1 ? 1 : level >= 3 ? 3 : level as ButtonShadowLevel

const RIPPLE_CLIP_STYLE = { overflow: 'hidden' as const }

const ButtonImpl = (
  props: ButtonProps,
  forwardedRef: React.ForwardedRef<React.ElementRef<typeof Pressable>>,
) => {
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

  const tokens = useButtonTokens(tokensOverride)
  const type = typeProp ?? group?.type ?? tokens.defaults.type
  const size = sizeProp ?? group?.size ?? tokens.defaults.size
  const plain = plainProp ?? group?.plain ?? tokens.defaults.plain
  const block = blockProp ?? group?.block ?? tokens.defaults.block
  const round = roundProp ?? group?.round ?? tokens.defaults.round
  const square = squareProp ?? group?.square ?? tokens.defaults.square
  const hairline = hairlineProp ?? group?.hairline ?? tokens.defaults.hairline
  const iconPosition = iconPositionProp ?? group?.iconPosition ?? tokens.defaults.iconPosition
  const disabled = disabledProp ?? group?.disabled ?? tokens.defaults.disabled
  const loading = loadingProp ?? tokens.defaults.loading
  const loadingSize = loadingSizeProp ?? tokens.defaults.loadingSize
  const allowFontScaling = allowFontScalingProp ?? tokens.defaults.allowFontScaling
  const shadowValue = shadowProp ?? group?.shadow
  const isDisabled = disabled || loading

  const tone = tokens.colors.tones[type] ?? tokens.colors.tones.default
  const sizeTokens = tokens.sizing.sizes[size]

  const [bgColor, bdColor, txtColor] = useMemo(() => {
    if (plain) {
      return [
        tokens.colors.backgroundPlain,
        color ?? tone.border,
        textColor ?? (type === 'default' && !color ? tone.text : color ?? tone.border),
      ]
    }
    return [
      color ?? tone.background,
      color ?? tone.border,
      textColor ?? (color ? '#ffffff' : tone.text),
    ]
  }, [color, textColor, plain, type, tone, tokens.colors.backgroundPlain])

  const borderWidth = (plain || type === 'default')
    ? hairline ? tokens.borders.hairlineWidth : tokens.borders.width
    : 0
  const borderRadius = square ? 0 : round ? sizeTokens.height / 2 : sizeTokens.radius

  const shadowStyle = useMemo(() => {
    if (plain) return undefined
    const level = isFiniteNumber(shadowValue)
      ? clampShadowLevel(shadowValue)
      : shadowValue === true ? 2 as ButtonShadowLevel : undefined
    return level ? createPlatformShadow(tokens.shadows[level]) : undefined
  }, [shadowValue, plain, tokens.shadows])

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

  const { interactionProps, states } = useAriaPress({
    disabled: isDisabled,
    onPress: onPress || undefined,
    onPressStart: onPressIn || undefined,
    onPressEnd: onPressOut || undefined,
  })

  const opacity = disabled
    ? tokens.states.disabledOpacity
    : loading
      ? tokens.states.loadingOpacity
      : states.pressed
        ? tokens.states.pressedOpacity
        : 1

  const sharedTextStyle = useMemo(() => ({
    fontFamily: tokens.typography.fontFamily,
    fontWeight: tokens.typography.fontWeight,
    fontSize: sizeTokens.fontSize,
    lineHeight: sizeTokens.fontSize * tokens.typography.lineHeightMultiplier,
    color: txtColor,
  }), [tokens.typography, sizeTokens.fontSize, txtColor])

  const iconGap = tokens.spacing.iconGap

  const renderIcon = () => {
    if (!icon) return null
    try {
      const el = isFunction(icon) ? icon(txtColor, sizeTokens.iconSize) : icon
      const margin = iconPosition === 'left' ? { marginRight: iconGap } : { marginLeft: iconGap }
      return <View style={[tokens.layout.iconWrapper, margin]}>{el}</View>
    } catch (error) {
      if (__DEV__) {
        console.warn('[Button] Failed to render icon:', error)
      }
      return null
    }
  }

  const renderLoading = () => (
    <View style={[tokens.layout.iconWrapper, { marginRight: iconGap }]}>
      {loadingIndicator ?? (
        <ActivityIndicator size={loadingSize} color={txtColor} />
      )}
    </View>
  )

  const label = loading && loadingText !== undefined ? loadingText
    : text !== undefined ? text
    : children

  const renderLabel = () => {
    if (label == null) return null
    if (typeof label === 'string' || typeof label === 'number') {
      return (
        <Text
          style={[tokens.layout.text, sharedTextStyle, textStyle]}
          numberOfLines={1}
          allowFontScaling={allowFontScaling}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
        >
          {isString(label) ? ensureSpace(label, true) : String(label)}
        </Text>
      )
    }
    return label
  }

  const resolvedAccessibilityLabel =
    accessibilityLabel ?? (typeof label === 'string' || typeof label === 'number' ? String(label) : undefined)

  const mergedAccessibilityState = useMemo(() => ({
    ...accessibilityState,
    disabled: isDisabled,
    busy: loading,
  }), [accessibilityState, isDisabled, loading])

  const resolvedAndroidRipple = useMemo(() => {
    if (Platform.OS !== 'android') return androidRippleProp
    if (androidRippleProp) return androidRippleProp
    const rc = rippleColorProp
      ?? (plain ? txtColor
        : type === 'default' && !color
          ? withAlpha(txtColor, 0.15)
          : tokens.colors.ripple)
    return { color: rc, borderless: false }
  }, [androidRippleProp, rippleColorProp, plain, txtColor, type, color, tokens.colors.ripple])

  return (
    <Pressable
      ref={forwardedRef}
      disabled={isDisabled}
      style={[
        tokens.layout.base,
        {
          minHeight: sizeTokens.height,
          paddingHorizontal: sizeTokens.paddingHorizontal,
          borderRadius,
          backgroundColor: bgColor,
          borderColor: bdColor,
          borderWidth,
          opacity,
        },
        Platform.OS === 'android' && borderRadius > 0 && !shadowStyle
          ? RIPPLE_CLIP_STYLE
          : null,
        block ? tokens.layout.block : null,
        shadowStyle,
        style,
      ]}
      android_ripple={resolvedAndroidRipple}
      {...interactionProps}
      accessibilityState={mergedAccessibilityState}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityLabel={resolvedAccessibilityLabel}
      accessibilityHint={accessibilityHint}
      {...viewProps}
    >
      <View style={[tokens.layout.content, contentStyle]}>
        {loading ? (
          <>
            {renderLoading()}
            {renderLabel()}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && renderIcon()}
            {renderLabel()}
            {icon && iconPosition === 'right' && renderIcon()}
          </>
        )}
      </View>
    </Pressable>
  )
}

const ButtonForwardRef = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(ButtonImpl)

ButtonForwardRef.displayName = 'Button'

export const Button = React.memo(ButtonForwardRef)

export default Button
