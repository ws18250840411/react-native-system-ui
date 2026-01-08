import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import { Arrow } from 'react-native-system-icon'

import { useAriaPress, useHairline } from '../../hooks'
import { isRenderable, isText } from '../../utils/validate'

import { CellGroupContext } from './CellContext'
import { useCellTokens, type CellTokens } from './tokens'
import type { CellProps } from './types'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  center: {
    alignItems: 'center',
  },
  body: {
    minWidth: 0,
    flexDirection: 'column',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    textAlign: 'right',
  },
  valueOnly: {
    textAlign: 'left',
  },
  valueContainer: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  valueOnlyContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  valueCenter: {
    alignItems: 'center',
  },
  customContent: {
    flexShrink: 1,
    minWidth: 0,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hairline: {
    position: 'absolute',
    bottom: 0,
  },
})

const arrowTransforms: Record<'left' | 'right' | 'up' | 'down', ViewStyle> = {
  left: { transform: [{ rotate: '180deg' }] },
  right: {},
  up: { transform: [{ rotate: '-90deg' }] },
  down: { transform: [{ rotate: '90deg' }] },
}

interface TextOrViewProps {
  children: React.ReactNode
  textStyle?: StyleProp<TextStyle>
  viewStyle?: StyleProp<ViewStyle>
  numberOfLines?: number
}

const TextOrView = ({
  children,
  textStyle,
  viewStyle,
  numberOfLines,
}: TextOrViewProps) => {
  if (isText(children)) {
    return (
      <Text style={textStyle} numberOfLines={numberOfLines}>
        {children}
      </Text>
    )
  }
  return <View style={viewStyle}>{children}</View>
}

export const Cell = React.forwardRef<React.ElementRef<typeof Pressable>, CellProps>(
  (props, ref) => {
    const {
      title,
      value,
      label,
      extra,
      icon,
      rightIcon,
      border = true,
      clickable,
      isLink,
      required,
      center,
      size = 'normal',
      arrowDirection = 'right',
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
    const group = React.useContext(CellGroupContext)
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

    const baseContainerStyle = {
      backgroundColor: tokens.container.background,
      paddingVertical:
        size === 'large'
          ? tokens.container.largePaddingVertical
          : tokens.container.paddingVertical,
      paddingHorizontal: tokens.container.paddingHorizontal,
    }

    const containerStyles: StyleProp<ViewStyle> = [
      styles.container,
      baseContainerStyle,
      center && styles.center,
      style,
    ]

    const hairline = useHairline({
      show: showBorder,
      containerStyle: containerStyles,
      color: tokens.border.color,
      width: tokens.border.width,
      defaultPaddingHorizontal: tokens.container.paddingHorizontal,
    })

    const customContentStyle = [
      styles.customContent,
      { justifyContent: (center ? 'center' : 'flex-start') as ViewStyle['justifyContent'] },
      contentStyle,
    ]

    const bodyContent = (
      <>
        {hasIcon && (
          <View
            style={[
              styles.iconWrapper,
              {
                marginRight: tokens.spacing.iconGap,
                minHeight: tokens.icon.size,
                minWidth: tokens.icon.size,
              },
            ]}
          >
            {icon}
          </View>
        )}

        <View style={styles.body}>
          {(hasTitle || required) && (
            <View style={[styles.titleRow, { minHeight: lineHeight }]}>
              {required && (
                <Text
                  style={{
                    color: tokens.typography.requiredColor,
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
                      color: tokens.typography.titleColor,
                      fontSize:
                        size === 'large'
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
                  color: tokens.typography.labelColor,
                  fontSize:
                    size === 'large'
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
            styles.valueContainer,
            { minHeight: lineHeight, marginLeft: tokens.spacing.valueGap },
            !center && onlyValue && styles.valueOnlyContainer,
            center && styles.valueCenter,
          ]}
        >
          {hasValue ? (
            <TextOrView
              textStyle={[
                styles.value,
                onlyValue && styles.valueOnly,
                {
                  color: tokens.typography.valueColor,
                  fontSize:
                    size === 'large'
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
              color: tokens.typography.valueColor,
              fontSize:
                size === 'large'
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
          <View style={[styles.rightIconWrapper, arrowTransforms[arrowDirection]]}>
            <Arrow size={tokens.arrow.size} fill={tokens.arrow.color} />
          </View>
        ) : null}
      </>
    )

    const resolvedOnPress = onPress ?? undefined
    const { interactionProps, states } = useAriaPress({
      disabled: !isInteractive,
      onPress: resolvedOnPress,
    })

    const Component = isInteractive ? Pressable : View
    const componentProps = isInteractive
      ? {
        android_ripple: android_ripple ?? { color: tokens.container.rippleColor },
        accessibilityRole: 'button' as const,
        ...interactionProps,
      }
      : {}

    return (
      <Component
        ref={ref}
        style={[
          containerStyles,
          isInteractive && states.pressed && { opacity: tokens.container.activeOpacity },
        ]}
        {...componentProps}
        {...rest}
      >
        {bodyContent}
        {hairline}
      </Component>
    )
  }
)

Cell.displayName = 'Cell'
