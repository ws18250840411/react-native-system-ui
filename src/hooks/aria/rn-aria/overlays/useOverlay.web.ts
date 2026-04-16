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
  let {
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
      let index = visibleOverlays.indexOf(ref);
      if (index >= 0) {
        visibleOverlays.splice(index, 1);
      }
    };
  }, [isOpen, ref]);
  let onHide = () => {
    if (visibleOverlays[visibleOverlays.length - 1] === ref && onClose) {
      onClose();
    }
  };
  let onKeyDown = (e: any) => {
    if (e.key === 'Escape' && !isKeyboardDismissDisabled) {
      e.preventDefault();
      onHide();
    }
  };

  let { focusWithinProps } = useFocusWithin({
    isDisabled: !shouldCloseOnBlur,
    onBlurWithin: () => {
      onClose && onClose();
    },
  });

  return {
    overlayProps: {
      onKeyDown,
      ...focusWithinProps,
    },
  };
}
