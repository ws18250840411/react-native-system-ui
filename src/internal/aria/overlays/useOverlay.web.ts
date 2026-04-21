import { HTMLAttributes, RefObject, useEffect } from 'react';
import { useFocusWithin } from '@react-aria/interactions';

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

const visibleOverlays: RefObject<HTMLElement>[] = [];


export function useOverlay(
  props: OverlayProps,
  ref: RefObject<HTMLElement>
): OverlayAria {
  const {
    onClose,
    shouldCloseOnBlur,
    isOpen,
    isKeyboardDismissDisabled = false,
  } = props;
  useEffect(() => {
    if (isOpen) {
      visibleOverlays.push(ref);
    }

    return () => {
      const index = visibleOverlays.indexOf(ref);
      if (index >= 0) {
        visibleOverlays.splice(index, 1);
      }
    };
  }, [isOpen, ref]);
  const onHide = () => {
    if (visibleOverlays[visibleOverlays.length - 1] === ref && onClose) {
      onClose();
    }
  };
  const onKeyDown = (e: any) => {
    if (e.key === 'Escape' && !isKeyboardDismissDisabled) {
      e.preventDefault();
      onHide();
    }
  };

  const { focusWithinProps } = useFocusWithin({
    isDisabled: !shouldCloseOnBlur,
    onBlurWithin: () => {
      onClose?.();
    },
  });

  return {
    overlayProps: {
      onKeyDown,
      ...focusWithinProps,
    },
  };
}
