import { StackRouteProps } from "@/routes/types";
import { navigate, navigationRef } from "@/utils/navigation";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type MenuItem = {
  title: string;
  path?: string;
  children?: MenuItem[];
};

function MenuGroup({ title, children }: { title: string; children: MenuItem[] }) {
  return (
    <View className="mb-4">
      <Text className="px-4 py-2 text-sm font-medium text-gray-500">{title}</Text>
      {children.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}
    </View>
  );
}

function MenuItem({ title, path, children }: MenuItem) {
  if (!title) return null;

  if (children) {
    return <MenuGroup title={title} children={children} />;
  }

  return (
    <Pressable
      className="flex-row items-center px-4 py-2 hover:bg-gray-100 active:bg-gray-200"
      onPress={() => path && navigate(path)}
    >
      <Text className="text-sm text-gray-900">{title}</Text>
    </Pressable>
  );
}

function transformRouteToMenuItem(route: StackRouteProps): MenuItem | null {
  if (!route.path && !route.title && !route.children) return null;

  return {
    title: route.title || '',
    path: route.path,
    children: route.children?.map(child => transformRouteToMenuItem(child)).filter(Boolean) as MenuItem[]
  };
}

function createMenuStructure(routes: StackRouteProps[], currentPath: string) {
  const menuItems: MenuItem[] = [];
  
  // 判断当前路径是否属于指南或组件部分
  const isGuidePath = currentPath.startsWith('/guide');
  const isComponentPath = currentPath.startsWith('/components');

  if (!isGuidePath && !isComponentPath) {
    return menuItems; // 如果都不匹配，返回空数组
  }

  if (isGuidePath) {
    // 文档分组
    const docRoutes = routes.find(route => route.path === '/guide');
    if (docRoutes && docRoutes.children) {
      menuItems.push({
        title: '文档',
        children: docRoutes.children.map(child => transformRouteToMenuItem(child)).filter(Boolean) as MenuItem[]
      });
    }
  } else if (isComponentPath) {
    // 组件分组
    const componentRoutes = routes.find(route => route.path === '/components');
    if (componentRoutes && componentRoutes.children) {
      menuItems.push({
        title: '组件',
        children: componentRoutes.children
          .flatMap(group => group.children || [])
          .map(child => transformRouteToMenuItem(child))
          .filter(Boolean) as MenuItem[]
      });
    }
  }

  return menuItems;
}

export function Sidebar({ routes }: { routes: StackRouteProps[] }) {
  const currentRoute = navigationRef.getCurrentRoute();
  const currentPath = currentRoute?.name || '';
  
  const menuItems = createMenuStructure(routes, currentPath);
  console.log(currentPath)
  console.log(menuItems)

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <View className="w-[220px] pt-[60px]">
      <ScrollView className="bg-white border-r border-gray-200">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </ScrollView>
    </View>
  );
}

export default Sidebar;