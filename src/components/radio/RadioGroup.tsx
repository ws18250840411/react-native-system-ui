import React from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import { useRadioGroup } from '@react-native-aria/radio'
import { useRadioGroupState } from '@react-stately/radio'

import { useTheme } from '../../design-system'
import type { RadioGroupProps, RadioValue } from './types'
import { RadioGroupContext } from './RadioContext'

const serialize = (value: RadioValue | undefined) => {
  if (value === undefined || value === null) return undefined
  return String(value)
}

export const RadioGroup: React.FC<RadioGroupProps> = props => {
  const {
    value,
    defaultValue,
    onChange,
    disabled = false,
    direction = 'vertical',
    iconSize,
    checkedColor,
    labelDisabled,
    gap: gapProp,
    name,
    children,
    style,
    ...viewProps
  } = props

  const { foundations } = useTheme()
  const gap = gapProp ?? foundations.spacing.md

  const registryRef = React.useRef(new Map<string, RadioValue>())
  const registerValue = React.useCallback((key: string, raw: RadioValue) => {
    registryRef.current.set(key, raw)
  }, [])
  const unregisterValue = React.useCallback((key: string) => {
    registryRef.current.delete(key)
  }, [])

  const state = useRadioGroupState({
    value: serialize(value),
    defaultValue: serialize(defaultValue),
    isDisabled: disabled,
    onChange: key => {
      const raw = registryRef.current.get(key)
      if (raw !== undefined) {
        onChange?.(raw)
      }
    },
    name,
  })

  const { groupProps } = useRadioGroup({ isDisabled: disabled, name }, state)

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
    <RadioGroupContext.Provider
      value={{
        state,
        direction,
        iconSize,
        checkedColor,
        labelDisabled,
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
    </RadioGroupContext.Provider>
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
