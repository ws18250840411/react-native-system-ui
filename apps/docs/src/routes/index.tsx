import React from 'react';
import type { TabRouteProps, StackRouteProps } from './types';

// stack 路由
import About from '@/pages/about';
import Home from '@/pages/home';


// Stack 路由配置
export const stackRoutes: StackRouteProps[] = [
    {
        path: 'home',
        name: 'Home',
        component: Home,
    },
    {
        path: 'about',
        name: 'About',
        component: About,
    },
];