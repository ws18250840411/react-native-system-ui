import { stackRoutes } from "@/routes";
import {
  CommonActions,
  createNavigationContainerRef,
  ParamListBase,
  StackActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<ParamListBase>();

export type NavigateParams = {
  path: string;
  params?: Record<string, any>;
};

type RouteGuard = {
  beforeEach?: (
    to: string,
    from: string | undefined
  ) => boolean | string | Promise<boolean | string>;
  afterEach?: (to: string, from: string | undefined) => void;
};

const guards: RouteGuard = {};

export const setRouteGuard = (guard: RouteGuard) => {
  Object.assign(guards, guard);
};

console.log(stackRoutes)
// 扁平化所有路由配置并创建映射
export const getAllRoutes = () => {
  const routes = new Map<
    string,
    {
      type: "tab" | "stack";
      path: string;
    }
  >();

  stackRoutes.forEach((route) => {
    routes.set(route.path, {
      type: "stack",
      path: route.path,
    });
  });


  return routes;
};

const routeMap = getAllRoutes();

// 路由解析函数
function parseRoute(path: string) {
  // 查找匹配的路由
  const matchedRoute = routeMap.get(path);
  if (matchedRoute) {
    return {
      screen: matchedRoute.type,
      params: {
        screen: matchedRoute.path,
      },
    };
  }

  // 如果没有匹配到，返回 404 路由信息
  return {
    screen: "+not-found",
    params: { screen: path }, // 可以将原始路径传递给 404 页面
  };
}

// 智能跳转，优先回到已存在的屏幕
export const navigate = async (path: string, params?: Record<string, any>) => {
  if (navigationRef.isReady()) {
    const currentRoute = navigationRef.getCurrentRoute()?.name;
    let targetPath = path; // 使用一个变量来存储可能被守卫修改的路径

    if (guards.beforeEach) {
      const result = await guards.beforeEach(targetPath, currentRoute);
      if (typeof result === "boolean" && !result) {
        return; // 守卫阻止导航
      }
      if (typeof result === "string") {
        targetPath = result; // 守卫重定向路径
      }
    }

    const route = parseRoute(targetPath); // 使用最终的目标路径进行解析

    navigationRef.navigate(route.screen, {
      ...route.params,
      ...params,
    });

    guards.afterEach?.(targetPath, currentRoute); // 使用最终的目标路径调用 afterEach
  }
};

// 强制创建新屏幕并添加到栈顶
export const push = (path: string, params?: Record<string, any>) => {
  if (navigationRef.isReady()) {
    const route = parseRoute(path);
    navigationRef.dispatch(
      StackActions.push(route.screen, {
        ...route.params,
        ...params,
      })
    );
  }
};

// 替换当前栈顶屏幕
export const replace = (path: string, params?: Record<string, any>) => {
  if (navigationRef.isReady()) {
    const route = parseRoute(path);
    navigationRef.dispatch(
      StackActions.replace(route.screen, {
        ...route.params,
        ...params,
      })
    );
  }
};

// 清空并重建导航栈
export const reset = (path: string, params?: Record<string, any>) => {
  if (navigationRef.isReady()) {
    const route = parseRoute(path);
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: route.screen,
            params: {
              ...route.params,
              ...params,
            },
          },
        ],
      })
    );
  }
};

export const goBack = () => {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
};
