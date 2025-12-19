import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import type { SelectorProps, SelectorValue } from './types'
import { useSelectorTokens } from './tokens'
import { useControllableValue } from '../../hooks'

const CHECK_MARK = '✓'
const CHECK_MARK_CORNER_HEIGHT = 8
const CHECK_MARK_CORNER_WIDTH = 10

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
        const labelColor = active ? tokens.colors.textActive : tokens.colors.text
        const descriptionColor = isDisabled
          ? tokens.colors.disabledText
          : tokens.colors.description
        const labelContent = option.label
        const descriptionContent = option.description
        const hasDescription = descriptionContent !== undefined && descriptionContent !== null

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
            {typeof labelContent === 'string' || typeof labelContent === 'number' ? (
              <Text
                style={[
                  styles.label,
                  {
                    color: labelColor,
                    fontSize: tokens.typography.fontSize,
                    lineHeight: tokens.typography.fontSize * 1.4,
                    fontFamily: tokens.typography.fontFamily,
                    fontWeight: tokens.typography.fontWeight,
                  },
                  labelStyle,
                ]}
              >
                {labelContent}
              </Text>
            ) : (
              labelContent
            )}

            {hasDescription ? (
              typeof descriptionContent === 'string' || typeof descriptionContent === 'number' ? (
                <Text
                  style={[
                    styles.description,
                    {
                      marginTop: tokens.spacing.descriptionMarginTop,
                      color: descriptionColor,
                      fontSize: tokens.typography.descriptionSize,
                      lineHeight: tokens.typography.descriptionSize * 1.4,
                    },
                    descriptionStyle,
                  ]}
                >
                  {descriptionContent}
                </Text>
              ) : (
                <View style={{ marginTop: tokens.spacing.descriptionMarginTop }}>{descriptionContent}</View>
              )
            ) : null}
            {active && showCheckMark ? (
              <>
                <View
                  style={[
                    styles.checkMarkTriangle,
                    {
                      borderTopWidth: CHECK_MARK_CORNER_HEIGHT,
                      borderBottomWidth: CHECK_MARK_CORNER_HEIGHT,
                      borderLeftWidth: CHECK_MARK_CORNER_WIDTH,
                      borderRightWidth: CHECK_MARK_CORNER_WIDTH,
                      borderBottomColor: tokens.colors.check,
                      borderRightColor: tokens.colors.check,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.checkMark,
                    { color: tokens.colors.checkForeground },
                  ]}
                >
                  {CHECK_MARK}
                </Text>
              </>
            ) : null}
          </View>
        )

        return (
          <Pressable
            key={String(option.value)}
            accessibilityRole={multiple ? 'checkbox' : 'radio'}
            accessibilityState={
              multiple
                ? { checked: active, disabled: isDisabled }
                : { selected: active, disabled: isDisabled }
            }
            onPress={() => toggleOption(option)}
            disabled={isDisabled}
            style={[styles.pressable, { width: basis }]}
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
  pressable: {
    outlineStyle: 'none',
  },
  item: {
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  label: {
    includeFontPadding: false,
    textAlign: 'center',
  },
  checkMark: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    fontSize: 8,
    includeFontPadding: false,
  },
  checkMarkTriangle: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  description: {
    includeFontPadding: false,
    textAlign: 'center',
  },
})

Selector.displayName = 'Selector'

export default Selector
