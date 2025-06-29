import '@/global.css';
import "@/styles/markdown.css";

import { Header } from "@/components/Header";
import { RootNavigator } from "@/components/StackNavigator";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { View } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Sidebar } from './components/SideBar';
import { menuRoutes } from './routes';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      // Hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <ThemeProvider value={DarkTheme}>
          <View className="flex-1 flex-row">
            <Header />
            <Sidebar routes={menuRoutes} />
            <RootNavigator />
          </View>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
