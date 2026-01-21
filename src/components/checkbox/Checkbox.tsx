import React from 'react'
import { Platform, Pressable, Text, View, type GestureResponderEvent, type StyleProp, type ViewStyle } from 'react-native'
import { useCheckbox, useCheckboxGroupItem } from '@react-native-aria/checkbox'
import { useToggleState } from '@react-stately/toggle'

import type { CheckboxProps } from './types'
import { CheckboxGroupContext } from './CheckboxContext'
import { useCheckboxTokens } from './tokens'
import { isText } from '../../utils'

export const Checkbox = React.forwardRef<View, CheckboxProps>((props, ref) => {
  const {
    children,
    name,
    value,
    iconRender,
    bindGroup: bindGroupProp,
    shape,
    iconSize,
    checkedColor,
    labelPosition,
    labelDisabled,
    disabled,
    style,
    labelStyle,
    tokensOverride,
    hitSlop = 8,
    accessibilityLabel,
    ['aria-label']: ariaLabel,
    onClick,
    onChange,
    ...rest
  } = props

  const tokens = useCheckboxTokens(tokensOverride)
  const group = React.useContext(CheckboxGroupContext)
  const bindGroup = bindGroupProp ?? tokens.defaults.bindGroup

  const resolvedShape = shape ?? group?.shape ?? tokens.defaults.shape
  const resolvedIconSize = iconSize ?? group?.iconSize ?? tokens.defaults.iconSize
  const resolvedCheckedColor = checkedColor ?? group?.checkedColor ?? tokens.colors.checkedBackground
  const resolvedIconRender = iconRender ?? group?.iconRender
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
  const resolvedLabelDisabled = labelDisabled ?? group?.labelDisabled ?? tokens.defaults.labelDisabled
  const resolvedDisabled = Boolean(disabled || group?.state.isDisabled)

  const rawValue = value ?? name
  const serializedValue = rawValue == null ? undefined : String(rawValue)

  const internalRef = React.useRef<View>(null)

  // Merge refs
  React.useImperativeHandle(ref, () => internalRef.current!)

  const standaloneState = useToggleState({
    isSelected: props.checked,
    defaultSelected: props.defaultChecked,
    onChange,
  })

  const isGroup = !!group && serializedValue !== undefined && bindGroup

  const { onBlur, onFocus, ...compatibleRest } = rest

  React.useEffect(() => {
    if (group && bindGroup && serializedValue !== undefined && rawValue !== undefined) {
      group.registerValue(serializedValue, rawValue, resolvedDisabled)
      return () => group.unregisterValue(serializedValue)
    }
    return undefined
  }, [bindGroup, group, serializedValue, rawValue, resolvedDisabled])

  const resolvedAccessibilityLabel =
    accessibilityLabel ??
    ariaLabel ??
    (isText(children) ? String(children) : undefined) ??
    serializedValue ??
    'checkbox'

  let inputProps: Partial<React.ComponentProps<typeof Pressable>> | undefined
  let isChecked: boolean

  if (isGroup && group) {
    const { inputProps: groupInputProps } = useCheckboxGroupItem(
      {
        ...compatibleRest,
        value: serializedValue!,
        isDisabled: resolvedDisabled,
        'aria-label': resolvedAccessibilityLabel,
      },
      group.state,
      internalRef as unknown as React.RefObject<HTMLInputElement>
    )

    inputProps = groupInputProps as unknown as Partial<React.ComponentProps<typeof Pressable>>
    isChecked = group.state.isSelected(serializedValue!)
  } else {
    const { inputProps: standaloneProps } = useCheckbox(
      {
        ...compatibleRest,
        isDisabled: resolvedDisabled,
        value: serializedValue,
        'aria-label': resolvedAccessibilityLabel,
      },
      standaloneState,
      internalRef as unknown as React.RefObject<HTMLInputElement>
    )
    inputProps = standaloneProps as unknown as Partial<React.ComponentProps<typeof Pressable>>
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
  const mergedInputProps: Partial<React.ComponentProps<typeof Pressable>> = inputProps
    ? {
      ...inputProps,
      onPress: (e: GestureResponderEvent) => {
        onClick?.(e)

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
          onChange?.(!props.checked)
          return
        }
        if (onChange) {
          standaloneState.setSelected(!standaloneState.isSelected)
        }
      },
    }
    : {}

  const labelNode =
    children === null || children === undefined || children === false
      ? null
      : isText(children)
        ? (
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
        )
        : (
          <View accessible={false} style={labelStyle as unknown as StyleProp<ViewStyle>}>
            {children}
          </View>
        )

  const iconBaseStyle = {
    width: resolvedIconSize,
    height: resolvedIconSize,
    borderRadius,
    borderColor,
    backgroundColor,
    borderWidth: tokens.borders.width,
  }
  const defaultIcon = (
    <View style={[tokens.layout.icon, iconBaseStyle]}>
      {isChecked ? (
        <Text
          style={[
            tokens.layout.checkmark,
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
    iconVisual = resolvedIconRender({
      checked: Boolean(isChecked),
      disabled: Boolean(resolvedDisabled),
    }) ?? null
  }

  const interactive = !resolvedDisabled && !resolvedLabelDisabled

  const labelWrapper = labelNode ? (
    <View
      style={[tokens.layout.labelWrapper, spacingStyle]}
      pointerEvents={resolvedLabelDisabled ? 'none' : undefined}
      accessible={false}
    >
      {labelNode}
    </View>
  ) : null

  const iconWrapperStyle = [
    tokens.layout.iconWrapper,
    resolvedLabelPosition === 'left'
      ? { marginLeft: tokens.spacing.gap }
      : { marginRight: tokens.spacing.gap },
  ]

  const iconWrapper = interactive ? (
    <View style={iconWrapperStyle}>{iconVisual}</View>
  ) : (
    <Pressable
      {...mergedInputProps}
      ref={internalRef}
      disabled={resolvedDisabled}
      accessibilityLabel={resolvedAccessibilityLabel}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled: !!resolvedDisabled }}
      style={iconWrapperStyle}
      hitSlop={hitSlop}
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
        ref={internalRef}
        disabled={resolvedDisabled}
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isChecked, disabled: !!resolvedDisabled }}
        style={({ pressed }) => [
          tokens.layout.container,
          style,
          Platform.OS === 'web' && ({ cursor: 'pointer' } as unknown as ViewStyle),
          pressed && { opacity: 0.8 } // Optional: add simple feedback
        ]}
        hitSlop={hitSlop}
      >
        {content}
      </Pressable>
    )
  }

  return (
    <View style={[tokens.layout.container, style]}>
      {content}
    </View>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox
