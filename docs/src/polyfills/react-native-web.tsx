import React from 'react';
import * as ReactNativeWeb from 'react-native-web';

const { View } = ReactNativeWeb as typeof ReactNativeWeb & {
  View: React.ComponentType<any>;
};

type InputAccessoryViewProps = React.ComponentProps<typeof View>;

const InputAccessoryView = React.forwardRef<any, InputAccessoryViewProps>(
  ({ children, ...rest }, ref) => {
    return (
      <View ref={ref} {...rest}>
        {children}
      </View>
    );
  },
);

export * from 'react-native-web';
export { InputAccessoryView };
export default ReactNativeWeb;
