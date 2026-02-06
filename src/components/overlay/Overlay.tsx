import React from 'react'
import type { ViewStyle } from 'react-native'
import { Modal, Platform } from 'react-native'

import { OverlayContainer } from '@react-native-aria/overlays'
import { useKeyboardDismissable } from '@react-native-aria/interactions'
import type { OverlayProps } from './types'

export const Overlay = React.forwardRef<
  React.ComponentRef<typeof Modal>,
  OverlayProps
>((props, ref) => {
  const {
    children,
    isOpen,
    visible,
    useRNModal = false,
    useRNModalOnAndroid = false,
    isKeyboardDismissable = true,
    animationPreset = 'fade',
    onRequestClose,
    style,
  } = props

  const resolvedOpen = isOpen ?? visible ?? false

  useKeyboardDismissable({
    enabled: Platform.OS !== 'web' && resolvedOpen && isKeyboardDismissable,
    callback: onRequestClose ?? (() => { }),
  })

  if (!resolvedOpen) return null

  if (useRNModal || (useRNModalOnAndroid && Platform.OS === 'android')) {
    return (
      <Modal
        statusBarTranslucent
        transparent
        visible={resolvedOpen}
        onRequestClose={onRequestClose}
        animationType={animationPreset}
        ref={ref}
      >
        {children}
      </Modal>
    )
  }

  const styleObj: ViewStyle = Platform.OS === 'web' ? { zIndex: 9999 } : {}

  return (
    <OverlayContainer style={[style, styleObj]}>
      {children}
    </OverlayContainer>
  )
})

Overlay.displayName = 'Overlay'

export default Overlay
