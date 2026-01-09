import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
} from 'react-native'

import { createComponentTokensHook } from '../../design-system'
import type { Foundations } from '../../design-system/tokens'
import { useControllableValue } from '../../hooks'
import { parseNumberLike } from '../../utils/number'
import { isString, isText } from '../../utils/validate'

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

export interface PasswordInputTokens {
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
    cellTextWeight: TextStyle['fontWeight']
    infoSize: number
    infoLineHeight: number
    infoWeight: TextStyle['fontWeight']
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
    cellTextWeight: foundations.typography.weight.semiBold,
    infoSize: foundations.fontSize.sm,
    infoLineHeight: Math.round(foundations.fontSize.sm * foundations.typography.lineHeightMultiplier),
    infoWeight: foundations.typography.weight.regular,
  },
  opacity: {
    disabled: 0.6,
  },
  spacing: {
    infoMarginTop: foundations.spacing.sm,
  },
})

const usePasswordInputTokens = createComponentTokensHook('passwordInput', createPasswordInputTokens)

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
      tokensOverride,
      style,
      onSubmit,
      onFocus,
      onBlur,
      ...rest
    } = props

    const lengthSafe = Math.max(
      1,
      Math.floor(parseNumberLike(length, 6) ?? 6),
    )
    const tokens = usePasswordInputTokens(tokensOverride)
    const { colors, radii, sizing, typography, opacity } = tokens

    const inputRef = React.useRef<TextInput>(null)
    const [cursorVisible, setCursorVisible] = React.useState(true)
    const blinkTimer = React.useRef<ReturnType<typeof setInterval> | null>(null)
    const [focused, setFocused] = React.useState(autoFocus)

    const keyboardType = type === 'number' ? 'number-pad' : 'default'
    const inputMode = type === 'number' ? 'numeric' : 'text'

    const [code = '', setCode] = useControllableValue<string>(
      props,
      { defaultValue: '' }
    )
    const normalizeValue = (nextValue: unknown) => {
      let next =
        nextValue === null || nextValue === undefined
          ? ''
          : isString(nextValue)
            ? nextValue
            : String(nextValue)
      if (type === 'number') {
        next = sanitizeNumber(next)
      }
      if (lengthSafe > 0 && next.length > lengthSafe) {
        next = next.slice(0, lengthSafe)
      }
      return next
    }
    const normalizedCode = normalizeValue(code)

    const updateValue = (nextValue: string) => {
      const normalized = normalizeValue(nextValue)
      if (normalized === normalizedCode) return
      if (validator && !validator(normalized)) return
      setCode(normalized)
    }

    const focusInput = () => {
      if (disabled) return
      inputRef.current?.focus()
    }
    const blurInput = () => {
      inputRef.current?.blur()
    }
    const clearInput = () => {
      updateValue('')
    }

    React.useImperativeHandle(
      ref,
      () => ({
        focus: focusInput,
        blur: blurInput,
        clear: clearInput,
      }),
    )

    React.useEffect(() => {
      if (!autoFocus || disabled) return
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 60)
      return () => clearTimeout(timer)
    }, [autoFocus, disabled])

    const handleChangeText = (text: string) => {
      updateValue(text ?? '')
    }

    const handleFocus = () => {
      setFocused(true)
      onFocus?.()
    }

    const handleBlur = () => {
      setFocused(false)
      onBlur?.()
    }

    const prevSubmitRef = React.useRef({
      value: normalizedCode,
      length: lengthSafe,
    })

    React.useEffect(() => {
      const prev = prevSubmitRef.current
      prevSubmitRef.current = { value: normalizedCode, length: lengthSafe }

      if (!onSubmit) return
      if (prev.length !== lengthSafe) return
      if (lengthSafe <= 0 || normalizedCode.length !== lengthSafe) return
      if (prev.value === normalizedCode) return

      onSubmit(normalizedCode)
      inputRef.current?.blur()
    }, [lengthSafe, normalizedCode, onSubmit])

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

    const cells = Array.from({ length: lengthSafe }, (_, index) => {
      const char = normalizedCode?.[index]
      const isFilled = !!char
      const showBlink =
        showCursor &&
        focused &&
        !disabled &&
        normalizedCode.length === index &&
        index < lengthSafe
      return { key: index, char, isFilled, showBlink }
    })

    const gutterValue = Math.max(0, parseNumberLike(gutter, 0) ?? 0)
    const hasGutter = gutterValue > 0

    const tip = errorInfo ?? info
    const tipColor = errorInfo ? colors.error : colors.muted

    const backgroundColor = hasGutter ? 'transparent' : colors.background
    const cellTextBase = {
      color: colors.text,
      fontSize: sizing.cellTextSize,
      fontWeight: typography.cellTextWeight,
      fontFamily: typography.fontFamily,
    }

    return (
      <View style={style}>
        <Pressable
          {...rest}
          style={[
            styles.wrapper,
            {
              backgroundColor,
              borderRadius: radii.wrapper,
              opacity: disabled ? opacity.disabled : 1,
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
                borderRadius: hasGutter ? 0 : radii.wrapper,
                backgroundColor,
              },
            ]}
          >
            {cells.map((item, index) => {
              const filledTextStyle = [
                cellTextBase,
                cellTextStyle,
                !mask && item.isFilled && highlightTextStyle,
              ]

              const baseCell = [
                styles.cell,
                { backgroundColor: colors.background, height: sizing.cellHeight },
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
                        {
                          width: sizing.maskSize,
                          height: sizing.maskSize,
                          borderRadius: sizing.maskSize / 2,
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
                          width: sizing.cursorWidth,
                          height: `${sizing.cursorHeightRatio * 100}%`,
                          borderRadius: sizing.cursorWidth / 2,
                          top: `${sizing.cursorTopRatio * 100}%`,
                          marginLeft: -sizing.cursorWidth / 2,
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
            {isText(tip) ? (
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
