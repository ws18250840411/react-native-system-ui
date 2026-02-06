import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type GestureResponderEvent,
  type PressableStateCallbackType,
} from 'react-native'

import { useControllableValue } from '../../hooks'
import {
  parseNumber,
  addNumber as add,
  clampValue,
  formatNumber as formatValue,
  numberToString as valueToString,
  parseDecimalLength,
  isFiniteNumber,
  isPromiseLike,
} from '../../utils'
import { useStepperTokens } from './tokens'
import type { StepperInstance, StepperProps } from './types'

const LONG_PRESS_DELAY = 600
const LONG_PRESS_INTERVAL = 100

const StepperImpl = (p: StepperProps, ref: React.ForwardedRef<StepperInstance>) => {
  const tokens = useStepperTokens(p.tokensOverride)

  const {
    min,
    max,
    step = 1,
    autoFixed = true,
    beforeChange,
    integer = false,
    decimalLength: decimalLengthProp,
    disabled = false,
    disablePlus = false,
    disableMinus = false,
    disableInput = false,
    allowEmpty = false,
    showPlus = tokens.defaults.showPlus,
    showMinus = tokens.defaults.showMinus,
    showInput = tokens.defaults.showInput,
    longPress = tokens.defaults.longPress,
    theme = tokens.defaults.theme,
    inputWidth,
    buttonSize,
    name,
    placeholder,
    onClick,
    onPlus,
    onMinus,
    onOverlimit,
    onFocus,
    onBlur,
    inputProps,
    inputStyle,
    buttonStyle,
    style,
    ...rest
  } = p

  const [changing, setChanging] = useState(false)
  const changingRef = useRef(false)


  const onPlusRef = useRef(onPlus)
  onPlusRef.current = onPlus
  const onMinusRef = useRef(onMinus)
  onMinusRef.current = onMinus
  const onOverlimitRef = useRef(onOverlimit)
  onOverlimitRef.current = onOverlimit
  const onFocusRef = useRef(onFocus)
  onFocusRef.current = onFocus
  const onBlurRef = useRef(onBlur)
  onBlurRef.current = onBlur
  const onClickRef = useRef(onClick)
  onClickRef.current = onClick

  const decimalLength = parseDecimalLength(decimalLengthProp)

  const resolvedStepRaw = Number(step ?? 1)
  const resolvedStep = isFiniteNumber(resolvedStepRaw) && resolvedStepRaw > 0 ? resolvedStepRaw : 1

  const resolvedButtonSize = Math.max(0, parseNumber(buttonSize, tokens.defaults.buttonSize))
  const resolvedInputWidth = Math.max(0, parseNumber(inputWidth, tokens.defaults.inputWidth))

  const resolvedDefaultValue = useMemo(() => {
    const raw = p.defaultValue
    if (raw === null) return null
    const base = isFiniteNumber(raw) ? raw : 0
    const formatted = formatValue(base, integer, decimalLength)
    return autoFixed ? clampValue(formatted, min, max) : formatted
  }, [autoFixed, decimalLength, integer, max, min, p.defaultValue])

  const [value, triggerChange] = useControllableValue<number | null>(
    { ...p, defaultValue: resolvedDefaultValue },
    { defaultValue: resolvedDefaultValue },
  )

  const valueRef = useRef<number | null>(value ?? null)
  useEffect(() => { valueRef.current = value ?? null }, [value])

  const inputRef = useRef<TextInput>(null)
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }))

  const [hasFocus, setHasFocus] = useState(false)
  const [inputValue, setInputValue] = useState(() => valueToString(value, decimalLength))
  const inputValueRef = useRef(inputValue)
  const setInputText = useCallback((text: string) => {
    inputValueRef.current = text
    setInputValue(text)
  }, [])

  useEffect(() => {
    if (!hasFocus) { setInputText(valueToString(value, decimalLength)) }
  }, [decimalLength, hasFocus, setInputText, value])

  const getCurrentNumber = useCallback(() => {
    const current = valueRef.current
    if (isFiniteNumber(current)) return current
    return isFiniteNumber(min) ? min : 0
  }, [min])

  const isActionDisabled = useCallback((type: 'plus' | 'minus') => {
    if (disabled) return true
    if (type === 'plus' && disablePlus) return true
    if (type === 'minus' && disableMinus) return true

    const current = getCurrentNumber()
    if (type === 'plus' && isFiniteNumber(max) && current >= max) {
      return true
    }
    if (type === 'minus' && isFiniteNumber(min) && current <= min) {
      return true
    }
    return false
  }, [disableMinus, disablePlus, disabled, getCurrentNumber, max, min])

  const setValue = useCallback((next: number | null) => {
    const prev = valueRef.current ?? null
    if (Object.is(prev, next)) return false
    valueRef.current = next
    triggerChange(next, { name })
    return true
  }, [name, triggerChange])

  const applyNextValue = useCallback((nextRaw: number) => {
    const formatted = formatValue(nextRaw, integer, decimalLength)
    return autoFixed ? clampValue(formatted, min, max) : formatted
  }, [autoFixed, decimalLength, integer, max, min])

  const performValueChange = useCallback((
    next: number | null,
    committed?: (committedValue: number | null) => void,
  ) => {
    if (changingRef.current) {
      return 'noop' as const
    }

    const commit = () => {
      const didChange = setValue(next)
      if (!didChange) return 'noop' as const
      setInputText(valueToString(next, decimalLength))
      committed?.(next)
      return 'changed' as const
    }

    if (!beforeChange) {
      return commit()
    }

    try {
      const result = beforeChange(next)

      if (isPromiseLike(result)) {
        changingRef.current = true
        setChanging(true)

        result
          .then(allowed => {
            if (allowed === false) {
              setInputText(valueToString(valueRef.current, decimalLength))
              return
            }
            commit()
          })
          .catch(() => {
            commit()
          })
          .finally(() => {
            changingRef.current = false
            setChanging(false)
          })

        return 'pending' as const
      }

      if (result === false) {
        setInputText(valueToString(valueRef.current, decimalLength))
        return 'noop' as const
      }

      return commit()
    } catch {
      return commit()
    }
  }, [beforeChange, decimalLength, setInputText, setValue])

  const stepOnce = useCallback((
    type: 'plus' | 'minus',
    event?: GestureResponderEvent,
    options?: { emitOverlimit?: boolean; emitButtonCallbacks?: boolean },
  ) => {
    if (changingRef.current) {
      return 'noop' as const
    }

    const emitOverlimit = options?.emitOverlimit ?? true
    const emitButtonCallbacks = options?.emitButtonCallbacks ?? Boolean(event)

    if (isActionDisabled(type)) {
      if (emitOverlimit) onOverlimitRef.current?.(type)
      return 'overlimit' as const
    }

    const current = getCurrentNumber()
    const diff = type === 'plus' ? resolvedStep : -resolvedStep
    const next = applyNextValue(add(current, diff))

    return performValueChange(next, committedValue => {
      if (!emitButtonCallbacks || !event) return
      if (type === 'plus') {
        onPlusRef.current?.(event, committedValue)
      } else {
        onMinusRef.current?.(event, committedValue)
      }
    })
  }, [
    applyNextValue,
    getCurrentNumber,
    isActionDisabled,
    performValueChange,
    resolvedStep,
  ])

  const longPressRef = useRef<{
    delay?: ReturnType<typeof setTimeout>
    interval?: ReturnType<typeof setInterval>
    hadLongPress: boolean
  }>({
    hadLongPress: false,
  })

  const clearLongPress = useCallback(() => {
    if (longPressRef.current.delay) {
      clearTimeout(longPressRef.current.delay)
      longPressRef.current.delay = undefined
    }
    if (longPressRef.current.interval) {
      clearInterval(longPressRef.current.interval)
      longPressRef.current.interval = undefined
    }
  }, [])

  useEffect(() => clearLongPress, [clearLongPress])
  useEffect(() => {
    if (disabled || changing || !longPress) { clearLongPress() }
  }, [changing, clearLongPress, disabled, longPress])

  const startLongPress = useCallback((type: 'plus' | 'minus') => {
    if (!longPress) return
    if (changingRef.current) return
    if (isActionDisabled(type)) return

    clearLongPress()
    longPressRef.current.hadLongPress = false

    longPressRef.current.delay = setTimeout(() => {
      longPressRef.current.hadLongPress = true
      const first = stepOnce(type, undefined, {
        emitOverlimit: true,
        emitButtonCallbacks: false,
      })
      if (first !== 'changed') {
        clearLongPress()
        return
      }

      longPressRef.current.interval = setInterval(() => {
        const result = stepOnce(type, undefined, {
          emitOverlimit: true,
          emitButtonCallbacks: false,
        })
        if (result !== 'changed') {
          clearLongPress()
        }
      }, LONG_PRESS_INTERVAL)
    }, LONG_PRESS_DELAY)
  }, [clearLongPress, isActionDisabled, longPress, stepOnce])

  const handlePressOut = useCallback(() => {
    clearLongPress()
  }, [clearLongPress])

  const handleButtonPress = useCallback((type: 'plus' | 'minus', event: GestureResponderEvent) => {
    if (longPressRef.current.hadLongPress) {
      longPressRef.current.hadLongPress = false
      return
    }
    longPressRef.current.hadLongPress = false
    stepOnce(type, event, { emitOverlimit: true, emitButtonCallbacks: true })
  }, [stepOnce])

  const currentForCompare = isFiniteNumber(value) ? value : 0
  const minNumber = isFiniteNumber(min) ? min : undefined
  const maxNumber = isFiniteNumber(max) ? max : undefined
  const disabledForAll = disabled || changing
  const minusDisabled = disabledForAll || disableMinus || (minNumber != null && currentForCompare <= minNumber)
  const plusDisabled = disabledForAll || disablePlus || (maxNumber != null && currentForCompare >= maxNumber)
  const radius = tokens.radii.default

  const buttonBaseStyle = useMemo(() => ({ width: resolvedButtonSize, height: resolvedButtonSize }), [resolvedButtonSize])
  const inputBoxStyle = useMemo(() => ({ width: resolvedInputWidth, height: resolvedButtonSize, marginHorizontal: tokens.spacing.gap }), [resolvedButtonSize, resolvedInputWidth, tokens.spacing.gap])

  const getButtonStyle = useCallback((type: 'plus' | 'minus', state: PressableStateCallbackType) => {
    const isPlus = type === 'plus'
    const disabledState = isPlus ? plusDisabled : minusDisabled

    if (theme === 'round') {
      const base = [styles.button, buttonBaseStyle, { borderRadius: resolvedButtonSize / 2, opacity: disabledState ? tokens.opacity.roundDisabled : 1 }] as const
      if (isPlus) {
        return [...base, { backgroundColor: tokens.colors.roundTheme, ...(state.pressed && !disabledState && { opacity: tokens.opacity.pressed }) }, buttonStyle]
      }
      return [...base, { backgroundColor: tokens.colors.roundThemeBackground, borderWidth: StyleSheet.hairlineWidth, borderColor: tokens.colors.roundTheme, ...(state.pressed && !disabledState && { opacity: tokens.opacity.pressed }) }, buttonStyle]
    }
    const cornerStyle = type === 'minus' ? { borderTopLeftRadius: radius, borderBottomLeftRadius: radius } : { borderTopRightRadius: radius, borderBottomRightRadius: radius }

    const backgroundColor = disabledState
      ? tokens.colors.buttonDisabledBackground
      : state.pressed
        ? tokens.colors.active
        : tokens.colors.background

    return [styles.button, buttonBaseStyle, cornerStyle, { backgroundColor }, buttonStyle]
  }, [
    buttonBaseStyle,
    buttonStyle,
    minusDisabled,
    plusDisabled,
    radius,
    resolvedButtonSize,
    theme,
    tokens.colors.active,
    tokens.colors.background,
    tokens.colors.buttonDisabledBackground,
    tokens.colors.roundTheme,
    tokens.colors.roundThemeBackground,
    tokens.opacity.pressed,
    tokens.opacity.roundDisabled,
  ])

  const getButtonTextStyle = useCallback((type: 'plus' | 'minus') => {
    const isPlus = type === 'plus'
    const disabledState = isPlus ? plusDisabled : minusDisabled

    if (theme === 'round') {
      const color = isPlus ? tokens.colors.roundThemeText : tokens.colors.roundTheme
      return [styles.buttonText, { color, fontSize: tokens.typography.fontSize, fontWeight: tokens.typography.fontWeight }]
    }
    return [styles.buttonText, { color: disabledState ? tokens.colors.buttonDisabledIcon : tokens.colors.buttonIcon, fontSize: tokens.typography.fontSize, fontWeight: tokens.typography.fontWeight }]
  }, [
    minusDisabled,
    plusDisabled,
    theme,
    tokens.colors.buttonDisabledIcon,
    tokens.colors.buttonIcon,
    tokens.colors.roundTheme,
    tokens.colors.roundThemeText,
    tokens.typography.fontSize,
    tokens.typography.fontWeight,
  ])

  const handleChangeText = useCallback((text: string) => {
    if (disableInput || disabled || changingRef.current) return
    setInputText(text)
    inputProps?.onChangeText?.(text)
    const trimmed = text.trim()
    if (trimmed === '') { performValueChange(allowEmpty ? null : resolvedDefaultValue); return }
    const numeric = Number.parseFloat(trimmed)
    if (!Number.isFinite(numeric)) return
    performValueChange(applyNextValue(numeric))
  }, [allowEmpty, applyNextValue, changingRef, disableInput, disabled, inputProps, performValueChange, resolvedDefaultValue, setInputText])

  const inputPropsRef = useRef(inputProps)
  inputPropsRef.current = inputProps

  const handleFocus = useCallback((event: Parameters<NonNullable<React.ComponentProps<typeof TextInput>['onFocus']>>[0]) => {
    if (disableInput) { inputRef.current?.blur(); return }
    setHasFocus(true)
    onFocusRef.current?.(event)
    inputPropsRef.current?.onFocus?.(event)
  }, [disableInput])

  const handleBlur = useCallback((event: Parameters<NonNullable<React.ComponentProps<typeof TextInput>['onBlur']>>[0]) => {
    setHasFocus(false)
    if (!changingRef.current) {
      const trimmed = inputValueRef.current.trim()
      if (trimmed === '') { performValueChange(allowEmpty ? null : resolvedDefaultValue) } else {
        const numeric = Number.parseFloat(trimmed)
        if (Number.isFinite(numeric)) { performValueChange(applyNextValue(numeric)) }
      }
    }
    onBlurRef.current?.(event)
    inputPropsRef.current?.onBlur?.(event)
  }, [allowEmpty, applyNextValue, performValueChange, resolvedDefaultValue])

  const handleInputPressIn = useCallback((event: GestureResponderEvent) => {
    onClickRef.current?.(event)
    inputPropsRef.current?.onPressIn?.(event)
  }, [])

  const handleMinusPress = useCallback(
    (event: GestureResponderEvent) => handleButtonPress('minus', event),
    [handleButtonPress],
  )
  const handlePlusPress = useCallback(
    (event: GestureResponderEvent) => handleButtonPress('plus', event),
    [handleButtonPress],
  )
  const handleMinusPressIn = useCallback(() => startLongPress('minus'), [startLongPress])
  const handlePlusPressIn = useCallback(() => startLongPress('plus'), [startLongPress])
  const getMinusButtonStyle = useCallback(
    (state: PressableStateCallbackType) => getButtonStyle('minus', state),
    [getButtonStyle],
  )
  const getPlusButtonStyle = useCallback(
    (state: PressableStateCallbackType) => getButtonStyle('plus', state),
    [getButtonStyle],
  )

  const renderMinusButton = useCallback(() => {
    if (!showMinus) return null
    return (
      <Pressable
        key="minus"
        testID="stepper-minus"
        accessibilityRole="button"
        accessibilityLabel="minus"
        accessibilityState={{ disabled: minusDisabled }}
        onPress={handleMinusPress}
        onPressIn={handleMinusPressIn}
        onPressOut={handlePressOut}
        style={getMinusButtonStyle}
      >
        <Text style={getButtonTextStyle('minus')}>-</Text>
      </Pressable>
    )
  }, [
    getButtonTextStyle,
    getMinusButtonStyle,
    handleMinusPress,
    handleMinusPressIn,
    handlePressOut,
    minusDisabled,
    showMinus,
  ])

  const renderPlusButton = useCallback(() => {
    if (!showPlus) return null
    return (
      <Pressable
        key="plus"
        testID="stepper-plus"
        accessibilityRole="button"
        accessibilityLabel="add"
        accessibilityState={{ disabled: plusDisabled }}
        onPress={handlePlusPress}
        onPressIn={handlePlusPressIn}
        onPressOut={handlePressOut}
        style={getPlusButtonStyle}
      >
        <Text style={getButtonTextStyle('plus')}>+</Text>
      </Pressable>
    )
  }, [
    getButtonTextStyle,
    getPlusButtonStyle,
    handlePlusPress,
    handlePlusPressIn,
    handlePressOut,
    plusDisabled,
    showPlus,
  ])

  const inputNode = useMemo(() => {
    if (!showInput) return null
    const editable = !disabledForAll && !disableInput
    const inputDisabled = disabledForAll || disableInput

    const inputBackground =
      theme === 'round'
        ? tokens.colors.transparent
        : inputDisabled
          ? tokens.colors.inputDisabledBackground
          : tokens.colors.background

    const inputTextColor = inputDisabled
      ? tokens.colors.inputDisabledText
      : tokens.colors.inputText

    const keyboardType = integer ? 'number-pad' : 'decimal-pad'

    return (
      <TextInput
        ref={inputRef}
        {...inputProps}
        style={[styles.input, inputBoxStyle, { backgroundColor: inputBackground, color: inputTextColor, paddingHorizontal: tokens.spacing.none, paddingVertical: tokens.spacing.none }, inputStyle]}
        value={inputValue}
        placeholder={placeholder}
        editable={editable}
        keyboardType={keyboardType}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPressIn={handleInputPressIn}
      />
    )
  }, [
    disabledForAll,
    disableInput,
    handleBlur,
    handleChangeText,
    handleFocus,
    handleInputPressIn,
    inputBoxStyle,
    inputProps,
    inputStyle,
    inputValue,
    integer,
    placeholder,
    showInput,
    theme,
    tokens.colors.background,
    tokens.colors.inputDisabledBackground,
    tokens.colors.inputDisabledText,
    tokens.colors.inputText,
    tokens.colors.transparent,
    tokens.spacing.none,
  ])

  return (
    <View {...rest} style={[styles.container, style]}>
      {renderMinusButton()}
      {inputNode}
      {renderPlusButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {},
  input: {
    textAlign: 'center',
  },
})

const StepperForwardRef = React.forwardRef<StepperInstance, StepperProps>(StepperImpl)
StepperForwardRef.displayName = 'Stepper'
export const Stepper = React.memo(StepperForwardRef)

export default Stepper
