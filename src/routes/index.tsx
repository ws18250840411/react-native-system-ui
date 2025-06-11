import type { StackRouteProps } from "./types";

import { Examples } from "@/src/screens/example";
import Test from "@/src/screens/test.md";

// console.log(Test);
console.log(Examples);

// Stack 导航
export const stackRoutes: StackRouteProps[] = [
  {
    path: "/test",
    element: Test,
  },
];
