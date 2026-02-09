import React, { useCallback, useEffect, useState } from 'react'
import Portal from '../portal/Portal'
import { isFunction, isString, isText } from '../../utils'
import { NotifyContent } from './Notify'
import type { NotifyProps, NotifyType } from './types'

export type NotifyShowOptions = Omit<NotifyProps, 'visible'> & { message?: React.ReactNode }
export type NotifyInput = NotifyShowOptions | React.ReactNode
export interface NotifyReturnType { clear: () => void; update: (options: NotifyInput) => void; config: (options: NotifyInput | ((prev: NotifyShowOptions) => NotifyInput)) => void }

const activeKeys = new Set<number>()
const notifyOptions = new Map<number, NotifyShowOptions>()
const notifyControllers = new Map<number, { close: () => void }>()
let allowMultiple = false
const baseOptions: NotifyShowOptions = { type: 'primary', position: 'top', duration: 3000, safeAreaInsetTop: true, safeAreaInsetBottom: true }
let currentOptions: NotifyShowOptions = { ...baseOptions }
const typeDefaults = new Map<NotifyType, NotifyShowOptions>()

const parseOptions = (input?: NotifyInput): NotifyShowOptions => (React.isValidElement(input) || isText(input)) ? { message: input as React.ReactNode } : (input ?? {}) as NotifyShowOptions

const mergeOptions = (input: NotifyShowOptions, fallbackT: NotifyType): NotifyShowOptions => { const t = input.type ?? fallbackT; const m: NotifyShowOptions = { ...currentOptions, ...typeDefaults.get(t), ...input, type: t }; m.duration = m.duration ?? 3000; return m }

const removeNotify = (key: number) => { Portal.remove(key); activeKeys.delete(key); notifyOptions.delete(key); notifyControllers.delete(key) }
const closeNotify = (key: number) => { const c = notifyControllers.get(key); c ? c.close() : removeNotify(key) }

const NotifyPortal: React.FC<{ id: number; options: NotifyShowOptions }> = ({ id, options }) => { const [visible, setVisible] = useState(true); useEffect(() => { notifyControllers.set(id, { close: () => setVisible(false) }); return () => { notifyControllers.delete(id) } }, [id]); const handleClose = useCallback(() => { options.onClose?.(); setVisible(false) }, [options]); const handleClosed = useCallback(() => { options.onClosed?.(); removeNotify(id) }, [id, options]); return <NotifyContent {...options} visible={visible} onClose={handleClose} onClosed={handleClosed} />
}

const showNotify = (input?: NotifyInput, fallbackT: NotifyType = 'primary'): NotifyReturnType => {
  const opts = mergeOptions(parseOptions(input), fallbackT); if (!allowMultiple) activeKeys.forEach(k => closeNotify(k)); const key = Portal.add(null); notifyOptions.set(key, opts); Portal.update(key, <NotifyPortal id={key} options={opts} />); activeKeys.add(key)
  const config: NotifyReturnType['config'] = next => { const prev = notifyOptions.get(key); if (!prev) return; const parsed = parseOptions(isFunction(next) ? next(prev) : next); const nextT = parsed.type ?? prev.type ?? fallbackT; const m: NotifyShowOptions = { ...prev, ...parsed, type: nextT }; if ('duration' in parsed && parsed.duration == null) m.duration = baseOptions.duration ?? 3000; notifyOptions.set(key, m); Portal.update(key, <NotifyPortal id={key} options={m} />) }; return { clear: () => closeNotify(key), update: n => config(n), config }
}

export const NotifyImperative = {
  show: (options?: NotifyInput) => showNotify(options),
  primary: (options?: NotifyInput) => showNotify(options, 'primary'),
  success: (options?: NotifyInput) => showNotify(options, 'success'),
  danger: (options?: NotifyInput) => showNotify(options, 'danger'),
  warning: (options?: NotifyInput) => showNotify(options, 'warning'),
  clear: () => { activeKeys.forEach(key => closeNotify(key)) },
  allowMultiple: (value = true) => { allowMultiple = value },
  setDefaultOptions: (typeOrOptions: NotifyType | NotifyShowOptions, options?: NotifyShowOptions) => {
    if (isString(typeOrOptions)) typeDefaults.set(typeOrOptions, options ?? {})
    else currentOptions = { ...currentOptions, ...typeOrOptions }
  },
  resetDefaultOptions: (type?: NotifyType) => {
    if (type) typeDefaults.delete(type)
    else { currentOptions = { ...baseOptions }; typeDefaults.clear() }
  },
}
