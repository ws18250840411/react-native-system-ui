import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native'

import { useControllableValue } from '../../hooks'
import { parseNumberLike } from '../../utils/number'
import { isString, isText } from '../../utils/validate'

import type { PasswordInputProps, PasswordInputRef } from './types'
import { usePasswordInputTokens } from './tokens'

const HIDDEN_INPUT_PROPS: TextInputProps = {
  caretHidden: true,
  autoCorrect: false,
  spellCheck: false,
  importantForAutofill: 'no',
  autoComplete: 'off',
}

const sanitizeNumber = (value: string) => value.replace(/[^0-9]/g, '')

const PasswordInputImpl = (
  props: PasswordInputProps,
  ref: React.ForwardedRef<PasswordInputRef>,
) => {
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
    const { colors, radii, sizing, typography, opacity, spacing } = tokens

    const inputRef = useRef<TextInput>(null)
    const [cursorVisible, setCursorVisible] = useState(true)
    const blinkTimer = useRef<ReturnType<typeof setInterval> | null>(null)
    const [focused, setFocused] = useState(autoFocus)

    const keyboardType = type === 'number' ? 'number-pad' : 'default'
    const inputMode = type === 'number' ? 'numeric' : 'text'

    const [code = '', setCode] = useControllableValue<string>(
      props,
      { defaultValue: '' }
    )
    const normalizeValue = useCallback(
      (nextValue: unknown) => {
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
      },
      [lengthSafe, type],
    )
    const normalizedCode = normalizeValue(code)

    const updateValue = useCallback(
      (nextValue: string) => {
        const normalized = normalizeValue(nextValue)
        if (normalized === normalizedCode) return
        if (validator && !validator(normalized)) return
        setCode(normalized)
      },
      [normalizeValue, normalizedCode, setCode, validator],
    )

    const focusInput = useCallback(() => {
      if (disabled) return
      inputRef.current?.focus()
    }, [disabled])
    const blurInput = useCallback(() => {
      inputRef.current?.blur()
    }, [])
    const clearInput = useCallback(() => {
      updateValue('')
    }, [updateValue])

    useImperativeHandle(
      ref,
      () => ({
        focus: focusInput,
        blur: blurInput,
        clear: clearInput,
      }),
      [blurInput, clearInput, focusInput],
    )

    useEffect(() => {
      if (!autoFocus || disabled) return
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 60)
      return () => clearTimeout(timer)
    }, [autoFocus, disabled])

    const handleChangeText = useCallback((text: string) => {
      updateValue(text ?? '')
    }, [updateValue])

    const handleFocus = useCallback(() => {
      setFocused(true)
      onFocus?.()
    }, [onFocus])

    const handleBlur = useCallback(() => {
      setFocused(false)
      onBlur?.()
    }, [onBlur])

    const prevSubmitRef = useRef({
      value: normalizedCode,
      length: lengthSafe,
    })

    useEffect(() => {
      const prev = prevSubmitRef.current
      prevSubmitRef.current = { value: normalizedCode, length: lengthSafe }

      if (!onSubmit) return
      if (prev.length !== lengthSafe) return
      if (lengthSafe <= 0 || normalizedCode.length !== lengthSafe) return
      if (prev.value === normalizedCode) return

      onSubmit(normalizedCode)
      inputRef.current?.blur()
    }, [lengthSafe, normalizedCode, onSubmit])

    useEffect(() => {
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

    const backgroundColor = hasGutter ? colors.transparent : colors.background
    const hiddenInputProps = { ...HIDDEN_INPUT_PROPS, underlineColorAndroid: colors.transparent }
    const cellTextBase = {
      color: colors.text,
      fontSize: sizing.cellTextSize,
      fontWeight: typography.cellTextWeight,
      fontFamily: typography.fontFamily,
    }

    const wrapperStyle = [
      styles.wrapper,
      {
        backgroundColor,
        borderRadius: radii.wrapper,
        paddingHorizontal: spacing.none,
        opacity: disabled ? opacity.disabled : 1,
      },
      !hasGutter && {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
      },
    ]

    const securityStyle = [
      styles.security,
      {
        borderRadius: hasGutter ? 0 : radii.wrapper,
        backgroundColor,
      },
    ]

    return (
      <View style={style}>
        <Pressable
          {...rest}
          style={wrapperStyle}
          onPress={focusInput}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{ disabled }}
        >
          <View
            style={securityStyle}
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
                  { borderColor: colors.border, borderRadius: radii.cellGutter },
                  index > 0 && { marginLeft: gutterValue },
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
              {...hiddenInputProps}
              style={[styles.hiddenInput, { opacity: opacity.hidden }]}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              accessible={false}
            />
          </View>
        </Pressable>
        {tip ? (
          <View style={[styles.infoWrapper, { marginTop: spacing.infoMarginTop }]}>
            {isText(tip) ? (
              <Text style={[styles.infoText, { color: tipColor }]}>{tip}</Text>
            ) : (
              tip
            )}
          </View>
        ) : null}
      </View>
    )
  }

const PasswordInputForwardRef = React.forwardRef<PasswordInputRef, PasswordInputProps>(PasswordInputImpl)
PasswordInputForwardRef.displayName = 'PasswordInput'
const PasswordInput = React.memo(PasswordInputForwardRef)

export default PasswordInput

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
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
  },
  cursor: {
    position: 'absolute',
    left: '50%',
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
  },
  infoWrapper: {
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center',
  },
})
