/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import '@/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { RootNavigator } from '@/components/StackNavigator';
import { LocaleProvider } from '@/context/LocaleContext';

// 启用原生屏幕容器
enableScreens();

function App() {
  return (
    <LocaleProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </LocaleProvider>
  );
}

export default App;
