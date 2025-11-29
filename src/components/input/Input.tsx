import React from 'react'
import type { StyleProp, TextInput, TextStyle, ViewStyle } from 'react-native'

import Field from '../field'
import type {
  FieldClearTrigger,
  FieldProps,
  FieldInputAlign,
  FieldShowWordLimit,
} from '../field/types'
import { useInputTokens } from './tokens'

const omitProps = [
  'label',
  'labelStyle',
  'labelWidth',
  'labelAlign',
  'required',
  'colon',
  'intro',
  'tooltip',
  'description',
  'error',
  'errorMessage',
  'center',
  'size',
  'extra',
  'controlAlign',
  'isLink',
  'arrowDirection',
  'clickable',
  'button',
  'border',
] as const

type DisallowedKeys = typeof omitProps[number]

type BaseFieldProps = Omit<FieldProps, DisallowedKeys>

export interface InputProps extends BaseFieldProps {
  align?: FieldInputAlign
  clearTrigger?: FieldClearTrigger
  onChange?: (value: string) => void
  showWordLimit?: FieldShowWordLimit
  style?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
}

export interface InputTextAreaProps extends InputProps {}

const InputComponent = React.forwardRef<TextInput, InputProps>((props, ref) => {
  const {
    align,
    clearTrigger,
    onChange,
    onChangeText,
    showWordLimit,
    style,
    ...rest
  } = props

  const tokens = useInputTokens()

  const handleChangeText = React.useCallback(
    (value: string) => {
      onChange?.(value)
      onChangeText?.(value)
    },
    [onChange, onChangeText]
  )

  const containerStyle = React.useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        paddingHorizontal: tokens.spacing.paddingHorizontal,
        paddingVertical: tokens.spacing.paddingVertical,
        backgroundColor: tokens.colors.background,
      },
      style,
    ],
    [style, tokens]
  )

  return (
    <Field
      ref={ref}
      {...rest}
      label={undefined}
      border={tokens.defaults.border}
      inputAlign={align ?? tokens.defaults.inputAlign}
      clearTrigger={clearTrigger ?? tokens.defaults.clearTrigger}
      style={containerStyle}
      showWordLimit={showWordLimit}
      onChangeText={handleChangeText}
    />
  )
})

const TextArea = React.forwardRef<TextInput, InputTextAreaProps>((props, ref) => {
  return <InputComponent ref={ref} {...props} type=textarea />
})

const Input = Object.assign(InputComponent, { TextArea })

export default Input
export { TextArea }
