import type { BaseRoute, StackRouteProps } from './types';

export const joinPath = (paths: string[]) =>
  paths
    .filter(p => p !== undefined && p !== null)
    .join('/')
    .replace(/\/{2,}/g, '/');

// 递归展平路由
export function flattenRoutes<T>(
  routes: BaseRoute<T>[],
  parentPath = '',
): BaseRoute<T>[] {
  return routes.reduce((acc, route) => {
    const currentPath = parentPath
      ? joinPath([parentPath, route.path || ''])
      : route.path;

    if (route.element) {
      acc.push({
        path: currentPath,
        element: route.element,
        options: route.options,
        title: route.title,
      });
    }

    if (route.children) {
      acc.push(...flattenRoutes(route.children, currentPath));
    }

    return acc;
  }, [] as BaseRoute<T>[]);
}

// 处理路由
export function processRoutes(routes: StackRouteProps[], parentPath: string = '') {
  return routes.map(route => {
    const currentPath = parentPath
      ? joinPath([parentPath, route.path || ''])
      : route.path;

    return {
      ...route,
      path: currentPath,
      children: route.children
        ? processRoutes(route.children, currentPath)
        : undefined
    };
  });
}