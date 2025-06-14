import type { StackRouteProps } from "./types";
import { flattenRoutes } from "./utils";

// guide 模块
import Contribution from "@/screens/guide/contribution.md";
import Introduce from "@/screens/guide/introduce.md";
import QuickStart from "@/screens/guide/quick-start.md";
import Home from "@/screens/home.md";

// components 模块
import Button from "@/screens/components/button.md";

// 路由
export const routes = [
  {
    title: "首页",
    path: "/",
    element: Home,
  },
  {
    path: "/guide",
    children: [
      {
        title: '💁 介绍',
        path: "/introduce",
        element: Introduce,
      },
      {
        title: '⚡️ 快速上手',
        path: "/quickstart",
        element: QuickStart,
      },
      {
        title: '开发指南',
        path: "/contribution",
        element: Contribution,
      },
    ]
  },
  {
    path: "/components",
    children: [
      {
        title: "基础组件",
        children: [
          {
            title: "Button 按钮",
            path: "/button",
            element: Button,
          },
        ]
      },
    ],
  },
];

export const stackRoutes: StackRouteProps[] = flattenRoutes(routes);
export default stackRoutes;
