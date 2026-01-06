import type { ReactNode } from 'react'
import type { ViewProps } from 'react-native'

export type FormRuleValidateTrigger = string | string[]

export type FormRuleValidator = (
  value: any,
  values: Record<string, any>
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
  initialValue?: any
  validateTrigger?: FormRuleValidateTrigger
}

export interface FormInstance {
  submit: () => Promise<Record<string, any> | undefined>
  getFieldsValue: () => Record<string, any>
  setFieldsValue: (values: Record<string, any>) => void
  resetFields: () => void
  validateFields: (names?: NamePath[]) => Promise<Record<string, any>>
  getFieldError: (name: NamePath) => string[]
}

export interface FormProps extends ViewProps {
  initialValues?: Record<string, any>
  colon?: boolean
  labelWidth?: number
  showValidateMessage?: boolean
  footer?: ReactNode
  onValuesChange?: (values: Record<string, any>, name: string, value: any) => void
  onFinish?: (values: Record<string, any>) => void
  children?: ReactNode
}

export interface FormSubscribeProps {
  to?: string[]
  children: (changedValues: Record<string, any>, form: FormInstance | null) => ReactNode
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
  shouldUpdate?: (prev: Record<string, any>, next: Record<string, any>) => boolean
  initialValue?: any
  children:
    | ReactNode
    | ((payload: {
        getFieldValue: (name: NamePath) => any
        getFieldsValue: () => Record<string, any>
        form: FormInstance | null
      }) => ReactNode)
}
