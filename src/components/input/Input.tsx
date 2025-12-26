import React from "react"
import type {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native"

import Field from "../field"
import { useFieldTokens } from "../field/tokens"
import type {
  FieldAutosizeConfig,
  FieldClearTrigger,
  FieldInputAlign,
  FieldProps,
  FieldShowWordLimit,
  FieldType,
} from "../field/types"
import type { FieldInstance } from "../field/types"
import { useInputTokens } from "./tokens"

export interface InputProps extends FieldProps {
  align?: FieldInputAlign
  clearTrigger?: FieldClearTrigger
  onChange?: (value: string) => void
  showWordLimit?: FieldShowWordLimit
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
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

const mapKeyboardType = (type?: FieldType): TextInputProps["keyboardType"] => {
  switch (type) {
    case "number":
      return "decimal-pad"
    case "digit":
      return "number-pad"
    case "tel":
      return "phone-pad"
    default:
      return undefined
  }
}

const InputComponent = React.forwardRef<InputInstance, InputProps>((props, ref) => {
  const {
    align,
    inputAlign: inputAlignProp,
    clearTrigger: clearTriggerOverride,
    onChange,
    onChangeText,
    showWordLimit,
    style,
    type,
    keyboardType,
    ...rest
  } = props

  const tokens = useInputTokens()
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

  const resolvedKeyboardType = keyboardType ?? mapKeyboardType(type)
  const resolvedInputAlign = align ?? inputAlignProp ?? tokens.defaults.inputAlign
  const resolvedClearTrigger =
    clearTriggerOverride ?? tokens.defaults.clearTrigger

  const containerStyle = React.useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        paddingHorizontal: tokens.spacing.paddingHorizontal,
        paddingVertical: tokens.spacing.paddingVertical,
        backgroundColor: tokens.colors.background,
      },
      style,
    ],
    [style, tokens],
  )

  return (
    <Field
      ref={inputRef}
      {...rest}
      type={type}
      keyboardType={resolvedKeyboardType}
      border={tokens.defaults.border}
      inputAlign={resolvedInputAlign}
      clearTrigger={resolvedClearTrigger}
      style={containerStyle}
      showWordLimit={showWordLimit}
      onChangeText={handleChangeText}
    />
  )
})

InputComponent.displayName = "Input"

const TextArea = React.forwardRef<InputInstance, InputTextAreaProps>((props, ref) => {
  const { autoSize, ...rest } = props
  const fieldTokens = useFieldTokens()

  const resolvedAutoSize = React.useMemo(() => {
    if (autoSize === undefined || typeof autoSize === "boolean") {
      return autoSize
    }
    const lineHeight = fieldTokens.defaults.textareaLineHeight
    const normalize = (height?: number) => {
      if (typeof height !== "number" || height <= 0 || !Number.isFinite(height)) {
        return undefined
      }
      return Math.max(1, Math.round(height / lineHeight))
    }
    const minRows = normalize(autoSize.minHeight)
    const maxRows = normalize(autoSize.maxHeight)
    if (minRows === undefined && maxRows === undefined) {
      return undefined
    }
    const config: FieldAutosizeConfig = {}
    if (minRows !== undefined) {
      config.minRows = minRows
    }
    if (maxRows !== undefined) {
      config.maxRows = maxRows
    }
    return config
  }, [autoSize, fieldTokens.defaults.textareaLineHeight])

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
