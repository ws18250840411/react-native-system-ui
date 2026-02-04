import React from 'react';
import { ConfigProvider } from 'react-native-system-ui';

const App: React.FC<React.PropsWithChildren> = ({ children }) => {
    console.log('App')
    return <ConfigProvider>{children}</ConfigProvider>;
};

export default App;
