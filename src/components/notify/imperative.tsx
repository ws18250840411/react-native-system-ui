import React from 'react'
import { createImperativePortalRegistry, type ImperativePortalRenderProps } from '../../internal/imperativePortal'
import { isFunction, isString, isText } from '../../utils/base'
import { NotifyContent } from './Notify'
import type { NotifyProps, NotifyType } from './types'

export type NotifyShowOptions = Omit<NotifyProps, 'visible'> & { message?: React.ReactNode }
export type NotifyInput = NotifyShowOptions | React.ReactNode
export interface NotifyReturnType { clear: () => void; update: (options: NotifyInput) => void; config: (options: NotifyInput | ((prev: NotifyShowOptions) => NotifyInput)) => void }

let allowMultiple = false
const baseOptions: NotifyShowOptions = { type: 'primary', position: 'top', duration: 3000, safeAreaInsetTop: true, safeAreaInsetBottom: true }
let currentOptions: NotifyShowOptions = { ...baseOptions }
const typeDefaults = new Map<NotifyType, NotifyShowOptions>()

const parseOptions = (input?: NotifyInput): NotifyShowOptions => (React.isValidElement(input) || isText(input)) ? { message: input as React.ReactNode } : (input ?? {}) as NotifyShowOptions

const mergeOptions = (input: NotifyShowOptions, fallbackT: NotifyType): NotifyShowOptions => { const t = input.type ?? fallbackT; const m: NotifyShowOptions = { ...currentOptions, ...typeDefaults.get(t), ...input, type: t }; m.duration = m.duration ?? 3000; return m }

const NotifyPortal: React.FC<ImperativePortalRenderProps<NotifyShowOptions>> = ({ options, visible, close, remove }) => <NotifyContent {...options} visible={visible} onClose={() => { options.onClose?.(); close() }} onClosed={() => { options.onClosed?.(); remove() }} />
const notifyRegistry = createImperativePortalRegistry<NotifyShowOptions>(props => <NotifyPortal {...props} />)

const showNotify = (input?: NotifyInput, fallbackT: NotifyType = 'primary'): NotifyReturnType => {
  const opts = mergeOptions(parseOptions(input), fallbackT)
  if (!allowMultiple) notifyRegistry.clear()
  const key = notifyRegistry.mount(opts)
  const config: NotifyReturnType['config'] = next => { const prev = notifyRegistry.get(key); if (!prev) return; const parsed = parseOptions(isFunction(next) ? next(prev) : next); const nextT = parsed.type ?? prev.type ?? fallbackT; const m: NotifyShowOptions = { ...prev, ...parsed, type: nextT }; if ('duration' in parsed && parsed.duration == null) m.duration = baseOptions.duration ?? 3000; notifyRegistry.update(key, m) }
  return { clear: () => notifyRegistry.close(key), update: n => config(n), config }
}

export const NotifyImperative = {
  show: (options?: NotifyInput) => showNotify(options),
  primary: (options?: NotifyInput) => showNotify(options, 'primary'),
  success: (options?: NotifyInput) => showNotify(options, 'success'),
  danger: (options?: NotifyInput) => showNotify(options, 'danger'),
  warning: (options?: NotifyInput) => showNotify(options, 'warning'),
  clear: () => { notifyRegistry.clear() },
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
