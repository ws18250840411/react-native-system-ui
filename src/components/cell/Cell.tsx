import React, { useContext, useMemo } from 'react'
import {
  Pressable,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import { Arrow } from 'react-native-system-icon'

import { useAriaPress, useHairline } from '../../hooks'
import { isRenderable, isText } from '../../utils'

import { CellGroupContext } from './CellContext'
import { useCellTokens } from './tokens'
import type { CellProps } from './types'

const TextOrView = ({
  children,
  textStyle,
  viewStyle,
  numberOfLines,
}: {
  children: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  viewStyle?: StyleProp<ViewStyle>
  numberOfLines?: number
}) => {
  if (isText(children)) {
    return (
      <Text style={textStyle} numberOfLines={numberOfLines}>
        {children}
      </Text>
    )
  }
  return <View style={viewStyle}>{children}</View>
}

const CellImpl = (
  props: CellProps,
  ref: React.ForwardedRef<React.ElementRef<typeof Pressable>>,
) => {
  const {
    title,
    value,
    label,
    extra,
    icon,
    rightIcon,
    border: borderProp,
    clickable,
    isLink,
    required,
    center,
    size: sizeProp,
    arrowDirection: arrowDirectionProp,
    tokensOverride,
    children,
    style,
    titleStyle,
    valueStyle,
    labelStyle,
    contentStyle,
    onPress,
    disabled,
    android_ripple,
    ...rest
  } = props

  const tokens = useCellTokens(tokensOverride)
  const group = useContext(CellGroupContext)
  const border = borderProp ?? tokens.defaults.border
  const size = sizeProp ?? tokens.defaults.size
  const arrowDirection = arrowDirectionProp ?? tokens.defaults.arrowDirection
  const lineHeight = tokens.typography.lineHeight

  const hasTitle = isRenderable(title)
  const hasValue = isRenderable(value)
  const hasLabel = isRenderable(label)
  const hasExtra = isRenderable(extra)
  const hasChildren = isRenderable(children)
  const hasIcon = isRenderable(icon)
  const hasRightIcon = isRenderable(rightIcon)

  const onlyValue = !hasTitle && !hasChildren
  const showBorder = border && group.border && !group.isLast
  const showArrow = !!isLink || !!clickable
  const isInteractive =
    !disabled &&
    (clickable ||
      !!onPress ||
      !!rest.onLongPress ||
      !!rest.onPressIn ||
      !!rest.onPressOut)

  const containerStyles = useMemo<StyleProp<ViewStyle>>(() => [
    size === 'large' ? tokens.layout.containerLarge : tokens.layout.container,
    center && tokens.layout.center,
    style,
  ], [size, center, tokens.layout, style])

  const hairline = useHairline({
    show: showBorder,
    containerStyle: containerStyles,
    color: tokens.colors.border,
    width: tokens.borders.width,
    defaultPaddingHorizontal: tokens.sizing.paddingHorizontal,
  })

  const customContentStyle = useMemo(() => [
    tokens.layout.customContent,
    { justifyContent: (center ? 'center' : 'flex-start') as ViewStyle['justifyContent'] },
    contentStyle,
  ], [center, tokens.layout.customContent, contentStyle])

  const isLargeSize = size === 'large'

  const bodyContent = (
    <>
      {hasIcon && (
        <View
          style={[
            tokens.layout.iconWrapper,
            {
              marginRight: tokens.spacing.iconGap,
              minHeight: tokens.sizing.iconSize,
              minWidth: tokens.sizing.iconSize,
            },
          ]}
        >
          {icon}
        </View>
      )}

      <View style={tokens.layout.body}>
        {(hasTitle || required) && (
          <View style={[tokens.layout.titleRow, { minHeight: lineHeight }]}>
            {required && (
              <Text
                style={{
                  color: tokens.colors.required,
                  marginRight: tokens.spacing.iconGap / 2,
                }}
              >
                *
              </Text>
            )}
            {hasTitle && (
              <TextOrView
                textStyle={[
                  {
                    color: tokens.colors.title,
                    fontSize: isLargeSize
                      ? tokens.typography.largeTitleSize
                      : tokens.typography.titleSize,
                    fontWeight: tokens.typography.titleWeight,
                  },
                  titleStyle,
                ]}
                viewStyle={titleStyle as StyleProp<ViewStyle>}
                numberOfLines={1}
              >
                {title}
              </TextOrView>
            )}
          </View>
        )}

        {hasLabel && (
          <TextOrView
            textStyle={[
              {
                marginTop: tokens.spacing.labelMarginTop,
                color: tokens.colors.label,
                fontSize: isLargeSize
                  ? tokens.typography.largeLabelSize
                  : tokens.typography.labelSize,
              },
              labelStyle,
            ]}
            viewStyle={[
              { marginTop: tokens.spacing.labelMarginTop },
              labelStyle as StyleProp<ViewStyle>,
            ]}
            numberOfLines={2}
          >
            {label}
          </TextOrView>
        )}
      </View>

      <View
        style={[
          tokens.layout.valueContainer,
          { minHeight: lineHeight, marginLeft: tokens.spacing.valueGap },
          !center && onlyValue && tokens.layout.valueOnlyContainer,
          center && tokens.layout.valueCenter,
        ]}
      >
        {hasValue ? (
          <TextOrView
            textStyle={[
              tokens.layout.value,
              onlyValue && tokens.layout.valueOnly,
              {
                color: tokens.colors.value,
                fontSize: isLargeSize
                  ? tokens.typography.largeValueSize
                  : tokens.typography.valueSize,
              },
              valueStyle,
            ]}
            viewStyle={customContentStyle}
            numberOfLines={1}
          >
            {value}
          </TextOrView>
        ) : hasChildren ? (
          <View style={customContentStyle}>{children}</View>
        ) : null}
      </View>

      {hasExtra && (
        <TextOrView
          textStyle={{
            marginLeft: tokens.spacing.extraGap,
            color: tokens.colors.value,
            fontSize: isLargeSize
              ? tokens.typography.largeValueSize
              : tokens.typography.valueSize,
          }}
          viewStyle={{ marginLeft: tokens.spacing.extraGap }}
        >
          {extra}
        </TextOrView>
      )}

      {hasRightIcon ? (
        rightIcon
      ) : showArrow ? (
        <View style={[tokens.layout.rightIconWrapper, tokens.layout.arrowTransforms[arrowDirection]]}>
          <Arrow size={tokens.sizing.arrowSize} fill={tokens.colors.arrow} />
        </View>
      ) : null}
    </>
  )

  const { interactionProps, states } = useAriaPress({
    disabled: !isInteractive,
    onPress: onPress ?? undefined,
  })

  const Component = isInteractive ? Pressable : View
  const componentProps = isInteractive
    ? {
      android_ripple: android_ripple ?? { color: tokens.colors.ripple },
      accessibilityRole: 'button' as const,
      ...interactionProps,
    }
    : {}

  return (
    <Component
      ref={ref}
      style={[
        containerStyles,
        isInteractive && states.pressed && { opacity: tokens.defaults.activeOpacity },
      ]}
      {...componentProps}
      {...rest}
    >
      {bodyContent}
      {hairline}
    </Component>
  )
}

const CellForwardRef = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  CellProps
>(CellImpl)

CellForwardRef.displayName = 'Cell'

export const Cell = React.memo(CellForwardRef)
