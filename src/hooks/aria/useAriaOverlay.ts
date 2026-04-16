import * as React from 'react'
import { useMemo, useRef } from 'react'
import { useOverlay } from './rn-aria/overlays'
import { mergeProps } from './rn-aria/utils'
import type { ViewProps } from 'react-native'
export interface UseAriaOverlayOptions { isOpen: boolean; onClose?: () => void; isDismissable?: boolean; shouldCloseOnInteractOutside?: (target: unknown) => boolean; overlayProps?: Record<string, unknown> }
export interface UseAriaOverlayResult { overlayRef: React.RefObject<unknown>; overlayProps: Partial<ViewProps> & Record<string, unknown> }
export const useAriaOverlay = ({ isOpen, onClose, isDismissable = true, shouldCloseOnInteractOutside, overlayProps: overrides }: UseAriaOverlayOptions): UseAriaOverlayResult => {
  const overlayRef = useRef<unknown>(null)
  const { overlayProps } = useOverlay({ isOpen, onClose, isDismissable, shouldCloseOnInteractOutside }, overlayRef as unknown as React.RefObject<HTMLElement>)
  const resolved = useMemo(() => mergeProps(overlayProps ?? {}, overrides ?? {}) as unknown as Partial<ViewProps> & Record<string, unknown>, [overrides, overlayProps])
  return { overlayRef, overlayProps: resolved }
}
