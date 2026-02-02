import React from 'react'

import type { FormInstance, NamePath, RegisteredFieldOptions } from './types'

export interface FormContextValue {
  getFieldValue: (name: NamePath) => unknown
  setFieldValue: (name: NamePath, value: unknown, trigger?: string) => void
  registerField: (name: NamePath, options: RegisteredFieldOptions) => () => void
  getFieldError: (name: NamePath) => string[] | undefined
  validateField: (name: NamePath, trigger?: string) => Promise<boolean>
  getFieldsValue: () => Record<string, unknown>
  subscribe: (
    listener: (changedValues: Record<string, unknown>, allValues: Record<string, unknown>) => void
  ) => () => void
  form?: FormInstance
  colon?: boolean
  labelWidth?: number
  showValidateMessage?: boolean
}

export const FormContext = React.createContext<FormContextValue | null>(null)
