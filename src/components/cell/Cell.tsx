import React from 'react'
import type { DimensionValue, StyleProp, ViewStyle } from 'react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Arrow } from 'react-native-system-icon'
import { useAriaPress } from '../../hooks'
import { createHairlineView } from '../../utils/hairline'

import { CellGroupContext } from './CellContext'
import type { CellProps } from './types'
import { useCellTokens } from './tokens'

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
  titleText: {
    display: 'flex',
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

const isRenderableNode = (val: any) => val != null && val !== false
const isTextLikeNode = (val: any): val is string | number =>
  typeof val === 'string' || typeof val === 'number'

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

    const hasTitle = isRenderableNode(title)
    const hasValue = isRenderableNode(value)
    const hasLabel = isRenderableNode(label)
    const hasExtra = isRenderableNode(extra)
    const hasChildren = isRenderableNode(children)
    const hasIcon = isRenderableNode(icon)
    const hasRightIcon = isRenderableNode(rightIcon)

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

    const flattened = StyleSheet.flatten(containerStyles) as any
    const paddingHorizontal =
      typeof flattened?.paddingHorizontal === 'number'
        ? flattened.paddingHorizontal
        : undefined
    const resolveInset = (primary?: DimensionValue, secondary?: DimensionValue) =>
      typeof primary === 'number'
        ? primary
        : typeof secondary === 'number'
          ? secondary
          : typeof paddingHorizontal === 'number'
            ? paddingHorizontal
            : tokens.container.paddingHorizontal
    const resolvedPadding = {
      left: resolveInset(flattened?.paddingLeft, flattened?.paddingStart),
      right: resolveInset(flattened?.paddingRight, flattened?.paddingEnd),
    }
    const hairline = showBorder ? (
      <View
        style={[
          styles.hairline,
          createHairlineView({
            position: 'bottom',
            color: tokens.border.color,
            left: resolvedPadding.left,
            right: resolvedPadding.right,
            enabled: tokens.border.width > 0,
            width: tokens.border.width,
          }),
        ]}
      />
    ) : null

    const customContentStyle = [
      styles.customContent,
      { justifyContent: (center ? 'center' : 'flex-start') as ViewStyle['justifyContent'] },
      contentStyle,
    ]

    const renderValue = () => {
      if (hasValue) {
        if (isTextLikeNode(value)) {
          return (
            <Text
              style={[
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
              numberOfLines={1}
            >
              {value}
            </Text>
          )
        }
        return <View style={customContentStyle}>{value}</View>
      }
      if (hasChildren) {
        return <View style={customContentStyle}>{children}</View>
      }
      return null
    }

    const renderExtra = () => {
      if (!hasExtra) return null
      const marginLeft = tokens.spacing.extraGap
      if (isTextLikeNode(extra)) {
        return (
          <Text
            style={{
              marginLeft,
              color: tokens.typography.valueColor,
              fontSize:
                size === 'large'
                  ? tokens.typography.largeValueSize
                  : tokens.typography.valueSize,
            }}
          >
            {extra}
          </Text>
        )
      }
      return <View style={{ marginLeft }}>{extra}</View>
    }

    const renderBody = () => (
      <>
        {hasIcon ? (
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
        ) : null}
        <View style={styles.body}>
          {(hasTitle || required) && (
            <View
              style={[styles.titleRow, { minHeight: lineHeight }]}
            >
              {required ? (
                <Text
                  style={{
                    color: tokens.typography.requiredColor,
                    marginRight: tokens.spacing.iconGap / 2,
                  }}
                >
                  *
                </Text>
              ) : null}
              {hasTitle
                ? isTextLikeNode(title)
                  ? (
                    <Text
                      style={[
                        styles.titleText,
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
                      numberOfLines={1}
                    >
                      {title}
                    </Text>
                  )
                  : (
                    <View style={titleStyle as StyleProp<ViewStyle>}>
                      {title}
                    </View>
                  )
                : null}
            </View>
          )}
          {hasLabel
            ? isTextLikeNode(label)
              ? (
                <Text
                  style={[
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
                  numberOfLines={2}
                >
                  {label}
                </Text>
              )
              : (
                <View
                  style={[
                    { marginTop: tokens.spacing.labelMarginTop },
                    labelStyle as StyleProp<ViewStyle>,
                  ]}
                >
                  {label}
                </View>
              )
            : null}
        </View>
        <View
          style={[
            styles.valueContainer,
            { minHeight: lineHeight, marginLeft: tokens.spacing.valueGap },
            !center && onlyValue && styles.valueOnlyContainer,
            center && styles.valueCenter,
          ]}
        >
          {renderValue()}
        </View>
        {renderExtra()}
        {hasRightIcon
          ? rightIcon
          : showArrow && (
            <View style={[styles.rightIconWrapper, arrowTransforms[arrowDirection]]}>
              <Arrow size={tokens.arrow.size} fill={tokens.arrow.color} />
            </View>
          )}
      </>
    )

    if (!isInteractive) {
      return (
        <View style={containerStyles} {...rest}>
          {renderBody()}
          {hairline}
        </View>
      )
    }

    const viewProps = rest

    const resolvedOnPress = onPress ?? undefined
    const { interactionProps, states } = useAriaPress({
      disabled: false,
      onPress: resolvedOnPress,
    })

    return (
      <Pressable
        ref={ref}
        style={[containerStyles, { opacity: states.pressed ? tokens.container.activeOpacity : 1 }]}
        android_ripple={android_ripple ?? { color: tokens.container.rippleColor }}
        accessibilityRole="button"
        {...interactionProps}
        {...viewProps}
      >
        {renderBody()}
        {hairline}
      </Pressable>
    )
  }
)

Cell.displayName = 'Cell'
