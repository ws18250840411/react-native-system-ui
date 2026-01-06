import React from "react"
import type {
  StyleProp,
  TextInput,
  TextStyle,
  ViewStyle,
} from "react-native"

import Field from "../field"
import type { FieldTokens } from "../field/tokens"
import { useFieldTokens } from "../field/tokens"
import type {
  FieldAutosizeConfig,
  FieldClearTrigger,
  FieldInputAlign,
  FieldProps,
  FieldShowWordLimit,
} from "../field/types"
import type { FieldInstance } from "../field/types"
import type { DeepPartial } from "../../types"
import type { InputTokens } from "./tokens"
import { useInputTokens } from "./tokens"

export interface InputProps extends Omit<FieldProps, "tokensOverride"> {
  align?: FieldInputAlign
  clearTrigger?: FieldClearTrigger
  onChange?: (value: string) => void
  showWordLimit?: FieldShowWordLimit
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  fieldTokensOverride?: DeepPartial<FieldTokens>
  tokensOverride?: DeepPartial<InputTokens>
}

export interface InputInstance {
  focus: () => void
  blur: () => void
  clear: () => void
  nativeElement: TextInput | null
}

export interface InputTextAreaAutoSizeConfig {
  minHeight?: number
  maxHeight?: number
}

export type InputTextAreaAutoSize = boolean | InputTextAreaAutoSizeConfig

export interface InputTextAreaProps
  extends Omit<InputProps, "type" | "autoSize" | "autosize"> {
  autoSize?: InputTextAreaAutoSize
}

const InputComponent = React.forwardRef<InputInstance, InputProps>((props, ref) => {
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
    fieldTokensOverride,
    tokensOverride,
    ...rest
  } = props

  const tokens = useInputTokens(tokensOverride)
  const inputRef = React.useRef<FieldInstance>(null)

  const handleChangeText = React.useCallback(
    (value: string) => {
      onChange?.(value)
      onChangeText?.(value)
    },
    [onChange, onChangeText],
  )

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current?.focus?.()
      },
      blur: () => {
        inputRef.current?.blur?.()
      },
      clear: () => {
        handleChangeText("")
        inputRef.current?.clear?.()
      },
      get nativeElement() {
        return inputRef.current?.nativeElement ?? null
      },
    }),
    [handleChangeText],
  )

  const resolvedInputAlign = align ?? inputAlignProp ?? tokens.defaults.inputAlign
  const resolvedClearTrigger =
    clearTriggerOverride ?? tokens.defaults.clearTrigger
  const resolvedKeyboardType =
    keyboardTypeProp ?? (type === "number" ? "decimal-pad" : undefined)

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
      style={[
        {
          paddingHorizontal: tokens.spacing.paddingHorizontal,
          paddingVertical: tokens.spacing.paddingVertical,
          backgroundColor: tokens.colors.background,
        },
        style,
      ]}
      showWordLimit={showWordLimit}
      onChangeText={handleChangeText}
    />
  )
})

InputComponent.displayName = "Input"

const TextArea = React.forwardRef<InputInstance, InputTextAreaProps>((props, ref) => {
  const { autoSize, ...rest } = props
  const fieldTokens = useFieldTokens(rest.fieldTokensOverride)

  const lineHeight = fieldTokens.defaults.textareaLineHeight
  const toRows = (height?: number) => {
    if (typeof height !== "number" || height <= 0 || !Number.isFinite(height)) return undefined
    return Math.max(1, Math.round(height / lineHeight))
  }

  let resolvedAutoSize: boolean | FieldAutosizeConfig | undefined
  if (!autoSize || typeof autoSize === "boolean") {
    resolvedAutoSize = autoSize
  } else {
    const minRows = toRows(autoSize.minHeight)
    const maxRows = toRows(autoSize.maxHeight)
    resolvedAutoSize = minRows || maxRows ? { minRows, maxRows } : undefined
  }

  return (
    <InputComponent
      ref={ref}
      {...rest}
      type="textarea"
      autoSize={resolvedAutoSize}
    />
  )
})

TextArea.displayName = "Input.TextArea"

const Input = Object.assign(InputComponent, { TextArea })

export default Input
export { TextArea }
