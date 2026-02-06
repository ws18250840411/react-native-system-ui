import React from 'react'
import type { ViewStyle } from 'react-native'
import { Modal, Platform } from 'react-native'

import { OverlayContainer } from '@react-native-aria/overlays'
import { useKeyboardDismissable } from '@react-native-aria/interactions'
import type { OverlayProps } from './types'

const IS_WEB = Platform.OS === 'web'

const webOverlayStyle: ViewStyle | undefined = IS_WEB
  ? { zIndex: 9999, position: 'fixed' as 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
  : undefined

const OverlayImpl = (
  props: OverlayProps,
  ref: React.ForwardedRef<React.ComponentRef<typeof Modal>>,
) => {
  const {
    children,
    isOpen,
    visible,
    useRNModal,
    useRNModalOnAndroid = false,
    isKeyboardDismissable = true,
    animationPreset = 'fade',
    onRequestClose,
    style,
  } = props


  const shouldUseModal = useRNModal ?? !IS_WEB

  const resolvedOpen = isOpen ?? visible ?? false

  useKeyboardDismissable({
    enabled: !IS_WEB && resolvedOpen && isKeyboardDismissable,
    callback: onRequestClose ?? (() => { }),
  })

  if (!resolvedOpen) return null

  if (shouldUseModal || (useRNModalOnAndroid && Platform.OS === 'android')) {
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
}

const OverlayForwardRef = React.forwardRef<React.ComponentRef<typeof Modal>, OverlayProps>(OverlayImpl)
OverlayForwardRef.displayName = 'Overlay'
export const Overlay = React.memo(OverlayForwardRef)

export default Overlay
