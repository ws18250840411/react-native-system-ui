import React from 'react'
import type { ViewStyle } from 'react-native'
import { Modal, Platform } from 'react-native'

import { OverlayContainer } from '@react-native-aria/overlays'
import { useKeyboardDismissable } from '@react-native-aria/interactions'
import type { OverlayProps } from './types'

export const ExitAnimationContext = React.createContext({
  exited: true,
  setExited: (_exited: boolean) => { },
})

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
  const [exited, setExited] = React.useState(!resolvedOpen)

  useKeyboardDismissable({
    enabled: Platform.OS !== 'web' && resolvedOpen && isKeyboardDismissable,
    callback: onRequestClose ?? (() => { }),
  })

  let styleObj: ViewStyle & { display?: 'flex' | 'none' } = {}
  if (Platform.OS === 'web') {
    styleObj.zIndex = 9999
  }

  if (animationPreset === 'slide') {
    styleObj.overflow = 'hidden'
    styleObj.display = 'flex'
  } else {
    styleObj.display = exited && !resolvedOpen ? 'none' : 'flex'
  }

  if (!resolvedOpen && exited) {
    return null
  }

  if (useRNModal || (useRNModalOnAndroid && Platform.OS === 'android')) {
    return (
      <ExitAnimationContext.Provider value={{ exited, setExited }}>
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
      </ExitAnimationContext.Provider>
    )
  }

  return (
    <OverlayContainer style={[style, styleObj]}>
      <ExitAnimationContext.Provider value={{ exited, setExited }}>
        {children}
      </ExitAnimationContext.Provider>
    </OverlayContainer>
  )
})

Overlay.displayName = 'Overlay'

export default Overlay
