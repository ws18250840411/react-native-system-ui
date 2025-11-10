import type { ReactNode } from 'react'

export type ToastType = 'text' | 'success' | 'fail' | 'warning' | 'loading'
export type ToastPosition = 'top' | 'middle' | 'bottom'

export type ToastOptions = {
  message: ReactNode
  duration?: number
  type?: ToastType
  position?: ToastPosition
  icon?: ReactNode
  forbidClick?: boolean
  onClose?: () => void
}

type Listener = () => void

let currentToast: (ToastOptions & { id: number }) | null = null
const listeners = new Set<Listener>()
let timer: ReturnType<typeof setTimeout> | null = null

const notify = () => {
  listeners.forEach((listener) => listener())
}

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

export const showToast = (options: ToastOptions | ReactNode) => {
  const normalized: ToastOptions =
    typeof options === 'object' && options && 'message' in options
      ? options
      : { message: options as ReactNode }

  const data = {
    id: Date.now(),
    duration: normalized.duration ?? 2000,
    type: normalized.type ?? 'text',
    position: normalized.position ?? 'middle',
    icon: normalized.icon,
    forbidClick: normalized.forbidClick ?? false,
    message: normalized.message,
    onClose: normalized.onClose,
  }

  currentToast = data
  clearTimer()
  if (data.duration > 0) {
    timer = setTimeout(() => {
      clearToast()
    }, data.duration)
  }
  notify()

  return {
    close: () => clearToast(data.id),
  }
}

export const clearToast = (id?: number) => {
  if (id && currentToast && currentToast.id !== id) return
  if (!currentToast) return
  const onClose = currentToast.onClose
  currentToast = null
  clearTimer()
  notify()
  onClose?.()
}

export const subscribe = (listener: Listener) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const getToast = () => currentToast
