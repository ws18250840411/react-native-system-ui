import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native'

import { useTheme } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import type { DeepPartial } from '../../types'
import { useControllableValue } from '../../hooks'
import { deepMerge } from '../../utils/deepMerge'

import type { PasswordInputProps, PasswordInputRef } from './types'

const HIDDEN_INPUT_PROPS: TextInputProps = {
  caretHidden: true,
  underlineColorAndroid: 'transparent',
  autoCorrect: false,
  spellCheck: false,
  importantForAutofill: 'no',
  autoComplete: 'off',
}

const sanitizeNumber = (value: string) => value.replace(/[^0-9]/g, '')

interface PasswordInputTokens {
  colors: {
    border: string
    text: string
    muted: string
    error: string
    cursor: string
    background: string
  }
  radii: {
    wrapper: number
  }
  sizing: {
    cellHeight: number
    cellTextSize: number
    maskSize: number
    cursorWidth: number
    cursorHeightRatio: number
    cursorTopRatio: number
  }
  typography: {
    fontFamily: string
    cellTextWeight: string
    infoSize: number
    infoLineHeight: number
    infoWeight: string
  }
  opacity: {
    disabled: number
  }
  spacing: {
    infoMarginTop: number
  }
}

const createPasswordInputTokens = (foundations: Foundations): PasswordInputTokens => ({
  colors: {
    border: foundations.palette.default[100],
    text: foundations.palette.default[900],
    muted: foundations.palette.default[500],
    error: foundations.palette.danger[500],
    cursor: foundations.palette.default[800],
    background: '#ffffff',
  },
  radii: {
    wrapper: foundations.radii.sm,
  },
  sizing: {
    cellHeight: 50,
    cellTextSize: foundations.fontSize.xl,
    maskSize: 10,
    cursorWidth: StyleSheet.hairlineWidth || 1,
    cursorHeightRatio: 0.4,
    cursorTopRatio: 0.3,
  },
  typography: {
    fontFamily: foundations.typography.fontFamily,
    cellTextWeight: String(foundations.typography.weight.semiBold),
    infoSize: foundations.fontSize.sm,
    infoLineHeight: Math.round(foundations.fontSize.sm * foundations.typography.lineHeightMultiplier),
    infoWeight: String(foundations.typography.weight.regular),
  },
  opacity: {
    disabled: 0.6,
  },
  spacing: {
    infoMarginTop: foundations.spacing.sm,
  },
})

const usePasswordInputTokens = (overrides?: DeepPartial<PasswordInputTokens>) => {
  const { foundations, components } = useTheme()
  return React.useMemo(() => {
    const base = createPasswordInputTokens(foundations)
    const globalOverrides = components?.passwordInput as DeepPartial<PasswordInputTokens> | undefined
    const mergedOverrides = globalOverrides
      ? overrides
        ? deepMerge(globalOverrides, overrides)
        : globalOverrides
      : overrides
    return mergedOverrides ? deepMerge(base, mergedOverrides) : base
  }, [components, foundations, overrides])
}

const PasswordInput = React.forwardRef<PasswordInputRef, PasswordInputProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      onChange,
      length = 6,
      mask = true,
      gutter = 0,
      type = 'text',
      info,
      errorInfo,
      autoFocus = false,
      disabled = false,
      showCursor = true,
      validator,
      cellStyle,
      cellFilledStyle,
      cellTextStyle,
      maskStyle,
      cursorStyle,
      highlightTextStyle,
      style,
      onSubmit,
      onFocus,
      onBlur,
      ...rest
    } = props

    const isControlled = value !== undefined
    const lengthSafe = Number.isFinite(length)
      ? Math.max(1, Math.floor(length))
      : 1
    const tokens = usePasswordInputTokens()
    const colors = tokens.colors

    const inputRef = React.useRef<TextInput>(null)
    const [cursorVisible, setCursorVisible] = React.useState(true)
    const blinkTimer = React.useRef<ReturnType<typeof setInterval> | null>(null)
    const [focused, setFocused] = React.useState(autoFocus)

    const keyboardType = type === 'number' ? 'number-pad' : 'default'
    const inputMode = type === 'number' ? 'numeric' : 'text'

    const normalizeValue = React.useCallback(
      (nextValue: string) => {
        let next = nextValue ?? ''
        if (typeof next !== 'string') {
          next = String(next ?? '')
        }
        if (type === 'number') {
          next = sanitizeNumber(next)
        }
        if (lengthSafe > 0 && next.length > lengthSafe) {
          next = next.slice(0, lengthSafe)
        }
        return next
      },
      [lengthSafe, type],
    )

    const [code = '', setCode] = useControllableValue<string>(
      { value, defaultValue, onChange },
      { defaultValue: '' },
    )
    const normalizedCode = React.useMemo(
      () => normalizeValue(code ?? ''),
      [code, normalizeValue],
    )

    const updateValue = React.useCallback(
      (nextValue: string) => {
        const normalized = normalizeValue(nextValue)
        if (normalized === code) {
          return
        }
        if (validator && !validator(normalized)) {
          return
        }
        setCode(normalized)
      },
      [code, normalizeValue, setCode, validator],
    )

    const focusInput = React.useCallback(() => {
      if (disabled) return
      inputRef.current?.focus()
    }, [disabled])

    const blurInput = React.useCallback(() => {
      inputRef.current?.blur()
    }, [])

    const clearInput = React.useCallback(() => {
      updateValue('')
    }, [updateValue])

    React.useImperativeHandle(
      ref,
      () => ({
        focus: focusInput,
        blur: blurInput,
        clear: clearInput,
      }),
      [blurInput, clearInput, focusInput],
    )

    React.useEffect(() => {
      if (isControlled) {
        return
      }
      if (normalizedCode !== code) {
        setCode(normalizedCode)
      }
    }, [code, isControlled, normalizedCode, setCode])

    React.useEffect(() => {
      if (autoFocus) {
        const timer = setTimeout(() => {
          focusInput()
        }, 60)
        return () => clearTimeout(timer)
      }
    }, [autoFocus, focusInput])

    const handleChangeText = React.useCallback(
      (text: string) => {
        updateValue(text ?? '')
      },
      [updateValue],
    )

    const handleFocus = React.useCallback(() => {
      setFocused(true)
      onFocus?.()
    }, [onFocus])

    const handleBlur = React.useCallback(() => {
      setFocused(false)
      onBlur?.()
    }, [onBlur])

    React.useEffect(() => {
      if (normalizedCode?.length === lengthSafe && lengthSafe > 0) {
        onSubmit?.(normalizedCode)
        blurInput()
      }
    }, [blurInput, lengthSafe, normalizedCode, onSubmit])

    React.useEffect(() => {
      const shouldBlink = showCursor && focused && !disabled
      if (blinkTimer.current) {
        clearInterval(blinkTimer.current)
        blinkTimer.current = null
      }

      if (shouldBlink) {
        setCursorVisible(true)
        blinkTimer.current = setInterval(() => {
          setCursorVisible((v) => !v)
        }, 500)
      } else {
        setCursorVisible(false)
      }

      return () => {
        if (blinkTimer.current) {
          clearInterval(blinkTimer.current)
          blinkTimer.current = null
        }
      }
    }, [disabled, focused, showCursor])

    const cells = React.useMemo(() => {
      return Array.from({ length: lengthSafe }, (_, index) => {
        const char = normalizedCode?.[index]
        const isFilled = !!char
        const showBlink =
          showCursor &&
          focused &&
          !disabled &&
          normalizedCode.length === index &&
          index < lengthSafe
        return {
          key: index,
          char,
          isFilled,
          showBlink,
        }
      })
    }, [disabled, focused, lengthSafe, normalizedCode, showCursor])

    const gutterValue =
      typeof gutter === 'number' ? gutter : Number(gutter) || 0
    const hasGutter = gutterValue > 0

    const tip = errorInfo ?? info
    const tipColor = errorInfo ? colors.error : colors.muted

    const wrapperBackground = hasGutter ? 'transparent' : colors.background
    const securityBackground = hasGutter ? 'transparent' : colors.background

    return (
      <View style={style}>
        <Pressable
          {...rest}
          style={[
            styles.wrapper,
            {
              backgroundColor: wrapperBackground,
              borderRadius: tokens.radii.wrapper,
              opacity: disabled ? tokens.opacity.disabled : 1,
            },
            !hasGutter && {
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: colors.border,
            },
          ]}
          onPress={focusInput}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{ disabled }}
        >
          <View
            style={[
              styles.security,
              {
                borderRadius: hasGutter ? 0 : tokens.radii.wrapper,
                backgroundColor: securityBackground,
              },
            ]}
          >
            {cells.map((item, index) => {
              const filledTextStyle =
                !mask && item.isFilled
                  ? [
                    styles.cellText,
                    {
                      color: colors.text,
                      fontSize: tokens.sizing.cellTextSize,
                      fontWeight: tokens.typography.cellTextWeight as any,
                      fontFamily: tokens.typography.fontFamily,
                    },
                    cellTextStyle,
                    highlightTextStyle,
                  ]
                  : [
                    styles.cellText,
                    {
                      color: colors.text,
                      fontSize: tokens.sizing.cellTextSize,
                      fontWeight: tokens.typography.cellTextWeight as any,
                      fontFamily: tokens.typography.fontFamily,
                    },
                    cellTextStyle,
                  ]

              const baseCell = [
                styles.cell,
                { backgroundColor: colors.background, height: tokens.sizing.cellHeight },
                cellStyle,
                item.isFilled && cellFilledStyle,
              ]

              if (hasGutter) {
                baseCell.push(
                  styles.cellGutter,
                  { borderColor: colors.border },
                  index > 0 ? { marginLeft: gutterValue } : null,
                )
              } else if (index < lengthSafe - 1) {
                baseCell.push({
                  borderRightWidth: StyleSheet.hairlineWidth,
                  borderRightColor: colors.border,
                })
              }

              return (
                <View key={item.key} style={baseCell}>
                  {mask ? (
                    <View
                      style={[
                        styles.mask,
                        {
                          width: tokens.sizing.maskSize,
                          height: tokens.sizing.maskSize,
                          borderRadius: tokens.sizing.maskSize / 2,
                          backgroundColor: colors.text,
                          opacity: item.isFilled ? 1 : 0,
                        },
                        maskStyle,
                      ]}
                    />
                  ) : (
                    <Text style={filledTextStyle} numberOfLines={1}>
                      {item.char ?? ''}
                    </Text>
                  )}
                  {item.showBlink ? (
                    <View
                      testID="password-input-cursor"
                      style={[
                        styles.cursor,
                        {
                          width: tokens.sizing.cursorWidth,
                          height: `${tokens.sizing.cursorHeightRatio * 100}%`,
                          borderRadius: tokens.sizing.cursorWidth / 2,
                          top: `${tokens.sizing.cursorTopRatio * 100}%`,
                          marginLeft: -tokens.sizing.cursorWidth / 2,
                          backgroundColor: colors.cursor,
                          opacity: cursorVisible ? 1 : 0,
                        },
                        cursorStyle,
                      ]}
                    />
                  ) : null}
                </View>
              )
            })}
            <TextInput
              ref={inputRef}
              value={normalizedCode}
              editable={!disabled}
              keyboardType={keyboardType}
              inputMode={inputMode}
              maxLength={lengthSafe}
              autoFocus={false}
              secureTextEntry={mask}
              {...HIDDEN_INPUT_PROPS}
              style={styles.hiddenInput}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              accessible={false}
            />
          </View>
        </Pressable>
        {tip ? (
          <View style={styles.infoWrapper}>
            {typeof tip === 'string' || typeof tip === 'number' ? (
              <Text style={[styles.infoText, { color: tipColor }]}>{tip}</Text>
            ) : (
              tip
            )}
          </View>
        ) : null}
      </View>
    )
  },
)

export default PasswordInput

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    paddingHorizontal: 0,
  },
  security: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellGutter: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 0,
  },
  cellText: {
  },
  mask: {
  },
  cursor: {
    position: 'absolute',
    left: '50%',
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
  infoWrapper: {
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
  },
})
