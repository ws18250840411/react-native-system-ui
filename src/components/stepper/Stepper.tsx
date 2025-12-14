import React from 'react'
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
import { useStepperTokens } from './tokens'
import type { StepperInstance, StepperProps } from './types'

const LONG_PRESS_DELAY = 600
const LONG_PRESS_INTERVAL = 100

const add = (num1: number, num2: number) => {
  const cardinal = 10 ** 10
  return Math.round((num1 + num2) * cardinal) / cardinal
}

const parseNumber = (value: number | string | undefined, fallback: number) => {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
  }
  return fallback
}

const parseDecimalLength = (value: number | string | undefined) => {
  if (value === undefined) return undefined
  const parsed =
    typeof value === 'number' ? value : Number.parseInt(value, 10)
  if (!Number.isFinite(parsed)) return undefined
  return Math.max(0, Math.floor(parsed))
}

const valueToString = (value: number | null | undefined, decimalLength?: number) => {
  if (value === null || value === undefined || !Number.isFinite(value)) return ''
  if (decimalLength !== undefined) return value.toFixed(decimalLength)
  return String(value)
}

const formatValue = (value: number, integer: boolean, decimalLength?: number) => {
  let next = value
  if (integer) next = Math.trunc(next)
  if (decimalLength !== undefined) {
    const factor = 10 ** decimalLength
    next = Math.round(next * factor) / factor
  }
  return next
}

const clampValue = (value: number, min?: number, max?: number) => {
  let next = value
  if (typeof min === 'number' && Number.isFinite(min)) {
    next = Math.max(next, min)
  }
  if (typeof max === 'number' && Number.isFinite(max)) {
    next = Math.min(next, max)
  }
  return next
}

export const Stepper = React.forwardRef<StepperInstance, StepperProps>((p, ref) => {
  const tokens = useStepperTokens()

  const {
    min,
    max = Number.MAX_VALUE,
    step = 1,
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

  const decimalLength = React.useMemo(
    () => parseDecimalLength(decimalLengthProp),
    [decimalLengthProp]
  )

  const resolvedStep = React.useMemo(() => {
    const next = Number(step ?? 1)
    return Number.isFinite(next) && next > 0 ? next : 1
  }, [step])

  const resolvedButtonSize = React.useMemo(
    () => Math.max(0, parseNumber(buttonSize, tokens.defaults.buttonSize)),
    [buttonSize, tokens.defaults.buttonSize],
  )

  const resolvedInputWidth = React.useMemo(
    () => Math.max(0, parseNumber(inputWidth, tokens.defaults.inputWidth)),
    [inputWidth, tokens.defaults.inputWidth],
  )

  const resolvedDefaultValue = React.useMemo(() => {
    const raw = p.defaultValue
    if (raw === null) return null
    const base = typeof raw === 'number' && Number.isFinite(raw) ? raw : 0
    return clampValue(formatValue(base, integer, decimalLength), min, max)
  }, [decimalLength, integer, max, min, p.defaultValue])

  const [value, triggerChange] = useControllableValue<number | null>(
    { ...p, defaultValue: resolvedDefaultValue },
    { defaultValue: resolvedDefaultValue },
  )

  const valueRef = React.useRef<number | null>(value ?? null)
  React.useEffect(() => {
    valueRef.current = value ?? null
  }, [value])

  const inputRef = React.useRef<TextInput>(null)
  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }))

  const [hasFocus, setHasFocus] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(() => valueToString(value, decimalLength))
  const inputValueRef = React.useRef(inputValue)
  const setInputText = React.useCallback((text: string) => {
    inputValueRef.current = text
    setInputValue(text)
  }, [])

  React.useEffect(() => {
    if (!hasFocus) {
      const nextText = valueToString(value, decimalLength)
      setInputText(nextText)
    }
  }, [decimalLength, hasFocus, setInputText, value])

  const getCurrentNumber = React.useCallback(() => {
    const current = valueRef.current
    return typeof current === 'number' && Number.isFinite(current) ? current : 0
  }, [])

  const isActionDisabled = React.useCallback(
    (type: 'plus' | 'minus') => {
      if (disabled) return true
      if (type === 'plus' && disablePlus) return true
      if (type === 'minus' && disableMinus) return true

      const current = getCurrentNumber()
      if (type === 'plus' && typeof max === 'number' && Number.isFinite(max) && current >= max) {
        return true
      }
      if (type === 'minus' && typeof min === 'number' && Number.isFinite(min) && current <= min) {
        return true
      }
      return false
    },
    [disableMinus, disablePlus, disabled, getCurrentNumber, max, min],
  )

  const setValue = React.useCallback(
    (next: number | null) => {
      const prev = valueRef.current ?? null
      if (Object.is(prev, next)) return false
      valueRef.current = next
      triggerChange(next, { name })
      return true
    },
    [name, triggerChange],
  )

  const applyNextValue = React.useCallback(
    (nextRaw: number) => {
      const formatted = formatValue(nextRaw, integer, decimalLength)
      return clampValue(formatted, min, max)
    },
    [decimalLength, integer, max, min],
  )

  const stepOnce = React.useCallback(
    (
      type: 'plus' | 'minus',
      event?: GestureResponderEvent,
      options?: { emitOverlimit?: boolean; emitButtonCallbacks?: boolean },
    ) => {
      const emitOverlimit = options?.emitOverlimit ?? true
      const emitButtonCallbacks = options?.emitButtonCallbacks ?? Boolean(event)

      if (isActionDisabled(type)) {
        if (emitOverlimit) onOverlimit?.(type)
        return 'overlimit' as const
      }

      const current = getCurrentNumber()
      const diff = type === 'plus' ? resolvedStep : -resolvedStep
      const next = applyNextValue(add(current, diff))

      const didChange = setValue(next)
      if (!didChange) return 'noop' as const

      setInputText(valueToString(next, decimalLength))

      if (emitButtonCallbacks && event) {
        if (type === 'plus') {
          onPlus?.(event, next)
        } else {
          onMinus?.(event, next)
        }
      }

      return 'changed' as const
    },
    [
      applyNextValue,
      decimalLength,
      getCurrentNumber,
      isActionDisabled,
      onMinus,
      onOverlimit,
      onPlus,
      resolvedStep,
      setValue,
    ],
  )

  const longPressRef = React.useRef<{
    delay?: ReturnType<typeof setTimeout>
    interval?: ReturnType<typeof setInterval>
    hadLongPress: boolean
  }>({
    hadLongPress: false,
  })

  const clearLongPress = React.useCallback(() => {
    if (longPressRef.current.delay) {
      clearTimeout(longPressRef.current.delay)
      longPressRef.current.delay = undefined
    }
    if (longPressRef.current.interval) {
      clearInterval(longPressRef.current.interval)
      longPressRef.current.interval = undefined
    }
  }, [])

  React.useEffect(() => clearLongPress, [clearLongPress])

  const startLongPress = React.useCallback(
    (type: 'plus' | 'minus') => {
      if (!longPress) return
      if (isActionDisabled(type)) return

      clearLongPress()
      longPressRef.current.hadLongPress = false

      longPressRef.current.delay = setTimeout(() => {
        longPressRef.current.hadLongPress = true
        const first = stepOnce(type, undefined, {
          emitOverlimit: true,
          emitButtonCallbacks: false,
        })
        if (first === 'overlimit') {
          clearLongPress()
          return
        }

        longPressRef.current.interval = setInterval(() => {
          const result = stepOnce(type, undefined, {
            emitOverlimit: true,
            emitButtonCallbacks: false,
          })
          if (result === 'overlimit') {
            clearLongPress()
          }
        }, LONG_PRESS_INTERVAL)
      }, LONG_PRESS_DELAY)
    },
    [clearLongPress, isActionDisabled, longPress, stepOnce],
  )

  const handlePressOut = React.useCallback(() => {
    clearLongPress()
  }, [clearLongPress])

  const handleButtonPress = React.useCallback(
    (type: 'plus' | 'minus', event: GestureResponderEvent) => {
      if (longPressRef.current.hadLongPress) {
        longPressRef.current.hadLongPress = false
        return
      }
      longPressRef.current.hadLongPress = false
      stepOnce(type, event, { emitOverlimit: true, emitButtonCallbacks: true })
    },
    [stepOnce],
  )

  const currentForCompare = typeof value === 'number' && Number.isFinite(value) ? value : 0
  const minNumber = typeof min === 'number' && Number.isFinite(min) ? min : undefined
  const maxNumber = typeof max === 'number' && Number.isFinite(max) ? max : undefined
  const minusDisabled = disabled || disableMinus || (minNumber !== undefined && currentForCompare <= minNumber)
  const plusDisabled = disabled || disablePlus || (maxNumber !== undefined && currentForCompare >= maxNumber)
  const radius = tokens.radii.default

  const buttonBaseStyle = React.useMemo(
    () => ({
      width: resolvedButtonSize,
      height: resolvedButtonSize,
    }),
    [resolvedButtonSize],
  )

  const inputBoxStyle = React.useMemo(
    () => ({
      width: resolvedInputWidth,
      height: resolvedButtonSize,
      marginHorizontal: tokens.spacing.gap,
    }),
    [resolvedButtonSize, resolvedInputWidth, tokens.spacing.gap],
  )

  const getButtonStyle = React.useCallback(
    (
      type: 'plus' | 'minus',
      state: PressableStateCallbackType,
    ) => {
      const isPlus = type === 'plus'
      const disabledState = isPlus ? plusDisabled : minusDisabled

      if (theme === 'round') {
        const base = [
          styles.button,
          buttonBaseStyle,
          {
            borderRadius: resolvedButtonSize / 2,
            opacity: disabledState ? tokens.opacity.roundDisabled : 1,
          },
        ] as const

        if (isPlus) {
          return [
            ...base,
            {
              backgroundColor: tokens.colors.roundTheme,
              ...(state.pressed && !disabledState ? { opacity: tokens.opacity.pressed } : null),
            },
            buttonStyle,
          ]
        }

        return [
          ...base,
          {
            backgroundColor: '#ffffff',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: tokens.colors.roundTheme,
            ...(state.pressed && !disabledState ? { opacity: tokens.opacity.pressed } : null),
          },
          buttonStyle,
        ]
      }

      const cornerStyle =
        type === 'minus'
          ? {
            borderTopLeftRadius: radius,
            borderBottomLeftRadius: radius,
          }
          : {
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
          }

      const backgroundColor = disabledState
        ? tokens.colors.buttonDisabledBackground
        : state.pressed
          ? tokens.colors.active
          : tokens.colors.background

      return [
        styles.button,
        buttonBaseStyle,
        cornerStyle,
        { backgroundColor },
        buttonStyle,
      ]
    },
    [
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
      tokens.opacity.pressed,
      tokens.opacity.roundDisabled,
    ],
  )

  const getButtonTextStyle = React.useCallback(
    (type: 'plus' | 'minus') => {
      const isPlus = type === 'plus'
      const disabledState = isPlus ? plusDisabled : minusDisabled

      if (theme === 'round') {
        if (isPlus) {
          return [
            styles.buttonText,
            { color: '#ffffff', fontSize: tokens.typography.fontSize },
          ]
        }
        return [
          styles.buttonText,
          { color: tokens.colors.roundTheme, fontSize: tokens.typography.fontSize },
        ]
      }

      return [
        styles.buttonText,
        {
          color: disabledState ? tokens.colors.buttonDisabledIcon : tokens.colors.buttonIcon,
          fontSize: tokens.typography.fontSize,
        },
      ]
    },
    [
      minusDisabled,
      plusDisabled,
      theme,
      tokens.colors.buttonDisabledIcon,
      tokens.colors.buttonIcon,
      tokens.colors.roundTheme,
      tokens.typography.fontSize,
    ],
  )

  const handleChangeText = React.useCallback(
    (text: string) => {
      if (disableInput || disabled) return

      setInputText(text)
      inputProps?.onChangeText?.(text)

      const trimmed = text.trim()
      if (trimmed === '') {
        if (allowEmpty) {
          setValue(null)
        } else {
          setValue(resolvedDefaultValue)
        }
        return
      }

      const numeric = Number.parseFloat(trimmed)
      if (!Number.isFinite(numeric)) return

      setValue(applyNextValue(numeric))
    },
    [allowEmpty, applyNextValue, disableInput, disabled, inputProps, resolvedDefaultValue, setInputText, setValue],
  )

  const handleFocus = React.useCallback(
    (event: any) => {
      setHasFocus(true)
      if (disableInput) {
        inputRef.current?.blur()
        return
      }
      onFocus?.(event)
      inputProps?.onFocus?.(event)
    },
    [disableInput, inputProps, onFocus],
  )

  const handleBlur = React.useCallback(
    (event: any) => {
      setHasFocus(false)

      const trimmed = inputValueRef.current.trim()
      if (trimmed === '') {
        if (allowEmpty) {
          setValue(null)
        } else {
          setValue(resolvedDefaultValue)
        }
      } else {
        const numeric = Number.parseFloat(trimmed)
        if (Number.isFinite(numeric)) {
          setValue(applyNextValue(numeric))
        }
      }

      onBlur?.(event)
      inputProps?.onBlur?.(event)
    },
    [allowEmpty, applyNextValue, inputProps, onBlur, resolvedDefaultValue, setValue],
  )

  const handleInputPressIn = React.useCallback(
    (event: any) => {
      onClick?.(event)
      inputProps?.onPressIn?.(event)
    },
    [inputProps, onClick],
  )

  const renderButton = (type: 'plus' | 'minus') => {
    const isPlus = type === 'plus'
    const visible = isPlus ? showPlus : showMinus
    if (!visible) return null

    return (
      <Pressable
        key={type}
        testID={`stepper-${type}`}
        accessibilityRole="button"
        accessibilityLabel={type === 'plus' ? 'add' : 'minus'}
        accessibilityState={{ disabled: isPlus ? plusDisabled : minusDisabled }}
        onPress={event => handleButtonPress(type, event)}
        onPressIn={() => startLongPress(type)}
        onPressOut={handlePressOut}
        style={state => getButtonStyle(type, state)}
      >
        <Text style={getButtonTextStyle(type)}>{isPlus ? '+' : '-'}</Text>
      </Pressable>
    )
  }

  const renderInput = () => {
    if (!showInput) return null

    const editable = !disabled && !disableInput
    const inputDisabled = disabled || disableInput

    const inputBackground =
      theme === 'round'
        ? 'transparent'
        : inputDisabled
          ? tokens.colors.inputDisabledBackground
          : tokens.colors.background

    const inputTextColor = inputDisabled
      ? tokens.colors.inputDisabledText
      : tokens.colors.inputText

    return (
      <TextInput
        ref={inputRef}
        {...inputProps}
        style={[
          styles.input,
          inputBoxStyle,
          { backgroundColor: inputBackground, color: inputTextColor },
          inputStyle,
        ]}
        value={inputValue}
        placeholder={placeholder}
        editable={editable}
        keyboardType={integer ? 'number-pad' : 'decimal-pad'}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPressIn={handleInputPressIn}
      />
    )
  }

  return (
    <View {...rest} style={[styles.container, style]}>
      {renderButton('minus')}
      {renderInput()}
      {renderButton('plus')}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
  input: {
    textAlign: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
})

Stepper.displayName = 'Stepper'

export default Stepper
