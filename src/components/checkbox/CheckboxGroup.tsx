import React, { useCallback, useImperativeHandle, useMemo, useRef } from 'react'
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native'
import { useCheckboxGroup } from '@react-native-aria/checkbox'
import { useCheckboxGroupState, type CheckboxGroupState } from '@react-stately/checkbox'

import type {
  CheckboxGroupDirection,
  CheckboxGroupProps,
  CheckboxIconRender,
  CheckboxShape,
  CheckboxValue,
} from './types'
import { useCheckboxTokens } from './tokens'
import { isBoolean } from '../../utils'

const serialize = (value: CheckboxValue) => String(value)

type RegistryItem = { value: CheckboxValue; disabled?: boolean }

export interface CheckboxGroupContextValue {
  state: CheckboxGroupState
  direction: CheckboxGroupDirection
  shape?: CheckboxShape
  iconSize?: number
  iconRender?: CheckboxIconRender
  checkedColor?: string
  labelDisabled?: boolean
  max?: number
  registerValue: (key: string, raw: CheckboxValue, disabled?: boolean) => void
  unregisterValue: (key: string) => void
}

export const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null)

export const CheckboxGroup = React.forwardRef<{ toggleAll: (options?: boolean | { checked?: boolean; skipDisabled?: boolean }) => void }, CheckboxGroupProps>((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    disabled: disabledProp,
    direction: directionProp,
    shape,
    iconSize,
    checkedColor,
    iconRender,
    labelDisabled,
    max,
    gap: gapProp,
    children,
    style,
    tokensOverride,
    accessibilityLabel,
    accessibilityHint,
    ...viewProps
  } = props

  const tokens = useCheckboxTokens(tokensOverride)
  const disabled = disabledProp ?? tokens.defaults.groupDisabled
  const direction = directionProp ?? tokens.defaults.groupDirection
  const gap = Math.max(0, gapProp ?? tokens.spacing.groupGap)
  const supportsGap = Platform.OS === 'web'

  const registryRef = useRef(new Map<string, RegistryItem>())

  const state = useCheckboxGroupState({
    value: value?.map(serialize),
    defaultValue: defaultValue?.map(serialize),
    onChange: next => {
      onChange?.(next.map(key => registryRef.current.get(key)?.value ?? key))
    },
    isDisabled: disabled,
  })

  const { groupProps } = useCheckboxGroup(
    {
      isDisabled: disabled,
      'aria-label': accessibilityLabel,
      'aria-describedby': accessibilityHint,
    },
    state
  )

  const groupPropsRecord = (groupProps ?? {}) as Record<string, unknown>
  const { [' aria-disabled']: __ariaDisabledTypo, ...restGroupProps } = groupPropsRecord
  const resolvedGroupProps = useMemo(() => ({
    ...restGroupProps,
    'aria-disabled': disabled,
  }), [disabled, restGroupProps])

  const registerValue = useCallback((key: string, raw: CheckboxValue, itemDisabled?: boolean) => {
    registryRef.current.set(key, { value: raw, disabled: itemDisabled })
  }, [])

  const unregisterValue = useCallback((key: string) => {
    registryRef.current.delete(key)
  }, [])

  const childrenArray = useMemo(
    () => React.Children.toArray(children).filter(child => child != null && !isBoolean(child)),
    [children]
  )
  const childrenLength = childrenArray.length

  const itemStyleForIndex = useCallback((index: number): StyleProp<ViewStyle> => {
    const isLast = index === childrenLength - 1
    if (direction === 'horizontal') {
      return [
        tokens.layout.groupItem,
        !isLast && { marginRight: gap },
      ]
    }
    return isLast ? tokens.layout.groupItem : [tokens.layout.groupItem, { marginBottom: gap }]
  }, [childrenLength, direction, gap, tokens.layout.groupItem])

  const toggleAll = useCallback(
    (options: boolean | { checked?: boolean; skipDisabled?: boolean } = {}) => {
      const opts = isBoolean(options) ? { checked: options } : options
      const { checked: targetChecked, skipDisabled } = opts
      const current = new Set(state.value ?? [])

      const nextKeys: string[] = []
      registryRef.current.forEach((meta, key) => {
        const isDisabledItem = !!meta.disabled || disabled
        if (skipDisabled && isDisabledItem) {
          if (current.has(key)) nextKeys.push(key)
          return
        }

        const shouldSelect =
          targetChecked === true
            ? true
            : targetChecked === false
              ? false
              : !current.has(key)

        if (shouldSelect) {
          nextKeys.push(key)
        }
      })

      state.setValue(nextKeys)
    },
    [disabled, state],
  )

  useImperativeHandle(ref, () => ({ toggleAll }), [toggleAll])

  const contextValue = useMemo(() => ({
    state,
    direction,
    shape,
    iconSize,
    iconRender,
    checkedColor,
    labelDisabled,
    max,
    registerValue,
    unregisterValue,
  }), [
    checkedColor,
    direction,
    iconRender,
    iconSize,
    labelDisabled,
    max,
    registerValue,
    shape,
    state,
    unregisterValue,
  ])

  const containerStyle = [
    direction === 'horizontal' ? tokens.layout.groupHorizontal : tokens.layout.groupVertical,
    supportsGap
      ? {
        columnGap: direction === 'horizontal' ? gap : undefined,
        rowGap: gap,
      }
      : null,
    style,
  ]

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
    <CheckboxGroupContext.Provider
      value={contextValue}
    >
      <View
        {...resolvedGroupProps}
        {...viewProps}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        style={containerStyle}
      >
        {renderedChildren}
      </View>
    </CheckboxGroupContext.Provider>
  )
})
