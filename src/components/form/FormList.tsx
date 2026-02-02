import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { FormContext } from './FormContext'
import { FORM_ALL_FIELDS_KEY, getValueByName, serializeNamePath } from './utils'
import type { NamePath } from './types'

export interface FormListField {
  name: number
  key: number
  isListField: true
}

export interface FormListOperation {
  add: (defaultValue?: unknown, index?: number) => void
  remove: (index: number) => void
  move: (from: number, to: number) => void
}

export interface FormListProps {
  name: NamePath
  initialValue?: unknown[]
  children: (fields: FormListField[], operation: FormListOperation) => React.ReactNode
}

export const FormList: React.FC<FormListProps> = ({ name, initialValue, children }) => {
  const context = useContext(FormContext)
  const keyRef = useRef(0)
  const nameKey = serializeNamePath(name)
  const [listValue, setListValue] = useState<unknown[]>(() => {
    if (!context) return []
    const current = getValueByName(context.getFieldsValue(), name)
    return Array.isArray(current) ? current : []
  })

  const ensureInitial = useCallback(() => {
    if (!context) return
    const current = getValueByName(context.getFieldsValue(), name)
    if (current === undefined && initialValue !== undefined) {
      context.setFieldValue(name, initialValue)
    }
  }, [context, initialValue, name])

  useEffect(() => {
    ensureInitial()
  }, [ensureInitial])

  useEffect(() => {
    if (!context?.subscribe) return undefined
    return context.subscribe((changed, all) => {
      if (FORM_ALL_FIELDS_KEY in changed || nameKey in changed) {
        const nextRaw = getValueByName(all, name)
        setListValue(Array.isArray(nextRaw) ? nextRaw : [])
      }
    })
  }, [context, name, nameKey])

  if (!context) {
    return null
  }

  const fields: FormListField[] = listValue.map((_, index) => ({
    name: index,
    key: keyRef.current + index,
    isListField: true,
  }))

  const add = (defaultValue?: unknown, index?: number) => {
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
