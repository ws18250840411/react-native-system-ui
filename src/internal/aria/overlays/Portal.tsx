import React, { useEffect, type ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

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
        return prev.map((item) => item.id === id ? { id, node } : item);
      }
    });
  };

  const removeOverlayItem = (id: number) => {
    setItems((prev) => {
      return prev.filter((item) => item.id !== id);
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
