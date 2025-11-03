/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import '@/global.css';
import { enableScreens } from 'react-native-screens';
import { Provider as SystemUIProvider } from 'react-native-system-ui';
import { RootNavigator } from '@/router';
import { LocaleProvider } from '@/context/LocaleContext';
import { ThemeProvider } from '@/context/ThemeContext';

// 启用原生屏幕容器
enableScreens();

function App() {
  return (
    <SystemUIProvider>
      <LocaleProvider>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </LocaleProvider>
    </SystemUIProvider>
  );
}

export default App;
