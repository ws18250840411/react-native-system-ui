import React from 'react';
import { ConfigProvider } from 'react-native-system-ui';

const App: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <ConfigProvider>{children}</ConfigProvider>;
};

export default App;
