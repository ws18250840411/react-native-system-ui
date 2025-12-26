import React from 'react'

import { FormContext } from './FormContext'
import type { FormItemRule, NamePath } from './types'

export type { FormItemRule } from './types'

const normalizeTrigger = (trigger?: string | string[]) => {
  if (!trigger) return []
  return Array.isArray(trigger) ? trigger : [trigger]
}

export interface FormItemProps {
  name?: NamePath
  label?: React.ReactNode
  description?: React.ReactNode
  intro?: React.ReactNode
  tooltip?: React.ReactNode
  rules?: FormItemRule[]
  dependencies?: NamePath[]
  valuePropName?: string
  trigger?: string
  validateTrigger?: string | string[]
  showValidateMessage?: boolean
  required?: boolean
  noStyle?: boolean
  shouldUpdate?: (prev: Record<string, any>, next: Record<string, any>) => boolean
  initialValue?: any
  children: React.ReactNode
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
  noStyle,
  shouldUpdate,
  initialValue,
  children,
}) => {
  const renderProps = typeof children === 'function'
  const context = React.useContext(FormContext)

  if (!context) {
    if (renderProps) {
      return (
        <>
          {(children as any)({
            getFieldValue: () => undefined,
            getFieldsValue: () => ({}),
            form: null,
          })}
        </>
      )
    }
    return <>{children}</>
  }

  const normalizedRules = React.useMemo(() => rules ?? [], [rules])
  const prevValuesRef = React.useRef<Record<string, any>>(context.values)

  React.useEffect(() => {
    prevValuesRef.current = context.values
  }, [context.values])

  const shouldRender = React.useMemo(() => {
    if (!shouldUpdate) return true
    return shouldUpdate(prevValuesRef.current, context.values)
  }, [shouldUpdate, context.values])

  React.useEffect(() => {
    if (!name) return undefined
    return context.registerField(name, {
      rules: normalizedRules,
      dependencies,
      initialValue,
      validateTrigger: validateTrigger ?? trigger, // 传递 validateTrigger
    })
  }, [context.registerField, name, normalizedRules, dependencies, initialValue, validateTrigger, trigger])

  const mergedValue = name ? context.getFieldValue(name) : undefined
  const mergedShowMessage = showValidateMessage ?? context.showValidateMessage ?? true
  const fieldErrors = name ? context.getFieldError(name) : undefined
  const firstError = mergedShowMessage ? fieldErrors?.[0] : undefined
  const mergedRequired = required ?? normalizedRules.some(rule => rule.required)
  const mergedValidateTriggers = React.useMemo(() => {
    const merged = validateTrigger ?? trigger
    return normalizeTrigger(merged)
  }, [validateTrigger, trigger])

  if (renderProps) {
    if (!shouldRender) return null
    const node = (children as any)({
      getFieldValue: context.getFieldValue,
      getFieldsValue: context.getFieldsValue,
      form: context.form,
    })
    return <>{node}</>
  }

  if (!name) {
    return <>{children}</>
  }

  if (!shouldRender) return null

  const childArray = React.Children.toArray(children)
  if (childArray.length !== 1) {
    // 保底兜底：非单节点直接返回，避免运行时崩溃
    return <>{children}</>
  }

  const child = childArray[0] as React.ReactElement<any>

  const handleChange = (next: any) => {
    context.setFieldValue(name, next, trigger)
    const original = child.props[trigger]
    if (typeof original === 'function') {
      original(next)
    }
  }

  const isFieldLike =
    typeof (child as any)?.type?.displayName === 'string' &&
    ((child as any).type.displayName.includes('Field') || (child as any).type.displayName.includes('Input'))

  const resolveValue = () => {
    if (child.props[valuePropName] !== undefined) return child.props[valuePropName]
    if (mergedValue !== undefined) return mergedValue
    if (isFieldLike && valuePropName === 'value') return ''
    return mergedValue
  }

  const injectedProps: Record<string, any> = {
    [valuePropName]: resolveValue(),
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
