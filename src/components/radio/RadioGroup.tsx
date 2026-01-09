import React from 'react'
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native'
import { useRadioGroup } from '@react-native-aria/radio'
import { useRadioGroupState } from '@react-stately/radio'

import type { RadioGroupProps, RadioValue } from './types'
import { RadioGroupContext } from './RadioContext'
import { useRadioTokens } from './tokens'

export const RadioGroup: React.FC<RadioGroupProps> = props => {
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
  const gap = gapProp ?? tokens.spacing.groupGap

  const registryRef = React.useRef(new Map<string, RadioValue>())
  const registerValue = React.useCallback((key: string, raw: RadioValue) => {
    registryRef.current.set(key, raw)
  }, [])
  const unregisterValue = React.useCallback((key: string) => {
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

  const resolvedRadioGroupProps = {
    ...((radioGroupProps ?? {}) as any),
    ...(accessibilityHint ? { 'aria-describedby': accessibilityHint } : null),
    'aria-disabled': disabled,
  }

  const supportsGap = Platform.OS === 'web'
  const childrenArray = React.Children.toArray(children).filter(Boolean)
  const itemStyleForIndex = (index: number): StyleProp<ViewStyle> => {
    if (supportsGap) return tokens.layout.groupItem

    const isLast = index === childrenArray.length - 1
    if (direction === 'horizontal') {
      return [
        tokens.layout.groupItem,
        !isLast && { marginRight: gap },
      ]
    }
    return isLast
      ? tokens.layout.groupItem
      : [tokens.layout.groupItem, { marginBottom: gap }]
  }

  const containerGapStyle: ViewStyle | null = supportsGap
    ? {
        columnGap: direction === 'horizontal' ? gap : undefined,
        rowGap: gap,
      }
    : null

  const contextValue = React.useMemo(
    () => ({
      state,
      direction,
      iconSize,
      checkedColor,
      labelDisabled,
      registerValue,
      unregisterValue,
    }),
    [state, direction, iconSize, checkedColor, labelDisabled]
  )

  return (
    <RadioGroupContext.Provider
      value={contextValue}
    >
      <View
        {...resolvedRadioGroupProps}
        {...viewProps}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        style={[
          direction === 'horizontal'
            ? tokens.layout.groupHorizontal
            : tokens.layout.groupVertical,
          containerGapStyle,
          style,
        ]}
      >
        {childrenArray.map((child, index) => (
          <View style={itemStyleForIndex(index)} key={(child as any)?.key ?? index}>
            {child}
          </View>
        ))}
      </View>
    </RadioGroupContext.Provider>
  )
}
