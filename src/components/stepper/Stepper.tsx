import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, type GestureResponderEvent, type PressableStateCallbackType } from 'react-native'
import { useControllableValue } from '../../hooks'
import { parseNumber, addNumber, clampValue, formatNumber, numberToString, parseDecimalLength, isFiniteNumber, isPromiseLike } from '../../utils'
import { useDirection } from '../config-provider/useDirection'
import { useStepperTokens } from './tokens'
import { createHairlineView } from '../../utils/hairline'
import type { StepperInstance, StepperProps } from './types'

const LONG_PRESS_DELAY = 600
const LONG_PRESS_INTERVAL = 100

const StepperImpl = (props: StepperProps, ref: React.ForwardedRef<StepperInstance>) => {
  const tokens = useStepperTokens(props.tokensOverride)
  const layoutDir = useDirection()
  const { min, max, step = 1, autoFixed = true, beforeChange, integer = false, decimalLength: decimalLengthProp, disabled = false, disablePlus = false, disableMinus = false, disableInput = false, allowEmpty = false, showPlus = tokens.defaults.showPlus, showMinus = tokens.defaults.showMinus, showInput = tokens.defaults.showInput, longPress = tokens.defaults.longPress, theme = tokens.defaults.theme, inputWidth, buttonSize, name, placeholder, onClick, onPlus, onMinus, onOverlimit, onFocus, onBlur, inputProps, inputStyle, buttonStyle, style, ...restProps } = props
  const [isChanging, setIsChanging] = useState(false)
  const changingRef = useRef(false)
  const onPlusRef = useRef(onPlus)
  const onMinusRef = useRef(onMinus)
  const onOverlimitRef = useRef(onOverlimit)
  const onFocusRef = useRef(onFocus)
  const onBlurRef = useRef(onBlur)
  const onClickRef = useRef(onClick)
  const valueRef = useRef<number | null>(null)
  const inputRef = useRef<TextInput>(null)
  const inputValueRef = useRef('')
  const inputPropsRef = useRef(inputProps)
  const longPressRef = useRef<{ delay?: ReturnType<typeof setTimeout>; interval?: ReturnType<typeof setInterval>; hadLongPress: boolean }>({ hadLongPress: false })
  onPlusRef.current = onPlus; onMinusRef.current = onMinus; onOverlimitRef.current = onOverlimit; onFocusRef.current = onFocus; onBlurRef.current = onBlur; onClickRef.current = onClick; inputPropsRef.current = inputProps
  const decimalLen = parseDecimalLength(decimalLengthProp)
  const stepRaw = Number(step ?? 1)
  const stepSize = isFiniteNumber(stepRaw) && stepRaw > 0 ? stepRaw : 1
  const resolvedBtnSize = Math.max(0, parseNumber(buttonSize, tokens.defaults.buttonSize))
  const resolvedInputWidth = Math.max(0, parseNumber(inputWidth, tokens.defaults.inputWidth))
  const defaultVal = useMemo(() => { const raw = props.defaultValue; if (raw === null) return null; const base = isFiniteNumber(raw) ? raw : 0; const formatted = formatNumber(base, integer, decimalLen); return autoFixed ? clampValue(formatted, min, max) : formatted }, [autoFixed, decimalLen, integer, max, min, props.defaultValue])
  const [value, triggerChange] = useControllableValue<number | null>({ ...props, defaultValue: defaultVal }, { defaultValue: defaultVal })
  useEffect(() => { valueRef.current = value ?? null }, [value])
  useImperativeHandle(ref, () => ({ focus: () => inputRef.current?.focus(), blur: () => inputRef.current?.blur() }))
  const [isFocused, setIsFocused] = useState(false)
  const [inputText, setInputTextState] = useState(() => numberToString(value, decimalLen))
  const updateInputText = useCallback((text: string) => { inputValueRef.current = text; setInputTextState(text) }, [])
  useEffect(() => { if (!isFocused) { updateInputText(numberToString(value, decimalLen)) } }, [decimalLen, isFocused, updateInputText, value])
  const getCurrentNumber = useCallback(() => { const current = valueRef.current; if (isFiniteNumber(current)) return current; return isFiniteNumber(min) ? min : 0 }, [min])
  const isActionDisabled = useCallback((type: 'plus' | 'minus') => { if (disabled) return true; if (type === 'plus' && disablePlus) return true; if (type === 'minus' && disableMinus) return true; const current = getCurrentNumber(); if (type === 'plus' && isFiniteNumber(max) && current >= max) return true; if (type === 'minus' && isFiniteNumber(min) && current <= min) return true; return false }, [disableMinus, disablePlus, disabled, getCurrentNumber, max, min])
  const commitValue = useCallback((next: number | null) => { const prev = valueRef.current ?? null; if (Object.is(prev, next)) return false; valueRef.current = next; triggerChange(next, { name }); return true }, [name, triggerChange])
  const normalizeNumber = useCallback((nextRaw: number) => { const formatted = formatNumber(nextRaw, integer, decimalLen); return autoFixed ? clampValue(formatted, min, max) : formatted }, [autoFixed, decimalLen, integer, max, min])
  const processValueChange = useCallback((next: number | null, committed?: (committedValue: number | null) => void) => { if (changingRef.current) return 'noop' as const; const commit = () => { const didChange = commitValue(next); if (!didChange) return 'noop' as const; updateInputText(numberToString(next, decimalLen)); committed?.(next); return 'changed' as const }; if (!beforeChange) return commit(); try { const result = beforeChange(next); if (isPromiseLike(result)) { changingRef.current = true; setIsChanging(true); result.then(allowed => { if (allowed === false) { updateInputText(numberToString(valueRef.current, decimalLen)); return }; commit() }).catch(() => commit()).finally(() => { changingRef.current = false; setIsChanging(false) }); return 'pending' as const }; if (result === false) { updateInputText(numberToString(valueRef.current, decimalLen)); return 'noop' as const }; return commit() } catch { return commit() } }, [beforeChange, decimalLen, updateInputText, commitValue])
  const stepOnce = useCallback((type: 'plus' | 'minus', event?: GestureResponderEvent, options?: { emitOverlimit?: boolean; emitButtonCallbacks?: boolean }) => { if (changingRef.current) return 'noop' as const; const emitOverlimit = options?.emitOverlimit ?? true; const emitCallbacks = options?.emitButtonCallbacks ?? Boolean(event); if (isActionDisabled(type)) { if (emitOverlimit) onOverlimitRef.current?.(type); return 'overlimit' as const }; const current = getCurrentNumber(); const diff = type === 'plus' ? stepSize : -stepSize; const next = normalizeNumber(addNumber(current, diff)); return processValueChange(next, committedValue => { if (!emitCallbacks || !event) return; if (type === 'plus') { onPlusRef.current?.(event, committedValue) } else { onMinusRef.current?.(event, committedValue) } }) }, [normalizeNumber, getCurrentNumber, isActionDisabled, processValueChange, stepSize])
  const clearLongPress = useCallback(() => { if (longPressRef.current.delay) { clearTimeout(longPressRef.current.delay); longPressRef.current.delay = undefined }; if (longPressRef.current.interval) { clearInterval(longPressRef.current.interval); longPressRef.current.interval = undefined } }, [])
  useEffect(() => clearLongPress(), [clearLongPress])
  useEffect(() => { if (disabled || isChanging || !longPress) { clearLongPress() } }, [isChanging, clearLongPress, disabled, longPress])
  const startLongPress = useCallback((type: 'plus' | 'minus') => { if (!longPress) return; if (changingRef.current) return; if (isActionDisabled(type)) return; clearLongPress(); longPressRef.current.hadLongPress = false; longPressRef.current.delay = setTimeout(() => { longPressRef.current.hadLongPress = true; const first = stepOnce(type, undefined, { emitOverlimit: true, emitButtonCallbacks: false }); if (first !== 'changed') { clearLongPress(); return }; longPressRef.current.interval = setInterval(() => { const result = stepOnce(type, undefined, { emitOverlimit: true, emitButtonCallbacks: false }); if (result !== 'changed') { clearLongPress() } }, LONG_PRESS_INTERVAL) }, LONG_PRESS_DELAY) }, [clearLongPress, isActionDisabled, longPress, stepOnce])
  const handlePressOut = useCallback(() => clearLongPress(), [clearLongPress])
  const handleButtonPress = useCallback((type: 'plus' | 'minus', event: GestureResponderEvent) => { if (longPressRef.current.hadLongPress) { longPressRef.current.hadLongPress = false; return }; longPressRef.current.hadLongPress = false; stepOnce(type, event, { emitOverlimit: true, emitButtonCallbacks: true }) }, [stepOnce])
  const currentForCompare = isFiniteNumber(value) ? value : 0
  const minNumber = isFiniteNumber(min) ? min : undefined
  const maxNumber = isFiniteNumber(max) ? max : undefined
  const isDisabledAll = disabled || isChanging
  const isMinusDisabled = isDisabledAll || disableMinus || (minNumber != null && currentForCompare <= minNumber)
  const isPlusDisabled = isDisabledAll || disablePlus || (maxNumber != null && currentForCompare >= maxNumber)
  const radius = tokens.radii.default
  const btnSizeStyle = useMemo(() => ({ width: resolvedBtnSize, height: resolvedBtnSize }), [resolvedBtnSize])
  const inputSizeStyle = useMemo(() => ({ width: resolvedInputWidth, height: resolvedBtnSize, marginHorizontal: tokens.spacing.gap }), [resolvedBtnSize, resolvedInputWidth, tokens.spacing.gap])
  const getButtonStyle = useCallback((type: 'plus' | 'minus', state: PressableStateCallbackType) => { const isPlus = type === 'plus'; const isDisabled = isPlus ? isPlusDisabled : isMinusDisabled; if (theme === 'round') { const base = [S.btn, btnSizeStyle, { borderRadius: resolvedBtnSize / 2, opacity: isDisabled ? tokens.opacity.roundDisabled : 1 }] as const; if (isPlus) { return [...base, { backgroundColor: tokens.colors.roundTheme, ...(state.pressed && !isDisabled && { opacity: tokens.opacity.pressed }) }, buttonStyle] }; return [...base, { backgroundColor: tokens.colors.roundThemeBackground, ...(state.pressed && !isDisabled && { opacity: tokens.opacity.pressed }) }, buttonStyle] }; const isLeading = (type === 'minus') !== (layoutDir === 'rtl'); const cornerStyle = isLeading ? { borderTopLeftRadius: radius, borderBottomLeftRadius: radius } : { borderTopRightRadius: radius, borderBottomRightRadius: radius }; const bgColor = isDisabled ? tokens.colors.buttonDisabledBackground : state.pressed ? tokens.colors.active : tokens.colors.background; return [S.btn, btnSizeStyle, cornerStyle, { backgroundColor: bgColor }, buttonStyle] }, [btnSizeStyle, buttonStyle, isMinusDisabled, isPlusDisabled, radius, resolvedBtnSize, theme, layoutDir, tokens.colors.active, tokens.colors.background, tokens.colors.buttonDisabledBackground, tokens.colors.roundTheme, tokens.colors.roundThemeBackground, tokens.opacity.pressed, tokens.opacity.roundDisabled])
  const getButtonTextStyle = useCallback((type: 'plus' | 'minus') => { const isPlus = type === 'plus'; const isDisabled = isPlus ? isPlusDisabled : isMinusDisabled; if (theme === 'round') { const color = isPlus ? tokens.colors.roundThemeText : tokens.colors.roundTheme; return [S.btnTxt, { color, fontSize: tokens.typography.fontSize, fontWeight: tokens.typography.fontWeight }] }; return [S.btnTxt, { color: isDisabled ? tokens.colors.buttonDisabledIcon : tokens.colors.buttonIcon, fontSize: tokens.typography.fontSize, fontWeight: tokens.typography.fontWeight }] }, [isMinusDisabled, isPlusDisabled, theme, tokens.colors.buttonDisabledIcon, tokens.colors.buttonIcon, tokens.colors.roundTheme, tokens.colors.roundThemeText, tokens.typography.fontSize, tokens.typography.fontWeight])
  const handleChangeText = useCallback((text: string) => { if (disableInput || disabled || changingRef.current) return; updateInputText(text); inputPropsRef.current?.onChangeText?.(text); const trimmed = text.trim(); if (trimmed === '') { processValueChange(allowEmpty ? null : defaultVal); return }; const num = Number.parseFloat(trimmed); if (!Number.isFinite(num)) return; processValueChange(normalizeNumber(num)) }, [allowEmpty, normalizeNumber, changingRef, disableInput, disabled, inputPropsRef, processValueChange, defaultVal, updateInputText])
  const handleFocus = useCallback((event: Parameters<NonNullable<React.ComponentProps<typeof TextInput>['onFocus']>>[0]) => { if (disableInput) { inputRef.current?.blur(); return }; setIsFocused(true); onFocusRef.current?.(event); inputPropsRef.current?.onFocus?.(event) }, [disableInput])
  const handleBlur = useCallback((event: Parameters<NonNullable<React.ComponentProps<typeof TextInput>['onBlur']>>[0]) => { setIsFocused(false); if (!changingRef.current) { const trimmed = inputValueRef.current.trim(); if (trimmed === '') { processValueChange(allowEmpty ? null : defaultVal) } else { const num = Number.parseFloat(trimmed); if (Number.isFinite(num)) { processValueChange(normalizeNumber(num)) } } }; onBlurRef.current?.(event); inputPropsRef.current?.onBlur?.(event) }, [allowEmpty, normalizeNumber, processValueChange, defaultVal])
  const handleInputPressIn = useCallback((event: GestureResponderEvent) => { onClickRef.current?.(event); inputPropsRef.current?.onPressIn?.(event) }, [])
  const handleMinusPress = useCallback((event: GestureResponderEvent) => handleButtonPress('minus', event), [handleButtonPress])
  const handlePlusPress = useCallback((event: GestureResponderEvent) => handleButtonPress('plus', event), [handleButtonPress])
  const handleMinusPressIn = useCallback(() => startLongPress('minus'), [startLongPress])
  const handlePlusPressIn = useCallback(() => startLongPress('plus'), [startLongPress])
  const getMinusBtnStyle = useCallback((state: PressableStateCallbackType) => getButtonStyle('minus', state), [getButtonStyle])
  const getPlusBtnStyle = useCallback((state: PressableStateCallbackType) => getButtonStyle('plus', state), [getButtonStyle])
  const renderMinusBtn = useCallback(() => { if (!showMinus) return null; return <Pressable key="minus" testID="stepper-minus" accessibilityRole="button" accessibilityLabel="minus" accessibilityState={{ disabled: isMinusDisabled }} onPress={handleMinusPress} onPressIn={handleMinusPressIn} onPressOut={handlePressOut} style={getMinusBtnStyle}><Text style={getButtonTextStyle('minus')}>-</Text>{theme === 'round' && <View style={createHairlineView({ position: 'all', color: tokens.colors.roundTheme, borderRadius: resolvedBtnSize / 2 })} />}</Pressable> }, [getButtonTextStyle, getMinusBtnStyle, handleMinusPress, handleMinusPressIn, handlePressOut, isMinusDisabled, showMinus, theme, tokens.colors.roundTheme, resolvedBtnSize])
  const renderPlusBtn = useCallback(() => { if (!showPlus) return null; return <Pressable key="plus" testID="stepper-plus" accessibilityRole="button" accessibilityLabel="add" accessibilityState={{ disabled: isPlusDisabled }} onPress={handlePlusPress} onPressIn={handlePlusPressIn} onPressOut={handlePressOut} style={getPlusBtnStyle}><Text style={getButtonTextStyle('plus')}>+</Text></Pressable> }, [getButtonTextStyle, getPlusBtnStyle, handlePlusPress, handlePlusPressIn, handlePressOut, isPlusDisabled, showPlus])
  const inputNode = useMemo(() => { if (!showInput) return null; const editable = !isDisabledAll && !disableInput; const isInputDisabled = isDisabledAll || disableInput; const bgColor = theme === 'round' ? tokens.colors.transparent : isInputDisabled ? tokens.colors.inputDisabledBackground : tokens.colors.background; const textColor = isInputDisabled ? tokens.colors.inputDisabledText : tokens.colors.inputText; const keyboardType = integer ? 'number-pad' : 'decimal-pad'; return <TextInput ref={inputRef} {...inputProps} style={[S.inp, inputSizeStyle, { backgroundColor: bgColor, color: textColor, paddingHorizontal: tokens.spacing.none, paddingVertical: tokens.spacing.none }, inputStyle]} value={inputText} placeholder={placeholder} editable={editable} keyboardType={keyboardType} onChangeText={handleChangeText} onFocus={handleFocus} onBlur={handleBlur} onPressIn={handleInputPressIn} /> }, [isDisabledAll, disableInput, handleBlur, handleChangeText, handleFocus, handleInputPressIn, inputSizeStyle, inputProps, inputStyle, inputText, integer, placeholder, showInput, theme, tokens.colors.background, tokens.colors.inputDisabledBackground, tokens.colors.inputDisabledText, tokens.colors.inputText, tokens.colors.transparent, tokens.spacing.none])
  return <View {...restProps} style={[S.cnt, style]}>{renderMinusBtn()}{inputNode}{renderPlusBtn()}</View>
}

const S = StyleSheet.create({ cnt: { flexDirection: 'row', alignItems: 'center' }, btn: { justifyContent: 'center', alignItems: 'center' }, btnTxt: {}, inp: { textAlign: 'center' } })

const StepperForwardRef = React.forwardRef<StepperInstance, StepperProps>(StepperImpl)
StepperForwardRef.displayName = 'Stepper'
export const Stepper = React.memo(StepperForwardRef)
export default Stepper
