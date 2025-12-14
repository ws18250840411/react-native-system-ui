import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import type { SelectorProps, SelectorValue } from './types'
import { useSelectorTokens } from './tokens'
import { useControllableValue } from '../../hooks'

const CHECK_MARK = '✓'

export const Selector = <V extends SelectorValue>(props: SelectorProps<V>) => {
  const tokens = useSelectorTokens()
  const {
    options,
    columns: columnsProp = tokens.defaults.columns,
    multiple = tokens.defaults.multiple,
    showCheckMark = tokens.defaults.showCheckMark,
    disabled = false,
    onChange,
    itemStyle,
    labelStyle,
    descriptionStyle,
    style,
    ...rest
  } = props

  const [value = [], triggerChange] = useControllableValue<V[]>(props, {
    defaultValue: [],
  })

  const resolvedColumns = Math.max(1, Math.floor(columnsProp))
  const basis = `${100 / resolvedColumns}%`
  const itemMargin = tokens.spacing.gap / 2
  const selectedSet = React.useMemo(() => new Set(value), [value])

  const triggerValueChange = React.useCallback(
    (next: V[]) => {
      const extend = {
        get items() {
          return options.filter(option => next.includes(option.value))
        },
      }
      triggerChange(next, extend)
    },
    [options, triggerChange],
  )

  const toggleOption = React.useCallback(
    (option: typeof options[number]) => {
      if (disabled || option.disabled) return
      const active = selectedSet.has(option.value)
      if (multiple) {
        const next = active
          ? value.filter(item => item !== option.value)
          : [...value, option.value]
        triggerValueChange(next)
      } else {
        const next = active ? [] : [option.value]
        triggerValueChange(next)
      }
    },
    [disabled, multiple, selectedSet, triggerValueChange, value],
  )

  return (
    <View
      {...rest}
      style={[
        styles.container,
        { marginHorizontal: -itemMargin, marginVertical: -itemMargin },
        style,
      ]}
      accessibilityRole={multiple ? 'group' : 'radiogroup'}
    >
      {options.map(option => {
        const active = selectedSet.has(option.value)
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
                flex: 1,
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
