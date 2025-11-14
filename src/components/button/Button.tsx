import React from 'react'
import type { PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native'
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import Loading from '../loading'
import type {
  ButtonProps,
  ButtonShadowLevel,
  ButtonSize,
  ButtonType,
  ButtonIconPosition,
} from './types'
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

interface ButtonTokens {
  defaults: {
    type: ButtonType
    size: ButtonSize
    plain: boolean
    block: boolean
    round: boolean
    square: boolean
    iconPosition: ButtonIconPosition
  }
  sizes: Record<
    ButtonSize,
    {
      height: number
      fontSize: number
      paddingHorizontal: number
      iconSize: number
      radius: number
    }
  >
  spacing: {
    iconGap: number
  }
  states: {
    disabledOpacity: number
    loadingOpacity: number
    pressedOpacity: number
  }
  border: {
    width: number
    hairlineWidth: number
  }
  toneMap: Record<
    ButtonType,
    {
      background: string
      border: string
      text: string
    }
  >
  shadow: Record<
    ButtonShadowLevel,
    {
      color: string
      opacity: number
      radius: number
      offsetY: number
      elevation: number
    }
  >
}

const createButtonTokens = (foundations: Foundations): ButtonTokens => {
  const { palette, spacing, radii, fontSize, opacity } = foundations

  const buildTone = (tone: keyof typeof palette, text?: string) => ({
    background: palette[tone][500],
    border: palette[tone][500],
    text: text ?? palette[tone].foreground ?? '#ffffff',
  })

  return {
    defaults: {
      type: 'default',
      size: 'normal',
      plain: false,
      block: false,
      round: false,
      square: false,
      iconPosition: 'left',
    },
    sizes: {
      large: {
        height: 50,
        fontSize: fontSize.lg,
        paddingHorizontal: spacing.xl,
        iconSize: fontSize.lg,
        radius: radii.md,
      },
      normal: {
        height: 44,
        fontSize: fontSize.md,
        paddingHorizontal: spacing.lg,
        iconSize: fontSize.md,
        radius: radii.sm,
      },
      small: {
        height: 32,
        fontSize: fontSize.sm,
        paddingHorizontal: spacing.md,
        iconSize: fontSize.sm,
        radius: radii.sm,
      },
      mini: {
        height: 24,
        fontSize: fontSize.xs,
        paddingHorizontal: spacing.xs,
        iconSize: fontSize.xs,
        radius: radii.pill,
      },
    },
    spacing: {
      iconGap: spacing.sm,
    },
    states: {
      disabledOpacity: opacity.disabled,
      loadingOpacity: opacity.loading,
      pressedOpacity: opacity.pressed,
    },
    border: {
      width: 1,
      hairlineWidth: 0.5,
    },
    toneMap: {
      default: {
        background: palette.default[50],
        border: palette.default[200],
        text: palette.default[700],
      },
      primary: buildTone('primary'),
      info: buildTone('info'),
      success: buildTone('success'),
      warning: buildTone('warning', palette.warning.foreground ?? '#ffffff'),
      danger: buildTone('danger'),
    },
    shadow: {
      1: {
        color: '#0f1a38',
        opacity: 0.12,
        radius: 4,
        offsetY: 2,
        elevation: 2,
      },
      2: {
        color: '#0f1a38',
        opacity: 0.15,
        radius: 6,
        offsetY: 3,
        elevation: 3,
      },
      3: {
        color: '#0f1a38',
        opacity: 0.2,
        radius: 10,
        offsetY: 4,
        elevation: 5,
      },
    },
  }
}

export const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (props, forwardedRef) => {
    const { foundations, components } = useTheme()
    const buttonTokens = React.useMemo(() => {
      const base = createButtonTokens(foundations)
      const overrides = components
        ? (components['button'] as DeepPartial<ButtonTokens> | undefined)
        : undefined
      return overrides ? deepMerge(base, overrides) : base
    }, [foundations, components])
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
      loadingSize = 'small',
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
    const gradientString = typeof color === 'string' ? color : undefined
    const hasGradientSyntax =
      gradientString?.toLowerCase().includes('gradient') ?? false
    const normalizedColor = hasGradientSyntax
      ? extractFirstColorToken(gradientString) ?? undefined
      : color
    const gradientFillEnabled = hasGradientSyntax && !plain
    const supportsGradientFill = Platform.OS === 'web'

    const baseTextColor = textColor
      ? textColor
      : normalizedColor
        ? plain
          ? normalizedColor
          : '#ffffff'
        : plain
          ? tone.border
          : tone.text

    const backgroundColor = plain
      ? '#ffffff'
      : gradientFillEnabled
        ? supportsGradientFill
          ? 'transparent'
          : normalizedColor ?? tone.background
        : normalizedColor ?? tone.background
    const borderColor = plain
      ? normalizedColor ?? tone.border
      : gradientFillEnabled
        ? 'transparent'
        : normalizedColor ?? tone.border

    const resolvedBorderWidth = gradientFillEnabled
      ? 0
      : hairline
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

    const renderLoading = () => {
      const spinnerSize = resolveSpinnerSize(loadingSize, sizeTokens.iconSize)
      const defaultIndicator = loadingType === 'spinner'
        ? (
            <Loading
              type="spinner"
              size={spinnerSize}
              color={baseTextColor}
            />
          )
        : (
            <ActivityIndicator
              style={buttonStyles.loadingIndicator}
              size={loadingSize}
              color={baseTextColor}
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

    const pressableStyle = ({ pressed }: PressableStateCallbackType) => {
      const computed: Array<StyleProp<ViewStyle>> = [
        buttonStyles.base,
        {
          minHeight: sizeTokens.height,
          paddingHorizontal: sizeTokens.paddingHorizontal,
          borderRadius,
          backgroundColor,
          borderColor,
          borderWidth: resolvedBorderWidth,
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
      ]

      if (gradientWebStyle) {
        computed.push(gradientWebStyle)
      }

      computed.push(style)

      return computed
    }

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
  loadingIndicator: {
    marginRight: 6,
  },
  text: {
    fontWeight: '600',
  },
})
