import React, { useCallback, useMemo, useRef } from 'react'
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native'
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

  const supportsGap = Platform.OS === 'web'
  const childrenArray = useMemo(
    () => React.Children.toArray(children).filter(child => child != null && typeof child !== 'boolean'),
    [children]
  )
  const childrenLength = childrenArray.length
  const itemStyleForIndex = useCallback((index: number): StyleProp<ViewStyle> => {
    if (supportsGap) return tokens.layout.groupItem

    const isLast = index === childrenLength - 1
    if (direction === 'horizontal') {
      return [
        tokens.layout.groupItem,
        !isLast && { marginRight: gap },
      ]
    }
    return isLast
      ? tokens.layout.groupItem
      : [tokens.layout.groupItem, { marginBottom: gap }]
  }, [childrenLength, direction, gap, supportsGap, tokens.layout.groupItem])

  const containerGapStyle: ViewStyle | null = useMemo(
    () => (supportsGap
      ? {
        columnGap: direction === 'horizontal' ? gap : undefined,
        rowGap: gap,
      }
      : null),
    [direction, gap, supportsGap]
  )

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

  const containerStyle = useMemo(() => ([
    direction === 'horizontal'
      ? tokens.layout.groupHorizontal
      : tokens.layout.groupVertical,
    containerGapStyle,
    style,
  ]), [containerGapStyle, direction, style, tokens.layout.groupHorizontal, tokens.layout.groupVertical])

  const renderedChildren = useMemo(
    () =>
      supportsGap
        ? childrenArray
        : childrenArray.map((child, index) => {
          const key: React.Key =
            React.isValidElement(child) && child.key !== null ? child.key : index
          const itemStyle = itemStyleForIndex(index)

          if (React.isValidElement(child) && child.type !== React.Fragment) {
            const element = child as React.ReactElement<{ style?: StyleProp<ViewStyle> }>
            return React.cloneElement(element, {
              style: [element.props.style, itemStyle],
              key,
            })
          }

          return (
            <View key={key} style={itemStyle}>
              {child}
            </View>
          )
        }),
    [childrenArray, itemStyleForIndex, supportsGap]
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
        style={containerStyle}
      >
        {renderedChildren}
      </View>
    </RadioGroupContext.Provider>
  )
}
