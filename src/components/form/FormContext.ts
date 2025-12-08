import React from 'react'

import type { RegisteredFieldOptions } from './types'

export interface FormContextValue {
  values: Record<string, any>
  setFieldValue: (name: string, value: any, trigger?: string) => void
  registerField: (name: string, options: RegisteredFieldOptions) => () => void
  getFieldError: (name: string) => string[] | undefined
  validateField: (name: string, trigger?: string) => Promise<boolean>
  getFieldsValue: () => Record<string, any>
  subscribe: (listener: (changedValues: Record<string, any>, allValues: Record<string, any>) => void) => () => void
  form?: any
  colon?: boolean
  labelWidth?: number
  showValidateMessage?: boolean
}

export const FormContext = React.createContext<FormContextValue | null>(null)
