import React from 'react'

import { FormContext } from './FormContext'
import { getValueByName } from './utils'
import type { NamePath } from './types'

export interface FormListField {
  name: number
  key: number
  isListField: true
}

export interface FormListOperation {
  add: (defaultValue?: any, index?: number) => void
  remove: (index: number) => void
  move: (from: number, to: number) => void
}

export interface FormListProps {
  name: NamePath
  initialValue?: any[]
  children: (fields: FormListField[], operation: FormListOperation) => React.ReactNode
}

export const FormList: React.FC<FormListProps> = ({ name, initialValue, children }) => {
  const context = React.useContext(FormContext)
  const keyRef = React.useRef(0)

  const ensureInitial = React.useCallback(() => {
    if (!context) return
    const current = getValueByName(context.values, name)
    if (current === undefined && initialValue !== undefined) {
      context.setFieldValue(name, initialValue)
    }
  }, [context, initialValue, name])

  React.useEffect(() => {
    ensureInitial()
  }, [ensureInitial])

  if (!context) {
    return null
  }

  const listValueRaw = getValueByName(context.values, name)
  const listValue: any[] = Array.isArray(listValueRaw) ? listValueRaw : []

  const fields: FormListField[] = listValue.map((_, index) => ({
    name: index,
    key: keyRef.current + index,
    isListField: true,
  }))

  const add = (defaultValue?: any, index?: number) => {
    const insertIndex = typeof index === 'number' ? index : listValue.length
    const next = [...listValue]
    next.splice(insertIndex, 0, defaultValue)
    context.setFieldValue(name, next)
    keyRef.current += 1
  }

  const remove = (index: number) => {
    if (index < 0 || index >= listValue.length) return
    const next = listValue.slice(0, index).concat(listValue.slice(index + 1))
    context.setFieldValue(name, next)
  }

  const move = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= listValue.length || to >= listValue.length) return
    const next = [...listValue]
    const item = next.splice(from, 1)[0]
    next.splice(to, 0, item)
    context.setFieldValue(name, next)
  }

  return <>{children(fields, { add, remove, move })}</>
}

FormList.displayName = 'Form.List'
