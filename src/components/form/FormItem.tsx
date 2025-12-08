import React from 'react'

import { FormContext } from './FormContext'
import type { FormItemRule } from './types'

export type { FormItemRule } from './types'

const normalizeTrigger = (trigger?: string | string[]) => {
  if (!trigger) return []
  return Array.isArray(trigger) ? trigger : [trigger]
}

export interface FormItemProps {
  name?: string
  label?: React.ReactNode
  description?: React.ReactNode
  intro?: React.ReactNode
  tooltip?: React.ReactNode
  rules?: FormItemRule[]
  dependencies?: string[]
  valuePropName?: string
  trigger?: string
  validateTrigger?: string | string[]
  showValidateMessage?: boolean
  required?: boolean
  children: React.ReactElement
}

export const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  description,
  intro,
  tooltip,
  rules,
  dependencies,
  valuePropName = 'value',
  trigger = 'onChangeText',
  validateTrigger,
  showValidateMessage,
  required,
  children,
}) => {
  const context = React.useContext(FormContext)
  const child = React.Children.only(children) as React.ReactElement<any>

  if (!context || !name) {
    return child
  }

  const normalizedRules = React.useMemo(() => rules ?? [], [rules])

  React.useEffect(() => {
    return context.registerField(name, { rules: normalizedRules, dependencies })
  }, [context.registerField, name, normalizedRules, dependencies])

  const mergedValue = context.values[name]
  const mergedShowMessage = showValidateMessage ?? context.showValidateMessage ?? true
  const fieldErrors = context.getFieldError(name)
  const firstError = mergedShowMessage ? fieldErrors?.[0] : undefined
  const mergedRequired = required ?? normalizedRules.some(rule => rule.required)
  const mergedValidateTriggers = React.useMemo(() => {
    const merged = validateTrigger ?? trigger
    return normalizeTrigger(merged)
  }, [validateTrigger, trigger])

  const handleChange = (next: any) => {
    context.setFieldValue(name, next, trigger)
    const original = child.props[trigger]
    if (typeof original === 'function') {
      original(next)
    }
  }

  const injectedProps: Record<string, any> = {
    [valuePropName]: child.props[valuePropName] ?? mergedValue ?? '',
    [trigger]: handleChange,
  }

  mergedValidateTriggers.forEach(eventName => {
    if (!eventName || eventName === trigger) return
    const original = child.props[eventName]
    injectedProps[eventName] = (...args: any[]) => {
      if (typeof original === 'function') {
        original(...args)
      }
      context.validateField(name, eventName)
    }
  })

  if (label !== undefined && child.props.label === undefined) {
    injectedProps.label = label
  }
  if (context.colon !== undefined && injectedProps.label !== undefined && child.props.colon === undefined) {
    injectedProps.colon = context.colon
  }
  if (context.labelWidth !== undefined && child.props.labelWidth === undefined) {
    injectedProps.labelWidth = context.labelWidth
  }
  if (description && child.props.description === undefined) {
    injectedProps.description = description
  }
  if (intro && child.props.intro === undefined) {
    injectedProps.intro = intro
  }
  if (tooltip && child.props.tooltip === undefined) {
    injectedProps.tooltip = tooltip
  }
  if (mergedRequired && child.props.required === undefined) {
    injectedProps.required = true
  }
  if (firstError && child.props.errorMessage === undefined) {
    injectedProps.error = true
    injectedProps.errorMessage = firstError
  }

  return React.cloneElement(child, injectedProps)
}

FormItem.displayName = 'FormItem'
