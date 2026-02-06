import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native'
import { useControllableValue } from '../../hooks'
import { parseNumberLike } from '../../utils/number'
import { isString, isText } from '../../utils/validate'
import type { PasswordInputProps, PasswordInputRef } from './types'
import { usePasswordInputTokens } from './tokens'

const HIP: TextInputProps = { caretHidden: true, autoCorrect: false, spellCheck: false, importantForAutofill: 'no', autoComplete: 'off' }
const stripNonNumeric = (v: string) => v.replace(/[^0-9]/g, '')

const PasswordInputImpl = (props: PasswordInputProps, ref: React.ForwardedRef<PasswordInputRef>) => {
  const { value, defaultValue, onChange, length = 6, mask = true, gutter = 0, type = 'text', info, errorInfo, autoFocus = false, disabled = false, showCursor = true, validator, cellStyle, cellFilledStyle, cellTextStyle, maskStyle, cursorStyle, highlightTextStyle, tokensOverride, style, onSubmit, onFocus, onBlur, ...rest } = props
  const lengthValue = Math.max(1, Math.floor(parseNumberLike(length, 6) ?? 6))
  const tokens = usePasswordInputTokens(tokensOverride)
  const { colors, radii, sizing, typography, opacity, spacing } = tokens
  const inputRef = useRef<TextInput>(null), [cursorVisible, setCursorVisible] = useState(true), blinkTimer = useRef<ReturnType<typeof setInterval> | null>(null), [focused, setFocused] = useState(autoFocus)
  const keyboardType = type === 'number' ? 'number-pad' : 'default'
  const inputMode = type === 'number' ? 'numeric' : 'text'
  const [code = '', setCode] = useControllableValue<string>(props, { defaultValue: '' })
  const normalizeValue = useCallback((v: unknown) => { let normalized = v === null || v === undefined ? '' : isString(v) ? v : String(v); if (type === 'number') normalized = stripNonNumeric(normalized); if (lengthValue > 0 && normalized.length > lengthValue) normalized = normalized.slice(0, lengthValue); return normalized }, [lengthValue, type])
  const normalizedCode = normalizeValue(code)
  const validatorRef = useRef(validator), onFocusRef = useRef(onFocus), onBlurRef = useRef(onBlur), onSubmitRef = useRef(onSubmit)
  validatorRef.current = validator; onFocusRef.current = onFocus; onBlurRef.current = onBlur; onSubmitRef.current = onSubmit
  const updateValue = useCallback((v: string) => { const normalized = normalizeValue(v); if (normalized === normalizedCode) return; if (validatorRef.current && !validatorRef.current(normalized)) return; setCode(normalized) }, [normalizeValue, normalizedCode, setCode])
  const focusInput = useCallback(() => { if (disabled) return; inputRef.current?.focus() }, [disabled])
  const blurInput = useCallback(() => { inputRef.current?.blur() }, [])
  const clearInput = useCallback(() => { updateValue('') }, [updateValue])
  useImperativeHandle(ref, () => ({ focus: focusInput, blur: blurInput, clear: clearInput }), [blurInput, clearInput, focusInput])
  useEffect(() => { if (!autoFocus || disabled) return; const timer = setTimeout(() => { inputRef.current?.focus() }, 60); return () => clearTimeout(timer) }, [autoFocus, disabled])
  const handleChangeText = useCallback((txt: string) => { updateValue(txt ?? '') }, [updateValue])
  const handleFocus = useCallback(() => { setFocused(true); onFocusRef.current?.() }, [])
  const handleBlur = useCallback(() => { setFocused(false); onBlurRef.current?.() }, [])
  const prevSubmitRef = useRef({ value: normalizedCode, length: lengthValue })
  useEffect(() => { const prev = prevSubmitRef.current; prevSubmitRef.current = { value: normalizedCode, length: lengthValue }; if (!onSubmitRef.current) return; if (prev.length !== lengthValue) return; if (lengthValue <= 0 || normalizedCode.length !== lengthValue) return; if (prev.value === normalizedCode) return; onSubmitRef.current(normalizedCode); inputRef.current?.blur() }, [lengthValue, normalizedCode])
  useEffect(() => { const shouldBlink = showCursor && focused && !disabled; if (blinkTimer.current) { clearInterval(blinkTimer.current); blinkTimer.current = null }; if (shouldBlink) { setCursorVisible(true); blinkTimer.current = setInterval(() => { setCursorVisible((v) => !v) }, 500) } else { setCursorVisible(false) }; return () => { if (blinkTimer.current) { clearInterval(blinkTimer.current); blinkTimer.current = null } } }, [disabled, focused, showCursor])
  const cells = Array.from({ length: lengthValue }, (_, i) => { const char = normalizedCode?.[i]; const isFilled = !!char; const showBlink = showCursor && focused && !disabled && normalizedCode.length === i && i < lengthValue; return { key: i, char, isFilled, showBlink } })
  const gutterValue = Math.max(0, parseNumberLike(gutter, 0) ?? 0)
  const hasGutter = gutterValue > 0
  const tipInfo = errorInfo ?? info
  const tipColor = errorInfo ? colors.error : colors.muted
  const backgroundColor = hasGutter ? colors.transparent : colors.background
  const hiddenInputProps = { ...HIP, underlineColorAndroid: colors.transparent }
  const cellTextBase = { color: colors.text, fontSize: sizing.cellTextSize, fontWeight: typography.cellTextWeight, fontFamily: typography.fontFamily }
  const wrapperStyle = [S.w, { backgroundColor, borderRadius: radii.wrapper, paddingHorizontal: spacing.none, opacity: disabled ? opacity.disabled : 1 }, !hasGutter && { borderWidth: StyleSheet.hairlineWidth, borderColor: colors.border }]
  const sheetStyle = [S.s, { borderRadius: hasGutter ? 0 : radii.wrapper, backgroundColor }]
  return <View style={style}><Pressable {...rest} style={wrapperStyle} onPress={focusInput} disabled={disabled} accessibilityRole="button" accessibilityState={{ disabled }}><View style={sheetStyle}>{cells.map((item, i) => { const filledTextStyle = [cellTextBase, cellTextStyle, !mask && item.isFilled && highlightTextStyle]; const baseCell = [S.c, { backgroundColor: colors.background, height: sizing.cellHeight }, cellStyle, item.isFilled && cellFilledStyle]; if (hasGutter) { baseCell.push(S.cg, { borderColor: colors.border, borderRadius: radii.cellGutter }, i > 0 && { marginLeft: gutterValue }) } else if (i < lengthValue - 1) { baseCell.push({ borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: colors.border }) }; return <View key={item.key} style={baseCell}>{mask ? <View style={[{ width: sizing.maskSize, height: sizing.maskSize, borderRadius: sizing.maskSize / 2, backgroundColor: colors.text, opacity: item.isFilled ? 1 : 0 }, maskStyle]} /> : <Text style={filledTextStyle} numberOfLines={1}>{item.char ?? ''}</Text>}{item.showBlink ? <View testID="password-input-cursor" style={[S.cr, { width: sizing.cursorWidth, height: `${sizing.cursorHeightRatio * 100}%`, borderRadius: sizing.cursorWidth / 2, top: `${sizing.cursorTopRatio * 100}%`, marginLeft: -sizing.cursorWidth / 2, backgroundColor: colors.cursor, opacity: cursorVisible ? 1 : 0 }, cursorStyle]} /> : null}</View>})}<TextInput ref={inputRef} value={normalizedCode} editable={!disabled} keyboardType={keyboardType} inputMode={inputMode} maxLength={lengthValue} autoFocus={false} secureTextEntry={mask} {...hiddenInputProps} style={[S.hi, { opacity: opacity.hidden }]} onChangeText={handleChangeText} onFocus={handleFocus} onBlur={handleBlur} accessible={false} /></View></Pressable>{tipInfo ? <View style={[S.iw, { marginTop: spacing.infoMarginTop }]}>{isText(tipInfo) ? <Text style={[S.it, { color: tipColor }]}>{tipInfo}</Text> : tipInfo}</View> : null}</View>
}

const PasswordInputForwardRef = React.forwardRef<PasswordInputRef, PasswordInputProps>(PasswordInputImpl)
PasswordInputForwardRef.displayName = 'PasswordInput'
const PasswordInput = React.memo(PasswordInputForwardRef)

export default PasswordInput

const S = StyleSheet.create({
  w: { alignSelf: 'stretch' },
  s: { flexDirection: 'row', alignItems: 'center', position: 'relative', overflow: 'hidden' },
  c: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cg: { borderWidth: StyleSheet.hairlineWidth },
  cr: { position: 'absolute', left: '50%' },
  hi: { ...StyleSheet.absoluteFillObject },
  iw: { alignItems: 'center' },
  it: { textAlign: 'center' },
})
