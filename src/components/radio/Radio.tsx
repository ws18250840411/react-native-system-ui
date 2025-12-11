import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
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
    shape = 'round',
    labelPosition,
    labelDisabled,
    disabled,
    style,
    labelStyle,
    ...rest
  } = props

  const tokens = useRadioTokens()
  const group = React.useContext(RadioGroupContext)

  const resolvedIconSize = parseSize(iconSize ?? group?.iconSize, tokens.defaults.iconSize)
  const resolvedCheckedColor = checkedColor ?? group?.checkedColor ?? tokens.colors.checkedBackground
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
  const resolvedLabelDisabled = labelDisabled ?? group?.labelDisabled ?? false
  const resolvedDisabled = disabled || group?.state.isDisabled
  const resolvedShape = shape

  const optionValue = value ?? name
  const serializedValue = serializeValue(optionValue)

  const inputRef = React.useRef<View>(null)
  const ariaLabel = typeof children === 'string' ? children : (props as any)['aria-label']

  let inputProps: any
  let isChecked = false

  if (group && serializedValue) {
    React.useEffect(() => {
      group.registerValue(serializedValue, optionValue ?? serializedValue)
      return () => {
        group.unregisterValue(serializedValue)
      }
    }, [group, optionValue, serializedValue])

    const { inputProps: groupInputProps } = useRadio(
      {
        value: serializedValue,
        isDisabled: resolvedDisabled,
        'aria-label': ariaLabel,
        ...rest,
      },
      group.state,
      inputRef
    )

    inputProps = groupInputProps
    isChecked = group.state.selectedValue === serializedValue
  } else {
    const { isSelected, setSelected } = useToggleState({
      isSelected: props.checked,
      defaultSelected: props.defaultChecked,
      onChange: next => props.onChange?.(next),
    })

    const pseudoState = React.useMemo(() => ({
      selectedValue: isSelected ? 'checked' : null,
      setSelectedValue: (value: string | null) => {
        setSelected(value !== null)
      },
    }), [isSelected, setSelected]) as Partial<RadioGroupState> as RadioGroupState

    const { inputProps: standaloneInputProps } = useRadio(
      {
        value: serializedValue ?? 'standalone',
        isDisabled: resolvedDisabled,
        'aria-label': ariaLabel,
        ...rest,
      },
      pseudoState,
      inputRef
    )

    inputProps = standaloneInputProps
    isChecked = isSelected
  }

  const borderColor = resolvedDisabled
    ? tokens.colors.disabledBorder
    : isChecked
      ? resolvedCheckedColor
      : tokens.colors.border
  const backgroundColor = resolvedDisabled ? tokens.colors.disabledBackground : tokens.colors.background

  const spacingStyle = resolvedLabelPosition === 'left'
    ? { marginRight: tokens.spacing.gap }
    : { marginLeft: tokens.spacing.gap }

  const iconNode = (
    <Pressable
      key="radio-icon"
      {...inputProps}
      ref={inputRef}
      testID={serializedValue ? `radio-icon-${serializedValue}` : undefined}
      style={[styles.iconWrapper, resolvedLabelPosition === 'left' ? { marginLeft: tokens.spacing.gap } : { marginRight: tokens.spacing.gap }]}
    >
      <View
        style={[
          styles.icon,
          {
            width: resolvedIconSize,
            height: resolvedIconSize,
            borderRadius:
              resolvedShape === 'square'
                ? tokens.shape.squareRadius
                : resolvedIconSize / 2,
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
              borderRadius:
                resolvedShape === 'square'
                  ? tokens.shape.squareRadius
                  : resolvedIconSize / 4,
              backgroundColor: resolvedCheckedColor,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  )

  const labelNode = children === null || children === undefined
    ? null
    : (
      <Pressable
        key="radio-label"
        disabled={resolvedDisabled || resolvedLabelDisabled}
        onPress={inputProps?.onPress}
        style={spacingStyle}
      >
        <Text
          style={[
            styles.label,
            {
              color: resolvedDisabled || resolvedLabelDisabled ? tokens.colors.labelDisabled : tokens.colors.label,
              fontSize: tokens.typography.fontSize,
              lineHeight: tokens.typography.fontSize * tokens.typography.lineHeightMultiplier,
              fontFamily: tokens.typography.fontFamily,
              fontWeight: tokens.typography.fontWeight,
            },
            labelStyle,
          ]}
        >
          {children}
        </Text>
      </Pressable>
    )

  const nodes = resolvedLabelPosition === 'left'
    ? [labelNode, iconNode]
    : [iconNode, labelNode]

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
  icon: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    includeFontPadding: false,
  },
})
