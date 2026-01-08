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

import type { RadioProps } from './types'
import { RadioGroupContext } from './RadioContext'
import { useRadioTokens } from './tokens'
import { parseNumber } from '../../utils/number'
import { isText } from '../../utils/validate'

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
    tokensOverride,
    onClick,
    ...rest
  } = props

  const tokens = useRadioTokens(tokensOverride)
  const group = React.useContext(RadioGroupContext)

  const optionValue = value ?? name
  const serializedValue = optionValue == null ? undefined : String(optionValue)
  const isGroup = !!group && serializedValue !== undefined

  const resolvedIconSize = parseNumber(iconSize ?? group?.iconSize, tokens.defaults.iconSize)
  const resolvedCheckedColor = checkedColor ?? group?.checkedColor ?? tokens.colors.checkedBackground
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
  const resolvedLabelDisabled = labelDisabled ?? group?.labelDisabled ?? false
  const resolvedDisabled = Boolean(disabled || group?.state.isDisabled)

  const standaloneKey = serializedValue ?? 'standalone'

  const inputRef = React.useRef<View>(null)
  const resolvedAccessibilityLabel =
    (props as any).accessibilityLabel ??
    (props as any)['aria-label'] ??
    (isText(children) ? String(children) : undefined) ??
    serializedValue ??
    'radio'

  const { isSelected: standaloneSelected, setSelected: setStandaloneSelected } =
    useToggleState({
      isSelected: props.checked,
      defaultSelected: props.defaultChecked,
      onChange: next => props.onChange?.(next),
    })

  const pseudoState = {
    selectedValue: standaloneSelected ? standaloneKey : null,
    setSelectedValue: (next: string | null) => {
      setStandaloneSelected(next === standaloneKey)
    },
  } as any

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

  const mergedInputProps = inputProps
    ? {
      ...inputProps,
      onPress: (e: GestureResponderEvent) => {
        onClick?.(e)

        if (isGroup && group && serializedValue !== undefined) {
          if (!isChecked) group.state.setSelectedValue(serializedValue)
          return
        }

        if (props.checked !== undefined) {
          props.onChange?.(!props.checked)
          return
        }

        if (props.onChange) {
          setStandaloneSelected(!standaloneSelected)
          return
        }

        inputProps.onPress?.(e)
      },
    }
    : {}

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
    shape === 'square' ? tokens.shape.squareRadius : tokens.shape.roundRadius

  const labelNode =
    children === null || children === undefined || children === false ? null : (
      <View
        key="radio-label"
        style={[styles.labelWrapper, spacingStyle]}
        pointerEvents="none"
        accessible={false}
      >
        {isText(children) ? (
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
    )

  const interactive = !resolvedDisabled && !resolvedLabelDisabled

  const defaultIcon = (
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
            width: resolvedIconSize * tokens.icon.dotScale,
            height: resolvedIconSize * tokens.icon.dotScale,
            borderRadius,
            backgroundColor: resolvedCheckedColor,
          }}
        />
      ) : null}
    </View>
  )
  let iconVisual: React.ReactNode = defaultIcon
  if (iconRender) {
    try {
      iconVisual = iconRender({ checked: Boolean(isChecked), disabled: Boolean(resolvedDisabled) }) ?? null
    } catch (error) {
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.warn('[Radio] iconRender error:', error)
      }
      iconVisual = defaultIcon
    }
  }

  const iconNode = interactive ? (
    <View key="radio-icon" style={styles.iconWrapper}>
      {iconVisual}
    </View>
  ) : (
    <Pressable
      {...mergedInputProps}
      key="radio-icon"
      ref={inputRef}
      testID={serializedValue !== undefined ? `radio-icon-${serializedValue}` : undefined}
      disabled={resolvedDisabled}
      accessibilityRole="radio"
      accessibilityState={{ selected: isChecked, disabled: resolvedDisabled }}
      style={styles.iconWrapper}
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
        testID={serializedValue !== undefined ? `radio-icon-${serializedValue}` : undefined}
        disabled={resolvedDisabled}
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
