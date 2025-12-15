import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useTheme } from '../../design-system'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import Loading from '../loading'
import { useAriaPress } from '../../hooks'
import type {
  ButtonProps,
  ButtonShadowLevel,
  ButtonSize,
  ButtonType,
  ButtonIconPosition,
} from './types'
import { ButtonGroupContext } from './ButtonContext'
import { useButtonTokens } from './tokens'

const isTwoCNChar = (value: string) => /^(?:[\u4e00-\u9fa5]){2}$/.test(value)

const ensureSpace = (value: string, autoInsertSpace: boolean) => {
  if (!autoInsertSpace) {
    return value
  }
  return isTwoCNChar(value) ? value.split('').join(' ') : value
}

const clampShadowLevel = (level: number): ButtonShadowLevel => {
  if (level <= 1) return 1
  if (level >= 3) return 3
  return level as ButtonShadowLevel
}

const gradientColorRegex =
  /(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))/i

const extractFirstColorToken = (input?: string | null) => {
  if (!input) return undefined
  const match = input.match(gradientColorRegex)
  return match ? match[0] : undefined
}

const resolveSpinnerSize = (
  loadingSize: ButtonProps['loadingSize'],
  iconSize: number
) => {
  if (typeof loadingSize === 'number') {
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
    const { foundations } = useTheme()
    const buttonTokens = useButtonTokens()
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
      loading = false,
      loadingText,
      loadingIndicator,
      loadingType = 'circular',
      loadingSize = 'small',
      disabled: disabledProp,
      autoInsertSpace = true,
      uppercase = false,
      allowFontScaling = true,
      maxFontSizeMultiplier,
      rippleColor: rippleColorProp,
      contentStyle,
      textStyle,
      style,
      ...pressableProps
    } = props

    const type = typeProp ?? group?.type ?? buttonTokens.defaults.type
    const size = sizeProp ?? group?.size ?? buttonTokens.defaults.size
    const plain = plainProp ?? group?.plain ?? buttonTokens.defaults.plain
    const block = blockProp ?? group?.block ?? buttonTokens.defaults.block
    const round = roundProp ?? group?.round ?? buttonTokens.defaults.round
    const square = squareProp ?? group?.square ?? buttonTokens.defaults.square
    const hairline = hairlineProp ?? group?.hairline ?? false
    const iconPosition =
      iconPositionProp ?? group?.iconPosition ?? buttonTokens.defaults.iconPosition
    const groupShadow = group?.shadow
    const shadowValue = shadowProp ?? groupShadow
    const hasShadowOverride = shadowProp !== undefined || groupShadow !== undefined
    const disabled = disabledProp ?? group?.disabled ?? false
    const defaultMode = buttonTokens.defaults.mode ?? 'contained'
    const groupMode = group?.mode
    const shouldForcePlainTextMode = plain && !modeProp && !groupMode
    const derivedMode = shouldForcePlainTextMode
      ? 'text'
      : modeProp ?? groupMode ?? defaultMode
    const legacyPlain = shouldForcePlainTextMode
    const buttonColorOverride = buttonColorProp ?? color

    const tone = buttonTokens.toneMap[type] ?? buttonTokens.toneMap.default
    const sizeTokens = buttonTokens.sizes[size]
    const gradientString = typeof buttonColorOverride === 'string' ? buttonColorOverride : undefined
    const hasGradientSyntax =
      gradientString?.toLowerCase().includes('gradient') ?? false
    const normalizedColor = hasGradientSyntax
      ? extractFirstColorToken(gradientString) ?? undefined
      : buttonColorOverride
    const allowsGradientFill =
      derivedMode === 'contained' || derivedMode === 'contained-tonal' || derivedMode === 'elevated'
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
            : 'transparent')

    let borderColor =
      derivedMode === 'outlined'
        ? normalizedColor ?? tone.border
        : derivedMode === 'contained-tonal'
          ? tone.tonalBorder
          : derivedMode === 'contained' || derivedMode === 'elevated'
            ? normalizedColor ?? tone.border
            : 'transparent'

    let resolvedTextColor = textColor
      ? textColor
      : derivedMode === 'contained-tonal'
        ? tone.tonalText
        : derivedMode === 'contained' || derivedMode === 'elevated'
          ? tone.text
          : normalizedColor ?? tone.border

    if (dark === true) {
      resolvedTextColor = '#ffffff'
    } else if (dark === false) {
      resolvedTextColor = '#111111'
    }

    if (derivedMode === 'text') {
      backgroundColor = 'transparent'
      borderColor = 'transparent'
    }

    if (legacyPlain) {
      backgroundColor = '#ffffff'
      borderColor = normalizedColor ?? tone.border
      resolvedTextColor = textColor ?? normalizedColor ?? tone.border
    }

    const resolvedBorderWidth =
      gradientFillEnabled && !legacyPlain
        ? 0
        : derivedMode === 'outlined' || legacyPlain
          ? hairline
            ? buttonTokens.border.hairlineWidth
            : buttonTokens.border.width
          : 0

    let borderRadius = square ? 0 : sizeTokens.radius
    if (round) {
      borderRadius = sizeTokens.height / 2
    }

    const isDisabled = disabled || loading

    let resolvedShadowLevel: ButtonShadowLevel | undefined
    if (typeof shadowValue === 'number') {
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
    const shadowTokens = resolvedShadowLevel ? buttonTokens.shadow[resolvedShadowLevel] : undefined
    const shadowStyle: ViewStyle | undefined =
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
        ? ({ backgroundImage: gradientString } as ViewStyle)
        : undefined
    if (gradientFillEnabled && supportsGradientFill) {
      backgroundColor = 'transparent'
    }

    const buildIconWrapperStyle = (position: 'left' | 'right') => ({
      marginRight: position === 'left' ? buttonTokens.spacing.iconGap : 0,
      marginLeft: position === 'right' ? buttonTokens.spacing.iconGap : 0,
    })

    const renderIcon = () => {
      if (!icon) return null
      const iconElement = typeof icon === 'function'
        ? icon(resolvedTextColor, sizeTokens.iconSize)
        : icon

      return (
        <View style={[buttonStyles.iconWrapper, buildIconWrapperStyle(iconPosition)]}>
          {iconElement}
        </View>
      )
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
        <View style={[buttonStyles.iconWrapper, buildIconWrapperStyle('left')]}>
          {loadingIndicator ?? defaultIndicator}
        </View>
      )
    }

    const resolveLabel = (): React.ReactNode => {
      if (loading && loadingText !== undefined) {
        return loadingText
      }
      if (text !== undefined) {
        return text
      }
      return children
    }

    const label = resolveLabel()

    const renderText = () => {
      if (label === undefined || label === null) {
        return null
      }

      const sharedTextStyle = {
        fontFamily: foundations.typography.fontFamily,
        fontSize: sizeTokens.fontSize,
        lineHeight: sizeTokens.fontSize * foundations.typography.lineHeightMultiplier,
        color: resolvedTextColor,
        textTransform: uppercase ? 'uppercase' : undefined,
      }

      if (typeof label === 'string' || typeof label === 'number') {
        const content =
          typeof label === 'string' ? ensureSpace(label, autoInsertSpace) : String(label)

        return (
          <Text
            style={[buttonStyles.text, sharedTextStyle, textStyle]}
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
      <View style={[buttonStyles.content, contentStyle]}>
        {loading ? (
          <>
            {renderLoading()}
            {renderText()}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' ? renderIcon() : null}
            {renderText()}
            {icon && iconPosition === 'right' ? renderIcon() : null}
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

    const defaultAccessibilityLabel =
      typeof label === 'string' ? label : undefined
    const resolvedAccessibilityLabel =
      accessibilityLabel ?? defaultAccessibilityLabel
    const resolvedAccessibilityHint = accessibilityHint
    const resolvedAccessibilityRole = accessibilityRole ?? 'button'

    const { interactionProps, states } = useAriaPress({
      disabled: isDisabled,
      onPress,
      onPressStart: onPressIn,
      onPressEnd: onPressOut,
    })

    const resolvedOpacity = disabled
      ? buttonTokens.states.disabledOpacity
      : loading
        ? buttonTokens.states.loadingOpacity
        : states.pressed
          ? buttonTokens.states.pressedOpacity
          : 1

    const baseContainerStyle: Array<StyleProp<ViewStyle>> = [
      buttonStyles.base,
      {
        minHeight: sizeTokens.height,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        borderRadius,
        backgroundColor,
        borderColor,
        borderWidth: resolvedBorderWidth,
        opacity: resolvedOpacity,
      },
      block && buttonStyles.block,
      shadowStyle,
    ]

    if (gradientWebStyle) {
      baseContainerStyle.push(gradientWebStyle)
    }
    baseContainerStyle.push(style)

    const mergedAccessibilityState = {
      disabled: isDisabled,
      busy: loading,
      ...accessibilityState,
    }
    const defaultRippleColor =
      rippleColorProp ??
      (derivedMode === 'text' || derivedMode === 'outlined' || legacyPlain
        ? resolvedTextColor
        : 'rgba(255,255,255,0.35)')
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
        accessibilityRole={resolvedAccessibilityRole}
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityHint={resolvedAccessibilityHint}
        {...viewProps}
      >
        {content}
      </Pressable>
    )
  }
)

Button.displayName = 'Button'

export default Button

const buttonStyles = StyleSheet.create({
  base: {
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  block: {
    alignSelf: 'stretch',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
})
