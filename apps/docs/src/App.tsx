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

// 启用原生屏幕容器
enableScreens();

function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default App;
