import React from 'react'
import { Pressable, StyleSheet, Text, View, type GestureResponderEvent } from 'react-native'
import { useCheckbox, useCheckboxGroupItem } from '@react-native-aria/checkbox'
import { useToggleState } from '@react-stately/toggle'

import type { CheckboxProps } from './types'
import { CheckboxGroupContext } from './CheckboxContext'
import { useCheckboxTokens } from './tokens'

const isTextLikeNode = (val: any): val is string | number =>
  typeof val === 'string' || typeof val === 'number'

export const Checkbox: React.FC<CheckboxProps> = props => {
  const {
    children,
    name,
    value,
    iconRender,
    bindGroup = true,
    shape,
    iconSize,
    checkedColor,
    labelPosition,
    labelDisabled,
    disabled,
    style,
    labelStyle,
    tokensOverride,
    ...rest
  } = props

  const tokens = useCheckboxTokens(tokensOverride)
  const group = React.useContext(CheckboxGroupContext)

  const resolvedShape = shape ?? group?.shape ?? tokens.defaults.shape
  const resolvedIconSize = iconSize ?? group?.iconSize ?? tokens.defaults.iconSize
  const resolvedCheckedColor = checkedColor ?? group?.checkedColor ?? tokens.colors.checkedBackground
  const resolvedIconRender = iconRender ?? group?.iconRender
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
  const resolvedLabelDisabled = labelDisabled ?? group?.labelDisabled ?? false
  const resolvedDisabled = Boolean(disabled || group?.state.isDisabled)

  const rawValue = value ?? name
  const serializedValue = rawValue == null ? undefined : String(rawValue)

  const inputRef = React.useRef<View>(null)

  const standaloneState = useToggleState({
    isSelected: props.checked,
    defaultSelected: props.defaultChecked,
    onChange: props.onChange,
  })

  const isGroup = !!group && serializedValue !== undefined && bindGroup

  const { onBlur, onFocus, ...compatibleRest } = rest as any

  React.useEffect(() => {
    if (group && bindGroup && serializedValue !== undefined && rawValue !== undefined) {
      group.registerValue(serializedValue, rawValue, resolvedDisabled)
      return () => group.unregisterValue(serializedValue)
    }
    return undefined
  }, [bindGroup, group, serializedValue, rawValue, resolvedDisabled])

  const resolvedAccessibilityLabel =
    (props as any).accessibilityLabel ??
    (props as any)['aria-label'] ??
    (isTextLikeNode(children) ? String(children) : undefined) ??
    serializedValue ??
    'checkbox'

  let inputProps: any
  let isChecked: boolean

  if (isGroup && group) {
    const { inputProps: groupInputProps } = useCheckboxGroupItem(
      {
        ...compatibleRest,
        value: serializedValue!,
        isDisabled: resolvedDisabled,
        'aria-label': resolvedAccessibilityLabel,
        accessibilityLabel: resolvedAccessibilityLabel,
      },
      group.state,
      inputRef as any
    )

    inputProps = groupInputProps
    isChecked = group.state.isSelected(serializedValue!)
  } else {
    const { inputProps: standaloneProps } = useCheckbox(
      {
        ...compatibleRest,
        isDisabled: resolvedDisabled,
        value: serializedValue,
        'aria-label': resolvedAccessibilityLabel,
        accessibilityLabel: resolvedAccessibilityLabel,
      },
      standaloneState,
      inputRef as any
    )
    inputProps = standaloneProps
    isChecked = props.checked !== undefined ? props.checked : standaloneState.isSelected
  }

  const borderRadius = resolvedShape === 'round' ? resolvedIconSize / 2 : tokens.radii.square

  const borderColor = resolvedDisabled
    ? tokens.colors.disabledBorder
    : isChecked
      ? resolvedCheckedColor
      : tokens.colors.border

  const backgroundColor = resolvedDisabled
    ? tokens.colors.disabledBackground
    : isChecked
      ? resolvedCheckedColor
      : tokens.colors.background

  const labelColor = resolvedDisabled || resolvedLabelDisabled
    ? tokens.colors.labelDisabled
    : tokens.colors.label

  const spacingStyle =
    resolvedLabelPosition === 'left'
      ? { marginRight: tokens.spacing.gap }
      : { marginLeft: tokens.spacing.gap }

  const originalOnPress = inputProps?.onPress
  const mergedInputProps = inputProps
    ? {
        ...inputProps,
        onPress: (e: GestureResponderEvent) => {
          props.onClick?.(e)

          if (
            isGroup &&
            group?.max &&
            !isChecked &&
            group.state.value.length >= group.max
          ) {
            return
          }

          if (originalOnPress) {
            originalOnPress(e)
            return
          }

          // Fallback: should be rare, but keeps behavior predictable.
          if (isGroup && group && serializedValue !== undefined) {
            if (isChecked) group.state.removeValue(serializedValue)
            else group.state.addValue(serializedValue)
            return
          }
          if (props.checked !== undefined) {
            props.onChange?.(!props.checked)
            return
          }
          if (props.onChange) {
            standaloneState.setSelected(!standaloneState.isSelected)
          }
        },
      }
    : {}

  const labelNode =
    children === null || children === undefined || children === false
      ? null
      : isTextLikeNode(children)
        ? (
          <Text
            accessible={false}
            style={[
              styles.label,
              {
                color: labelColor,
                fontSize: tokens.typography.fontSize,
                lineHeight: tokens.typography.fontSize * tokens.typography.lineHeightMultiplier,
                fontFamily: tokens.typography.fontFamily,
                fontWeight: tokens.typography.fontWeight as any,
              },
              labelStyle,
            ]}
          >
            {children}
          </Text>
        )
        : (
          <View accessible={false} style={labelStyle as any}>
            {children}
          </View>
        )

  const iconBaseStyle = {
    width: resolvedIconSize,
    height: resolvedIconSize,
    borderRadius,
    borderColor,
    backgroundColor,
  }
  const defaultIcon = (
    <View style={[styles.icon, iconBaseStyle]}>
      {isChecked ? (
        <Text
          style={[
            styles.checkmark,
            {
              color: tokens.colors.checkmark,
              fontSize: resolvedIconSize * tokens.icon.scale,
            },
          ]}
        >
          ✓
        </Text>
      ) : null}
    </View>
  )
  let iconVisual: React.ReactNode = defaultIcon
  if (resolvedIconRender) {
    try {
      iconVisual = resolvedIconRender({
        checked: Boolean(isChecked),
        disabled: Boolean(resolvedDisabled),
      }) ?? null
    } catch (error) {
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.warn('[Checkbox] iconRender error:', error)
      }
      iconVisual = defaultIcon
    }
  }

  const interactive = !resolvedDisabled && !resolvedLabelDisabled

  const labelWrapper = labelNode ? (
    <View
      style={[styles.labelWrapper, spacingStyle]}
      pointerEvents={resolvedLabelDisabled ? 'none' : undefined}
      accessible={false}
    >
      {labelNode}
    </View>
  ) : null

  const iconWrapperStyle = [
    styles.iconWrapper,
    resolvedLabelPosition === 'left'
      ? { marginLeft: tokens.spacing.gap }
      : { marginRight: tokens.spacing.gap },
  ]

  const iconWrapper = interactive ? (
    <View style={iconWrapperStyle}>{iconVisual}</View>
  ) : (
    <Pressable
      {...mergedInputProps}
      ref={inputRef}
      disabled={resolvedDisabled}
      accessibilityLabel={resolvedAccessibilityLabel}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled: !!resolvedDisabled }}
      style={iconWrapperStyle}
    >
      {iconVisual}
    </Pressable>
  )
  const content =
    resolvedLabelPosition === 'left' ? (
      <>
        {labelWrapper}
        {iconWrapper}
      </>
    ) : (
      <>
        {iconWrapper}
        {labelWrapper}
      </>
    )

  if (interactive) {
    return (
      <Pressable
        {...mergedInputProps}
        ref={inputRef}
        disabled={resolvedDisabled}
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isChecked, disabled: !!resolvedDisabled }}
        style={[styles.container, style]}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    textAlign: 'center',
    includeFontPadding: false,
  },
  label: {
    includeFontPadding: false,
  },
  labelWrapper: {
    flexShrink: 1,
  },
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
