import React from 'react'
import { Platform, Pressable, StyleSheet, Text, View, type GestureResponderEvent } from 'react-native'
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
    const { inputProps: groupInputProps } = useCheckboxGroupItem(
      {
        value: serializedValue!,
        isDisabled: resolvedDisabled,
        'aria-label': ariaLabel,
        ...rest,
      },
      group.state,
      inputRef
    )

    inputProps = groupInputProps
    isChecked = group.state.isSelected(serializedValue!)

    if (group.max && !isChecked) {
      const originalOnPress = inputProps.onPress
      inputProps.onPress = (...args: any[]) => {
        if (group.state.value.length >= group.max!) {
          return
        }
        originalOnPress?.(...args)
      }
    }
  } else {
    const { inputProps: standaloneProps } = useCheckbox(
      {
        ...rest,
        isDisabled: resolvedDisabled,
        value: serializedValue,
        'aria-label': ariaLabel,
      },
      standaloneState,
      inputRef
    )
    inputProps = standaloneProps
    isChecked = standaloneState.isSelected
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

  const spacingStyle = resolvedLabelPosition === 'left'
    ? { marginRight: tokens.spacing.gap }
    : { marginLeft: tokens.spacing.gap }

  const handlePress = (e: GestureResponderEvent) => {
    props.onClick?.(e)
    inputProps?.onPress?.(e)
  }

  const labelNode =
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
                fontWeight: tokens.typography.fontWeight,
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
        )

  const iconVisual = resolvedIconRender ? (
    resolvedIconRender({ checked: isChecked, disabled: resolvedDisabled }) ?? null
  ) : (
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
        <Text style={[styles.checkmark, { color: tokens.colors.checkmark, fontSize: resolvedIconSize * 0.65 }]}>✓</Text>
      ) : null}
    </View>
  )

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

  const iconWrapperStyle = [
    styles.iconWrapper,
    resolvedLabelPosition === 'left'
      ? { marginLeft: tokens.spacing.gap }
      : { marginRight: tokens.spacing.gap },
  ]

  // rndoc mobile simulator 使用 @vant/touch-emulator，在 RN Web 组件上会导致按压事件异常；
  // 通过 data-no-touch-simulate 跳过 touch 模拟，仅保留 mouse/pointer 事件。
  const noTouchSimulateProps = Platform.OS === 'web'
    ? ({ dataSet: { noTouchSimulate: true } } as any)
    : {}

  if (interactive) {
    return (
      <Pressable
        {...noTouchSimulateProps}
        {...inputProps}
        ref={inputRef}
        onPress={handlePress}
        pointerEvents={Platform.OS === 'web' ? 'box-only' : undefined}
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
          {...noTouchSimulateProps}
          {...inputProps}
          ref={inputRef}
          onPress={handlePress}
          pointerEvents={Platform.OS === 'web' ? 'box-only' : undefined}
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
