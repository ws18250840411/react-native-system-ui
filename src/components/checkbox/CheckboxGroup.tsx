import React, { useImperativeHandle } from 'react'
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native'
import { useCheckboxGroup } from '@react-native-aria/checkbox'
import { useCheckboxGroupState } from '@react-stately/checkbox'

import type {
  CheckboxGroupProps,
  CheckboxValue,
} from './types'
import { CheckboxGroupContext } from './CheckboxContext'
import { useCheckboxTokens } from './tokens'
import { isBoolean } from '../../utils/validate'

const serialize = (value: CheckboxValue) => String(value)

type RegistryItem = { value: CheckboxValue; disabled?: boolean }

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

  const registryRef = React.useRef(new Map<string, RegistryItem>())

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

  const { [' aria-disabled']: __ariaDisabledTypo, ...restGroupProps } = (groupProps ?? {}) as any
  const resolvedGroupProps = {
    ...restGroupProps,
    'aria-disabled': disabled,
  }

  const registerValue = React.useCallback((key: string, raw: CheckboxValue, itemDisabled?: boolean) => {
    registryRef.current.set(key, { value: raw, disabled: itemDisabled })
  }, [])

  const unregisterValue = React.useCallback((key: string) => {
    registryRef.current.delete(key)
  }, [])

  const childrenArray = React.Children.toArray(children).filter(child => child != null && !isBoolean(child))

  const itemStyleForIndex = (index: number): StyleProp<ViewStyle> => {
    const isLast = index === childrenArray.length - 1
    if (direction === 'horizontal') {
      return [
        tokens.layout.groupItem,
        !isLast && { marginRight: gap },
      ]
    }
    return isLast ? tokens.layout.groupItem : [tokens.layout.groupItem, { marginBottom: gap }]
  }

  const toggleAll = React.useCallback(
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

  const contextValue = React.useMemo(
    () => ({
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
    }),
    [state, direction, shape, iconSize, iconRender, checkedColor, labelDisabled, max]
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
        style={[
          direction === 'horizontal' ? tokens.layout.groupHorizontal : tokens.layout.groupVertical,
          supportsGap
            ? {
              columnGap: direction === 'horizontal' ? gap : undefined,
              rowGap: gap,
            }
            : null,
          style,
        ]}
      >
        {supportsGap
          ? childrenArray
          : childrenArray.map((child, index) => {
            const key = React.isValidElement(child) && child.key !== null ? child.key : index
            const itemStyle = itemStyleForIndex(index)

            if (React.isValidElement(child) && child.type !== React.Fragment) {
              const element = child as React.ReactElement<{ style?: StyleProp<ViewStyle> }>
              return React.cloneElement(element, {
                style: [element.props.style, itemStyle],
                key,
              })
            }

            return (
              <View key={key as any} style={itemStyle}>
                {child}
              </View>
            )
          })}
      </View>
    </CheckboxGroupContext.Provider>
  )
})
