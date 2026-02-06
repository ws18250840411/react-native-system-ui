import React, { useCallback, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import type { SelectorProps, SelectorValue } from './types'
import { useSelectorTokens } from './tokens'
import { useAriaPress, useControllableValue } from '../../hooks'
import { isText } from '../../utils'

const CHECK_MARK = '✓'
const CHECK_MARK_CORNER_HEIGHT = 8
const CHECK_MARK_CORNER_WIDTH = 10

type SelectorComponent = (<V extends SelectorValue>(props: SelectorProps<V>) => React.ReactElement) & { displayName?: string }

type SelectorOptionItemProps<V extends SelectorValue> = {
  option: SelectorProps<V>['options'][number]
  active: boolean
  disabled: boolean
  multiple: boolean
  showCheckMark: boolean
  basis: `${number}%`
  itemMargin: number
  tokens: ReturnType<typeof useSelectorTokens>
  itemStyle?: SelectorProps<V>['itemStyle']
  labelStyle?: SelectorProps<V>['labelStyle']
  descriptionStyle?: SelectorProps<V>['descriptionStyle']
  onToggle: (option: SelectorProps<V>['options'][number]) => void
}

const SelectorOptionItemImpl = <V extends SelectorValue>({ option, active, disabled, multiple, showCheckMark, basis, itemMargin, tokens, itemStyle, labelStyle, descriptionStyle, onToggle }: SelectorOptionItemProps<V>) => {
  const labelContent = option.label
  const descriptionContent = option.description
  const hasDescription = descriptionContent != null
  const accessibilityLabel = isText(labelContent) ? String(labelContent) : String(option.value)
  const accessibilityHint = isText(descriptionContent) ? String(descriptionContent) : undefined
  const { interactionProps, states } = useAriaPress({ disabled, onPress: () => onToggle(option), extraProps: { accessibilityRole: multiple ? 'checkbox' : 'radio', accessibilityLabel: accessibilityLabel, accessibilityHint: accessibilityHint, accessibilityState: multiple ? { checked: active, disabled } : { selected: active, disabled } } })
  return <Pressable {...interactionProps} style={[tokens.layout.pressable, { width: basis }]}><View style={[tokens.layout.item, { marginHorizontal: itemMargin, marginVertical: itemMargin, paddingHorizontal: tokens.spacing.paddingHorizontal, paddingVertical: tokens.spacing.paddingVertical, borderRadius: tokens.radii.item, borderColor: active ? tokens.colors.borderActive : tokens.colors.border, backgroundColor: active ? tokens.colors.backgroundActive : tokens.colors.background, opacity: disabled ? tokens.states.disabledOpacity : 1 }, states.pressed && { opacity: 0.9 }, itemStyle]}>{isText(labelContent) ? <Text style={[tokens.layout.label, { color: active ? tokens.colors.textActive : tokens.colors.text, fontSize: tokens.typography.fontSize, lineHeight: tokens.typography.fontSize * 1.4, fontFamily: tokens.typography.fontFamily, fontWeight: tokens.typography.fontWeight }, labelStyle]}>{labelContent}</Text> : labelContent}{hasDescription ? isText(descriptionContent) ? <Text style={[tokens.layout.description, { marginTop: tokens.spacing.descriptionMarginTop, color: disabled ? tokens.colors.disabledText : tokens.colors.description, fontSize: tokens.typography.descriptionSize, lineHeight: tokens.typography.descriptionSize * 1.4 }, descriptionStyle]}>{descriptionContent}</Text> : <View style={{ marginTop: tokens.spacing.descriptionMarginTop }}>{descriptionContent}</View> : null}{active && showCheckMark ? <><View style={[tokens.layout.checkMarkTriangle, { borderTopWidth: CHECK_MARK_CORNER_HEIGHT, borderBottomWidth: CHECK_MARK_CORNER_HEIGHT, borderLeftWidth: CHECK_MARK_CORNER_WIDTH, borderRightWidth: CHECK_MARK_CORNER_WIDTH, borderBottomColor: tokens.colors.check, borderRightColor: tokens.colors.check }]} /><Text style={[tokens.layout.checkMark, { color: tokens.colors.checkForeground }]}>{CHECK_MARK}</Text></> : null}</View></Pressable>
}

const SelectorOptionItemMemo = React.memo(SelectorOptionItemImpl)
SelectorOptionItemMemo.displayName = 'SelectorOptionItem'
const SelectorOptionItem = SelectorOptionItemMemo as <V extends SelectorValue>(props: SelectorOptionItemProps<V>) => React.ReactElement

const SelectorImpl = <V extends SelectorValue>(props: SelectorProps<V>) => {
  const { tokensOverride, options, columns: columnsProp, multiple: multipleProp, showCheckMark: showCheckMarkProp, disabled: disabledProp, onChange, itemStyle, labelStyle, descriptionStyle, style, ...rest } = props
  const tokens = useSelectorTokens(tokensOverride)
  const columns = columnsProp ?? tokens.defaults.columns ?? 1
  const multiple = multipleProp ?? tokens.defaults.multiple
  const showCheckMark = showCheckMarkProp ?? tokens.defaults.showCheckMark
  const disabled = Boolean(disabledProp ?? tokens.defaults.disabled)
  const [value = [], triggerChange] = useControllableValue<V[]>(props, { defaultValue: [] })
  const optionsByValue = useMemo(() => { const map = new Map<SelectorValue, (typeof options)[number]>(); for (const option of options) map.set(option.value, option); return map }, [options])
  const resolvedColumns = Math.max(1, Math.floor(columns))
  const basis = `${100 / resolvedColumns}%` as `${number}%`
  const itemMargin = tokens.spacing.gap / 2
  const selectedSet = useMemo(() => new Set(value), [value])
  const toggleOption = useCallback((option: (typeof options)[number]) => { if (disabled || option.disabled) return; const isActive = selectedSet.has(option.value); let nextValue: V[]; if (multiple) { nextValue = isActive ? value.filter(item => item !== option.value) : [...value, option.value] } else { nextValue = isActive ? [] : [option.value] }; const items = nextValue.map(val => optionsByValue.get(val)).filter(Boolean) as (typeof options)[number][]; triggerChange(nextValue, { items }) }, [disabled, multiple, optionsByValue, selectedSet, triggerChange, value])
  return <View {...rest} style={[tokens.layout.container, { marginHorizontal: -itemMargin, marginVertical: -itemMargin }, style]} accessibilityRole={multiple ? undefined : 'radiogroup'}>{options.map(option => <SelectorOptionItem key={String(option.value)} option={option} active={selectedSet.has(option.value)} disabled={disabled || Boolean(option.disabled)} multiple={multiple} showCheckMark={showCheckMark} basis={basis} itemMargin={itemMargin} tokens={tokens} itemStyle={itemStyle} labelStyle={labelStyle} descriptionStyle={descriptionStyle} onToggle={toggleOption} />)}</View>
}

export const Selector = React.memo(SelectorImpl) as unknown as SelectorComponent

Selector.displayName = 'Selector'

export default Selector
