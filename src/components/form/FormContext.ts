import React from 'react'

import type { NamePath, RegisteredFieldOptions } from './types'

export interface FormContextValue {
  values: Record<string, any>
  getFieldValue: (name: NamePath) => any
  setFieldValue: (name: NamePath, value: any, trigger?: string) => void
  registerField: (name: NamePath, options: RegisteredFieldOptions) => () => void
  getFieldError: (name: NamePath) => string[] | undefined
  validateField: (name: NamePath, trigger?: string) => Promise<boolean>
  getFieldsValue: () => Record<string, any>
  subscribe: (
    listener: (changedValues: Record<string, any>, allValues: Record<string, any>) => void
  ) => () => void
  form?: any
  colon?: boolean
  labelWidth?: number
  showValidateMessage?: boolean
}

export const FormContext = React.createContext<FormContextValue | null>(null)
