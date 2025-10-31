import React from 'react';
import type { TabRouteProps, StackRouteProps } from './types';

// stack 路由
import Docs from '@/pages/docs';
import Home from '@/pages/home';
import ComponentDoc from '@/pages/component';


// Stack 路由配置
export const stackRoutes: StackRouteProps[] = [
    {
        path: 'home',
        name: 'Home',
        component: Home,
    },
    {
        path: 'docs',
        name: 'Docs',
        component: Docs,
    },
    {
        path: 'components/:slug?',
        name: 'ComponentDoc',
        component: ComponentDoc,
    },
];
