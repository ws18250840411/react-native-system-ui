import type { BaseRoute } from './types';

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
      ? joinPath([parentPath, route.path])
      : route.path;

    if (route.element) {
      acc.push({
        path: currentPath,
        element: route.element,
        options: route.options,
        name: route.name,
      });
    }

    if (route.children) {
      acc.push(...flattenRoutes(route.children, currentPath));
    }

    return acc;
  }, [] as BaseRoute<T>[]);
}
