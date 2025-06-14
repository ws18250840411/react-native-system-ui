import { NotFound } from "@/components/NotFound";
import { stackRoutes } from "@/routes";
import { navigationRef } from "@/utils/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

// 配置linking选项
const linking = {
  prefixes: [], // 如果需要处理deep linking，可以在这里添加scheme
  config: {
    initialRouteName: "stack",
    screens: {
      stack: {
        path: "", // 根路径
        screens: stackRoutes.reduce((acc, route) => {
          // 处理子路由
          if (route.children) {
            const childScreens = route.children.reduce((childAcc, child) => {
              // 如果没有 path，跳过这个路由
              if (!child.path) return childAcc;
              return {
                ...childAcc,
                [child.path]: child.path,
              };
            }, {});
            // 只有当路由有 path 时才添加到配置中
            if (route.path) {
              return {
                ...acc,
                [route.path]: {
                  path: route.path,
                  screens: childScreens,
                },
              };
            }
            return acc;
          }
          // 处理普通路由，只有当路由有 path 时才添加
          if (!route.path) return acc;
          return {
            ...acc,
            [route.path]: route.path,
          };
        }, {}),
      },
      "+not-found": "*",
    },
  },
};

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
      }}
    >
      {stackRoutes.map(({ path, element, options }) => (
        <Stack.Screen
          key={path}
          name={path}
          component={element!}
          options={options!}
        />
      ))}
    </Stack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer  ref={navigationRef} fallback={<NotFound />} linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="stack" component={StackNavigator} />
        <Stack.Screen name="+not-found" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;