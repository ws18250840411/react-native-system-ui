import type React from 'react'
import { useEffect, useRef } from 'react'
import { AccessibilityInfo } from 'react-native'
import { isText } from '../utils/base'

export const useLatestRef = <T,>(value: T) => {
  const ref = useRef(value)
  ref.current = value
  return ref
}

interface VisibilityLifecycleOptions {
  visible: boolean
  mounted: boolean
  openedDelay?: number
  onOpen?: () => void
  onOpened?: () => void
  onClosed?: () => void
}

export const useVisibilityLifecycle = ({
  visible,
  mounted,
  openedDelay = 0,
  onOpen,
  onOpened,
  onClosed,
}: VisibilityLifecycleOptions) => {
  const callbacksRef = useLatestRef({ onOpen, onOpened, onClosed })
  const previousVisibleRef = useRef(visible)
  const closingRef = useRef(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    if (visible) {
      closingRef.current = false
      if (!previousVisibleRef.current) {
        callbacksRef.current.onOpen?.()
        if (callbacksRef.current.onOpened) {
          timeout = setTimeout(() => { callbacksRef.current.onOpened?.() }, openedDelay)
        }
      }
    } else if (previousVisibleRef.current) {
      closingRef.current = true
    }

    previousVisibleRef.current = visible
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [callbacksRef, openedDelay, visible])

  useEffect(() => {
    if (!mounted || !closingRef.current) return
    closingRef.current = false
    callbacksRef.current.onClosed?.()
  }, [callbacksRef, mounted])
}

export const useAutoClose = ({
  visible,
  duration,
  onClose,
}: {
  visible: boolean
  duration: number
  onClose?: () => void
}) => {
  const onCloseRef = useLatestRef(onClose)

  useEffect(() => {
    if (!visible || duration <= 0) return
    const timeout = setTimeout(() => {
      onCloseRef.current?.()
    }, duration)
    return () => clearTimeout(timeout)
  }, [duration, onCloseRef, visible])
}

export const useAccessibilityAnnouncement = ({
  visible,
  message,
}: {
  visible: boolean
  message?: React.ReactNode
}) => {
  useEffect(() => {
    if (!visible || !isText(message)) return
    const text = String(message)
    if (text) AccessibilityInfo.announceForAccessibility?.(text)
  }, [message, visible])
}
