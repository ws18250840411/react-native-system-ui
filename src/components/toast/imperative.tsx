import React, { useCallback, useEffect, useState } from 'react'
import Portal from '../portal/Portal'
import { isFunction, isString, isText } from '../../utils'
import { ToastContent, type ToastProps, type ToastType } from './Toast'

export type ToastShowOptions = Omit<ToastProps, 'visible'> & { message?: React.ReactNode }
export type ToastInput = ToastShowOptions | React.ReactNode
export interface ToastReturnType { clear: () => void; update: (options: ToastInput) => void; config: (options: ToastInput | ((prev: ToastShowOptions) => ToastInput)) => void }

const activeKeys = new Set<number>()
const toastOptions = new Map<number, ToastShowOptions>()
const toastControllers = new Map<number, { close: () => void }>()
let allowMultiple = false
const baseOptions: ToastShowOptions = { type: 'info', position: 'middle', forbidClick: false, overlay: false }
let currentOptions: ToastShowOptions = { ...baseOptions }
const typeDefaults = new Map<ToastType, ToastShowOptions>()

const parseOptions = (input?: ToastInput): ToastShowOptions => (React.isValidElement(input) || isText(input)) ? { message: input as React.ReactNode } : (input ?? {}) as ToastShowOptions

const mergeOptions = (input: ToastShowOptions, fallbackType: ToastType): ToastShowOptions => {
  const type = input.type ?? fallbackType
  const merged: ToastShowOptions = { ...currentOptions, ...typeDefaults.get(type), ...input, type }
  if (merged.duration == null) merged.duration = currentOptions.duration ?? 2000
  return merged
}

const removeToast = (key: number) => { Portal.remove(key); activeKeys.delete(key); toastOptions.delete(key); toastControllers.delete(key) }
const closeToast = (key: number) => { const c = toastControllers.get(key); c ? c.close() : removeToast(key) }

const ToastPortal: React.FC<{ id: number; options: ToastShowOptions }> = ({ id, options }) => {
  const [visible, setVisible] = useState(true)
  useEffect(() => { toastControllers.set(id, { close: () => setVisible(false) }); return () => { toastControllers.delete(id) } }, [id])
  const handleClose = useCallback(() => { options.onClose?.(); setVisible(false) }, [options])
  const handleClosed = useCallback(() => { options.onClosed?.(); removeToast(id) }, [id, options])
  return <ToastContent {...options} visible={visible} onClose={handleClose} onClosed={handleClosed} />
}

const showToast = (input?: ToastInput, fallbackType: ToastType = 'info'): ToastReturnType => {
  const opts = mergeOptions(parseOptions(input), fallbackType)
  if (!allowMultiple) activeKeys.forEach(key => closeToast(key))
  const key = Portal.add(null)
  toastOptions.set(key, opts)
  Portal.update(key, <ToastPortal id={key} options={opts} />)
  activeKeys.add(key)
  const config: ToastReturnType['config'] = next => {
    const prev = toastOptions.get(key)
    if (!prev) return
    const parsed = parseOptions(isFunction(next) ? next(prev) : next)
    const nextType = parsed.type ?? prev.type ?? fallbackType
    const merged: ToastShowOptions = { ...prev, ...parsed, type: nextType }
    if ('duration' in parsed && parsed.duration == null) merged.duration = typeDefaults.get(nextType)?.duration ?? currentOptions.duration ?? 2000
    toastOptions.set(key, merged)
    Portal.update(key, <ToastPortal id={key} options={merged} />)
  }
  return { clear: () => closeToast(key), update: next => config(next), config }
}

export const ToastImperative = {
  show: (options?: ToastInput) => showToast(options),
  info: (options?: ToastInput) => showToast(options, 'info'),
  success: (options?: ToastInput) => showToast(options, 'success'),
  fail: (options?: ToastInput) => showToast(options, 'fail'),
  loading: (options?: ToastInput) => showToast(options, 'loading'),
  clear: () => { activeKeys.forEach(key => closeToast(key)) },
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
