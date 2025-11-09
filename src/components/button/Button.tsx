import React from 'react'
import type { PressableStateCallbackType, ViewStyle } from 'react-native'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { ButtonShadowLevel } from './tokens'
import { buttonStyles } from './styles'
import type { ButtonProps } from './types'
import { useButtonTokens } from './useButtonTokens'
import { ButtonGroupContext } from './ButtonContext'

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
      textColor,
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
      disabled: disabledProp,
      autoInsertSpace = true,
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
    const iconPosition = iconPositionProp ?? group?.iconPosition ?? buttonTokens.defaults.iconPosition
    const shadow = shadowProp ?? group?.shadow ?? false
    const disabled = disabledProp ?? group?.disabled ?? false

    const tone = buttonTokens.toneMap[type] ?? buttonTokens.toneMap.default
    const sizeTokens = buttonTokens.sizes[size]
    const isGradientColor = typeof color === 'string' && color.includes('gradient')

    const baseTextColor = textColor
      ? textColor
      : color
        ? plain
          ? color
          : '#ffffff'
        : plain
          ? tone.border
          : tone.text

    const backgroundColor = plain
      ? '#ffffff'
      : color || tone.background
    const borderColor = color || tone.border

    const resolvedBorderWidth = hairline
      ? buttonTokens.border.hairlineWidth
      : buttonTokens.border.width

    let borderRadius = square ? 0 : sizeTokens.radius
    if (round) {
      borderRadius = sizeTokens.height / 2
    }

    const isDisabled = disabled || loading

    const shadowLevel = typeof shadow === 'number' ? clampShadowLevel(shadow) : 2
    const shouldShowShadow = !!shadow && !plain
    const shadowTokens = buttonTokens.shadow[shadowLevel]
    const shadowStyle: ViewStyle | undefined = shouldShowShadow
      ? {
          shadowColor: shadowTokens.color,
          shadowOpacity: shadowTokens.opacity,
          shadowRadius: shadowTokens.radius,
          shadowOffset: { width: 0, height: shadowTokens.offsetY },
          elevation: shadowTokens.elevation,
        }
      : undefined

    const buildIconWrapperStyle = (position: 'left' | 'right') => ({
      marginRight: position === 'left' ? buttonTokens.spacing.iconGap : 0,
      marginLeft: position === 'right' ? buttonTokens.spacing.iconGap : 0,
    })

    const renderIcon = () => {
      if (!icon) return null
      const iconElement = typeof icon === 'function'
        ? icon(baseTextColor, sizeTokens.iconSize)
        : icon

      return (
        <View style={[buttonStyles.iconWrapper, buildIconWrapperStyle(iconPosition)]}>
          {iconElement}
        </View>
      )
    }

    const renderLoading = () => (
      <View style={[buttonStyles.iconWrapper, buildIconWrapperStyle('left')]}>
        {loadingIndicator ?? (
          <ActivityIndicator
            style={buttonStyles.loadingIndicator}
            size={loadingType === 'spinner' ? 'small' : 'small'}
            color={baseTextColor}
          />
        )}
      </View>
    )

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

      if (typeof label === 'string') {
        const content = ensureSpace(label, autoInsertSpace)
        return (
          <Text
            style={[
              buttonStyles.text,
              {
                fontFamily: foundations.typography.fontFamily,
                fontSize: sizeTokens.fontSize,
                lineHeight:
                  sizeTokens.fontSize * foundations.typography.lineHeightMultiplier,
                color: baseTextColor,
              },
              textStyle,
            ]}
            numberOfLines={1}
          >
            {content}
          </Text>
        )
      }

      if (typeof label === 'number') {
        return (
          <Text
            style={[
              buttonStyles.text,
              {
                fontFamily: foundations.typography.fontFamily,
                fontSize: sizeTokens.fontSize,
                lineHeight:
                  sizeTokens.fontSize * foundations.typography.lineHeightMultiplier,
                color: baseTextColor,
              },
              textStyle,
            ]}
            numberOfLines={1}
          >
            {label}
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

    const pressableStyle = ({ pressed }: PressableStateCallbackType) => [
      buttonStyles.base,
      {
        minHeight: sizeTokens.height,
        paddingHorizontal: sizeTokens.paddingHorizontal,
        borderRadius,
        backgroundColor,
        borderColor,
        borderWidth: isGradientColor ? 0 : resolvedBorderWidth,
        opacity: loading
          ? buttonTokens.states.loadingOpacity
          : isDisabled
            ? buttonTokens.states.disabledOpacity
            : pressed
              ? buttonTokens.states.pressedOpacity
              : 1,
      },
      block && buttonStyles.block,
      shadowStyle,
      style,
    ]

    return (
      <Pressable
        ref={forwardedRef}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        {...pressableProps}
        style={pressableStyle}
      >
        {content}
      </Pressable>
    )
  }
)

Button.displayName = 'Button'

export default Button
