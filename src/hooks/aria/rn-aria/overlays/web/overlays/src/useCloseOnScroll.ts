//@ts-nocheck


import { RefObject, useEffect } from 'react';
export const onCloseMap: WeakMap<HTMLElement, () => void> = new WeakMap();

interface CloseOnScrollOptions {
  triggerRef: RefObject<HTMLElement>;
  isOpen?: boolean;
  onClose?: () => void;
}


export function useCloseOnScroll(opts: CloseOnScrollOptions) {
  let { triggerRef, isOpen, onClose } = opts;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let onScroll = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      if (!triggerRef.current || !target.contains(triggerRef.current)) {
        return;
      }

      let onCloseHandler = onClose || onCloseMap.get(triggerRef.current);
      if (onCloseHandler) {
        onCloseHandler();
      }
    };

    window.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [isOpen, onClose, triggerRef]);
}
