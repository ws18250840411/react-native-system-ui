import React from 'react'
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native'
import { useRadio } from '@react-native-aria/radio'
import { useToggleState } from '@react-stately/toggle'

import type { RadioProps } from './types'
import { RadioGroupContext } from './RadioContext'
import { useRadioTokens } from './tokens'
import { parseNumber } from '../../utils/number'
import { isText } from '../../utils/validate'

export const Radio = React.memo((props: RadioProps) => {
  const {
    children,
    name,
    value,
    checked,
    defaultChecked,
    iconSize,
    checkedColor,
    iconRender,
    shape: shapeProp,
    labelPosition,
    labelDisabled,
    disabled,
    style,
    labelStyle,
    tokensOverride,
    onClick,
    onChange,
    accessibilityLabel,
    ['aria-label']: ariaLabel,
    ...rest
  } = props

  const tokens = useRadioTokens(tokensOverride)
  const group = React.useContext(RadioGroupContext)

  const optionValue = value ?? name
  const serializedValue = optionValue == null ? undefined : String(optionValue)
  const isGroup = !!group && serializedValue !== undefined

  const resolvedIconSize = parseNumber(
    iconSize ?? group?.iconSize,
    tokens.defaults.iconSize
  )
  const resolvedCheckedColor =
    checkedColor ?? group?.checkedColor ?? tokens.colors.checkedBackground
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
  const resolvedLabelDisabled =
    labelDisabled ?? group?.labelDisabled ?? tokens.defaults.labelDisabled
  const resolvedDisabled = Boolean(disabled || group?.state.isDisabled)

  const shape = shapeProp ?? tokens.defaults.shape

  const standaloneKey = serializedValue ?? 'standalone'

  const inputRef = React.useRef<View>(null)
  const resolvedAccessibilityLabel =
    accessibilityLabel ??
    ariaLabel ??
    (isText(children) ? String(children) : undefined) ??
    serializedValue ??
    'radio'

  const { isSelected: standaloneSelected, setSelected: setStandaloneSelected } =
    useToggleState({
      isSelected: checked,
      defaultSelected: defaultChecked,
      onChange: next => onChange?.(next),
    })

  const pseudoState = {
    selectedValue: standaloneSelected ? standaloneKey : null,
    setSelectedValue: (next: string | null) => {
      setStandaloneSelected(next === standaloneKey)
    },
  } as unknown as Parameters<typeof useRadio>[1]

  React.useEffect(() => {
    if (isGroup && group && serializedValue !== undefined) {
      group.registerValue(serializedValue, optionValue ?? serializedValue)
      return () => group.unregisterValue(serializedValue)
    }
    return undefined
  }, [group, isGroup, optionValue, serializedValue])

  const state = isGroup && group ? group.state : pseudoState
  const radioValue = isGroup ? serializedValue! : standaloneKey

  const { onBlur, onFocus, ...compatibleRest } = rest
  const { inputProps } = useRadio(
    {
      value: radioValue,
      isDisabled: resolvedDisabled,
      'aria-label': resolvedAccessibilityLabel,
      accessibilityLabel: resolvedAccessibilityLabel,
      ...compatibleRest,
    },
    state,
    inputRef as unknown as React.RefObject<HTMLElement>
  )

  const isChecked =
    isGroup && group && serializedValue !== undefined
      ? group.state.selectedValue === serializedValue
      : checked !== undefined
        ? checked
        : standaloneSelected

  const inputOnPress = inputProps?.onPress

  const handlePress = React.useCallback(
    (e: GestureResponderEvent) => {
      onClick?.(e)
      if (resolvedDisabled) return

      if (isGroup && group && serializedValue !== undefined) {
        if (!isChecked) group.state.setSelectedValue(serializedValue)
        return
      }

      if (checked !== undefined) {
        onChange?.(!checked)
        return
      }

      if (onChange) {
        setStandaloneSelected(!standaloneSelected)
        return
      }

      inputOnPress?.(e)
    },
    [
      checked,
      group,
      inputOnPress,
      isChecked,
      isGroup,
      onChange,
      onClick,
      resolvedDisabled,
      serializedValue,
      setStandaloneSelected,
      standaloneSelected,
    ]
  )

  const mergedInputProps = inputProps ? { ...inputProps, onPress: handlePress } : {}

  const borderColor = resolvedDisabled
    ? tokens.colors.disabledBorder
    : isChecked
      ? resolvedCheckedColor
      : tokens.colors.border
  const backgroundColor = resolvedDisabled ? tokens.colors.disabledBackground : tokens.colors.background

  const spacingStyle =
    resolvedLabelPosition === 'left'
      ? { marginRight: tokens.spacing.gap }
      : { marginLeft: tokens.spacing.gap }
  const labelColor = resolvedDisabled ? tokens.colors.labelDisabled : tokens.colors.label

  const borderRadius =
    shape === 'square' ? tokens.radii.square : tokens.radii.round

  const labelNode =
    children === null || children === undefined || children === false ? null : (
      <View
        style={[tokens.layout.labelWrapper, spacingStyle]}
        pointerEvents="none"
        accessible={false}
      >
        {isText(children) ? (
          <Text
            accessible={false}
            style={[
              tokens.layout.label,
              {
                color: labelColor,
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
        ) : (
          children
        )}
      </View>
    )

  const interactive = !resolvedDisabled && !resolvedLabelDisabled

  const defaultIcon = (
    <View
      style={[
        tokens.layout.icon,
        {
          width: resolvedIconSize,
          height: resolvedIconSize,
          borderRadius,
          borderWidth: tokens.borders.width,
          borderColor,
          backgroundColor,
        },
      ]}
    >
      {isChecked ? (
        <View
          style={{
            width: resolvedIconSize * tokens.sizing.dotScale,
            height: resolvedIconSize * tokens.sizing.dotScale,
            borderRadius,
            backgroundColor: resolvedCheckedColor,
          }}
        />
      ) : null}
    </View>
  )

  const iconVisual = iconRender
    ? iconRender({
      checked: Boolean(isChecked),
      disabled: Boolean(resolvedDisabled),
    }) ?? null
    : defaultIcon

  const iconNode = interactive ? (
    <View style={tokens.layout.iconWrapper}>
      {iconVisual}
    </View>
  ) : (
    <Pressable
      {...mergedInputProps}
      ref={inputRef}
      testID={serializedValue !== undefined ? `radio-icon-${serializedValue}` : undefined}
      disabled={resolvedDisabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: isChecked, disabled: resolvedDisabled }}
      style={tokens.layout.iconWrapper}
    >
      {iconVisual}
    </Pressable>
  )

  const left = resolvedLabelPosition === 'left'
  const first = left ? labelNode : iconNode
  const second = left ? iconNode : labelNode

  if (interactive) {
    return (
      <Pressable
        {...mergedInputProps}
        ref={inputRef}
        testID={serializedValue !== undefined ? `radio-icon-${serializedValue}` : undefined}
        disabled={resolvedDisabled}
        accessibilityRole="radio"
        accessibilityState={{ selected: isChecked, disabled: resolvedDisabled }}
        style={[tokens.layout.container, style]}
      >
        {first}
        {second}
      </Pressable>
    )
  }

  return (
    <View style={[tokens.layout.container, style]}>
      {first}
      {second}
    </View>
  )
})

Radio.displayName = 'Radio'
