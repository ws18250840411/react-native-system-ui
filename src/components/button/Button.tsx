import React from 'react'
import {
  ActivityIndicator,
  Platform,
  Pressable,
  Text,
  View,
  type ViewStyle,
} from 'react-native'

import { withAlpha, extractFirstColorToken, createPlatformShadow, ensureSpace, isFiniteNumber, isFunction, isNumber, isString, isText } from '../../utils'
import Loading from '../loading'
import { useAriaPress } from '../../hooks'
import type {
  ButtonProps,
  ButtonShadowLevel,
} from './types'
import { ButtonGroupContext } from './ButtonContext'
import { useButtonTokens } from './tokens'

const clampShadowLevel = (level: number): ButtonShadowLevel => {
  if (level <= 1) return 1
  if (level >= 3) return 3
  return level as ButtonShadowLevel
}

const resolveSpinnerSize = (
  loadingSize: ButtonProps['loadingSize'],
  iconSize: number
) => {
  if (isNumber(loadingSize)) {
    return loadingSize
  }
  const base = Math.max(iconSize, 16)
  if (loadingSize === 'large') {
    return base * 1.25
  }
  return base
}

export const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (props, forwardedRef) => {
    const group = React.useContext(ButtonGroupContext)

    const {
      text,
      children,
      icon,
      iconPosition: iconPositionProp,
      type: typeProp,
      size: sizeProp,
      color,
      buttonColor: buttonColorProp,
      textColor,
      dark,
      mode: modeProp,
      plain: plainProp,
      block: blockProp,
      round: roundProp,
      square: squareProp,
      hairline: hairlineProp,
      shadow: shadowProp,
      loading: loadingProp,
      loadingText,
      loadingIndicator,
      loadingType: loadingTypeProp,
      loadingSize: loadingSizeProp,
      disabled: disabledProp,
      autoInsertSpace: autoInsertSpaceProp,
      uppercase: uppercaseProp,
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
    const hasShadowOverride = shadowProp !== undefined || groupShadow !== undefined
    const disabled = disabledProp ?? group?.disabled ?? buttonTokens.defaults.disabled
    const loading = loadingProp ?? buttonTokens.defaults.loading
    const loadingType = loadingTypeProp ?? buttonTokens.defaults.loadingType
    const loadingSize = loadingSizeProp ?? buttonTokens.defaults.loadingSize
    const autoInsertSpace = autoInsertSpaceProp ?? buttonTokens.defaults.autoInsertSpace
    const uppercase = uppercaseProp ?? buttonTokens.defaults.uppercase
    const allowFontScaling = allowFontScalingProp ?? buttonTokens.defaults.allowFontScaling
    const defaultMode = buttonTokens.defaults.mode ?? 'contained'
    const groupMode = group?.mode
    const shouldForcePlainTextMode = plain && !modeProp && !groupMode
    const derivedMode = shouldForcePlainTextMode
      ? 'text'
      : modeProp ?? groupMode ?? defaultMode
    const legacyPlain = shouldForcePlainTextMode
    const buttonColorOverride = buttonColorProp ?? color

    const tone = buttonTokens.colors.tones[type] ?? buttonTokens.colors.tones.default
    const sizeTokens = buttonTokens.sizing.sizes[size]

    const gradientString =
      isString(buttonColorOverride) ? buttonColorOverride : undefined
    const hasGradientSyntax =
      gradientString?.toLowerCase().includes('gradient') ?? false
    const normalizedColor = hasGradientSyntax
      ? extractFirstColorToken(gradientString) ?? undefined
      : buttonColorOverride
    const allowsGradientFill =
      derivedMode === 'contained' ||
      derivedMode === 'contained-tonal' ||
      derivedMode === 'elevated'
    const gradientFillEnabled = hasGradientSyntax && !legacyPlain && allowsGradientFill
    const supportsGradientFill = Platform.OS === 'web'

    let backgroundColor =
      normalizedColor ??
      (derivedMode === 'contained'
        ? tone.background
        : derivedMode === 'contained-tonal'
          ? tone.tonalBackground
          : derivedMode === 'elevated'
            ? tone.background
            : buttonTokens.colors.backgroundTransparent)

    let borderColor =
      derivedMode === 'outlined'
        ? normalizedColor ?? tone.border
        : derivedMode === 'contained-tonal'
          ? tone.tonalBorder
          : derivedMode === 'contained' || derivedMode === 'elevated'
            ? normalizedColor ?? tone.border
            : buttonTokens.colors.backgroundTransparent

    // 解析文字颜色
    let resolvedTextColor = textColor

    if (!resolvedTextColor) {
      if (derivedMode === 'contained-tonal') {
        resolvedTextColor = tone.tonalText
      } else if (derivedMode === 'contained' || derivedMode === 'elevated') {
        // 实心按钮逻辑：
        // 1. 自定义背景色：默认为白色文字（假设自定义背景通常为深色/品牌色）
        // 2. 预设类型：读取 token 配置（Primary/Danger 等默认为白色，Default 默认为深色）
        resolvedTextColor = normalizedColor ? '#ffffff' : tone.text
      } else {
        // 文本/边框按钮逻辑：
        // 1. 自定义颜色：跟随自定义颜色
        // 2. Default 类型：使用深色文本
        // 3. 其他类型：使用主题色（Primary/Danger 等）
        resolvedTextColor = normalizedColor ?? (type === 'default' ? tone.text : tone.border)
      }
    }

    if (dark === true) {
      resolvedTextColor = buttonTokens.colors.textDark
    } else if (dark === false) {
      resolvedTextColor = buttonTokens.colors.textLight
    }

    if (derivedMode === 'text') {
      backgroundColor = buttonTokens.colors.backgroundTransparent
      borderColor = buttonTokens.colors.backgroundTransparent
    }

    if (legacyPlain) {
      backgroundColor = buttonTokens.colors.backgroundPlain
      borderColor = normalizedColor ?? tone.border
      const fallbackTextColor =
        type === 'default' && !normalizedColor ? tone.text : normalizedColor ?? tone.border
      resolvedTextColor = textColor ?? fallbackTextColor
    }

    if (gradientFillEnabled && supportsGradientFill) {
      backgroundColor = buttonTokens.colors.backgroundTransparent
    }

    const shouldRenderBorder =
      derivedMode === 'outlined' ||
      legacyPlain ||
      (derivedMode === 'contained' && type === 'default')
    const resolvedBorderWidth =
      gradientFillEnabled && !legacyPlain
        ? 0
        : shouldRenderBorder
          ? hairline
            ? buttonTokens.borders.hairlineWidth
            : buttonTokens.borders.width
          : 0

    const borderRadius = square ? 0 : round ? sizeTokens.height / 2 : sizeTokens.radius

    const isDisabled = disabled || loading

    let resolvedShadowLevel: ButtonShadowLevel | undefined
    if (isFiniteNumber(shadowValue)) {
      resolvedShadowLevel = clampShadowLevel(shadowValue)
    } else if (shadowValue === true) {
      resolvedShadowLevel = clampShadowLevel(2)
    } else if (!hasShadowOverride && derivedMode === 'elevated') {
      resolvedShadowLevel = clampShadowLevel(2)
    }
    const shouldShowShadow =
      !!resolvedShadowLevel &&
      !gradientFillEnabled &&
      derivedMode !== 'text' &&
      derivedMode !== 'outlined' &&
      !legacyPlain
    const shadowTokens = resolvedShadowLevel ? buttonTokens.shadows[resolvedShadowLevel] : undefined
    const shadowStyle =
      shouldShowShadow && shadowTokens
        ? createPlatformShadow({
          color: shadowTokens.color,
          opacity: shadowTokens.opacity,
          radius: shadowTokens.radius,
          offsetY: shadowTokens.offsetY,
          elevation: shadowTokens.elevation,
        })
        : undefined

    const gradientWebStyle =
      gradientFillEnabled && supportsGradientFill && gradientString
        ? ({ backgroundImage: gradientString } as unknown as ViewStyle)
        : undefined

    const iconWrapperStyle = React.useMemo(
      () =>
        iconPosition === 'left'
          ? { marginRight: buttonTokens.spacing.iconGap }
          : { marginLeft: buttonTokens.spacing.iconGap },
      [buttonTokens.spacing.iconGap, iconPosition]
    )
    const loadingIconWrapperStyle = React.useMemo(
      () => ({ marginRight: buttonTokens.spacing.iconGap }),
      [buttonTokens.spacing.iconGap]
    )

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

    const renderLoading = () => {
      const spinnerSize = resolveSpinnerSize(loadingSize, sizeTokens.iconSize)
      const defaultIndicator = loadingType === 'spinner'
        ? (
          <Loading
            type="spinner"
            size={spinnerSize}
            color={resolvedTextColor}
          />
        )
        : (
          <ActivityIndicator
            size={loadingSize}
            color={resolvedTextColor}
          />
        )

      return (
        <View style={[buttonTokens.layout.iconWrapper, loadingIconWrapperStyle]}>
          {loadingIndicator ?? defaultIndicator}
        </View>
      )
    }

    const label =
      loading && loadingText !== undefined
        ? loadingText
        : text !== undefined
          ? text
          : children

    const sharedLabelTextStyle = React.useMemo(
      () => ({
        fontFamily: buttonTokens.typography.fontFamily,
        fontWeight: buttonTokens.typography.fontWeight,
        fontSize: sizeTokens.fontSize,
        lineHeight: sizeTokens.fontSize * buttonTokens.typography.lineHeightMultiplier,
        color: resolvedTextColor,
        textTransform: uppercase ? 'uppercase' : undefined,
      }),
      [
        buttonTokens.typography.fontFamily,
        buttonTokens.typography.fontWeight,
        buttonTokens.typography.lineHeightMultiplier,
        resolvedTextColor,
        sizeTokens.fontSize,
        uppercase,
      ]
    )

    const renderText = () => {
      if (label === undefined || label === null) {
        return null
      }

      const sharedTextStyle: any = sharedLabelTextStyle

      if (isText(label)) {
        const content =
          isString(label) ? ensureSpace(label, autoInsertSpace) : String(label)

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

    const containerStyle = React.useMemo(
      () => ({
        minHeight: sizeTokens.height,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        borderRadius,
        backgroundColor,
        borderColor,
        borderWidth: resolvedBorderWidth,
        opacity: resolvedOpacity,
      }),
      [
        backgroundColor,
        borderColor,
        borderRadius,
        resolvedBorderWidth,
        resolvedOpacity,
        sizeTokens.height,
        sizeTokens.paddingHorizontal,
      ]
    )
    const rippleClipStyle = React.useMemo(
      () =>
        Platform.OS === 'android' && borderRadius > 0 && !shouldShowShadow
          ? { overflow: 'hidden' as const }
          : null,
      [borderRadius, shouldShowShadow]
    )
    const baseContainerStyle = React.useMemo(
      () => [
        buttonTokens.layout.base,
        containerStyle,
        rippleClipStyle,
        block ? buttonTokens.layout.block : null,
        shadowStyle,
        gradientWebStyle,
        style,
      ],
      [
        block,
        buttonTokens.layout.base,
        buttonTokens.layout.block,
        containerStyle,
        gradientWebStyle,
        rippleClipStyle,
        shadowStyle,
        style,
      ]
    )

    const mergedAccessibilityState = {
      ...accessibilityState,
      disabled: isDisabled,
      busy: loading,
    }
    const defaultRippleColor =
      rippleColorProp ??
      (derivedMode === 'text' || derivedMode === 'outlined' || legacyPlain
        ? resolvedTextColor
        : type === 'default' && !normalizedColor
          ? withAlpha(resolvedTextColor, 0.15)
          : buttonTokens.colors.ripple)
    const resolvedAndroidRipple = React.useMemo(
      () =>
        Platform.OS === 'android'
          ? androidRippleProp ?? { color: defaultRippleColor, borderless: false }
          : androidRippleProp,
      [androidRippleProp, defaultRippleColor]
    )

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
