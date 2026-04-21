import React from 'react'
import { createImperativePortalRegistry, type ImperativePortalRenderProps } from '../../internal/imperativePortal'
import { isFunction, isString, isText } from '../../utils/base'
import { ToastContent, type ToastProps, type ToastType } from './Toast'

export type ToastShowOptions = Omit<ToastProps, 'visible'> & { message?: React.ReactNode }
export type ToastInput = ToastShowOptions | React.ReactNode
export interface ToastReturnType { clear: () => void; update: (options: ToastInput) => void; config: (options: ToastInput | ((prev: ToastShowOptions) => ToastInput)) => void }

let allowMultiple = false
const baseOptions: ToastShowOptions = { type: 'info', position: 'middle', forbidClick: false, overlay: false }
let currentOptions: ToastShowOptions = { ...baseOptions }
const typeDefaults = new Map<ToastType, ToastShowOptions>()

const parseOptions = (input?: ToastInput): ToastShowOptions => (React.isValidElement(input) || isText(input)) ? { message: input as React.ReactNode } : (input ?? {}) as ToastShowOptions

const mergeOptions = (input: ToastShowOptions, fallbackType: ToastType): ToastShowOptions => { const type = input.type ?? fallbackType; const merged: ToastShowOptions = { ...currentOptions, ...typeDefaults.get(type), ...input, type }; if (merged.duration == null) merged.duration = currentOptions.duration ?? 2000; return merged }

const ToastPortal: React.FC<ImperativePortalRenderProps<ToastShowOptions>> = ({ options, visible, close, remove }) => <ToastContent {...options} visible={visible} onClose={() => { options.onClose?.(); close() }} onClosed={() => { options.onClosed?.(); remove() }} />
const toastRegistry = createImperativePortalRegistry<ToastShowOptions>(props => <ToastPortal {...props} />)

const showToast = (input?: ToastInput, fallbackType: ToastType = 'info'): ToastReturnType => {
  const opts = mergeOptions(parseOptions(input), fallbackType)
  if (!allowMultiple) toastRegistry.clear()
  const key = toastRegistry.mount(opts)
  const config: ToastReturnType['config'] = next => {
    const prev = toastRegistry.get(key)
    if (!prev) return
    const parsed = parseOptions(isFunction(next) ? next(prev) : next)
    const nextType = parsed.type ?? prev.type ?? fallbackType
    const merged: ToastShowOptions = { ...prev, ...parsed, type: nextType }
    if ('duration' in parsed && parsed.duration == null) merged.duration = typeDefaults.get(nextType)?.duration ?? currentOptions.duration ?? 2000
    toastRegistry.update(key, merged)
  }
  return { clear: () => toastRegistry.close(key), update: next => config(next), config }
}

export const ToastImperative = {
  show: (options?: ToastInput) => showToast(options),
  info: (options?: ToastInput) => showToast(options, 'info'),
  success: (options?: ToastInput) => showToast(options, 'success'),
  fail: (options?: ToastInput) => showToast(options, 'fail'),
  loading: (options?: ToastInput) => showToast(options, 'loading'),
  clear: () => { toastRegistry.clear() },
  allowMultiple: (value = true) => { allowMultiple = value },
  setDefaultOptions: (typeOrOptions: ToastType | ToastShowOptions, options?: ToastShowOptions) => {
    if (isString(typeOrOptions)) typeDefaults.set(typeOrOptions, options ?? {})
    else currentOptions = { ...currentOptions, ...typeOrOptions }
  },
  resetDefaultOptions: (type?: ToastType) => {
    if (type) typeDefaults.delete(type)
    else { currentOptions = { ...baseOptions }; typeDefaults.clear() }
  },
}
