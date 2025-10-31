import type { StackRouteProps } from './types';

// stack 路由
import GuideScreen from './screens/GuideScreen';
import HomeScreen from './screens/HomeScreen';
import ComponentDocScreen from './screens/ComponentDocScreen';


// Stack 路由配置
export const stackRoutes: StackRouteProps[] = [
  {
    path: 'home',
    name: 'Home',
    component: HomeScreen,
  },
  {
    path: 'guide/:slug?',
    name: 'Guide',
    component: GuideScreen,
  },
  {
    path: 'components/:slug?',
    name: 'ComponentDoc',
    component: ComponentDocScreen,
  },
];
