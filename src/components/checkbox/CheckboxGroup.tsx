import React, { useImperativeHandle } from 'react'
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native'
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
    disabled = false,
    direction = 'vertical',
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
  const gap = gapProp ?? tokens.spacing.groupGap

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

  const childrenArray = React.Children.toArray(children).filter(Boolean)

  const itemStyleForIndex = (index: number): StyleProp<ViewStyle> => {
    const isLast = index === childrenArray.length - 1
    if (direction === 'horizontal') {
      return [
        styles.item,
        !isLast && { marginRight: gap },
      ]
    }
    return isLast ? styles.item : [styles.item, { marginBottom: gap }]
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
          direction === 'horizontal' ? styles.horizontal : styles.vertical,
          style,
        ]}
      >
        {childrenArray.map((child, index) => (
          <View
            style={itemStyleForIndex(index)}
            key={(child as any)?.key ?? index}
          >
            {child}
          </View>
        ))}
      </View>
    </CheckboxGroupContext.Provider>
  )
})

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
  },
  item: {
    flexShrink: 0,
  },
})
