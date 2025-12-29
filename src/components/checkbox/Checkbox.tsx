import React from 'react'
import { Pressable, StyleSheet, Text, View, type GestureResponderEvent } from 'react-native'
import { useCheckbox, useCheckboxGroupItem } from '@react-native-aria/checkbox'
import { useToggleState } from '@react-stately/toggle'

import type { CheckboxProps, CheckboxValue } from './types'
import { CheckboxGroupContext } from './CheckboxContext'
import { useCheckboxTokens } from './tokens'

const serializeValue = (value: CheckboxValue | undefined): string | undefined => {
  if (value === undefined || value === null) return undefined
  return String(value)
}

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
    ...rest
  } = props

  const tokens = useCheckboxTokens()
  const group = React.useContext(CheckboxGroupContext)

  const resolvedShape = shape ?? group?.shape ?? tokens.defaults.shape
  const resolvedIconSize = iconSize ?? group?.iconSize ?? tokens.defaults.iconSize
  const resolvedCheckedColor = checkedColor ?? group?.checkedColor ?? tokens.colors.checkedBackground
  const resolvedIconRender = iconRender ?? group?.iconRender
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
  const resolvedLabelDisabled = labelDisabled ?? group?.labelDisabled ?? false
  const resolvedDisabled = disabled || group?.state.isDisabled

  const rawValue: CheckboxValue | undefined = value ?? name
  const serializedValue = serializeValue(rawValue)

  const inputRef = React.useRef<View>(null)

  const standaloneState = useToggleState({
    isSelected: props.checked,
    defaultSelected: props.defaultChecked,
    onChange: props.onChange,
  })

  const isGroup = Boolean(group) && serializedValue !== undefined && bindGroup

  React.useEffect(() => {
    if (group && bindGroup && serializedValue !== undefined && rawValue !== undefined) {
      group.registerValue(serializedValue, rawValue, resolvedDisabled)
      return () => group.unregisterValue(serializedValue)
    }
    return undefined
  }, [bindGroup, group, serializedValue, rawValue, resolvedDisabled])

  const ariaLabel =
    typeof children === 'string' || typeof children === 'number'
      ? String(children)
      : (props as any)['aria-label']

  let inputProps: any
  let isChecked = false

  if (isGroup && group) {
    const { onBlur, onFocus, ...compatibleRest } = rest as any
    const { inputProps: groupInputProps } = useCheckboxGroupItem(
      {
        value: serializedValue!,
        isDisabled: resolvedDisabled,
        'aria-label': ariaLabel,
        ...compatibleRest,
      },
      group.state,
      inputRef as any
    )

    inputProps = groupInputProps
    isChecked = group.state.isSelected(serializedValue!)
  } else {
    const { onBlur, onFocus, ...compatibleRest } = rest as any
    const { inputProps: standaloneProps } = useCheckbox(
      {
        ...compatibleRest,
        isDisabled: resolvedDisabled,
        value: serializedValue,
        'aria-label': ariaLabel,
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

  const spacingStyle = React.useMemo(
    () =>
      resolvedLabelPosition === 'left'
        ? { marginRight: tokens.spacing.gap }
        : { marginLeft: tokens.spacing.gap },
    [resolvedLabelPosition, tokens.spacing.gap]
  )

  const mergedInputProps = React.useMemo(() => {
    if (!inputProps) return {}

    if (isGroup && group) {
      const { onPress: _onPress, ...restInputProps } = inputProps
      return {
        ...restInputProps,
        onPress: (e: GestureResponderEvent) => {
          props.onClick?.(e)
          if (group.max && !isChecked && group.state.value.length >= group.max) {
            return
          }
          if (isChecked) {
            group.state.removeValue(serializedValue!)
          } else {
            group.state.addValue(serializedValue!)
          }
        },
      }
    }

    if (props.checked !== undefined && props.onChange) {
      const { onPress: _onPress, ...restInputProps } = inputProps
      return {
        ...restInputProps,
        onPress: (e: GestureResponderEvent) => {
          props.onClick?.(e)
          props.onChange?.(!props.checked)
        },
      }
    }

    const originalOnPress = inputProps.onPress
    return {
      ...inputProps,
      onPress: (e: GestureResponderEvent) => {
        props.onClick?.(e)
        if (props.onChange) {
          const currentChecked = standaloneState.isSelected
          standaloneState.setSelected(!currentChecked)
        } else {
          originalOnPress?.(e)
        }
      },
    }
  }, [
    inputProps,
    isGroup,
    isChecked,
    group,
    serializedValue,
    props.onClick,
    props.checked,
    props.onChange,
    standaloneState,
  ])

  const labelNode = React.useMemo(
    () =>
      children === null || children === undefined || children === false
        ? null
        : typeof children === 'string' || typeof children === 'number'
          ? (
            <Text
              accessible={false}
              style={[
                styles.label,
                {
                  color: labelColor,
                  fontSize: tokens.typography.fontSize,
                  lineHeight:
                    tokens.typography.fontSize * tokens.typography.lineHeightMultiplier,
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
            <View
              accessible={false}
              style={labelStyle as any}
            >
              {children}
            </View>
          ),
    [children, labelColor, tokens.typography, labelStyle]
  )

  const iconVisual = React.useMemo(() => {
    if (!resolvedIconRender) {
      return (
        <View
          style={[
            styles.icon,
            {
              width: resolvedIconSize,
              height: resolvedIconSize,
              borderRadius,
              borderColor,
              backgroundColor,
            },
          ]}
        >
          {isChecked ? (
            <Text style={[styles.checkmark, { color: tokens.colors.checkmark, fontSize: resolvedIconSize * tokens.icon.scale }]}>✓</Text>
          ) : null}
        </View>
      )
    }

    try {
      const icon = resolvedIconRender({ checked: Boolean(isChecked), disabled: Boolean(resolvedDisabled) })
      return icon ?? null
    } catch (error) {
      console.warn('Checkbox iconRender error:', error)
      return (
        <View
          style={[
            styles.icon,
            {
              width: resolvedIconSize,
              height: resolvedIconSize,
              borderRadius,
              borderColor,
              backgroundColor,
            },
          ]}
        >
          {isChecked ? (
            <Text style={[styles.checkmark, { color: tokens.colors.checkmark, fontSize: resolvedIconSize * tokens.icon.scale }]}>✓</Text>
          ) : null}
        </View>
      )
    }
  }, [
    resolvedIconRender,
    isChecked,
    resolvedDisabled,
    resolvedIconSize,
    borderRadius,
    borderColor,
    backgroundColor,
    tokens.colors.checkmark,
    tokens.icon.scale,
  ])

  const renderContent = (iconWrapper: React.ReactNode, labelWrapper: React.ReactNode) =>
    resolvedLabelPosition === 'left'
      ? (
        <>
          {labelWrapper}
          {iconWrapper}
        </>
      )
      : (
        <>
          {iconWrapper}
          {labelWrapper}
        </>
      )

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

  const iconWrapperStyle = React.useMemo(
    () => [
      styles.iconWrapper,
      resolvedLabelPosition === 'left'
        ? { marginLeft: tokens.spacing.gap }
        : { marginRight: tokens.spacing.gap },
    ],
    [resolvedLabelPosition, tokens.spacing.gap]
  )


  if (interactive) {
    return (
      <Pressable
        {...mergedInputProps}
        ref={inputRef}
        pointerEvents={undefined}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isChecked, disabled: !!resolvedDisabled }}
        style={[styles.container, style]}
      >
        {renderContent(
          <View style={iconWrapperStyle}>{iconVisual}</View>,
          labelWrapper,
        )}
      </Pressable>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {renderContent(
        <Pressable
          {...mergedInputProps}
          ref={inputRef}
          pointerEvents={undefined}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isChecked, disabled: !!resolvedDisabled }}
          style={iconWrapperStyle}
        >
          {iconVisual}
        </Pressable>,
        labelWrapper,
      )}
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
