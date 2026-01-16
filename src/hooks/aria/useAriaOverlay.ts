import * as React from 'react'
import { useOverlay } from '@react-native-aria/overlays'
import type { ViewProps } from 'react-native'

export interface UseAriaOverlayOptions {
  isOpen: boolean
  onClose?: () => void
  /**
   * 是否允许点击遮罩关闭
   * @default true
   */
  isDismissable?: boolean
  /**
   * 自定义是否在交互外关闭
   */
  shouldCloseOnInteractOutside?: (target: unknown) => boolean
  /**
   * 透传给 overlayProps 的其他属性
   */
  overlayProps?: Record<string, unknown>
}

export interface UseAriaOverlayResult {
  overlayRef: React.RefObject<unknown>
  overlayProps: Partial<ViewProps> & Record<string, unknown>
}

export const useAriaOverlay = ({
  isOpen,
  onClose,
  isDismissable = true,
  shouldCloseOnInteractOutside,
  overlayProps: overlayPropOverrides,
}: UseAriaOverlayOptions): UseAriaOverlayResult => {
  const overlayRef = React.useRef<unknown>(null)

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      isDismissable,
      shouldCloseOnInteractOutside,
    },
    overlayRef as unknown as React.RefObject<HTMLElement>
  )

  return {
    overlayRef,
    overlayProps: ({
      ...(overlayProps ?? {}),
      ...(overlayPropOverrides ?? {}),
    } as unknown as Partial<ViewProps> & Record<string, unknown>),
  }
}
