import type { StackRouteProps } from "./types";

// guide 模块
import Contribution from "@/src/screens/guide/contribution.md";
import Introduce from "@/src/screens/guide/introduce.md";
import QuickStart from "@/src/screens/guide/quick-start.md";
import Home from "@/src/screens/home.md";

// components 模块
import Button from "@/src/screens/components/button.md";

// stack 导航
export const stackRoutes: StackRouteProps[] = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/guide/introduce",
    element: Introduce,
  },
  {
    path: "/guide/quickstart",
    element: QuickStart,
  },
  {
    path: "/guide/contribution",
    element: Contribution,
  },
];

// 组件导航
export const componentsRoutes: StackRouteProps[] = [
  {
    path: "/components/button",
    element: Button,
  },
];
