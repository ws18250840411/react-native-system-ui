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
import {
  parseNumber,
  addNumber as add,
  clampValue,
  formatNumber as formatValue,
  numberToString as valueToString,
  parseDecimalLength,
  isFiniteNumber,
  isNumber,
  isPromiseLike,
} from '../../utils'
import { useStepperTokens } from './tokens'
import type { StepperInstance, StepperProps } from './types'

const LONG_PRESS_DELAY = 600
const LONG_PRESS_INTERVAL = 100

export const Stepper = React.forwardRef<StepperInstance, StepperProps>((p, ref) => {
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

  const [changing, setChanging] = React.useState(false)
  const changingRef = React.useRef(false)

  const decimalLength = parseDecimalLength(decimalLengthProp)

  const resolvedStepRaw = Number(step ?? 1)
  const resolvedStep = isFiniteNumber(resolvedStepRaw) && resolvedStepRaw > 0 ? resolvedStepRaw : 1

  const resolvedButtonSize = Math.max(0, parseNumber(buttonSize, tokens.defaults.buttonSize))
  const resolvedInputWidth = Math.max(0, parseNumber(inputWidth, tokens.defaults.inputWidth))

  const resolvedDefaultValue = (() => {
    const raw = p.defaultValue
    if (raw === null) return null
    const base = isFiniteNumber(raw) ? raw : 0
    const formatted = formatValue(base, integer, decimalLength)
    return autoFixed ? clampValue(formatted, min, max) : formatted
  })()

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

  const getCurrentNumber = () => {
    const current = valueRef.current
    return isFiniteNumber(current) ? current : 0
  }

  const isActionDisabled = (type: 'plus' | 'minus') => {
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
  }

  const setValue = (next: number | null) => {
    const prev = valueRef.current ?? null
    if (Object.is(prev, next)) return false
    valueRef.current = next
    triggerChange(next, { name })
    return true
  }

  const applyNextValue = (nextRaw: number) => {
    const formatted = formatValue(nextRaw, integer, decimalLength)
    return autoFixed ? clampValue(formatted, min, max) : formatted
  }

  const performValueChange = (
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
          .catch(error => {
            console.error(error)
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
    } catch (error) {
      console.error(error)
      return commit()
    }
  }

  const stepOnce = (
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
      if (emitOverlimit) onOverlimit?.(type)
      return 'overlimit' as const
    }

    const current = getCurrentNumber()
    const diff = type === 'plus' ? resolvedStep : -resolvedStep
    const next = applyNextValue(add(current, diff))

    return performValueChange(next, committedValue => {
      if (!emitButtonCallbacks || !event) return
      if (type === 'plus') {
        onPlus?.(event, committedValue)
      } else {
        onMinus?.(event, committedValue)
      }
    })
  }

  const longPressRef = React.useRef<{
    delay?: ReturnType<typeof setTimeout>
    interval?: ReturnType<typeof setInterval>
    hadLongPress: boolean
  }>({
    hadLongPress: false,
  })

  const clearLongPress = () => {
    if (longPressRef.current.delay) {
      clearTimeout(longPressRef.current.delay)
      longPressRef.current.delay = undefined
    }
    if (longPressRef.current.interval) {
      clearInterval(longPressRef.current.interval)
      longPressRef.current.interval = undefined
    }
  }

  React.useEffect(() => clearLongPress, [])

  const startLongPress = (type: 'plus' | 'minus') => {
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
  }

  const handlePressOut = () => {
    clearLongPress()
  }

  const handleButtonPress = (type: 'plus' | 'minus', event: GestureResponderEvent) => {
    if (longPressRef.current.hadLongPress) {
      longPressRef.current.hadLongPress = false
      return
    }
    longPressRef.current.hadLongPress = false
    stepOnce(type, event, { emitOverlimit: true, emitButtonCallbacks: true })
  }

  const currentForCompare = isFiniteNumber(value) ? value : 0
  const minNumber = isFiniteNumber(min) ? min : undefined
  const maxNumber = isFiniteNumber(max) ? max : undefined
  const disabledForAll = disabled || changing
  const minusDisabled = disabledForAll || disableMinus || (minNumber !== undefined && currentForCompare <= minNumber)
  const plusDisabled = disabledForAll || disablePlus || (maxNumber !== undefined && currentForCompare >= maxNumber)
  const radius = tokens.radii.default

  const buttonBaseStyle = { width: resolvedButtonSize, height: resolvedButtonSize }
  const inputBoxStyle = {
    width: resolvedInputWidth,
    height: resolvedButtonSize,
    marginHorizontal: tokens.spacing.gap,
  }

  const getButtonStyle = (type: 'plus' | 'minus', state: PressableStateCallbackType) => {
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
          backgroundColor: tokens.colors.roundThemeBackground,
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
  }

  const getButtonTextStyle = (type: 'plus' | 'minus') => {
    const isPlus = type === 'plus'
    const disabledState = isPlus ? plusDisabled : minusDisabled

    if (theme === 'round') {
      const color = isPlus ? tokens.colors.roundThemeText : tokens.colors.roundTheme
      return [
        styles.buttonText,
        {
          color,
          fontSize: tokens.typography.fontSize,
          fontWeight: tokens.typography.fontWeight,
        },
      ]
    }

    return [
      styles.buttonText,
      {
        color: disabledState ? tokens.colors.buttonDisabledIcon : tokens.colors.buttonIcon,
        fontSize: tokens.typography.fontSize,
        fontWeight: tokens.typography.fontWeight,
      },
    ]
  }

  const handleChangeText = (text: string) => {
    if (disableInput || disabled || changingRef.current) return

    setInputText(text)
    inputProps?.onChangeText?.(text)

    const trimmed = text.trim()
    if (trimmed === '') {
      performValueChange(allowEmpty ? null : resolvedDefaultValue)
      return
    }

    const numeric = Number.parseFloat(trimmed)
    if (!Number.isFinite(numeric)) return

    performValueChange(applyNextValue(numeric))
  }

  const handleFocus = (
    event: Parameters<NonNullable<React.ComponentProps<typeof TextInput>['onFocus']>>[0],
  ) => {
    setHasFocus(true)
    if (disableInput) {
      inputRef.current?.blur()
      return
    }
    onFocus?.(event)
    inputProps?.onFocus?.(event)
  }

  const handleBlur = (
    event: Parameters<NonNullable<React.ComponentProps<typeof TextInput>['onBlur']>>[0],
  ) => {
    setHasFocus(false)

    if (!changingRef.current) {
      const trimmed = inputValueRef.current.trim()
      if (trimmed === '') {
        performValueChange(allowEmpty ? null : resolvedDefaultValue)
      } else {
        const numeric = Number.parseFloat(trimmed)
        if (Number.isFinite(numeric)) {
          performValueChange(applyNextValue(numeric))
        }
      }
    }

    onBlur?.(event)
    inputProps?.onBlur?.(event)
  }

  const handleInputPressIn = (event: GestureResponderEvent) => {
    onClick?.(event)
    inputProps?.onPressIn?.(event)
  }

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

    const editable = !disabledForAll && !disableInput
    const inputDisabled = disabledForAll || disableInput

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
    // fontWeight is now dynamic via token
  },
  input: {
    textAlign: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
})

Stepper.displayName = 'Stepper'

export default Stepper
