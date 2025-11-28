import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import type { StepperProps } from './types'
import { useStepperTokens } from './tokens'

const LONG_PRESS_DELAY = 500
const LONG_PRESS_INTERVAL = 120

const formatNumber = (value: number, decimalLength?: number, integer?: boolean) => {
  let next = value
  if (integer) {
    next = Math.trunc(next)
  }
  if (decimalLength !== undefined) {
    const factor = 10 ** decimalLength
    next = Math.round(next * factor) / factor
  }
  return next
}

const valueToString = (value: number | null | undefined, decimalLength?: number) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return ''
  }
  if (decimalLength !== undefined) {
    return value.toFixed(decimalLength)
  }
  return String(value)
}

const clampValue = (
  value: number,
  min?: number,
  max?: number,
  decimalLength?: number,
  integer?: boolean,
) => {
  let next = formatNumber(value, decimalLength, integer)
  if (min !== undefined) {
    next = Math.max(next, min)
  }
  if (max !== undefined) {
    next = Math.min(next, max)
  }
  return next
}

export const Stepper: React.FC<StepperProps> = props => {
  const {
    value: valueProp,
    defaultValue = 0,
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    integer = false,
    decimalLength,
    disabled = false,
    disablePlus = false,
    disableMinus = false,
    disableInput = false,
    allowEmpty = false,
    showPlus,
    showMinus,
    showInput,
    longPress,
    size,
    theme,
    inputWidth,
    buttonSize,
    onChange,
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
  } = props

  const tokens = useStepperTokens()
  const resolvedSize = size ?? tokens.defaults.size
  const resolvedTheme = theme ?? tokens.defaults.theme
  const shouldShowPlus = showPlus ?? tokens.defaults.showPlus
  const shouldShowMinus = showMinus ?? tokens.defaults.showMinus
  const shouldShowInput = showInput ?? tokens.defaults.showInput
  const enableLongPress = longPress ?? tokens.defaults.longPress
  const sizeTokens = tokens.sizes[resolvedSize]

  const controlled = valueProp !== undefined
  const fallback = React.useMemo(
    () => clampValue(defaultValue ?? min ?? 0, min, max, decimalLength, integer),
    [decimalLength, defaultValue, integer, max, min],
  )
  const [internalValue, setInternalValue] = React.useState<number | null>(
    valueProp ?? fallback,
  )
  const value = controlled ? valueProp ?? null : internalValue
  const numericValue =
    typeof value === 'number' && !Number.isNaN(value) ? value : null

  const [inputValue, setInputValue] = React.useState<string>(() =>
    valueToString(value, decimalLength),
  )
  const [focused, setFocused] = React.useState(false)

  React.useEffect(() => {
    if (!focused) {
      setInputValue(valueToString(value, decimalLength))
    }
  }, [value, focused, decimalLength])

  const updateValue = React.useCallback(
    (next: number | null) => {
      if (!controlled) {
        setInternalValue(next)
      }
      onChange?.(next)
    },
    [controlled, onChange],
  )

  const emitStep = (type: 'plus' | 'minus') => {
    const current = numericValue ?? fallback
    const diff = type === 'plus' ? step : -step
    const target = clampValue(current + diff, min, max, decimalLength, integer)

    const disabledNow =
      type === 'plus'
        ? disabled || disablePlus || (numericValue !== null && numericValue >= max)
        : disabled || disableMinus || (numericValue !== null && numericValue <= min)

    if (disabledNow || target === value) {
      onOverlimit?.(type)
      return
    }

    updateValue(target)
    setInputValue(valueToString(target, decimalLength))
    if (type === 'plus') {
      onPlus?.(target)
    } else {
      onMinus?.(target)
    }
  }

  const timers = React.useRef<{ delay?: NodeJS.Timeout; interval?: NodeJS.Timeout }>({})

  const clearTimers = () => {
    if (timers.current.delay) {
      clearTimeout(timers.current.delay)
      timers.current.delay = undefined
    }
    if (timers.current.interval) {
      clearInterval(timers.current.interval)
      timers.current.interval = undefined
    }
  }

  React.useEffect(() => clearTimers, [])

  const handlePress = (type: 'plus' | 'minus') => {
    emitStep(type)
  }

  const handlePressIn = (type: 'plus' | 'minus') => {
    if (!enableLongPress) return
    clearTimers()
    timers.current.delay = setTimeout(() => {
      timers.current.interval = setInterval(() => emitStep(type), LONG_PRESS_INTERVAL)
    }, LONG_PRESS_DELAY)
  }

  const handlePressOut = () => {
    if (!enableLongPress) return
    clearTimers()
  }

  const minusDisabled =
    disabled ||
    disableMinus ||
    (numericValue !== null ? numericValue <= min : false)
  const plusDisabled =
    disabled ||
    disablePlus ||
    (numericValue !== null ? numericValue >= max : false)

  const handleChangeText = (text: string) => {
    if (disableInput) return
    setInputValue(text)
    if (text.trim() === '') {
      if (allowEmpty) {
        updateValue(null)
      }
      return
    }
    const numeric = Number(text)
    if (Number.isNaN(numeric)) {
      return
    }
    const next = clampValue(numeric, min, max, decimalLength, integer)
    updateValue(next)
  }

  const handleBlur = () => {
    setFocused(false)
    const text = inputValue.trim()
    if (text === '') {
      if (!allowEmpty) {
        updateValue(fallback)
        setInputValue(valueToString(fallback, decimalLength))
      } else {
        updateValue(null)
      }
    }
    onBlur?.(value ?? null)
  }

  const handleFocus = () => {
    setFocused(true)
    onFocus?.(value ?? null)
  }

  const inputWidthStyle = inputWidth
    ? { width: inputWidth }
    : { width: sizeTokens.inputWidth }
  const buttonWidthStyle = buttonSize
    ? { width: buttonSize, height: buttonSize }
    : { width: sizeTokens.buttonWidth, height: sizeTokens.height }

  const radius = resolvedTheme === 'round' ? tokens.radii.round : tokens.radii.default

  const renderButton = (type: 'plus' | 'minus') => {
    const isPlus = type === 'plus'
    const disabledState = isPlus ? plusDisabled : minusDisabled
    if ((isPlus && !shouldShowPlus) || (!isPlus && !shouldShowMinus)) return null
    return (
      <Pressable
        key={type}
        testID={`stepper-${type}`}
        accessibilityRole="button"
        accessibilityLabel={type === 'plus' ? '增加' : '减少'}
        disabled={disabledState}
        onPress={() => handlePress(type)}
        onPressIn={() => handlePressIn(type)}
        onPressOut={handlePressOut}
        style={[
          styles.button,
          buttonWidthStyle,
          {
            borderRadius: radius,
            backgroundColor: disabledState ? tokens.colors.background : tokens.colors.background,
            opacity: disabledState ? 0.4 : 1,
          },
          buttonStyle,
        ]}
      >
        <Text
          style={{
            color: disabledState ? tokens.colors.iconDisabled : tokens.colors.icon,
            fontSize: sizeTokens.fontSize,
          }}
        >
          {isPlus ? '+' : '-'}
        </Text>
      </Pressable>
    )
  }

  const renderInput = () => {
    if (!shouldShowInput) return null
    return (
      <TextInput
        style={[
          styles.input,
          {
            height: sizeTokens.height,
            borderColor: tokens.colors.border,
            borderRadius: radius,
            color: disabled ? tokens.colors.textDisabled : tokens.colors.text,
            backgroundColor: tokens.colors.inputBackground,
            fontSize: sizeTokens.fontSize,
          },
          inputWidthStyle,
          inputStyle,
        ]}
        value={inputValue}
        keyboardType={integer ? 'number-pad' : 'decimal-pad'}
        editable={!disableInput && !disabled}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...inputProps}
      />
    )
  }

  return (
    <View
      {...rest}
      style={[
        styles.container,
        {
          height: sizeTokens.height,
        },
        style,
      ]}
    >
      {renderButton('minus')}
      {renderInput()}
      {renderButton('plus')}
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
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    marginHorizontal: 2,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
})

Stepper.displayName = 'Stepper'

export default Stepper
