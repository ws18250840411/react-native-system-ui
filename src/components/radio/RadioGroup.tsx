import React, { useCallback, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { useRadioGroup } from '@react-native-aria/radio'
import { useRadioGroupState, type RadioGroupState } from '@react-stately/radio'

import type { RadioGroupDirection, RadioGroupProps, RadioValue } from './types'
import { useRadioTokens } from './tokens'

export interface RadioGroupContextValue {
  state: RadioGroupState
  direction: RadioGroupDirection
  iconSize?: number | string
  checkedColor?: string
  labelDisabled?: boolean
  registerValue: (key: string, raw: RadioValue) => void
  unregisterValue: (key: string) => void
}

export const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

const RadioGroupImpl: React.FC<RadioGroupProps> = props => {
  const {
    value,
    defaultValue,
    onChange,
    disabled: disabledProp,
    direction: directionProp,
    iconSize,
    checkedColor,
    labelDisabled,
    gap: gapProp,
    name,
    children,
    style,
    tokensOverride,
    accessibilityLabel,
    accessibilityHint,
    ...viewProps
  } = props

  const tokens = useRadioTokens(tokensOverride)
  const disabled = disabledProp ?? tokens.defaults.groupDisabled
  const direction = directionProp ?? tokens.defaults.groupDirection
  const gap = Math.max(0, gapProp ?? tokens.spacing.groupGap)

  const registryRef = useRef(new Map<string, RadioValue>())
  const registerValue = useCallback((key: string, raw: RadioValue) => {
    registryRef.current.set(key, raw)
  }, [])
  const unregisterValue = useCallback((key: string) => {
    registryRef.current.delete(key)
  }, [])

  const state = useRadioGroupState({
    value: value == null ? undefined : String(value),
    defaultValue: defaultValue == null ? undefined : String(defaultValue),
    isDisabled: disabled,
    onChange: key => {
      const raw = registryRef.current.get(key)
      onChange?.(raw ?? key)
    },
    name,
  })

  const { radioGroupProps } = useRadioGroup(
    {
      isDisabled: disabled,
      'aria-label': accessibilityLabel,
      name,
    },
    state
  )

  const resolvedRadioGroupProps = useMemo(() => ({
    ...(radioGroupProps ?? {}),
    ...(accessibilityHint && { 'aria-describedby': accessibilityHint }),
    'aria-disabled': disabled,
  }), [accessibilityHint, disabled, radioGroupProps])

  const contextValue = useMemo(() => ({
    state,
    direction,
    iconSize,
    checkedColor,
    labelDisabled,
    registerValue,
    unregisterValue,
  }), [
    checkedColor,
    direction,
    iconSize,
    labelDisabled,
    registerValue,
    state,
    unregisterValue,
  ])

  const containerStyle = [
    direction === 'horizontal'
      ? tokens.layout.groupHorizontal
      : tokens.layout.groupVertical,
    {
      columnGap: direction === 'horizontal' ? gap : undefined,
      rowGap: gap,
    },
    style,
  ]

  return (
    <RadioGroupContext.Provider
      value={contextValue}
    >
      <View
        {...resolvedRadioGroupProps}
        {...viewProps}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        style={containerStyle}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  )
}

export const RadioGroup = React.memo(RadioGroupImpl)

RadioGroup.displayName = 'RadioGroup'
