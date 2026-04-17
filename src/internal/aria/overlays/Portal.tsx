import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

type OverlayItem = {
  id: number;
  node: ReactNode;
};

interface PortalContext {
  items: Array<OverlayItem>;
  setOverlayItem: (node: ReactNode) => number;
  removeOverlayItem: (id: number) => void;
  updateOverlayItem: (id: number, node: ReactNode) => void;
  isSSR?: boolean;
}

interface ModalProviderProps extends ViewProps {
  children: ReactNode;
  provider?: boolean;
}

const PortalContext = React.createContext<PortalContext | null>(null);

let globalOverlayCounter = 0;

export function PortalProvider(props: {
  children: ReactNode;
  isSSR?: boolean;
}) {
  const [items, setItems] = React.useState<Array<OverlayItem>>([]);

  const setOverlayItem = (element: ReactNode) => {
    const overlayId = ++globalOverlayCounter;
    setItems((prev) => prev.concat([{ id: overlayId, node: element }]));
    return overlayId;
  };

  const updateOverlayItem = (id: number, node: ReactNode) => {
    setItems((prev) => {
      const overlayItem = prev.find((item) => item.id == id);
      if (!overlayItem) {
        return prev.concat([{ id: id, node }]);
      } else {
        return prev.map((item) => {
          if (item.id === id) {
            return { id, node };
          }

          return item;
        });
      }
    });
  };

  const removeOverlayItem = (id: number) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      return newItems;
    });
  };

  return (
    <PortalContext.Provider
      value={{
        items,
        setOverlayItem,
        removeOverlayItem,
        updateOverlayItem,
        isSSR: props?.isSSR,
      }}
    >
      {props.children}

      {}
      {items.map((item) => {
        return <React.Fragment key={item.id}>{item.node}</React.Fragment>;
      })}
    </PortalContext.Provider>
  );
}

function OverlayView({ style, pointerEvents, ...props }: ModalProviderProps) {
  return (
    <View
      style={[StyleSheet.absoluteFill, { pointerEvents: pointerEvents ?? 'box-none' }, style]}
      collapsable={false}
      {...props}
    />
  );
}

export const OverlayProvider = PortalProvider;

export function OverlayContainer(props: ModalProviderProps) {
  const context = usePortalProvider();
  const overlayId = React.useRef<number | undefined>(undefined);
  const element = <OverlayView {...props} />;

  useEffect(
    () => {
      if (overlayId.current === undefined) {
        overlayId.current = context?.setOverlayItem(element);
      }
      else {
        if (overlayId.current) {
          context?.updateOverlayItem(overlayId.current, element);
        }
      }
    },
    [props]
  );
  useEffect(() => {
    return () => {
      if (overlayId.current) {
        context?.removeOverlayItem(overlayId.current);
      }
    };
  }, []);
  if (context?.isSSR && !overlayId.current) {
    return <View style={{ display: 'none' }}>{element}</View>;
  }
  return null;
}

function usePortalProvider() {
  const context = React.useContext(PortalContext);
  return context;
}
