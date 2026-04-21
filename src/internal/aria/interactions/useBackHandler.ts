import { useEffect } from 'react';
import { BackHandler } from 'react-native';

type IParams = {
  enabled?: boolean;
  callback: () => any;
};

export function useBackHandler({ enabled, callback }: IParams) {
  useEffect(() => {
    if (!enabled) return;
    const backHandler = () => {
      callback();
      return true;
    };
    const sub = BackHandler.addEventListener('hardwareBackPress', backHandler);
    return () => sub.remove();
  }, [enabled, callback]);
}
