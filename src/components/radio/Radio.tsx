import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native'
import { useRadio } from '@react-native-aria/radio'
import { useToggleState } from '@react-stately/toggle'
import type { RadioGroupState } from '@react-stately/radio'

import type { RadioProps, RadioValue } from './types'
import { RadioGroupContext } from './RadioContext'
import { useRadioTokens } from './tokens'

const serializeValue = (value: RadioValue | undefined) => {
  if (value === undefined || value === null) return undefined
  return String(value)
}

const parseSize = (size: number | string | undefined, fallback: number) => {
  if (typeof size === 'number') return size
  if (typeof size === 'string') {
    const parsed = parseFloat(size)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

export const Radio: React.FC<RadioProps> = props => {
  const {
    children,
    name,
    value,
    iconSize,
    checkedColor,
    iconRender,
    shape = 'round',
    labelPosition,
    labelDisabled,
    disabled,
    style,
    labelStyle,
    onClick,
    ...rest
  } = props

  const tokens = useRadioTokens()
  const group = React.useContext(RadioGroupContext)

  const optionValue = value ?? name
  const serializedValue = serializeValue(optionValue)
  const isGroup = Boolean(group) && serializedValue !== undefined

  const resolvedIconSize = parseSize(iconSize ?? group?.iconSize, tokens.defaults.iconSize)
  const resolvedCheckedColor =
    checkedColor ?? group?.checkedColor ?? tokens.colors.checkedBackground
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
  const resolvedLabelDisabled = labelDisabled ?? group?.labelDisabled ?? false
  const resolvedDisabled = Boolean(disabled || group?.state.isDisabled)
  const resolvedShape = shape
  const resolvedIconRender = iconRender

  const standaloneKey = serializedValue ?? 'standalone'

  const inputRef = React.useRef<View>(null)
  const resolvedAccessibilityLabel =
    (props as any).accessibilityLabel ??
    (props as any)['aria-label'] ??
    (typeof children === 'string' || typeof children === 'number' ? String(children) : undefined)

  const { isSelected: standaloneSelected, setSelected: setStandaloneSelected } =
    useToggleState({
      isSelected: props.checked,
      defaultSelected: props.defaultChecked,
      onChange: next => props.onChange?.(next),
    })

  const pseudoState = React.useMemo(() => {
    return {
      selectedValue: standaloneSelected ? standaloneKey : null,
      setSelectedValue: (next: string | null) => {
        setStandaloneSelected(next === standaloneKey)
      },
    } as Partial<RadioGroupState> as RadioGroupState
  }, [setStandaloneSelected, standaloneKey, standaloneSelected])

  React.useEffect(() => {
    if (isGroup && group && serializedValue !== undefined) {
      group.registerValue(serializedValue, optionValue ?? serializedValue)
      return () => group.unregisterValue(serializedValue)
    }
    return undefined
  }, [group, isGroup, optionValue, serializedValue])

  const state = isGroup && group ? group.state : pseudoState
  const radioValue = isGroup ? serializedValue! : standaloneKey

  const { onBlur, onFocus, ...compatibleRest } = rest as any
  const { inputProps } = useRadio(
    {
      value: radioValue,
      isDisabled: resolvedDisabled,
      'aria-label': resolvedAccessibilityLabel,
      accessibilityLabel: resolvedAccessibilityLabel,
      ...compatibleRest,
    },
    state,
    inputRef as any
  )

  const isChecked =
    isGroup && group && serializedValue !== undefined
      ? group.state.selectedValue === serializedValue
      : props.checked !== undefined
        ? props.checked
        : standaloneSelected

  const mergedInputProps = React.useMemo(() => {
    if (!inputProps) return {}

    if (isGroup && group) {
      const { onPress: _onPress, ...restInputProps } = inputProps
      return {
        ...restInputProps,
        onPress: (e: GestureResponderEvent) => {
          props.onClick?.(e)
          if (!isChecked && serializedValue !== undefined) {
            group.state.setSelectedValue(serializedValue)
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
          const currentChecked = standaloneSelected
          setStandaloneSelected(!currentChecked)
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
    standaloneSelected,
    setStandaloneSelected,
  ])

  const borderColor = resolvedDisabled
    ? tokens.colors.disabledBorder
    : isChecked
      ? resolvedCheckedColor
      : tokens.colors.border
  const backgroundColor = resolvedDisabled ? tokens.colors.disabledBackground : tokens.colors.background

  const spacingStyle = React.useMemo(
    () =>
      resolvedLabelPosition === 'left'
        ? { marginRight: tokens.spacing.gap }
        : { marginLeft: tokens.spacing.gap },
    [resolvedLabelPosition, tokens.spacing.gap]
  )

  const labelColor = resolvedDisabled ? tokens.colors.labelDisabled : tokens.colors.label

  const borderRadius =
    resolvedShape === 'square' ? tokens.shape.squareRadius : tokens.shape.roundRadius

  const labelNode = React.useMemo(
    () =>
      children === null || children === undefined || children === false
        ? null
        : (
          <View
            key="radio-label"
            style={[styles.labelWrapper, spacingStyle]}
            pointerEvents="none"
            accessible={false}
          >
            {typeof children === 'string' || typeof children === 'number' ? (
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
            ) : (
              children
            )}
          </View>
        ),
    [children, spacingStyle, labelColor, tokens.typography, labelStyle]
  )

  const interactive = !resolvedDisabled && !resolvedLabelDisabled

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
            <View
              style={{
                width: resolvedIconSize / 2,
                height: resolvedIconSize / 2,
                borderRadius,
                backgroundColor: resolvedCheckedColor,
              }}
            />
          ) : null}
        </View>
      )
    }

    try {
      const icon = resolvedIconRender({ checked: Boolean(isChecked), disabled: Boolean(resolvedDisabled) })
      return icon ?? null
    } catch (error) {
      console.warn('Radio iconRender error:', error)
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
            <View
              style={{
                width: resolvedIconSize / 2,
                height: resolvedIconSize / 2,
                borderRadius,
                backgroundColor: resolvedCheckedColor,
              }}
            />
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
    resolvedCheckedColor,
  ])

  const iconWrapperStyle = React.useMemo(
    () => styles.iconWrapper,
    []
  )

  const iconNode = interactive ? (
    <View key="radio-icon" style={iconWrapperStyle}>
      {iconVisual}
    </View>
  ) : (
    <Pressable
      {...mergedInputProps}
      key="radio-icon"
      ref={inputRef}
      testID={serializedValue !== undefined ? `radio-icon-${serializedValue}` : undefined}
      pointerEvents={undefined}
      accessibilityRole="radio"
      accessibilityState={{ selected: isChecked, disabled: resolvedDisabled }}
      style={iconWrapperStyle}
    >
      {iconVisual}
    </Pressable>
  )

  const nodes = resolvedLabelPosition === 'left'
    ? [labelNode, iconNode]
    : [iconNode, labelNode]

  if (interactive) {
    return (
      <Pressable
        {...mergedInputProps}
        ref={inputRef}
        pointerEvents={undefined}
        testID={serializedValue !== undefined ? `radio-icon-${serializedValue}` : undefined}
        accessibilityRole="radio"
        accessibilityState={{ selected: isChecked, disabled: resolvedDisabled }}
        style={[styles.container, style]}
      >
        {nodes.filter(Boolean)}
      </Pressable>
    )
  }

  return <View style={[styles.container, style]}>{nodes.filter(Boolean)}</View>
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
  labelWrapper: {
    flexShrink: 1,
  },
  icon: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    includeFontPadding: false,
  },
})
