

import { HTMLAttributes, RefObject } from 'react';
import { OverlayTriggerState } from '@react-stately/overlays';

interface OverlayTriggerProps {
  
  type: 'dialog' | 'menu' | 'listbox' | 'tree' | 'grid';
}

interface OverlayTriggerAria {
  
  triggerProps: any;

  
  overlayProps: HTMLAttributes<HTMLElement>;
}


export function useOverlayTrigger(
  _props: OverlayTriggerProps,
  state: OverlayTriggerState,
  _ref: RefObject<HTMLElement>
): OverlayTriggerAria {
  return {
    triggerProps: {
      'aria-expanded': state.isOpen,
    },
    overlayProps: {},
  };
}
