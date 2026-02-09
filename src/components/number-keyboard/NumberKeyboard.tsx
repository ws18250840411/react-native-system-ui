import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Easing, Pressable, StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native'
import { useControllableValue } from '../../hooks'
import { nativeDriverEnabled } from '../../platform'
import { useReducedMotion } from '../../hooks/animation'
import { createPlatformShadow } from '../../utils/createPlatformShadow'
import { parseNumberLike } from '../../utils/number'
import { isRenderable, renderTextOrNode } from '../../utils'
import Loading from '../loading'
import Portal from '../portal/Portal'
import { useLocale } from '../config-provider/useLocale'
import { SafeAreaView } from '../safe-area-view'
import type { NumberKeyboardKeyType, NumberKeyboardProps } from './types'
import { useNumberKeyboardTokens } from './tokens'

const registry = new Set<() => void>()
const NUM_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const ZERO = '0'
const shuffle = <T,>(list: T[]) => { const n = [...list]; for (let i = n.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [n[i], n[j]] = [n[j], n[i]] }; return n }
interface Key { text?: string; type: NumberKeyboardKeyType; wider?: boolean }

const NumberKeyboard = React.memo((props: NumberKeyboardProps) => {
  const { visible, title, tokensOverride, theme = 'default', extraKey, randomKeyOrder, showDeleteKey = true, closeButtonText, deleteButtonText, closeButtonLoading, onChange, onInput, onDelete, onClose, onBlur, onHide, onShow, value: _v, defaultValue: _dv, maxlength: maxlengthProp, blurOnClose = true, safeAreaInsetBottom = true, transition = true, transitionDuration = 300, numberKeyRender, deleteRender, extraKeyRender, style, ...rest } = props
  const locale = useLocale(); const reducedMotion = useReducedMotion(); const tokens = useNumberKeyboardTokens(tokensOverride)
  const { colors, radii, shadow, sizing, spacing, typography } = tokens
  const [value, setValue] = useControllableValue<string>(props, { defaultValue: '', valuePropName: 'value', defaultValuePropName: 'defaultValue', trigger: 'onChange' })
  const curVal = value ?? ''
  const maxLen = (() => { const p = parseNumberLike(maxlengthProp, undefined); return p !== undefined && Number.isFinite(p) && p >= 0 ? Math.floor(p) : undefined })()
  const valRef = useRef(curVal); const maxRef = useRef(maxLen)
  const onCloseRef = useRef(onClose); const onBlurRef = useRef(onBlur); const onShowRef = useRef(onShow); const onHideRef = useRef(onHide); const onDelRef = useRef(onDelete); const onInpRef = useRef(onInput)
  valRef.current = curVal; maxRef.current = maxLen; onCloseRef.current = onClose; onBlurRef.current = onBlur; onShowRef.current = onShow; onHideRef.current = onHide; onDelRef.current = onDelete; onInpRef.current = onInput
  const isCustom = theme === 'custom'; const defClose = locale?.vanNumberKeyboard?.close ?? 'Done'; const closeTxt = isCustom ? closeButtonText ?? defClose : closeButtonText
  const handleClose = useCallback(() => { onCloseRef.current?.(); if (blurOnClose) onBlurRef.current?.() }, [blurOnClose])
  const prevVis = useRef(visible)
  useEffect(() => { if (visible && !prevVis.current) onShowRef.current?.(); if (!visible && prevVis.current) onHideRef.current?.(); prevVis.current = visible }, [visible])
  useEffect(() => { if (visible) { registry.add(handleClose); registry.forEach(fn => { if (fn !== handleClose) fn() }) } else registry.delete(handleClose); return () => { registry.delete(handleClose) } }, [visible, handleClose])
  const keys = useMemo(() => {
    const shuf = randomKeyOrder && visible; const numKeys = shuf ? shuffle(NUM_KEYS) : NUM_KEYS; const matrix: Key[] = numKeys.map(t => ({ text: t, type: '' }))
    if (isCustom) {
      const ext = Array.isArray(extraKey) ? extraKey : extraKey ? [extraKey] : []
      if (ext.length === 1) matrix.push({ text: ZERO, type: '', wider: true }, { text: ext[0], type: 'extra' })
      else if (ext.length >= 2) matrix.push({ text: ext[0], type: 'extra' }, { text: ZERO, type: '' }, { text: ext[1], type: 'extra' })
      else matrix.push({ text: ZERO, type: '' })
      return matrix
    }
    const nextExt = Array.isArray(extraKey) ? extraKey[0] ?? '' : extraKey ?? ''
    matrix.push({ text: nextExt, type: 'extra' }, { text: ZERO, type: '' }, { type: showDeleteKey ? 'delete' : '', text: showDeleteKey ? undefined : '' })
    return matrix
  }, [extraKey, isCustom, randomKeyOrder, showDeleteKey, visible])
  const handleInput = useCallback((text?: string, type?: NumberKeyboardKeyType) => {
    if (type === 'delete') { const c = valRef.current; if (!c) return; onDelRef.current?.(); setValue(c.slice(0, -1)); return }
    if (type === 'close' || (type === 'extra' && !text)) { handleClose(); return }; if (!text) return
    const c = valRef.current; const m = maxRef.current; if (m !== undefined && c.length >= m) return
    onInpRef.current?.(text); setValue(`${c}${text}`)
  }, [handleClose, setValue])
  const winShadow = useMemo(() => createPlatformShadow(shadow), [shadow.color, shadow.elevation, shadow.offsetY, shadow.opacity, shadow.radius])
  const renderKey = useCallback((key: Key, index: number, isClose = false, fullW = false, customH?: number) => {
    const kt = key.type; const isPh = kt === '' && !key.text; const dis = isPh || (isClose && closeButtonLoading); const onP = dis ? undefined : () => handleInput(key.text, kt)
    const bg = isClose ? colors.closeBackground : colors.keyBackground; const aBg = isClose ? colors.closeActiveBackground : colors.keyActiveBackground
    const tInact = isClose ? colors.closeText : colors.keyText; const tPress = isClose ? colors.closeText : colors.keyTextActive
    const kH = customH ?? (isClose ? sizing.closeHeight : sizing.keyHeight); const auxFs = Math.round(sizing.fontSize * 0.64); const tFs = kt === 'close' || kt === 'extra' || kt === 'delete' ? auxFs : sizing.fontSize; const kTxt = key.text ?? ''
    const cnt = kt === 'delete' ? deleteRender?.() ?? deleteButtonText ?? '⌫' : kt === 'extra' ? extraKeyRender ? extraKeyRender(kTxt) : kTxt || '⌨︎' : kt === 'close' ? closeTxt ?? defClose : numberKeyRender ? numberKeyRender(kTxt) : kTxt
    return <Pressable key={`${kt}-${index}-${key.text ?? index}`} onPress={onP} disabled={dis} style={[{ opacity: isPh ? 1 : dis ? 0.6 : 1 }, fullW ? { width: '100%', flexBasis: 'auto' as unknown as number, flexGrow: 0, alignSelf: 'stretch' } : { flexBasis: 0, flexGrow: key.wider ? 2 : 1, flexShrink: 1, minWidth: 0 }]} accessible={!isPh} accessibilityRole={isPh ? undefined : 'button'} accessibilityLabel={isPh ? undefined : kt === 'delete' ? 'delete' : kt === 'close' ? closeTxt ?? 'close' : kt === 'extra' ? kTxt || 'collapse' : kTxt} accessibilityState={isPh ? undefined : { disabled: !!dis }} accessibilityElementsHidden={isPh} importantForAccessibility={isPh ? 'no-hide-descendants' : undefined}>{({ pressed }) => { const isP = pressed && !dis; const kBg = dis ? colors.keyBackground : isP ? aBg : bg; const tClr = isP ? tPress : tInact; return <View style={[S.k, { height: kH, backgroundColor: kBg, borderRadius: radii.key }]}>{isClose && closeButtonLoading ? <Loading size={18} color={tClr} /> : isRenderable(cnt) ? renderTextOrNode(cnt, [S.kTxt, { color: tClr, fontFamily: typography.fontFamily, fontSize: tFs }]) : null}</View> }}</Pressable>
  }, [closeButtonLoading, colors.closeActiveBackground, colors.closeBackground, colors.closeText, colors.keyActiveBackground, colors.keyBackground, colors.keyText, colors.keyTextActive, defClose, deleteButtonText, deleteRender, extraKeyRender, handleInput, numberKeyRender, radii.key, sizing.closeHeight, sizing.fontSize, sizing.keyHeight, typography.fontFamily, closeTxt])
  const animVal = useRef(new Animated.Value(visible ? 1 : 0)).current; const animRef = useRef<Animated.CompositeAnimation | null>(null); const seqRef = useRef(0)
  const [contentH, setContentH] = useState(0); const [shouldRender, setShouldRender] = useState(visible); const effDur = reducedMotion ? 0 : (transition === false ? 0 : transitionDuration)
  useEffect(() => { seqRef.current += 1; const seq = seqRef.current; if (visible) setShouldRender(true); animRef.current?.stop(); const anim = Animated.timing(animVal, { toValue: visible ? 1 : 0, duration: effDur, useNativeDriver: nativeDriverEnabled, easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic), isInteraction: false }); animRef.current = anim; anim.start(({ finished }) => { if (finished && !visible && seqRef.current === seq) setShouldRender(false) }); return () => { animRef.current?.stop(); animRef.current = null } }, [animVal, visible, effDur])
  const translateY = animVal.interpolate({ inputRange: [0, 1], outputRange: [contentH || 320, 0] })
  const onLayout = useCallback((e: LayoutChangeEvent) => { const { height } = e.nativeEvent.layout; setContentH(prev => (Math.abs(height - prev) > 0.5 ? height : prev)) }, [])
  const hasHdr = !isCustom && (title || closeButtonText); const dblKeyH = sizing.keyHeight * 2 + spacing.keyGap
  const memoized = useMemo(() => {
    const hPad = { paddingHorizontal: spacing.titlePadding }; const dCtr = [S.dRow, { flexDirection: 'column' as const, flexWrap: 'nowrap' as const, paddingHorizontal: spacing.paddingHorizontal, paddingTop: spacing.keyGap, paddingBottom: spacing.keyGap, gap: spacing.keyGap }]; const dLine = { flexDirection: 'row' as const, gap: spacing.keyGap }
    const cRow = [S.cRow, { paddingHorizontal: spacing.paddingHorizontal, paddingTop: hasHdr ? 0 : spacing.keyGap, paddingBottom: spacing.keyGap, width: '100%' as const }]; const cMat = [S.cMat, { flexDirection: 'column' as const, flexWrap: 'nowrap' as const, gap: spacing.keyGap }]; const cSide = [S.cSide, { gap: spacing.keyGap, marginLeft: spacing.keyGap }]
    const entries = keys.map((k, i) => ({ key: k, index: i })); const dLines: Array<Array<{ key: Key; index: number }>> = []; for (let i = 0; i < entries.length; i += 3) dLines.push(entries.slice(i, i + 3))
    const dNode = <View style={dCtr}>{dLines.map((line, li) => <View key={`l-${li}`} style={dLine}>{line.map(item => renderKey(item.key, item.index))}</View>)}</View>
    const cLines: Array<Array<{ key: Key; index: number }>> = []; for (let i = 0; i < 9 && i < entries.length; i += 3) cLines.push(entries.slice(i, i + 3)); const tail = entries.slice(9)
    if (tail.length === 1) cLines.push([{ key: { type: '' }, index: 1000001 }, tail[0], { key: { type: '' }, index: 1000002 }]); else if (tail.length) cLines.push(tail)
    const cMatNode = <View style={cMat}>{cLines.map((line, li) => <View key={`cl-${li}`} style={dLine}>{line.map(item => renderKey(item.key, item.index))}</View>)}</View>
    const delNode = showDeleteKey && renderKey({ type: 'delete' }, 999, false, true, dblKeyH); const closeNode = renderKey({ type: 'close' }, 1000, true, true, dblKeyH)
    const tStyle = { color: colors.title, fontFamily: typography.fontFamily, fontSize: sizing.titleFontSize }
    const hdrNode = hasHdr ? <View style={[S.hdr, hPad]}><Text style={[S.tBold, S.tCenter, tStyle]} numberOfLines={1}>{title}</Text>{closeTxt && <Pressable onPress={handleClose} style={S.hdrClose} accessibilityRole="button" accessibilityLabel={closeTxt}><Text style={tStyle}>{closeTxt}</Text></Pressable>}</View> : null
    const bodyNode = isCustom ? <View style={cRow}>{cMatNode}<View style={cSide}>{delNode}{closeNode}</View></View> : dNode
    return { headerNode: hdrNode, bodyNode, safeAreaNode: safeAreaInsetBottom && <SafeAreaView edge="bottom" /> }
  }, [handleClose, colors.title, dblKeyH, hasHdr, isCustom, keys, renderKey, closeTxt, safeAreaInsetBottom, sizing.titleFontSize, spacing.keyGap, spacing.paddingHorizontal, spacing.titlePadding, typography.fontFamily, title, showDeleteKey])
  if (!shouldRender && !visible) return null
  return <Portal><Animated.View {...rest} pointerEvents={visible ? 'auto' : 'none'} renderToHardwareTextureAndroid shouldRasterizeIOS onLayout={onLayout} style={[S.wrap, winShadow, style, { transform: [{ translateY }], backgroundColor: colors.background }]}>{memoized.headerNode}{memoized.bodyNode}{memoized.safeAreaNode}</Animated.View></Portal>
})

const S = StyleSheet.create({ wrap: { position: 'absolute', left: 0, right: 0, bottom: 0 }, hdr: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', height: 44, position: 'relative' }, tBold: { fontWeight: '600' }, tCenter: { position: 'absolute', left: 12, right: 12, textAlign: 'center' }, hdrClose: { minWidth: 56, alignItems: 'flex-end' }, k: { justifyContent: 'center', alignItems: 'center' }, kTxt: { includeFontPadding: false, textAlign: 'center' }, dRow: { flexDirection: 'row', flexWrap: 'wrap' }, cRow: { flexDirection: 'row' }, cMat: { flex: 3, flexDirection: 'row', flexWrap: 'wrap' }, cSide: { flex: 1, flexDirection: 'column', justifyContent: 'flex-start' } })
export default NumberKeyboard
