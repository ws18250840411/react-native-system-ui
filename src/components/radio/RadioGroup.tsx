import React from 'react'
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native'
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
    accessibilityLabel,
    accessibilityHint,
    ...viewProps
  } = props

  const { foundations } = useTheme()
  const gap = gapProp ?? foundations.spacing.sm

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

  const resolvedRadioGroupProps = React.useMemo(() => {
    if (!accessibilityHint) return radioGroupProps
    return {
      ...radioGroupProps,
      'aria-describedby': accessibilityHint,
    }
  }, [accessibilityHint, radioGroupProps])

  const supportsGap = Platform.OS === 'web'
  const childrenArray = React.Children.toArray(children).filter(Boolean)
  const itemStyleForIndex = (index: number): ViewStyle => {
    if (supportsGap) return styles.item

    const isLast = index === childrenArray.length - 1
    if (direction === 'horizontal') {
      return [
        styles.item,
        !isLast && { marginRight: gap },
        { marginBottom: gap },
      ]
    }
    return isLast ? styles.item : [styles.item, { marginBottom: gap }]
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
    [state, direction, iconSize, checkedColor, labelDisabled, registerValue, unregisterValue]
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
          direction === 'horizontal' ? styles.horizontal : styles.vertical,
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
