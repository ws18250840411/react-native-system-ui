import { HTMLAttributes, RefObject } from 'react';

interface OverlayProps {
  
  isOpen?: boolean;

  
  onClose?: () => void;

  
  isDismissable?: boolean;

  
  shouldCloseOnBlur?: boolean;

  
  isKeyboardDismissDisabled?: boolean;

  
  shouldCloseOnInteractOutside?: (element: HTMLElement) => boolean;
}

interface OverlayAria {
  
  overlayProps: HTMLAttributes<HTMLElement>;
}


export function useOverlay(
  _props: OverlayProps,
  _ref: RefObject<HTMLElement>
): OverlayAria {
  return {
    overlayProps: {},
  };
}
