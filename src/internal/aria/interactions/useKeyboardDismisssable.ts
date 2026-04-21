import { useEffect } from 'react';
import { useBackHandler } from './useBackHandler';

type IParams = {
  enabled?: boolean;
  callback: () => any;
};

let keyboardDismissHandlers: Array<() => any> = [];
export const keyboardDismissHandlerManager = {
  push: (handler: () => any) => {
    keyboardDismissHandlers.push(handler);
    return () => {
      keyboardDismissHandlers = keyboardDismissHandlers.filter(
        (h) => h !== handler
      );
    };
  },
  length: () => keyboardDismissHandlers.length,
  pop: () => {
    return keyboardDismissHandlers.pop();
  },
};


export const useKeyboardDismissable = ({ enabled, callback }: IParams) => {
  useEffect(() => {
    if (enabled) return keyboardDismissHandlerManager.push(callback);
  }, [enabled, callback]);

  useBackHandler({ enabled, callback });
};
