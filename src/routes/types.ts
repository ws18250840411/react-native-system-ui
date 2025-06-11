import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

// 基础路由类型
export type BaseRoute<T> = {
  path: string;
  name?: string;
  element?:
    | React.ComponentType<{}>
    | React.ComponentType<{
        route: RouteProp<ParamListBase, any>;
        navigation: any;
      }>;
  options?: T;
  children?: BaseRoute<T>[];
};

// Tab路由选项类型
type TabRouteOptions =
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, any>;
      navigation: BottomTabNavigationProp<ParamListBase, string>;
      theme: ReactNavigation.Theme;
    }) => BottomTabNavigationOptions);

// Stack路由选项类型
type StackRouteOptions =
  | NativeStackNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, any>;
      navigation: NativeStackNavigationProp<ParamListBase, string>;
      theme: ReactNavigation.Theme;
    }) => NativeStackNavigationOptions);

// Tab 导航
export type TabRouteProps = BaseRoute<TabRouteOptions>;

// Stack 导航
export type StackRouteProps = BaseRoute<StackRouteOptions>;
