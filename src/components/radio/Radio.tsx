import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useRadio } from '@react-native-aria/radio'
import { useToggleState } from '@react-stately/toggle'
import type { RadioGroupState } from '@react-stately/radio'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { deepMerge } from '../../utils/deepMerge'
import type { RadioProps, RadioValue } from './types'
import { RadioGroupContext } from './RadioContext'

interface RadioTokens {
  defaults: {
    iconSize: number
    labelPosition: 'left' | 'right'
  }
  colors: {
    border: string
    background: string
    checkedBackground: string
    disabledBorder: string
    disabledBackground: string
    checkmark: string
    label: string
    labelDisabled: string
  }
  typography: {
    fontSize: number
    fontFamily: string
    fontWeight: string
    lineHeightMultiplier: number
  }
  spacing: {
    gap: number
  }
}

const createRadioTokens = (foundations: Foundations): RadioTokens => {
  const { palette, spacing, fontSize, typography } = foundations
  return {
    defaults: {
      iconSize: 20,
      labelPosition: 'right',
    },
    colors: {
      border: palette.default[400],
      background: '#ffffff',
      checkedBackground: palette.primary[500],
      disabledBorder: palette.default[300],
      disabledBackground: palette.default[100],
      checkmark: '#ffffff',
      label: palette.default.foreground ?? '#111827',
      labelDisabled: palette.default[400],
    },
    typography: {
      fontSize: fontSize.md,
      fontFamily: typography.fontFamily,
      fontWeight: typography.weight.medium,
      lineHeightMultiplier: typography.lineHeightMultiplier,
    },
    spacing: {
      gap: spacing.sm,
    },
  }
}

const useRadioTokens = (overrides?: DeepPartial<RadioTokens>): RadioTokens => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createRadioTokens(foundations)
    const componentOverrides = components?.radio as DeepPartial<RadioTokens> | undefined
    const merged = componentOverrides
      ? overrides
        ? deepMerge(componentOverrides, overrides)
        : componentOverrides
      : overrides
    return merged ? deepMerge(base, merged) : base
  }, [components, foundations, overrides])
}

const serializeValue = (value: RadioValue | undefined) => {
  if (value === undefined || value === null) return undefined
  return String(value)
}

export const Radio: React.FC<RadioProps> = props => {
  const {
    children,
    name,
    value,
    iconSize,
    checkedColor,
    labelPosition,
    labelDisabled,
    disabled,
    style,
    labelStyle,
    ...rest
  } = props

  const tokens = useRadioTokens()
  const group = React.useContext(RadioGroupContext)

  const resolvedIconSize = iconSize ?? group?.iconSize ?? tokens.defaults.iconSize
  const resolvedCheckedColor = checkedColor ?? group?.checkedColor ?? tokens.colors.checkedBackground
  const resolvedLabelPosition = labelPosition ?? tokens.defaults.labelPosition
  const resolvedLabelDisabled = labelDisabled ?? group?.labelDisabled ?? false
  const resolvedDisabled = disabled || group?.state.isDisabled

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
            borderRadius: resolvedIconSize / 2,
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
              borderRadius: resolvedIconSize / 4,
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
