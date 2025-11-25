import * as React from 'react'
import { useOverlay } from '@react-native-aria/overlays'

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
  shouldCloseOnInteractOutside?: (target: any) => boolean
  /**
   * 透传给 overlayProps 的其他属性
   */
  overlayProps?: Record<string, any>
}

export interface UseAriaOverlayResult {
  overlayRef: React.RefObject<any>
  overlayProps: Record<string, any>
}

export const useAriaOverlay = ({
  isOpen,
  onClose,
  isDismissable = true,
  shouldCloseOnInteractOutside,
  overlayProps: overlayPropOverrides,
}: UseAriaOverlayOptions): UseAriaOverlayResult => {
  const overlayRef = React.useRef<any>(null)

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      isDismissable,
      shouldCloseOnInteractOutside,
    },
    overlayRef
  )

  return {
    overlayRef,
    overlayProps: {
      ...(overlayProps ?? {}),
      ...(overlayPropOverrides ?? {}),
    },
  }
}
