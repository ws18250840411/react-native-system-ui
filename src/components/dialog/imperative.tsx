import React from 'react'

import { Portal } from '../portal/Portal'
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
      activeKeys.delete(portalKeyRef.current)
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

const activeKeys = new Set<number>()

const mountImperativeDialog = (options: DialogProps, meta: ImperativeMeta) => {
  const portalKeyRef = { current: 0 }
  const element = <DialogPortalInstance options={options} meta={meta} portalKeyRef={portalKeyRef} />
  const key = Portal.add(element)
  portalKeyRef.current = key
  activeKeys.add(key)
  return () => {
    Portal.remove(key)
    activeKeys.delete(key)
  }
}

const normalizeOptions = (options: DialogShowOptions = {}) => ({
  showConfirmButton: options.showConfirmButton ?? true,
  ...options,
  visible: true,
}) as DialogProps

export const DialogImperative = {
  show: (options?: DialogShowOptions) => mountImperativeDialog(normalizeOptions(options), { mode: 'show' }),
  alert: (options?: DialogAlertOptions) =>
    new Promise<void>(resolve => {
      mountImperativeDialog(
        normalizeOptions({ ...options, showCancelButton: false }),
        {
          mode: 'alert',
          resolve,
        }
      )
    }),
  confirm: (options?: DialogConfirmOptions) =>
    new Promise<boolean>((resolve, reject) => {
      mountImperativeDialog(
        normalizeOptions({ showCancelButton: true, ...options }),
        {
          mode: 'confirm',
          resolve: () => resolve(true),
          reject: () => reject(false),
        }
      )
    }),
  clear: () => {
    Array.from(activeKeys).forEach(key => {
      Portal.remove(key)
      activeKeys.delete(key)
    })
  },
}

export const __DIALOG_STORE__ = {
  getItems: () => [],
}
