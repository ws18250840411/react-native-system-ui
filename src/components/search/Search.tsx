import React, { useCallback, useImperativeHandle, useRef } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import SearchIcon from 'react-native-system-icon/Search'
import { useAriaPress, useControllableValue } from '../../hooks'
import { isText } from '../../utils/validate'
import { useLocale } from '../config-provider/useLocale'
import Field, { type FieldInstance, type FieldProps } from '../field'
import { useSearchTokens } from './tokens'
import type { SearchProps, SearchRef } from './types'

const SearchComponent = (props: SearchProps, ref: React.Ref<SearchRef>) => {
  const locale = useLocale(); const { tokensOverride, label, action, actionText, showAction = false, shape: shapeP, background, style: containerStyle, fieldStyle, fieldContentStyle, clearTrigger, clearable = true, leftIcon, rightIcon, errorMessage, onSearch, onCancel, onChangeText, onSubmitEditing, returnKeyType, inputStyle, align, inputAlign, ...restFieldProps } = props; const tokens = useSearchTokens(tokensOverride); const shape = shapeP ?? tokens.defaults.shape; const [value, triggerChange] = useControllableValue<string>(props, { defaultValue: '' }); const inputValue = value ?? ''; const rInputAlign = align ?? inputAlign
  const onChangeTextRef = useRef(onChangeText), onCancelRef = useRef(onCancel), onSearchRef = useRef(onSearch), onSubmitEditingRef = useRef(onSubmitEditing), inputValueRef = useRef(inputValue); onChangeTextRef.current = onChangeText; onCancelRef.current = onCancel; onSearchRef.current = onSearch; onSubmitEditingRef.current = onSubmitEditing; inputValueRef.current = inputValue
  const handleChange = useCallback((next: string) => { triggerChange(next); onChangeTextRef.current?.(next) }, [triggerChange]); const handleCancel = useCallback(() => { handleChange(''); onCancelRef.current?.() }, [handleChange]); type SubmitEvent = Parameters<NonNullable<FieldProps['onSubmitEditing']>>[0]; const handleSubmit = useCallback((event: SubmitEvent) => { onSearchRef.current?.(inputValueRef.current); onSubmitEditingRef.current?.(event) }, []); const rBg = background ?? tokens.colors.background; const rLeftIcon = leftIcon ?? <SearchIcon size={tokens.icon.size} fill={tokens.colors.icon} color={tokens.colors.icon} />; const rClearTrigger = clearTrigger ?? tokens.defaults.clearTrigger; const rReturnKey = returnKeyType ?? 'search'; const showAct = !!action || showAction; const customActTxt = React.isValidElement(actionText); const renderCancelAct = showAct && !action && !customActTxt; const radius = shape === 'round' ? tokens.radius.round : tokens.radius.square; const inputRef = useRef<FieldInstance>(null); useImperativeHandle(ref, () => ({ focus: () => inputRef.current?.focus(), blur: () => inputRef.current?.blur(), clear: () => handleChange('') }), [handleChange]); const cancelActPress = useAriaPress({ disabled: !renderCancelAct, onPress: handleCancel, extraProps: { accessibilityRole: 'button', testID: 'rnsu-search-action' } }); const ctrStyles = [S.ctr, { paddingHorizontal: tokens.spacing.paddingHorizontal, paddingVertical: tokens.spacing.paddingVertical, backgroundColor: rBg }, containerStyle]; const cntStyles = [S.cnt, { borderRadius: radius, paddingHorizontal: tokens.spacing.contentPaddingHorizontal, paddingVertical: tokens.spacing.contentPaddingVertical, backgroundColor: tokens.colors.contentBackground }]; const labelEl = !label ? null : isText(label) ? <Text style={{ marginRight: tokens.spacing.labelGap, color: tokens.colors.label, fontSize: tokens.typography.label, fontWeight: tokens.typography.labelWeight }}>{label}</Text> : <View style={{ marginRight: tokens.spacing.labelGap }}>{label}</View>; const actEl = action ? <View style={[S.act, { marginLeft: tokens.spacing.actionGap }]}>{action}</View> : !showAct ? null : customActTxt ? <View style={[S.act, { marginLeft: tokens.spacing.actionGap }]}>{actionText}</View> : <Pressable style={[S.act, { marginLeft: tokens.spacing.actionGap, opacity: cancelActPress.states.pressed ? tokens.opacity.actionPressed : 1 }]} {...cancelActPress.interactionProps}><Text style={{ color: tokens.colors.action, fontSize: tokens.typography.action, fontWeight: tokens.typography.actionWeight }}>{actionText ?? locale.cancel}</Text></Pressable>
  return <View style={ctrStyles}><View style={cntStyles}>{labelEl}<View style={S.field}><Field ref={inputRef} type='search' value={inputValue} onChangeText={handleChange} clearable={clearable} clearTrigger={rClearTrigger} leftIcon={rLeftIcon} rightIcon={rightIcon} center={!errorMessage} errorMessage={errorMessage} inputAlign={rInputAlign} border={false} style={[{ paddingHorizontal: tokens.spacing.none, paddingVertical: tokens.spacing.none }, fieldStyle]} contentStyle={[{ paddingVertical: tokens.spacing.none }, fieldContentStyle]} inputStyle={[{ paddingVertical: tokens.spacing.none }, inputStyle]} onSubmitEditing={handleSubmit} returnKeyType={rReturnKey} {...restFieldProps} /></View></View>{actEl}</View>
}

const SearchForwardRef = React.forwardRef(SearchComponent)
SearchForwardRef.displayName = 'Search'
export const Search = React.memo(SearchForwardRef)

const S = StyleSheet.create({
  ctr: { flexDirection: 'row', alignItems: 'center' },
  cnt: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  field: { flex: 1 },
  act: { justifyContent: 'center' },
})

export default Search
