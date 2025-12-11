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
import { useControllableValue } from '../../hooks'

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

    const { foundations } = useTheme()
    const borderColor = '#f5f6f7'
    const colors = {
      border: borderColor,
      text: foundations.palette.default?.[900] ?? '#323233',
      muted: foundations.palette.default?.[500] ?? '#969799',
      error: foundations.palette.error?.[500] ?? '#ff4d4f',
      cursor: foundations.palette.primary?.[600] ?? '#1989fa',
      mask: foundations.palette.default?.[900] ?? '#323233',
      background: foundations.palette.background?.base ?? '#ffffff',
    }

    const [code = '', setCode] = useControllableValue<string>(
      { value, defaultValue, onChange },
      { defaultValue: '' },
    )

    const inputRef = React.useRef<TextInput>(null)
    const [focused, setFocused] = React.useState(autoFocus)

    const keyboardType = type === 'number' ? 'number-pad' : 'default'

    const normalizeValue = React.useCallback(
      (nextValue: string) => {
        let next = nextValue ?? ''
        if (typeof next !== 'string') {
          next = String(next ?? '')
        }
        if (type === 'number') {
          next = sanitizeNumber(next)
        }
        if (length > 0 && next.length > length) {
          next = next.slice(0, length)
        }
        return next
      },
      [length, type],
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
      if (code?.length === length && length > 0) {
        onSubmit?.(code)
        blurInput()
      }
    }, [blurInput, code, length, onSubmit])

    const cells = React.useMemo(() => {
      return Array.from({ length }, (_, index) => {
        const char = code?.[index]
        const isFilled = !!char
        const showBlink =
          showCursor &&
          focused &&
          !disabled &&
          code.length === index &&
          index < length
        return {
          key: index,
          char,
          isFilled,
          showBlink,
        }
      })
    }, [code, disabled, focused, length, showCursor])

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
              opacity: disabled ? 0.6 : 1,
            },
            !hasGutter && {
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: colors.border,
              borderRadius: 6,
            },
          ]}
          onPress={focusInput}
          accessibilityRole="button"
          accessibilityState={{ disabled }}
        >
          <View
            style={[
              styles.security,
              {
                borderRadius: hasGutter ? 0 : 6,
                backgroundColor: securityBackground,
              },
            ]}
          >
            {cells.map((item, index) => {
              const filledTextStyle =
                !mask && item.isFilled
                  ? [styles.cellText, { color: colors.text }, cellTextStyle, highlightTextStyle]
                  : [styles.cellText, { color: colors.text }, cellTextStyle]

              const baseCell = [
                styles.cell,
                { backgroundColor: colors.background },
                cellStyle,
                item.isFilled && cellFilledStyle,
              ]

              if (hasGutter) {
                baseCell.push(
                  styles.cellGutter,
                  { borderColor: colors.border },
                  index > 0 ? { marginLeft: gutterValue } : null,
                )
              } else if (index < length - 1) {
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
                      style={[
                        styles.cursor,
                        { backgroundColor: colors.cursor },
                        cursorStyle,
                      ]}
                    />
                  ) : null}
                </View>
              )
            })}
            <TextInput
              ref={inputRef}
              value={code}
              editable={!disabled}
              keyboardType={keyboardType}
              maxLength={length}
              autoFocus={false}
              {...HIDDEN_INPUT_PROPS}
              style={styles.hiddenInput}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
        </Pressable>
        {tip ? (
          <Text style={[styles.infoText, { color: tipColor }]}>{tip}</Text>
        ) : null}
      </View>
    )
  },
)

export default PasswordInput

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    borderRadius: 6,
    paddingHorizontal: 0,
  },
  security: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 6,
    overflow: 'hidden',
  },
  cell: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellGutter: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
  },
  cellText: {
    fontSize: 20,
    fontWeight: '600',
  },
  mask: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cursor: {
    position: 'absolute',
    width: 2,
    height: 26,
    borderRadius: 1,
  },
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
  infoText: {
    marginTop: 8,
    fontSize: 14,
    color: '#969799',
    textAlign: 'center',
  },
})
