import React, { useCallback, useContext, useEffect, useMemo, useRef, type CSSProperties } from 'react'
import {
  Platform,
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
import { parseNumber, isText } from '../../utils'

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
  const group = useContext(RadioGroupContext)

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

  const inputRef = useRef<View>(null)
  const inputElementRef = useRef<HTMLInputElement | null>(null)
  const resolvedAccessibilityLabel = useMemo(
    () =>
      accessibilityLabel ??
      ariaLabel ??
      (isText(children) ? String(children) : undefined) ??
      serializedValue ??
      'radio',
    [accessibilityLabel, ariaLabel, children, serializedValue]
  )

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

  useEffect(() => {
    if (isGroup && group && serializedValue !== undefined) {
      group.registerValue(serializedValue, optionValue ?? serializedValue)
      return () => group.unregisterValue(serializedValue)
    }
    return undefined
  }, [group, isGroup, optionValue, serializedValue])

  const state = isGroup && group ? group.state : pseudoState
  const radioValue = isGroup ? serializedValue! : standaloneKey

  const { onBlur, onFocus, ...compatibleRest } = rest
  const ariaRef =
    Platform.OS === 'web'
      ? (inputElementRef as React.RefObject<HTMLInputElement>)
      : (inputRef as unknown as React.RefObject<HTMLElement>)

  const { inputProps } = useRadio(
    {
      value: radioValue,
      isDisabled: resolvedDisabled,
      'aria-label': resolvedAccessibilityLabel,
      accessibilityLabel: resolvedAccessibilityLabel,
      ...compatibleRest,
    },
    state,
    ariaRef
  )

  const isChecked =
    isGroup && group && serializedValue !== undefined
      ? group.state.selectedValue === serializedValue
      : checked !== undefined
        ? checked
        : standaloneSelected

  const inputOnPress = inputProps?.onPress

  const handlePress = useCallback(
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

  const spacingStyle = useMemo(
    () =>
      resolvedLabelPosition === 'left'
        ? { marginRight: tokens.spacing.gap }
        : { marginLeft: tokens.spacing.gap },
    [resolvedLabelPosition, tokens.spacing.gap]
  )
  const labelColor = useMemo(
    () => (resolvedDisabled ? tokens.colors.labelDisabled : tokens.colors.label),
    [resolvedDisabled, tokens.colors.label, tokens.colors.labelDisabled]
  )

  const borderRadius = useMemo(
    () => (shape === 'square' ? tokens.radii.square : tokens.radii.round),
    [shape, tokens.radii.round, tokens.radii.square]
  )

  const labelNode = useMemo(() => (
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
  ), [
    children,
    labelColor,
    labelStyle,
    spacingStyle,
    tokens.layout.label,
    tokens.layout.labelWrapper,
    tokens.typography.fontFamily,
    tokens.typography.fontSize,
    tokens.typography.fontWeight,
    tokens.typography.lineHeightMultiplier,
  ])

  const interactive = !resolvedDisabled && !resolvedLabelDisabled

  const defaultIcon = useMemo(() => (
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
  ), [
    backgroundColor,
    borderColor,
    borderRadius,
    isChecked,
    resolvedCheckedColor,
    resolvedIconSize,
    tokens.borders.width,
    tokens.layout.icon,
    tokens.sizing.dotScale,
  ])

  const iconVisual = iconRender
    ? iconRender({
      checked: Boolean(isChecked),
      disabled: Boolean(resolvedDisabled),
    }) ?? null
    : defaultIcon

  const webInputStyle: CSSProperties = {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  }
  const webInputNode = Platform.OS === 'web' ? (
    <input ref={inputElementRef} {...inputProps} style={webInputStyle} />
  ) : null

  const iconNode = interactive ? (
    <View style={tokens.layout.iconWrapper}>
      {iconVisual}
      {webInputNode}
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
      {webInputNode}
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
        {webInputNode}
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
