import { NotFound } from "@/src/components/NotFound";
import { stackRoutes } from "@/src/routes";
import { navigationRef } from "@/src/utils/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  console.log(stackRoutes)
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
      }}
    >
      {stackRoutes.map(({ path, element,name, options }) => (
        <Stack.Screen
          key={path}
          name={name}
          component={element!}
          options={options!}
        />
      ))}
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef} fallback={<NotFound />}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="stack" component={StackNavigator} />
        <Stack.Screen name="+not-found" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
