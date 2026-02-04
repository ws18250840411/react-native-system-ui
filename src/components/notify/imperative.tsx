import React, { useEffect, useState } from 'react'

import Portal from '../portal/Portal'
import { isFunction, isString, isText } from '../../utils'
import { NotifyContent } from './Notify'
import type { NotifyProps, NotifyType } from './types'

export type NotifyShowOptions = Omit<NotifyProps, 'visible'> & { message?: React.ReactNode }
export type NotifyInput = NotifyShowOptions | React.ReactNode

export interface NotifyReturnType {
  clear: () => void
  update: (options: NotifyInput) => void
  config: (options: NotifyInput | ((prev: NotifyShowOptions) => NotifyInput)) => void
}

const activeKeys = new Set<number>()
const notifyOptions = new Map<number, NotifyShowOptions>()
const notifyControllers = new Map<number, { close: () => void }>()
let allowMultiple = false

const baseOptions: NotifyShowOptions = {
  type: 'primary',
  position: 'top',
  duration: 3000,
  safeAreaInsetTop: true,
  safeAreaInsetBottom: true,
}

let currentOptions: NotifyShowOptions = { ...baseOptions }
const typeDefaults = new Map<NotifyType, NotifyShowOptions>()

const parseOptions = (input?: NotifyInput): NotifyShowOptions => {
  if (
    React.isValidElement(input) ||
    isText(input)
  ) {
    return { message: input as React.ReactNode }
  }
  return (input ?? {}) as NotifyShowOptions
}

const mergeOptions = (input: NotifyShowOptions, fallbackType: NotifyType): NotifyShowOptions => {
  const type = input.type ?? fallbackType
  const base = { ...currentOptions, ...typeDefaults.get(type) }
  const merged: NotifyShowOptions = { ...base, ...input, type }
  merged.duration = merged.duration ?? base.duration ?? 3000
  return merged
}

const removeNotify = (key: number) => {
  Portal.remove(key)
  activeKeys.delete(key)
  notifyOptions.delete(key)
  notifyControllers.delete(key)
}

const closeNotify = (key: number) => {
  const controller = notifyControllers.get(key)
  if (controller) {
    controller.close()
  } else {
    removeNotify(key)
  }
}

interface NotifyPortalProps {
  id: number
  options: NotifyShowOptions
}

const NotifyPortal: React.FC<NotifyPortalProps> = ({ id, options }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    notifyControllers.set(id, { close: () => setVisible(false) })
    return () => {
      notifyControllers.delete(id)
    }
  }, [id])

  const handleClose = () => {
    options.onClose?.()
    setVisible(false)
  }

  const handleClosed = () => {
    options.onClosed?.()
    removeNotify(id)
  }

  return <NotifyContent {...options} visible={visible} onClose={handleClose} onClosed={handleClosed} />
}

const showNotify = (input?: NotifyInput, fallbackType: NotifyType = 'primary'): NotifyReturnType => {
  const opts = mergeOptions(parseOptions(input), fallbackType)

  if (!allowMultiple) {
    Array.from(activeKeys).forEach(key => removeNotify(key))
  }

  const key = Portal.add(null)
  notifyOptions.set(key, opts)
  Portal.update(key, <NotifyPortal id={key} options={opts} />)
  activeKeys.add(key)

  const config: NotifyReturnType['config'] = next => {
    const prev = notifyOptions.get(key)
    if (!prev) return
    const nextInput = isFunction(next) ? next(prev) : next
    const parsed = parseOptions(nextInput)
    const nextType = parsed.type ?? prev.type ?? fallbackType

    const merged: NotifyShowOptions = {
      ...prev,
      ...parsed,
      type: nextType,
    }

    if ('duration' in parsed && parsed.duration == null) {
      merged.duration = baseOptions.duration ?? 3000
    }

    notifyOptions.set(key, merged)
    Portal.update(key, <NotifyPortal id={key} options={merged} />)
  }

  return {
    clear: () => closeNotify(key),
    update: next => config(next),
    config,
  }
}

export const NotifyImperative = {
  show: (options?: NotifyInput) => showNotify(options),
  primary: (options?: NotifyInput) => showNotify(options, 'primary'),
  success: (options?: NotifyInput) => showNotify(options, 'success'),
  danger: (options?: NotifyInput) => showNotify(options, 'danger'),
  warning: (options?: NotifyInput) => showNotify(options, 'warning'),
  clear: () => {
    activeKeys.forEach(key => closeNotify(key))
  },
  allowMultiple: (value = true) => {
    allowMultiple = value
  },
  setDefaultOptions: (typeOrOptions: NotifyType | NotifyShowOptions, options?: NotifyShowOptions) => {
    if (isString(typeOrOptions)) {
      typeDefaults.set(typeOrOptions, options ?? {})
    } else {
      currentOptions = { ...currentOptions, ...typeOrOptions }
    }
  },
  resetDefaultOptions: (type?: NotifyType) => {
    if (type) {
      typeDefaults.delete(type)
    } else {
      currentOptions = { ...baseOptions }
      typeDefaults.clear()
    }
  },
}
