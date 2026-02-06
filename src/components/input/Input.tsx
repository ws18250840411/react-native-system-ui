import React, { useCallback, useImperativeHandle, useMemo, useRef } from 'react'
import type { TextInputProps } from 'react-native'

import { isBoolean, isFiniteNumber } from '../../utils/validate'
import Field from '../field'
import { useFieldTokens } from '../field/tokens'
import type { FieldAutosizeConfig, FieldInstance } from '../field/types'
import { useInputTokens } from './tokens'
import type { InputInstance, InputProps, InputTextAreaProps } from './types'

const mapKeyboardType = (type?: InputProps['type']): TextInputProps['keyboardType'] => {
  switch (type) {
    case 'number':
      return 'decimal-pad'
    case 'digit':
      return 'number-pad'
    case 'tel':
      return 'phone-pad'
    default:
      return undefined
  }
}

const InputImpl = (
  props: InputProps,
  ref: React.ForwardedRef<InputInstance>,
) => {
  const {
    type,
    keyboardType: keyboardTypeProp,
    align,
    inputAlign: inputAlignProp,
    clearTrigger: clearTriggerOverride,
    onChange,
    onChangeText,
    showWordLimit,
    style,
    inputStyle,
    fieldTokensOverride,
    tokensOverride,
    ...rest
  } = props

  const tokens = useInputTokens(tokensOverride)
  const inputRef = useRef<FieldInstance | null>(null)

  const handleChangeText = useCallback((value: string) => {
    onChange?.(value)
    onChangeText?.(value)
  }, [onChange, onChangeText])

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus?.(),
      blur: () => inputRef.current?.blur?.(),
      clear: () => inputRef.current?.clear?.(),
      get nativeElement() {
        return inputRef.current?.nativeElement ?? null
      },
    }),
    [],
  )

  const resolvedInputAlign = align ?? inputAlignProp ?? tokens.defaults.inputAlign
  const resolvedClearTrigger = clearTriggerOverride ?? tokens.defaults.clearTrigger
  const resolvedKeyboardType = keyboardTypeProp ?? mapKeyboardType(type)
  const fieldStyle = [
    {
      paddingHorizontal: tokens.spacing.paddingHorizontal,
      paddingVertical: tokens.spacing.paddingVertical,
      backgroundColor: tokens.colors.background,
    },
    style,
  ]

  return (
    <Field
      ref={inputRef}
      {...rest}
      type={type}
      keyboardType={resolvedKeyboardType}
      tokensOverride={fieldTokensOverride}
      border={tokens.defaults.border}
      inputAlign={resolvedInputAlign}
      clearTrigger={resolvedClearTrigger}
      style={fieldStyle}
      inputStyle={inputStyle}
      showWordLimit={showWordLimit}
      onChangeText={handleChangeText}
    />
  )
}

const InputForwardRef = React.forwardRef<InputInstance, InputProps>(InputImpl)
InputForwardRef.displayName = 'Input'

const InputComponent = React.memo(InputForwardRef)

const TextAreaImpl = (
  props: InputTextAreaProps,
  ref: React.ForwardedRef<InputInstance>,
) => {
  const { autoSize, ...rest } = props
  const fieldTokens = useFieldTokens(rest.fieldTokensOverride)

  const lineHeight = fieldTokens.defaults.textareaLineHeight
  const toRows = useCallback((height?: number) => {
    if (!isFiniteNumber(height) || height <= 0) return undefined
    return Math.max(1, Math.round(height / lineHeight))
  }, [lineHeight])

  const resolvedAutoSize: boolean | FieldAutosizeConfig | undefined = useMemo(
    () =>
      !autoSize || isBoolean(autoSize)
        ? autoSize
        : (() => {
          const minRows = toRows(autoSize.minHeight)
          const maxRows = toRows(autoSize.maxHeight)
          return minRows || maxRows ? { minRows, maxRows } : undefined
        })(),
    [autoSize, toRows]
  )

  return <InputComponent ref={ref} {...rest} type="textarea" autoSize={resolvedAutoSize} />
}

const TextAreaForwardRef = React.forwardRef<InputInstance, InputTextAreaProps>(TextAreaImpl)
TextAreaForwardRef.displayName = 'Input.TextArea'

const TextArea = React.memo(TextAreaForwardRef)

const Input = Object.assign(InputComponent, { TextArea })

export default Input
export { TextArea }
