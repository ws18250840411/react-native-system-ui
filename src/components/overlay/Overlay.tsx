import React from 'react'
import type { ViewStyle } from 'react-native'
import { Modal, Platform } from 'react-native'
import { OverlayContainer } from '@react-native-aria/overlays'
import { useKeyboardDismissable } from '@react-native-aria/interactions'
import type { OverlayProps } from './types'
import { useOverlayTokens } from './tokens'

const IS_WEB = Platform.OS === 'web'
const NOOP = () => {}

const OverlayImpl = (props: OverlayProps, ref: React.ForwardedRef<React.ComponentRef<typeof Modal>>) => {
  const { children, isOpen: openP, visible: visP, useRNModal: useModalP, useRNModalOnAndroid: useModalAndroidP = false, isKeyboardDismissable: kbDismissP = true, animationPreset: animP = 'fade', onRequestClose, style } = props; const tokens = useOverlayTokens(); const useModal = useModalP ?? !IS_WEB; const webStyle: ViewStyle | undefined = IS_WEB ? { zIndex: tokens.layer.zIndex, position: 'fixed' as 'absolute', top: 0, left: 0, right: 0, bottom: 0 } : undefined; const open = openP ?? visP ?? false
  useKeyboardDismissable({ enabled: !IS_WEB && open && kbDismissP, callback: onRequestClose ?? NOOP }); if (!open) return null; if (useModal || (useModalAndroidP && Platform.OS === 'android')) return <Modal statusBarTranslucent transparent visible={open} onRequestClose={onRequestClose} animationType={animP} ref={ref}>{children}</Modal>; return <OverlayContainer style={[style, webStyle]}>{children}</OverlayContainer>
}

const OverlayForwardRef = React.forwardRef<React.ComponentRef<typeof Modal>, OverlayProps>(OverlayImpl)
OverlayForwardRef.displayName = 'Overlay'
export const Overlay = React.memo(OverlayForwardRef)
export default Overlay
