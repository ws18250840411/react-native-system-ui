import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { Arrow } from 'react-native-system-icon'
import { useAriaPress } from '../../hooks'
import { createHairlineView } from '../../utils/hairline'

import { CellGroupContext } from './CellContext'
import type { CellArrowDirection, CellProps } from './types'
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
    display: 'flex', // 让 width/minWidth 在 RN Web 生效
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

const arrowTransforms: Record<CellArrowDirection, ViewStyle> = {
  left: { transform: [{ rotate: '180deg' }] },
  right: {},
  up: { transform: [{ rotate: '-90deg' }] },
  down: { transform: [{ rotate: '90deg' }] },
}

type ExtendedViewStyle = ViewStyle & {
  paddingStart?: number
  paddingEnd?: number
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
    children,
    style,
    titleStyle,
    valueStyle,
    labelStyle,
    contentStyle,
    onPress,
    disabled,
    ...rest
  } = props

  const tokens = useCellTokens()
  const group = React.useContext(CellGroupContext)
  const platform = Platform.OS
  const lineHeight = tokens.typography.lineHeight ?? 24

  const hasTitle = title !== undefined && title !== null && title !== false
  const hasValue = value !== undefined && value !== null && value !== false
  const hasLabel = label !== undefined && label !== null && label !== false
  const hasExtra = extra !== undefined && extra !== null && extra !== false
  const hasChildren = children !== undefined && children !== null && children !== false
  const hasIcon = icon !== undefined && icon !== null && icon !== false
  const hasRightIcon = rightIcon !== undefined && rightIcon !== null && rightIcon !== false

  const onlyValue = !hasTitle && !hasChildren
  const isPrimitiveValue = typeof value === 'string' || typeof value === 'number'

  const showBorder = border && group.border && !group.isLast
  const showArrow = (isLink ?? false) || clickable

  const hasPressHandler =
    typeof onPress === 'function' ||
    typeof rest.onLongPress === 'function' ||
    typeof rest.onPressIn === 'function' ||
    typeof rest.onPressOut === 'function'

  const isInteractive = (clickable || hasPressHandler) && !disabled

  const baseContainerStyle = React.useMemo(
    () => ({
      backgroundColor: tokens.container.background,
      paddingVertical:
        size === 'large'
          ? tokens.container.largePaddingVertical
          : tokens.container.paddingVertical,
      paddingHorizontal: tokens.container.paddingHorizontal,
    }),
    [size, tokens.container],
  )

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    baseContainerStyle,
    center && styles.center,
    style,
  ]

  const resolvedPadding = React.useMemo(() => {
    const flattened = StyleSheet.flatten([styles.container, baseContainerStyle, center && styles.center, style]) as
      | ExtendedViewStyle
      | undefined
    const horizontal = typeof flattened?.paddingHorizontal === 'number' ? flattened.paddingHorizontal : undefined

    const resolveInset = (primary?: number | string, secondary?: number | string) => {
      if (typeof primary === 'number') return primary
      if (typeof secondary === 'number') return secondary
      if (typeof horizontal === 'number') return horizontal
      return tokens.container.paddingHorizontal
    }

    return {
      left: resolveInset(flattened?.paddingLeft, flattened?.paddingStart),
      right: resolveInset(flattened?.paddingRight, flattened?.paddingEnd),
    }
  }, [baseContainerStyle, center, style, tokens.container.paddingHorizontal])

  const hairline = React.useMemo(() => {
    if (!showBorder) return null
    const borderWidth = typeof tokens.border.width === 'number' ? tokens.border.width : undefined
    const hairlineStyle = createHairlineView({
      position: 'bottom',
      color: tokens.border.color,
      left: resolvedPadding.left,
      right: resolvedPadding.right,
      enabled: borderWidth !== undefined ? borderWidth > 0 : true,
      // 如果指定了自定义宽度，传递给 createHairlineView 统一处理
      width: borderWidth,
    })

    return <View style={[styles.hairline, hairlineStyle]} />
  }, [
    resolvedPadding.left,
    resolvedPadding.right,
    showBorder,
    tokens.border.color,
    tokens.border.width,
  ])

  const renderValue = () => {
    if (hasValue) {
      if (isPrimitiveValue) {
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
      return (
        <View
          style={[
            styles.customContent,
            { justifyContent: center ? 'center' : 'flex-start' },
            contentStyle,
          ]}
        >
          {value}
        </View>
      )
    }
    if (hasChildren) {
      return (
        <View
          style={[
            styles.customContent,
            { justifyContent: center ? 'center' : 'flex-start' },
            contentStyle,
          ]}
        >
          {children}
        </View>
      )
    }
    return null
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
              ? typeof title === 'string' || typeof title === 'number'
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
          ? typeof label === 'string' || typeof label === 'number'
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
          { minHeight: lineHeight },
          { marginLeft: tokens.spacing.valueGap },
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

  const renderExtra = () => {
    if (!hasExtra) return null
    if (typeof extra === 'string' || typeof extra === 'number') {
      return (
        <Text
          style={{
            marginLeft: tokens.spacing.extraGap,
            color: tokens.typography.valueColor,
            fontSize: size === 'large' ? tokens.typography.largeValueSize : tokens.typography.valueSize,
          }}
        >
          {extra}
        </Text>
      )
    }
    return <View style={{ marginLeft: tokens.spacing.extraGap }}>{extra}</View>
  }

  if (!isInteractive) {
    return (
      <View style={containerStyles} {...rest}>
        {renderBody()}
        {hairline}
      </View>
    )
  }

  const { android_ripple, onPress: _ignoredPress, ...viewProps } = rest as typeof rest & {
    android_ripple?: Pressable['props']['android_ripple']
  }

  const { interactionProps, states } = useAriaPress({
    disabled,
    onPress,
  })

  return (
    <Pressable
      ref={ref}
      style={[containerStyles, { opacity: states.pressed ? 0.6 : 1 }]}
      android_ripple={android_ripple ?? { color: '#f2f3f5' }}
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
