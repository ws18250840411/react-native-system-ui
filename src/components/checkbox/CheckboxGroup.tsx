import React from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import { useCheckboxGroup } from '@react-native-aria/checkbox'
import { useCheckboxGroupState } from '@react-stately/checkbox'

import { useTheme } from '../../design-system'
import type { CheckboxGroupProps, CheckboxValue } from './types'
import { CheckboxGroupContext } from './CheckboxContext'

const serialize = (value: CheckboxValue) => String(value)

export const CheckboxGroup: React.FC<CheckboxGroupProps> = props => {
  const {
    value,
    defaultValue,
    onChange,
    disabled = false,
    direction = 'vertical',
    shape,
    iconSize,
    checkedColor,
    labelDisabled,
    max,
    gap: gapProp,
    children,
    style,
    name,
    accessibilityLabel,
    accessibilityHint,
    ...viewProps
  } = props

  const { foundations } = useTheme()
  const gap = gapProp ?? foundations.spacing.md

  const registryRef = React.useRef(new Map<string, CheckboxValue>())

  const mapKeysToValues = React.useCallback(
    (keys: readonly string[]) => {
      return keys.map(key => registryRef.current.get(key) ?? key)
    },
    []
  )

  const state = useCheckboxGroupState({
    value: value?.map(serialize),
    defaultValue: defaultValue?.map(serialize),
    onChange: next => {
      onChange?.(mapKeysToValues(next))
    },
    isDisabled: disabled,
    name,
  })

  const { groupProps } = useCheckboxGroup(
    {
      isDisabled: disabled,
      'aria-label': accessibilityLabel,
      'aria-describedby': accessibilityHint,
      name,
    },
    state
  )

  const registerValue = React.useCallback((key: string, raw: CheckboxValue) => {
    registryRef.current.set(key, raw)
  }, [])

  const unregisterValue = React.useCallback((key: string) => {
    registryRef.current.delete(key)
  }, [])

  const childrenArray = React.Children.toArray(children).filter(Boolean)

  const itemStyleForIndex = (index: number): ViewStyle => {
    if (index === childrenArray.length - 1) {
      return styles.item
    }
    return direction === 'horizontal'
      ? [styles.item, { marginRight: gap }]
      : [styles.item, { marginBottom: gap }]
  }

  return (
    <CheckboxGroupContext.Provider
      value={{
        state,
        direction,
        shape,
        iconSize,
        checkedColor,
        labelDisabled,
        max,
        registerValue,
        unregisterValue,
      }}
    >
      <View
        {...groupProps}
        {...viewProps}
        style={[
          direction === 'horizontal' ? styles.horizontal : styles.vertical,
          style,
        ]}
      >
        {childrenArray.map((child, index) => (
          <View style={itemStyleForIndex(index)} key={(child as any)?.key ?? index}>
            {child}
          </View>
        ))}
      </View>
    </CheckboxGroupContext.Provider>
  )
}

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
