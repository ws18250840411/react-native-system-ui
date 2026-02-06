import React from 'react'
import type { ViewStyle } from 'react-native'
import { Modal, Platform } from 'react-native'

import { OverlayContainer } from '@react-native-aria/overlays'
import { useKeyboardDismissable } from '@react-native-aria/interactions'
import type { OverlayProps } from './types'

const webOverlayStyle: ViewStyle | undefined = Platform.OS === 'web'
  ? { zIndex: 9999, position: 'fixed' as 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
  : undefined

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

  return (
    <OverlayContainer style={[style, webOverlayStyle]}>
      {children}
    </OverlayContainer>
  )
})

Overlay.displayName = 'Overlay'

export default Overlay
