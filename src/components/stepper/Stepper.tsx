import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View, type GestureResponderEvent, type PressableStateCallbackType } from 'react-native'
import { useControllableValue } from '../../hooks'
import { parseNumber, addNumber as add, clampValue, formatNumber as formatValue, numberToString as valueToString, parseDecimalLength, isFiniteNumber, isPromiseLike } from '../../utils'
import { useDirection } from '../config-provider/useDirection'
import { useStepperTokens } from './tokens'
import { createHairlineView } from '../../utils/hairline'
import type { StepperInstance, StepperProps } from './types'

const LONG_PRESS_DELAY = 600
const LONG_PRESS_INTERVAL = 100

const StepperImpl = (p: StepperProps, ref: React.ForwardedRef<StepperInstance>) => {
  const t = useStepperTokens(p.tokensOverride)
  const dir = useDirection()
  const { min, max, step = 1, autoFixed = true, beforeChange, integer = false, decimalLength: decimalLengthProp, disabled = false, disablePlus = false, disableMinus = false, disableInput = false, allowEmpty = false, showPlus = t.defaults.showPlus, showMinus = t.defaults.showMinus, showInput = t.defaults.showInput, longPress = t.defaults.longPress, theme = t.defaults.theme, inputWidth, buttonSize, name, placeholder, onClick, onPlus, onMinus, onOverlimit, onFocus, onBlur, inputProps, inputStyle, buttonStyle, style, ...rest } = p
  const [c, setC] = useState(false)
  const cR = useRef(false), pR = useRef(onPlus), mR = useRef(onMinus), oR = useRef(onOverlimit), fR = useRef(onFocus), bR = useRef(onBlur), clR = useRef(onClick), vR = useRef<number | null>(null), iR = useRef<TextInput>(null), iVR = useRef(''), iPR = useRef(inputProps), lPR = useRef<{ delay?: ReturnType<typeof setTimeout>, interval?: ReturnType<typeof setInterval>, hadLongPress: boolean }>({ hadLongPress: false })
  pR.current = onPlus; mR.current = onMinus; oR.current = onOverlimit; fR.current = onFocus; bR.current = onBlur; clR.current = onClick; iPR.current = inputProps
  const dL = parseDecimalLength(decimalLengthProp)
  const sR = Number(step ?? 1)
  const s = isFiniteNumber(sR) && sR > 0 ? sR : 1
  const bS = Math.max(0, parseNumber(buttonSize, t.defaults.buttonSize))
  const iW = Math.max(0, parseNumber(inputWidth, t.defaults.inputWidth))
  const dV = useMemo(() => { const r = p.defaultValue; if (r === null) return null; const b = isFiniteNumber(r) ? r : 0; const f = formatValue(b, integer, dL); return autoFixed ? clampValue(f, min, max) : f }, [autoFixed, dL, integer, max, min, p.defaultValue])
  const [v, tC] = useControllableValue<number | null>({ ...p, defaultValue: dV }, { defaultValue: dV })
  useEffect(() => { vR.current = v ?? null }, [v])
  useImperativeHandle(ref, () => ({ focus: () => iR.current?.focus(), blur: () => iR.current?.blur() }))
  const [f, setF] = useState(false)
  const [iV, setIV] = useState(() => valueToString(v, dL))
  const sIT = useCallback((txt: string) => { iVR.current = txt; setIV(txt) }, [])
  useEffect(() => { if (!f) { sIT(valueToString(v, dL)) } }, [dL, f, sIT, v])
  const gCN = useCallback(() => { const curr = vR.current; if (isFiniteNumber(curr)) return curr; return isFiniteNumber(min) ? min : 0 }, [min])
  const iAD = useCallback((type: 'plus' | 'minus') => { if (disabled) return true; if (type === 'plus' && disablePlus) return true; if (type === 'minus' && disableMinus) return true; const curr = gCN(); if (type === 'plus' && isFiniteNumber(max) && curr >= max) return true; if (type === 'minus' && isFiniteNumber(min) && curr <= min) return true; return false }, [disableMinus, disablePlus, disabled, gCN, max, min])
  const sV = useCallback((next: number | null) => { const prev = vR.current ?? null; if (Object.is(prev, next)) return false; vR.current = next; tC(next, { name }); return true }, [name, tC])
  const aNV = useCallback((nextRaw: number) => { const f = formatValue(nextRaw, integer, dL); return autoFixed ? clampValue(f, min, max) : f }, [autoFixed, dL, integer, max, min])
  const pVC = useCallback((next: number | null, committed?: (committedValue: number | null) => void) => { if (cR.current) return 'noop' as const; const commit = () => { const didChange = sV(next); if (!didChange) return 'noop' as const; sIT(valueToString(next, dL)); committed?.(next); return 'changed' as const }; if (!beforeChange) return commit(); try { const result = beforeChange(next); if (isPromiseLike(result)) { cR.current = true; setC(true); result.then(allowed => { if (allowed === false) { sIT(valueToString(vR.current, dL)); return }; commit() }).catch(() => commit()).finally(() => { cR.current = false; setC(false) }); return 'pending' as const }; if (result === false) { sIT(valueToString(vR.current, dL)); return 'noop' as const }; return commit() } catch { return commit() } }, [beforeChange, dL, sIT, sV])
  const sO = useCallback((type: 'plus' | 'minus', event?: GestureResponderEvent, options?: { emitOverlimit?: boolean; emitButtonCallbacks?: boolean }) => { if (cR.current) return 'noop' as const; const eO = options?.emitOverlimit ?? true; const eBC = options?.emitButtonCallbacks ?? Boolean(event); if (iAD(type)) { if (eO) oR.current?.(type); return 'overlimit' as const }; const curr = gCN(); const diff = type === 'plus' ? s : -s; const next = aNV(add(curr, diff)); return pVC(next, committedValue => { if (!eBC || !event) return; if (type === 'plus') { pR.current?.(event, committedValue) } else { mR.current?.(event, committedValue) } }) }, [aNV, gCN, iAD, pVC, s])
  const cLP = useCallback(() => { if (lPR.current.delay) { clearTimeout(lPR.current.delay); lPR.current.delay = undefined }; if (lPR.current.interval) { clearInterval(lPR.current.interval); lPR.current.interval = undefined } }, [])
  useEffect(() => cLP(), [cLP])
  useEffect(() => { if (disabled || c || !longPress) { cLP() } }, [c, cLP, disabled, longPress])
  const sLP = useCallback((type: 'plus' | 'minus') => { if (!longPress) return; if (cR.current) return; if (iAD(type)) return; cLP(); lPR.current.hadLongPress = false; lPR.current.delay = setTimeout(() => { lPR.current.hadLongPress = true; const first = sO(type, undefined, { emitOverlimit: true, emitButtonCallbacks: false }); if (first !== 'changed') { cLP(); return }; lPR.current.interval = setInterval(() => { const result = sO(type, undefined, { emitOverlimit: true, emitButtonCallbacks: false }); if (result !== 'changed') { cLP() } }, LONG_PRESS_INTERVAL) }, LONG_PRESS_DELAY) }, [cLP, iAD, longPress, sO])
  const hPO = useCallback(() => cLP(), [cLP])
  const hBP = useCallback((type: 'plus' | 'minus', event: GestureResponderEvent) => { if (lPR.current.hadLongPress) { lPR.current.hadLongPress = false; return }; lPR.current.hadLongPress = false; sO(type, event, { emitOverlimit: true, emitButtonCallbacks: true }) }, [sO])
  const cFC = isFiniteNumber(v) ? v : 0
  const mN = isFiniteNumber(min) ? min : undefined
  const mXN = isFiniteNumber(max) ? max : undefined
  const dFA = disabled || c
  const mD = dFA || disableMinus || (mN != null && cFC <= mN)
  const pD = dFA || disablePlus || (mXN != null && cFC >= mXN)
  const r = t.radii.default
  const bBS = useMemo(() => ({ width: bS, height: bS }), [bS])
  const iBS = useMemo(() => ({ width: iW, height: bS, marginHorizontal: t.spacing.gap }), [bS, iW, t.spacing.gap])
  const gBS = useCallback((type: 'plus' | 'minus', state: PressableStateCallbackType) => { const isP = type === 'plus'; const dS = isP ? pD : mD; if (theme === 'round') { const base = [S.btn, bBS, { borderRadius: bS / 2, opacity: dS ? t.opacity.roundDisabled : 1 }] as const; if (isP) { return [...base, { backgroundColor: t.colors.roundTheme, ...(state.pressed && !dS && { opacity: t.opacity.pressed }) }, buttonStyle] }; return [...base, { backgroundColor: t.colors.roundThemeBackground, ...(state.pressed && !dS && { opacity: t.opacity.pressed }) }, buttonStyle] }; const isLeading = (type === 'minus') !== (dir === 'rtl'); const cornerStyle = isLeading ? { borderTopLeftRadius: r, borderBottomLeftRadius: r } : { borderTopRightRadius: r, borderBottomRightRadius: r }; const bg = dS ? t.colors.buttonDisabledBackground : state.pressed ? t.colors.active : t.colors.background; return [S.btn, bBS, cornerStyle, { backgroundColor: bg }, buttonStyle] }, [bBS, buttonStyle, mD, pD, r, bS, theme, dir, t.colors.active, t.colors.background, t.colors.buttonDisabledBackground, t.colors.roundTheme, t.colors.roundThemeBackground, t.opacity.pressed, t.opacity.roundDisabled])
  const gBTS = useCallback((type: 'plus' | 'minus') => { const isP = type === 'plus'; const dS = isP ? pD : mD; if (theme === 'round') { const color = isP ? t.colors.roundThemeText : t.colors.roundTheme; return [S.btnTxt, { color, fontSize: t.typography.fontSize, fontWeight: t.typography.fontWeight }] }; return [S.btnTxt, { color: dS ? t.colors.buttonDisabledIcon : t.colors.buttonIcon, fontSize: t.typography.fontSize, fontWeight: t.typography.fontWeight }] }, [mD, pD, theme, t.colors.buttonDisabledIcon, t.colors.buttonIcon, t.colors.roundTheme, t.colors.roundThemeText, t.typography.fontSize, t.typography.fontWeight])
  const hCT = useCallback((txt: string) => { if (disableInput || disabled || cR.current) return; sIT(txt); iPR.current?.onChangeText?.(txt); const tr = txt.trim(); if (tr === '') { pVC(allowEmpty ? null : dV); return }; const num = Number.parseFloat(tr); if (!Number.isFinite(num)) return; pVC(aNV(num)) }, [allowEmpty, aNV, cR, disableInput, disabled, iPR, pVC, dV, sIT])
  const hF = useCallback((event: Parameters<NonNullable<React.ComponentProps<typeof TextInput>['onFocus']>>[0]) => { if (disableInput) { iR.current?.blur(); return }; setF(true); fR.current?.(event); iPR.current?.onFocus?.(event) }, [disableInput])
  const hB = useCallback((event: Parameters<NonNullable<React.ComponentProps<typeof TextInput>['onBlur']>>[0]) => { setF(false); if (!cR.current) { const tr = iVR.current.trim(); if (tr === '') { pVC(allowEmpty ? null : dV) } else { const num = Number.parseFloat(tr); if (Number.isFinite(num)) { pVC(aNV(num)) } } }; bR.current?.(event); iPR.current?.onBlur?.(event) }, [allowEmpty, aNV, pVC, dV])
  const hIPI = useCallback((event: GestureResponderEvent) => { clR.current?.(event); iPR.current?.onPressIn?.(event) }, [])
  const hMP = useCallback((event: GestureResponderEvent) => hBP('minus', event), [hBP])
  const hPP = useCallback((event: GestureResponderEvent) => hBP('plus', event), [hBP])
  const hMPI = useCallback(() => sLP('minus'), [sLP])
  const hPPI = useCallback(() => sLP('plus'), [sLP])
  const gMBS = useCallback((state: PressableStateCallbackType) => gBS('minus', state), [gBS])
  const gPBS = useCallback((state: PressableStateCallbackType) => gBS('plus', state), [gBS])
  const rMB = useCallback(() => { if (!showMinus) return null; return <Pressable key="minus" testID="stepper-minus" accessibilityRole="button" accessibilityLabel="minus" accessibilityState={{ disabled: mD }} onPress={hMP} onPressIn={hMPI} onPressOut={hPO} style={gMBS}><Text style={gBTS('minus')}>-</Text>{theme === 'round' && <View style={createHairlineView({ position: 'all', color: t.colors.roundTheme, borderRadius: bS / 2 })} />}</Pressable> }, [gBTS, gMBS, hMP, hMPI, hPO, mD, showMinus, theme, t.colors.roundTheme, bS])
  const rPB = useCallback(() => { if (!showPlus) return null; return <Pressable key="plus" testID="stepper-plus" accessibilityRole="button" accessibilityLabel="add" accessibilityState={{ disabled: pD }} onPress={hPP} onPressIn={hPPI} onPressOut={hPO} style={gPBS}><Text style={gBTS('plus')}>+</Text></Pressable> }, [gBTS, gPBS, hPP, hPPI, hPO, pD, showPlus])
  const iN = useMemo(() => { if (!showInput) return null; const e = !dFA && !disableInput; const iD = dFA || disableInput; const iBG = theme === 'round' ? t.colors.transparent : iD ? t.colors.inputDisabledBackground : t.colors.background; const iTC = iD ? t.colors.inputDisabledText : t.colors.inputText; const kT = integer ? 'number-pad' : 'decimal-pad'; return <TextInput ref={iR} {...inputProps} style={[S.inp, iBS, { backgroundColor: iBG, color: iTC, paddingHorizontal: t.spacing.none, paddingVertical: t.spacing.none }, inputStyle]} value={iV} placeholder={placeholder} editable={e} keyboardType={kT} onChangeText={hCT} onFocus={hF} onBlur={hB} onPressIn={hIPI} /> }, [dFA, disableInput, hB, hCT, hF, hIPI, iBS, inputProps, inputStyle, iV, integer, placeholder, showInput, theme, t.colors.background, t.colors.inputDisabledBackground, t.colors.inputDisabledText, t.colors.inputText, t.colors.transparent, t.spacing.none])
  return <View {...rest} style={[S.cnt, style]}>{rMB()}{iN}{rPB()}</View>
}

const S = StyleSheet.create({ cnt: { flexDirection: 'row', alignItems: 'center' }, btn: { justifyContent: 'center', alignItems: 'center' }, btnTxt: {}, inp: { textAlign: 'center' } })

const StepperForwardRef = React.forwardRef<StepperInstance, StepperProps>(StepperImpl)
StepperForwardRef.displayName = 'Stepper'
export const Stepper = React.memo(StepperForwardRef)
export default Stepper
