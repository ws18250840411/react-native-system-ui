import React from 'react'
import { Pressable, Text, type TextStyle, View } from 'react-native'

import type { SelectorProps, SelectorValue } from './types'
import { useSelectorTokens } from './tokens'
import { useControllableValue } from '../../hooks'
import { isText } from '../../utils/validate'

const CHECK_MARK = '✓'
const CHECK_MARK_CORNER_HEIGHT = 8
const CHECK_MARK_CORNER_WIDTH = 10

type SelectorComponent = (<V extends SelectorValue>(
  props: SelectorProps<V>
) => React.ReactElement) & { displayName?: string }

const SelectorImpl = <V extends SelectorValue>(props: SelectorProps<V>) => {
  const {
    tokensOverride,
    options,
    columns: columnsProp,
    multiple: multipleProp,
    showCheckMark: showCheckMarkProp,
    disabled: disabledProp,
    onChange,
    itemStyle,
    labelStyle,
    descriptionStyle,
    style,
    ...rest
  } = props

  const tokens = useSelectorTokens(tokensOverride)

  const columns = columnsProp ?? tokens.defaults.columns ?? 1
  const multiple = multipleProp ?? tokens.defaults.multiple
  const showCheckMark = showCheckMarkProp ?? tokens.defaults.showCheckMark
  const disabled = disabledProp ?? tokens.defaults.disabled

  const [value = [], triggerChange] = useControllableValue<V[]>(props, {
    defaultValue: [],
  })

  const optionByValue = React.useMemo(() => {
    const map = new Map<SelectorValue, (typeof options)[number]>()
    for (const option of options) map.set(option.value, option)
    return map
  }, [options])

  const resolvedColumns = Math.max(1, Math.floor(columns))
  const basis = `${100 / resolvedColumns}%` as `${number}%`
  const itemMargin = tokens.spacing.gap / 2
  const selectedSet = React.useMemo(() => new Set(value), [value])

  const toggleOption = React.useCallback(
    (option: (typeof options)[number]) => {
      if (disabled || option.disabled) return

      const active = selectedSet.has(option.value)
      let next: V[]
      if (multiple) {
        next = active
          ? value.filter(item => item !== option.value)
          : [...value, option.value]
      } else {
        next = active ? [] : [option.value]
      }

      const items = next
        .map(v => optionByValue.get(v))
        .filter(Boolean) as (typeof options)[number][]
      triggerChange(next, { items })
    },
    [disabled, multiple, optionByValue, selectedSet, triggerChange, value],
  )

  return (
    <View
      {...rest}
      style={[
        tokens.layout.container,
        { marginHorizontal: -itemMargin, marginVertical: -itemMargin },
        style,
      ]}
      accessibilityRole={multiple ? undefined : 'radiogroup'}
    >
      {options.map(option => {
        const active = selectedSet.has(option.value)
        const isDisabled = disabled || option.disabled
        const labelContent = option.label
        const descriptionContent = option.description
        const hasDescription = descriptionContent != null
        const accessibilityLabel =
          isText(labelContent)
            ? String(labelContent)
            : String(option.value)
        const accessibilityHint =
          isText(descriptionContent)
            ? String(descriptionContent)
            : undefined

        return (
          <Pressable
            key={String(option.value)}
            accessibilityRole={multiple ? 'checkbox' : 'radio'}
            accessibilityLabel={accessibilityLabel}
            accessibilityHint={accessibilityHint}
            accessibilityState={
              multiple
                ? { checked: active, disabled: isDisabled }
                : { selected: active, disabled: isDisabled }
            }
            onPress={() => toggleOption(option)}
            disabled={isDisabled}
            style={[tokens.layout.pressable, { width: basis }]}
          >
            <View
              style={[
                tokens.layout.item,
                {
                  marginHorizontal: itemMargin,
                  marginVertical: itemMargin,
                  paddingHorizontal: tokens.spacing.paddingHorizontal,
                  paddingVertical: tokens.spacing.paddingVertical,
                  borderRadius: tokens.radii.item,
                  borderColor: active ? tokens.colors.borderActive : tokens.colors.border,
                  backgroundColor: active ? tokens.colors.backgroundActive : tokens.colors.background,
                  opacity: isDisabled ? tokens.states.disabledOpacity : 1,
                },
                itemStyle,
              ]}
            >
              {isText(labelContent) ? (
                <Text
                  style={[
                    tokens.layout.label,
                    {
                      color: active ? tokens.colors.textActive : tokens.colors.text,
                      fontSize: tokens.typography.fontSize,
                      lineHeight: tokens.typography.fontSize * 1.4,
                      fontFamily: tokens.typography.fontFamily,
                      fontWeight: tokens.typography.fontWeight as TextStyle['fontWeight'],
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
                isText(descriptionContent) ? (
                  <Text
                    style={[
                      tokens.layout.description,
                      {
                        marginTop: tokens.spacing.descriptionMarginTop,
                        color: isDisabled
                          ? tokens.colors.disabledText
                          : tokens.colors.description,
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
                      tokens.layout.checkMarkTriangle,
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
                  <Text style={[tokens.layout.checkMark, { color: tokens.colors.checkForeground }]}>
                    {CHECK_MARK}
                  </Text>
                </>
              ) : null}
            </View>
          </Pressable>
        )
      })}
    </View>
  )
}

export const Selector = React.memo(SelectorImpl) as unknown as SelectorComponent

Selector.displayName = 'Selector'

export default Selector
