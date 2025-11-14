import React from 'react'

import Portal from '../portal/Portal'
import Toast, { type ToastProps, type ToastType } from './Toast'

export type ToastShowOptions = Omit<ToastProps, 'visible'> & { message?: React.ReactNode }
export type ToastInput = ToastShowOptions | React.ReactNode

export interface ToastReturnType {
  clear: () => void
  update: (options: ToastInput) => void
}

const activeKeys = new Set<number>()
const toastOptions = new Map<number, ToastShowOptions>()
let allowMultiple = false

const baseOptions: ToastShowOptions = {
  type: 'info',
  position: 'middle',
  duration: 2000,
  forbidClick: false,
  overlay: false,
}

let currentOptions: ToastShowOptions = { ...baseOptions }
const typeDefaults = new Map<ToastType, ToastShowOptions>()

const parseOptions = (input?: ToastInput): ToastShowOptions => {
  if (
    React.isValidElement(input) ||
    typeof input === 'string' ||
    typeof input === 'number'
  ) {
    return { message: input }
  }
  return (input ?? {}) as ToastShowOptions
}

const mergeOptions = (input: ToastShowOptions, fallbackType: ToastType): ToastShowOptions => {
  const type = input.type ?? fallbackType
  const base = {
    ...currentOptions,
    ...typeDefaults.get(type),
  }

  const merged: ToastShowOptions = {
    ...base,
    ...input,
    type,
  }

  if (merged.duration === undefined || merged.duration === null) {
    merged.duration = type === 'loading' ? 0 : base.duration ?? 2000
  }

  return merged
}

const removeToast = (key: number) => {
  Portal.remove(key)
  activeKeys.delete(key)
  toastOptions.delete(key)
}

interface ToastPortalProps {
  id: number
  options: ToastShowOptions
}

const ToastPortal: React.FC<ToastPortalProps> = ({ id, options }) => {
  const [visible, setVisible] = React.useState(true)

  const handleClose = React.useCallback(() => {
    options.onClose?.()
    setVisible(false)
  }, [options])

  const handleClosed = React.useCallback(() => {
    options.onClosed?.()
    removeToast(id)
  }, [id, options])

  return <Toast {...options} visible={visible} onClose={handleClose} onClosed={handleClosed} />
}

const showToast = (input?: ToastInput, fallbackType: ToastType = 'info'): ToastReturnType => {
  const opts = mergeOptions(parseOptions(input), fallbackType)

  if (!allowMultiple) {
    activeKeys.forEach(key => removeToast(key))
    activeKeys.clear()
  }

  const key = Portal.add(null)
  toastOptions.set(key, opts)
  Portal.update(key, <ToastPortal id={key} options={opts} />)
  activeKeys.add(key)

  return {
    clear: () => removeToast(key),
    update: next => {
      const nextOpts = mergeOptions(parseOptions(next), opts.type ?? fallbackType)
      toastOptions.set(key, nextOpts)
      Portal.update(key, <ToastPortal id={key} options={nextOpts} />)
    },
  }
}

export const ToastImperative = {
  show: (options?: ToastInput) => showToast(options),
  info: (options?: ToastInput) => showToast(options, 'info'),
  success: (options?: ToastInput) => showToast(options, 'success'),
  fail: (options?: ToastInput) => showToast(options, 'fail'),
  loading: (options?: ToastInput) => showToast(options, 'loading'),
  clear: () => {
    activeKeys.forEach(key => removeToast(key))
    activeKeys.clear()
    toastOptions.clear()
  },
  allowMultiple: (value = true) => {
    allowMultiple = value
  },
  setDefaultOptions: (typeOrOptions: ToastType | ToastShowOptions, options?: ToastShowOptions) => {
    if (typeof typeOrOptions === 'string') {
      typeDefaults.set(typeOrOptions, options ?? {})
    } else {
      currentOptions = { ...currentOptions, ...typeOrOptions }
    }
  },
  resetDefaultOptions: (type?: ToastType) => {
    if (type) {
      typeDefaults.delete(type)
    } else {
      currentOptions = { ...baseOptions }
      typeDefaults.clear()
    }
  },
}
