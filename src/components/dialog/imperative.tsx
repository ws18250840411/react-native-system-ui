import React from 'react'

import { Portal } from '../portal/Portal'
import { deepMerge } from '../../utils/deepMerge'
import type {
  DialogAlertOptions,
  DialogConfirmOptions,
  DialogProps,
  DialogShowOptions,
} from './types'
import Dialog from './Dialog'

const isPromise = (value: unknown): value is Promise<unknown> =>
  !!value && typeof value === 'object' && typeof (value as any).then === 'function'

const runHook = async (handler?: () => any) => {
  if (!handler) return true
  try {
    const result = handler()
    if (isPromise(result)) {
      const resolved = await result
      return resolved !== false
    }
    return result !== false
  } catch (error) {
    console.error(error)
    return true
  }
}

type ImperativeMode = 'show' | 'alert' | 'confirm'

interface ImperativeMeta {
  mode: ImperativeMode
  resolve?: (value?: any) => void
  reject?: (reason?: any) => void
}

interface DialogRegistryItem {
  key: number
  options: DialogProps
  meta: ImperativeMeta
  close?: () => void
}

const dialogRegistry = new Map<number, DialogRegistryItem>()
const pendingClosers = new Map<number, () => void>()

type DefaultOptionsKey = 'default' | ImperativeMode

const defaultOptionsStore: Record<DefaultOptionsKey, DialogShowOptions> = {
  default: {},
  show: {},
  alert: {},
  confirm: {},
}

const registerEntry = (key: number, options: DialogProps, meta: ImperativeMeta) => {
  const entry: DialogRegistryItem = { key, options, meta }
  const pendingClose = pendingClosers.get(key)
  if (pendingClose) {
    entry.close = pendingClose
    pendingClosers.delete(key)
  }
  dialogRegistry.set(key, entry)
}

const attachCloser = (key: number, close: () => void) => {
  const entry = dialogRegistry.get(key)
  if (entry) {
    entry.close = close
    return
  }
  pendingClosers.set(key, close)
}

const unregisterEntry = (key: number) => {
  dialogRegistry.delete(key)
  pendingClosers.delete(key)
}

const requestClose = (key: number) => {
  const entry = dialogRegistry.get(key)
  if (!entry) {
    Portal.remove(key)
    return
  }

  if (entry.close) {
    entry.close()
    return
  }

  Portal.remove(key)
  unregisterEntry(key)
}

const getRegistryItems = () =>
  Array.from(dialogRegistry.values()).map(item => ({
    key: item.key,
    options: item.options,
    meta: item.meta,
  }))

interface DialogPortalProps {
  options: DialogProps
  meta: ImperativeMeta
  portalKeyRef: { current: number }
}

const DialogPortalInstance: React.FC<DialogPortalProps> = ({ options, meta, portalKeyRef }) => {
  const [visible, setVisible] = React.useState(true)

  const close = React.useCallback(() => {
    setVisible(false)
  }, [])

  React.useEffect(() => {
    if (!portalKeyRef.current) return
    attachCloser(portalKeyRef.current, close)
    return () => {
      const entry = dialogRegistry.get(portalKeyRef.current ?? -1)
      if (entry && entry.close === close) {
        entry.close = undefined
      }
    }
  }, [close, portalKeyRef])

  React.useEffect(() => {
    return () => {
      if (portalKeyRef.current) {
        unregisterEntry(portalKeyRef.current)
      }
    }
  }, [portalKeyRef])

  const handleCancel = React.useCallback(async () => {
    const shouldClose = await runHook(options.onCancel)
    if (!shouldClose) return
    if (meta.mode === 'confirm') {
      meta.reject?.(false)
    }
    close()
  }, [close, meta, options.onCancel])

  const handleConfirm = React.useCallback(async () => {
    const shouldClose = await runHook(options.onConfirm)
    if (!shouldClose) return
    if (meta.mode === 'alert' || meta.mode === 'confirm') {
      meta.resolve?.(true)
    }
    close()
  }, [close, meta, options.onConfirm])

  const handleClose = React.useCallback(async () => {
    const shouldClose = await runHook(options.onClose)
    if (!shouldClose) return
    if (meta.mode === 'confirm') {
      meta.reject?.(false)
    }
    close()
  }, [close, meta, options.onClose])

  const handleClosed = React.useCallback(() => {
    options.onClosed?.()
    if (portalKeyRef.current) {
      Portal.remove(portalKeyRef.current)
      unregisterEntry(portalKeyRef.current)
    }
  }, [options, portalKeyRef])

  return (
    <Dialog
      {...options}
      visible={visible}
      onCancel={options.showCancelButton ? handleCancel : options.onCancel}
      onConfirm={handleConfirm}
      onClose={handleClose}
      onClosed={handleClosed}
    />
  )
}

const mountImperativeDialog = (options: DialogProps, meta: ImperativeMeta) => {
  const portalKeyRef = { current: 0 }
  const element = <DialogPortalInstance options={options} meta={meta} portalKeyRef={portalKeyRef} />
  const key = Portal.add(element)
  portalKeyRef.current = key
  registerEntry(key, options, meta)
  return () => requestClose(key)
}

const mergeWithDefaults = (
  mode: ImperativeMode,
  options: DialogShowOptions = {}
): DialogShowOptions => {
  const merged = deepMerge(
    deepMerge(
      deepMerge({} as DialogShowOptions, defaultOptionsStore.default),
      defaultOptionsStore[mode]
    ),
    options
  )
  return merged
}

const normalizeOptions = (mode: ImperativeMode, options: DialogShowOptions = {}) => {
  const merged = mergeWithDefaults(mode, options)
  const normalized: DialogProps = {
    ...merged,
    visible: true,
  } as DialogProps
  if (typeof normalized.showConfirmButton === 'undefined') {
    normalized.showConfirmButton = true
  }
  return normalized
}

const setDefaultOptions = (
  targetOrOptions: ImperativeMode | DialogShowOptions,
  maybeOptions?: DialogShowOptions
) => {
  if (typeof targetOrOptions === 'string') {
    defaultOptionsStore[targetOrOptions] = deepMerge(
      { ...defaultOptionsStore[targetOrOptions] },
      maybeOptions ?? {}
    )
    return
  }
  defaultOptionsStore.default = deepMerge({ ...defaultOptionsStore.default }, targetOrOptions)
}

const resetDefaultOptions = (target?: ImperativeMode) => {
  if (target) {
    defaultOptionsStore[target] = {}
    return
  }
  defaultOptionsStore.default = {}
  defaultOptionsStore.show = {}
  defaultOptionsStore.alert = {}
  defaultOptionsStore.confirm = {}
}

export const DialogImperative = {
  show: (options?: DialogShowOptions) =>
    mountImperativeDialog(normalizeOptions('show', options), { mode: 'show' }),
  alert: (options?: DialogAlertOptions) =>
    new Promise<void>(resolve => {
      mountImperativeDialog(
        normalizeOptions('alert', { ...options, showCancelButton: false }),
        {
          mode: 'alert',
          resolve,
        }
      )
    }),
  confirm: (options?: DialogConfirmOptions) =>
    new Promise<boolean>((resolve, reject) => {
      mountImperativeDialog(
        normalizeOptions('confirm', { showCancelButton: true, ...options }),
        {
          mode: 'confirm',
          resolve: () => resolve(true),
          reject: () => reject(false),
        }
      )
    }),
  clear: () => {
    Array.from(dialogRegistry.keys()).forEach(key => {
      requestClose(key)
    })
  },
  setDefaultOptions,
  resetDefaultOptions,
}

export const __DIALOG_STORE__ = {
  getItems: getRegistryItems,
  close: (key: number) => requestClose(key),
}
