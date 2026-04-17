import React, { useCallback, useImperativeHandle, useMemo, useRef } from 'react'
import type { TextInputProps } from 'react-native'
import { isBoolean, isFiniteNumber } from '../../utils/base'
import Field from '../field'
import { useFieldTokens } from '../field/tokens'
import type { FieldAutosizeConfig, FieldInstance } from '../field/types'
import { useInputTokens } from './tokens'
import type { InputInstance, InputProps, InputTextAreaProps } from './types'

const mapKeyboardType = (t?: InputProps['type']): TextInputProps['keyboardType'] => {
  switch (t) {
    case 'number': return 'decimal-pad'
    case 'digit': return 'number-pad'
    case 'tel': return 'phone-pad'
    default: return undefined
  }
}

const InputImpl = (props: InputProps, ref: React.ForwardedRef<InputInstance>) => {
  const { type, keyboardType: keyboardTypeProp, align: alignProp, inputAlign: inputAlignProp, clearTrigger: clearTriggerProp, onChange, onChangeText, showWordLimit, style, inputStyle, fieldTokensOverride, tokensOverride, ...rest } = props; const tokens = useInputTokens(tokensOverride); const inputRef = useRef<FieldInstance | null>(null); const onChangeRef = useRef(onChange); const onChangeTextRef = useRef(onChangeText); onChangeRef.current = onChange; onChangeTextRef.current = onChangeText; const handleChangeText = useCallback((value: string) => { onChangeRef.current?.(value); onChangeTextRef.current?.(value) }, []); useImperativeHandle(ref, () => ({ focus: () => inputRef.current?.focus?.(), blur: () => inputRef.current?.blur?.(), clear: () => inputRef.current?.clear?.(), get nativeElement() { return inputRef.current?.nativeElement ?? null } }), []); const rAlign = alignProp ?? inputAlignProp ?? tokens.defaults.inputAlign; const rClearTrigger = clearTriggerProp ?? tokens.defaults.clearTrigger; const rKeyboardType = keyboardTypeProp ?? mapKeyboardType(type); const fieldStyle = useMemo(() => [{ paddingHorizontal: tokens.spacing.paddingHorizontal, paddingVertical: tokens.spacing.paddingVertical, backgroundColor: tokens.colors.background }, style], [style, tokens.colors.background, tokens.spacing.paddingHorizontal, tokens.spacing.paddingVertical]); return <Field ref={inputRef} {...rest} type={type} keyboardType={rKeyboardType} tokensOverride={fieldTokensOverride} border={tokens.defaults.border} inputAlign={rAlign} clearTrigger={rClearTrigger} style={fieldStyle} inputStyle={inputStyle} showWordLimit={showWordLimit} onChangeText={handleChangeText} />
}

const InputForwardRef = React.forwardRef<InputInstance, InputProps>(InputImpl)
InputForwardRef.displayName = 'Input'
const InputComponent = React.memo(InputForwardRef)

const TextAreaImpl = (props: InputTextAreaProps, ref: React.ForwardedRef<InputInstance>) => {
  const { autoSize: autoSizeProp, ...rest } = props; const fieldTokens = useFieldTokens(rest.fieldTokensOverride); const lh = fieldTokens.defaults.textareaLineHeight; const toRows = useCallback((height?: number) => (!isFiniteNumber(height) || height <= 0) ? undefined : Math.max(1, Math.round(height / lh)), [lh]); const rAutoSize: boolean | FieldAutosizeConfig | undefined = useMemo(() => !autoSizeProp || isBoolean(autoSizeProp) ? autoSizeProp : (() => { const minR = toRows(autoSizeProp.minHeight); const maxR = toRows(autoSizeProp.maxHeight); return minR || maxR ? { minRows: minR, maxRows: maxR } : undefined })(), [autoSizeProp, toRows]); return <InputComponent ref={ref} {...rest} type="textarea" autoSize={rAutoSize} />
}

const TextAreaForwardRef = React.forwardRef<InputInstance, InputTextAreaProps>(TextAreaImpl)
TextAreaForwardRef.displayName = 'Input.TextArea'
const TextArea = React.memo(TextAreaForwardRef)
const Input = Object.assign(InputComponent, { TextArea })
export default Input
export { TextArea }
