import { StackRouteProps } from "@/routes/types";
import { navigate } from "@/utils/navigation";
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
  
  // 找到根路由，需要处理带 '/' 前缀的路径
  const rootPath = '/' + (currentPath.split('/')[1] || '');
  const rootRoute = routes.find(route => route.path === rootPath);
  
  if (!rootRoute) {
    return menuItems;
  }

  // 如果是指南路由
  if (rootRoute.path === '/guide') {
    menuItems.push({
      title: rootRoute.title || '指南',
      children: rootRoute.children
        ?.map(child => transformRouteToMenuItem(child))
        .filter(Boolean) as MenuItem[]
    });
  }
  
  // 如果是组件路由，保持原有的分组结构
  if (rootRoute.path === '/components') {
    menuItems.push(...(rootRoute.children || [])
      .map(group => ({
        title: group.title || '',
        children: group.children
          ?.map(child => transformRouteToMenuItem(child))
          .filter(Boolean) as MenuItem[]
      }))
      .filter(group => group.title && group.children?.length > 0)
    );
  }

  return menuItems;
}

export function Sidebar({ routes }: { routes: StackRouteProps[] }) {
  const currentPath = window.location.pathname || '';
  const menuItems = createMenuStructure(routes, currentPath);

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