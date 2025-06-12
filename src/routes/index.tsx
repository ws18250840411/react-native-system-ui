import type { StackRouteProps } from "./types";
import { flattenRoutes } from "./utils";

// guide 模块

// components 模块
import Button from "@/src/screens/components/button.md";

// 路由
export const stackRoutes: StackRouteProps[] = flattenRoutes([
  // {
  //   path: "/",
  //   element: Home,
  //   name: "Home",
  // },
  // {
  //   path: "/guide",
  //   children: [
  //     {
  //       path: "/introduce",
  //       element: Introduce,
  //       name: 'Introduce',
  //     },
  //     {
  //       path: "/quickstart",
  //       element: QuickStart,
  //       name: 'QuickStart',
  //     },
  //     {
  //       path: "/contribution",
  //       element: Contribution,
  //       name: 'Contribution',
  //     },
  //   ]
  // },
  {
    path: "/components",
    children: [
      {
        path: "/button",
        element: Button,
        name: "Button",
      },
    ],
  },
]);

export default stackRoutes;
