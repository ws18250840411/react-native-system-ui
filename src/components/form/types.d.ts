import type { ReactNode } from 'react'
import type { ViewProps } from 'react-native'

export type FormRuleValidateTrigger = string | string[]

export type FormRuleValidator = (
  value: unknown,
  values: Record<string, unknown>
) => void | boolean | string | Promise<void | boolean | string>

export type NamePath = string | number | (string | number)[]

export interface FormItemRule {
  required?: boolean
  message?: string
  pattern?: RegExp
  len?: number
  min?: number
  max?: number
  whitespace?: boolean
  validator?: FormRuleValidator
  validateTrigger?: FormRuleValidateTrigger
}

export interface RegisteredFieldOptions {
  rules?: FormItemRule[]
  dependencies?: NamePath[]
  initialValue?: unknown
  validateTrigger?: FormRuleValidateTrigger
}

export interface FormInstance {
  submit: () => Promise<Record<string, unknown> | undefined>
  getFieldsValue: () => Record<string, unknown>
  setFieldsValue: (values: Record<string, unknown>, options?: { validate?: boolean }) => void
  resetFields: () => void
  validateFields: (names?: NamePath[]) => Promise<Record<string, unknown>>
  getFieldError: (name: NamePath) => string[]
}

export interface FormProps extends ViewProps {
  initialValues?: Record<string, unknown>
  colon?: boolean
  labelWidth?: number
  showValidateMessage?: boolean
  footer?: ReactNode
  onValuesChange?: (values: Record<string, unknown>, name: string, value: unknown) => void
  onFinish?: (values: Record<string, unknown>) => void
  children?: ReactNode
}

export interface FormSubscribeProps {
  to?: string[]
  children: (changedValues: Record<string, unknown>, form: FormInstance | null) => ReactNode
}

export interface FormItemProps {
  name?: NamePath
  label?: ReactNode
  description?: ReactNode
  intro?: ReactNode
  tooltip?: ReactNode
  rules?: FormItemRule[]
  dependencies?: NamePath[]
  valuePropName?: string
  trigger?: string
  validateTrigger?: FormRuleValidateTrigger
  showValidateMessage?: boolean
  required?: boolean
  noStyle?: boolean
  shouldUpdate?: (prev: Record<string, unknown>, next: Record<string, unknown>) => boolean
  initialValue?: unknown
  children:
    | ReactNode
    | ((payload: {
        getFieldValue: (name: NamePath) => unknown
        getFieldsValue: () => Record<string, unknown>
        form: FormInstance | null
      }) => ReactNode)
}
