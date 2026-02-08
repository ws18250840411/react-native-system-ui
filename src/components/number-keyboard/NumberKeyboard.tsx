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
const NUMBER_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const ZERO_KEY = '0'

const shuffle = <T extends unknown>(list: T[]) => {
  const newList = [...list]
  for (let i = newList.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newList[i], newList[j]] = [newList[j], newList[i]]
  }
  return newList
}

interface Key {
  text?: string
  type: NumberKeyboardKeyType
  wider?: boolean
}

const NumberKeyboard = React.memo((props: NumberKeyboardProps) => {
  const { visible, title, tokensOverride, theme = 'default', extraKey, randomKeyOrder, showDeleteKey = true, closeButtonText, deleteButtonText, closeButtonLoading, onChange, onInput, onDelete, onClose, onBlur, onHide, onShow, value: _value, defaultValue: _defaultValue, maxlength: maxlengthProp, blurOnClose = true, safeAreaInsetBottom = true, transition = true, transitionDuration = 300, numberKeyRender, deleteRender, extraKeyRender, style, ...rest } = props
  const locale = useLocale()
  const reducedMotion = useReducedMotion()
  const tokens = useNumberKeyboardTokens(tokensOverride)
  const { colors, radii, shadow, sizing, spacing } = tokens
  const [value, setValue] = useControllableValue<string>(props, { defaultValue: '', valuePropName: 'value', defaultValuePropName: 'defaultValue', trigger: 'onChange' })
  const currentValue = value ?? ''
  const parsedMaxLength = parseNumberLike(maxlengthProp, undefined)
  const maxLength = parsedMaxLength !== undefined && Number.isFinite(parsedMaxLength) && parsedMaxLength >= 0 ? Math.floor(parsedMaxLength) : undefined
  const valueRef = useRef(currentValue), maxLengthRef = useRef(maxLength), onCloseRef = useRef(onClose), onBlurRef = useRef(onBlur), onShowRef = useRef(onShow), onHideRef = useRef(onHide), onDeleteRef = useRef(onDelete), onInputRef = useRef(onInput)
  valueRef.current = currentValue
  maxLengthRef.current = maxLength
  onCloseRef.current = onClose
  onBlurRef.current = onBlur
  onShowRef.current = onShow
  onHideRef.current = onHide
  onDeleteRef.current = onDelete
  onInputRef.current = onInput
  const isCustom = theme === 'custom'
  const defaultCloseText = locale?.vanNumberKeyboard?.close ?? 'Done'
  const closeText = isCustom ? closeButtonText ?? defaultCloseText : closeButtonText
  const handleClose = useCallback(() => { onCloseRef.current?.(); if (blurOnClose) onBlurRef.current?.() }, [blurOnClose])
  const prevVisible = useRef(visible)
  useEffect(() => { if (visible && !prevVisible.current) onShowRef.current?.(); if (!visible && prevVisible.current) onHideRef.current?.(); prevVisible.current = visible }, [visible])
  useEffect(() => { if (visible) { registry.add(handleClose); registry.forEach(fn => { if (fn !== handleClose) fn() }) } else registry.delete(handleClose); return () => { registry.delete(handleClose) } }, [visible, handleClose])
  const keys = useMemo(() => {
    const shouldShuffle = randomKeyOrder && visible
    const numberKeys = shouldShuffle ? shuffle(NUMBER_KEYS) : NUMBER_KEYS
    const matrix: Key[] = numberKeys.map(text => ({ text, type: '' }))
    if (isCustom) {
      const extraKeys = Array.isArray(extraKey) ? extraKey : extraKey ? [extraKey] : []
      if (extraKeys.length === 1) matrix.push({ text: ZERO_KEY, type: '', wider: true }, { text: extraKeys[0], type: 'extra' })
      else if (extraKeys.length >= 2) matrix.push({ text: extraKeys[0], type: 'extra' }, { text: ZERO_KEY, type: '' }, { text: extraKeys[1], type: 'extra' })
      else matrix.push({ text: ZERO_KEY, type: '' })
      return matrix
    }
    const nextExtra = Array.isArray(extraKey) ? extraKey[0] ?? '' : extraKey ?? ''
    matrix.push({ text: nextExtra, type: 'extra' })
    matrix.push({ text: ZERO_KEY, type: '' })
    matrix.push({ type: showDeleteKey ? 'delete' : '', text: showDeleteKey ? undefined : '' })
    return matrix
  }, [extraKey, isCustom, randomKeyOrder, showDeleteKey, visible])
  const handleInput = useCallback((text?: string, type?: NumberKeyboardKeyType) => {
    if (type === 'delete') { const currentValue = valueRef.current; if (!currentValue) return; onDeleteRef.current?.(); setValue(currentValue.slice(0, -1)); return }
    if (type === 'close' || (type === 'extra' && !text)) { handleClose(); return }
    if (!text) return
    const currentValue = valueRef.current, currentMaxLength = maxLengthRef.current
    if (currentMaxLength !== undefined && currentValue.length >= currentMaxLength) return
    onInputRef.current?.(text)
    setValue(`${currentValue}${text}`)
  }, [handleClose, setValue])
  const windowShadow = useMemo(() => createPlatformShadow(shadow), [shadow.color, shadow.elevation, shadow.offsetY, shadow.opacity, shadow.radius])
  const renderKey = useCallback((key: Key, index: number, isCustomTheme = false, fullWidth = false, customHeight?: number) => {
    const isPlaceholder = key.type === '' && !key.text
    const disabled = isPlaceholder || (isCustomTheme && closeButtonLoading)
    const onPress = disabled ? undefined : () => handleInput(key.text, key.type)
    const background = isCustomTheme ? colors.closeBackground : colors.keyBackground
    const activeBackground = isCustomTheme ? colors.closeActiveBackground : colors.keyActiveBackground
    const inactiveTextColor = isCustomTheme ? colors.closeText : colors.keyText
    const pressedTextColor = isCustomTheme ? colors.closeText : colors.keyTextActive
    const keyHeight = customHeight ?? (isCustomTheme ? sizing.closeHeight : sizing.keyHeight)
    const auxFontSize = Math.round(sizing.fontSize * 0.64)
    const textFontSize = key.type === 'close' || key.type === 'extra' || key.type === 'delete' ? auxFontSize : sizing.fontSize
    const keyText = key.text ?? ''
    const contentNode = key.type === 'delete' ? deleteRender?.() ?? deleteButtonText ?? '⌫' : key.type === 'extra' ? extraKeyRender ? extraKeyRender(keyText) : keyText || '⌨︎' : key.type === 'close' ? closeText ?? defaultCloseText : numberKeyRender ? numberKeyRender(keyText) : keyText
    return <Pressable key={`${key.type}-${index}-${key.text ?? index}`} onPress={onPress} disabled={disabled} style={[{ opacity: isPlaceholder ? 1 : disabled ? 0.6 : 1 }, fullWidth ? { width: '100%', flexBasis: 'auto' as unknown as number, flexGrow: 0, alignSelf: 'stretch' } : { flexBasis: 0, flexGrow: key.wider ? 2 : 1, flexShrink: 1, minWidth: 0 }]} accessible={!isPlaceholder} accessibilityRole={isPlaceholder ? undefined : 'button'} accessibilityLabel={isPlaceholder ? undefined : key.type === 'delete' ? 'delete' : key.type === 'close' ? closeText ?? 'close' : key.type === 'extra' ? keyText || 'collapse' : keyText} accessibilityState={isPlaceholder ? undefined : { disabled: !!disabled }} accessibilityElementsHidden={isPlaceholder} importantForAccessibility={isPlaceholder ? 'no-hide-descendants' : undefined}>{({ pressed }) => { const isPressed = pressed && !disabled; const keyBackground = disabled ? colors.keyBackground : isPressed ? activeBackground : background; const textColor = isPressed ? pressedTextColor : inactiveTextColor; return <View style={[S.k, { height: keyHeight, backgroundColor: keyBackground, borderRadius: radii.key }]}>{isCustomTheme && closeButtonLoading ? <Loading size={18} color={textColor} /> : isRenderable(contentNode) ? renderTextOrNode(contentNode, [S.kT, { color: textColor, fontSize: textFontSize }]) : null}</View> }}</Pressable>
  }, [closeButtonLoading, colors.closeActiveBackground, colors.closeBackground, colors.closeText, colors.keyActiveBackground, colors.keyBackground, colors.keyText, colors.keyTextActive, deleteButtonText, deleteRender, extraKeyRender, handleInput, numberKeyRender, radii.key, sizing.closeHeight, sizing.fontSize, sizing.keyHeight, closeText])
  const animatedValue = useRef(new Animated.Value(visible ? 1 : 0)).current
  const animationRef = useRef<Animated.CompositeAnimation | null>(null)
  const animationSequence = useRef(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [shouldRender, setShouldRender] = useState(visible)
  const effectiveDuration = reducedMotion ? 0 : (transition === false ? 0 : transitionDuration)
  useEffect(() => { animationSequence.current += 1; const currentSequence = animationSequence.current; if (visible) setShouldRender(true); animationRef.current?.stop(); const animation = Animated.timing(animatedValue, { toValue: visible ? 1 : 0, duration: effectiveDuration, useNativeDriver: nativeDriverEnabled, easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic), isInteraction: false }); animationRef.current = animation; animation.start(({ finished }) => { if (finished && !visible && animationSequence.current === currentSequence) setShouldRender(false) }); return () => { animationRef.current?.stop(); animationRef.current = null } }, [animatedValue, visible, effectiveDuration])
  const translateY = animatedValue.interpolate({ inputRange: [0, 1], outputRange: [contentHeight || 320, 0] })
  const handleLayout = useCallback((e: LayoutChangeEvent) => { const { height } = e.nativeEvent.layout; setContentHeight(prev => (Math.abs(height - prev) > 0.5 ? height : prev)) }, [])
  const hasHeader = !isCustom && (title || closeButtonText)
  const doubleKeyHeight = sizing.keyHeight * 2 + spacing.keyGap
  const memoized = useMemo(() => {
    const headerPaddingStyle = { paddingHorizontal: spacing.titlePadding }
    const defaultContainerStyle = [S.dR, { flexDirection: 'column' as const, flexWrap: 'nowrap' as const, paddingHorizontal: spacing.paddingHorizontal, paddingTop: spacing.keyGap, paddingBottom: spacing.keyGap, gap: spacing.keyGap }]
    const defaultLineStyle = { flexDirection: 'row' as const, gap: spacing.keyGap }
    const customRowStyle = [S.cR, { paddingHorizontal: spacing.paddingHorizontal, paddingTop: hasHeader ? 0 : spacing.keyGap, paddingBottom: spacing.keyGap, width: '100%' as const }]
    const customMatrixStyle = [S.cM, { flexDirection: 'column' as const, flexWrap: 'nowrap' as const, gap: spacing.keyGap }]
    const customSideStyle = [S.cS, { gap: spacing.keyGap, marginLeft: spacing.keyGap }]
    const entries: Array<{ key: Key; index: number }> = keys.map((key, i) => ({ key, index: i }))
    const defaultLines: Array<Array<{ key: Key; index: number }>> = []
    for (let i = 0; i < entries.length; i += 3) defaultLines.push(entries.slice(i, i + 3))
    const defaultNode = <View style={defaultContainerStyle}>{defaultLines.map((line, li) => <View key={`l-${li}`} style={defaultLineStyle}>{line.map(item => renderKey(item.key, item.index))}</View>)}</View>
    const customLines: Array<Array<{ key: Key; index: number }>> = []
    for (let i = 0; i < 9 && i < entries.length; i += 3) customLines.push(entries.slice(i, i + 3))
    const tailKeys = entries.slice(9)
    if (tailKeys.length === 1) customLines.push([{ key: { type: '' }, index: 1000001 }, tailKeys[0], { key: { type: '' }, index: 1000002 }])
    else if (tailKeys.length) customLines.push(tailKeys)
    const customMatrixNode = <View style={customMatrixStyle}>{customLines.map((line, li) => <View key={`cl-${li}`} style={defaultLineStyle}>{line.map(item => renderKey(item.key, item.index))}</View>)}</View>
    const deleteNode = showDeleteKey && renderKey({ type: 'delete' }, 999, false, true, doubleKeyHeight)
    const closeNode = renderKey({ type: 'close' }, 1000, true, true, doubleKeyHeight)
    const headerNode = hasHeader ? <View style={[S.h, headerPaddingStyle]}><Text style={[S.t, S.tO, { color: colors.title, fontSize: sizing.titleFontSize }]} numberOfLines={1}>{title}</Text>{closeText && <Pressable onPress={handleClose} style={S.hC} accessibilityRole="button" accessibilityLabel={closeText}><Text style={{ color: colors.title }}>{closeText}</Text></Pressable>}</View> : null
    const bodyNode = isCustom ? <View style={customRowStyle}>{customMatrixNode}<View style={customSideStyle}>{deleteNode}{closeNode}</View></View> : defaultNode
    const safeAreaNode = safeAreaInsetBottom && <SafeAreaView edge="bottom" />
    return { headerNode, bodyNode, safeAreaNode }
  }, [handleClose, colors.title, doubleKeyHeight, extraKeyRender, hasHeader, isCustom, keys, renderKey, closeText, safeAreaInsetBottom, sizing.titleFontSize, spacing.keyGap, spacing.paddingHorizontal, spacing.titlePadding, title])
  if (!shouldRender && !visible) return null
  return <Portal><Animated.View {...rest} pointerEvents={visible ? 'auto' : 'none'} renderToHardwareTextureAndroid shouldRasterizeIOS onLayout={handleLayout} style={[S.w, windowShadow, style, { transform: [{ translateY }], backgroundColor: colors.background }]}>{memoized.headerNode}{memoized.bodyNode}{memoized.safeAreaNode}</Animated.View></Portal>
})

const S = StyleSheet.create({
  w: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  h: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', height: 44, position: 'relative' },
  t: { fontWeight: '600' },
  tO: { position: 'absolute', left: 12, right: 12, textAlign: 'center' },
  hC: { minWidth: 56, alignItems: 'flex-end' },
  k: { justifyContent: 'center', alignItems: 'center' },
  kT: { includeFontPadding: false, textAlign: 'center' },
  dR: { flexDirection: 'row', flexWrap: 'wrap' },
  cR: { flexDirection: 'row' },
  cM: { flex: 3, flexDirection: 'row', flexWrap: 'wrap' },
  cS: { flex: 1, flexDirection: 'column', justifyContent: 'flex-start' },
})

export default NumberKeyboard
