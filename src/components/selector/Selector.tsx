import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import type { SelectorProps, SelectorValue } from './types'
import { useSelectorTokens } from './tokens'

const CHECK_MARK = '✓'

export const Selector = <V extends SelectorValue>(props: SelectorProps<V>) => {
  const tokens = useSelectorTokens()
  const {
    options,
    columns = tokens.defaults.columns,
    multiple = tokens.defaults.multiple,
    showCheckMark = tokens.defaults.showCheckMark,
    disabled = false,
    defaultValue = [],
    value: valueProp,
    onChange,
    itemStyle,
    labelStyle,
    descriptionStyle,
    style,
    ...rest
  } = props

  const isControlled = valueProp !== undefined
  const [internalValue, setInternalValue] = React.useState<V[]>(defaultValue)
  const value = isControlled ? (valueProp ?? []) : internalValue

  const updateValue = React.useCallback(
    (next: V[]) => {
      if (!isControlled) {
        setInternalValue(next)
      }
      onChange?.(next, {
        items: options.filter(option => next.includes(option.value)),
      })
    },
    [isControlled, onChange, options],
  )

  const toggleOption = (option: typeof options[number]) => {
    if (disabled || option.disabled) return
    const active = value.includes(option.value)
    if (multiple) {
      const next = active
        ? value.filter(item => item !== option.value)
        : [...value, option.value]
      updateValue(next)
    } else {
      const next = active ? [] : [option.value]
      updateValue(next)
    }
  }

  const basis = columns ? `${100 / columns}%` : undefined
  const itemMargin = tokens.spacing.gap / 2

  return (
    <View
      {...rest}
      style={[
        styles.container,
        { marginHorizontal: -itemMargin, marginVertical: -itemMargin },
        style,
      ]}
      accessibilityRole="radiogroup"
    >
      {options.map(option => {
        const active = value.includes(option.value)
        const isDisabled = disabled || option.disabled
        const interactive = !isDisabled
        const labelColor = active ? tokens.colors.textActive : tokens.colors.text
        const descriptionColor = isDisabled
          ? tokens.colors.disabledText
          : tokens.colors.description

        const itemContent = (
          <View
            style={[
              styles.item,
              {
                marginHorizontal: itemMargin,
                marginVertical: itemMargin,
                paddingHorizontal: tokens.spacing.paddingHorizontal,
                paddingVertical: tokens.spacing.paddingVertical,
                borderRadius: tokens.radii.item,
                borderColor: active
                  ? tokens.colors.borderActive
                  : tokens.colors.border,
                backgroundColor: active
                  ? tokens.colors.backgroundActive
                  : tokens.colors.background,
                borderWidth: StyleSheet.hairlineWidth,
                width: basis,
                opacity: isDisabled ? 0.45 : 1,
              },
              itemStyle,
            ]}
          >
            <View style={styles.labelRow}>
              <Text
                style={[
                  styles.label,
                  {
                    color: labelColor,
                    fontSize: tokens.typography.fontSize,
                    fontFamily: tokens.typography.fontFamily,
                    fontWeight: tokens.typography.fontWeight,
                  },
                  labelStyle,
                ]}
              >
                {option.label}
              </Text>
              {active && showCheckMark ? (
                <Text style={[styles.checkMark, { color: tokens.colors.check }]}>
                  {CHECK_MARK}
                </Text>
              ) : null}
            </View>
            {option.description ? (
              <Text
                style={[
                  styles.description,
                  {
                    marginTop: tokens.spacing.descriptionMarginTop,
                    color: descriptionColor,
                    fontSize: tokens.typography.descriptionSize,
                  },
                  descriptionStyle,
                ]}
              >
                {option.description}
              </Text>
            ) : null}
          </View>
        )

        if (!interactive) {
          return (
            <View key={String(option.value)} style={{ width: basis }}>
              {itemContent}
            </View>
          )
        }

        return (
          <Pressable
            key={String(option.value)}
            accessibilityRole={multiple ? 'checkbox' : 'radio'}
            accessibilityState={{ checked: active, disabled: isDisabled }}
            onPress={() => toggleOption(option)}
            style={{ width: basis }}
          >
            {itemContent}
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  label: {
    includeFontPadding: false,
  },
  checkMark: {
    fontSize: 12,
  },
  description: {
    includeFontPadding: false,
  },
})

Selector.displayName = 'Selector'

export default Selector
