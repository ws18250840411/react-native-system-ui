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
    <View>
      <Text className="py-2 px-4 text-[#141414] font-semibold text-[15px] leading-[28px]">{title}</Text>
      {children.map((item, index) => (
        <MenuItem currentPath={""} key={index} {...item} />
      ))}    
    </View>
  );
}

function MenuItem({ title, path, children, currentPath }: MenuItem & { currentPath: string }) {
  if (!title) return null;

  if (children) {
    return <MenuGroup title={title} children={children.map(child => ({
      ...child,
      currentPath
    }))} />;
  }

  // 修改 isActive 判断逻辑，确保路径格式一致
  const isActive = path && currentPath ? ('/' + currentPath.split('/')[1] + '/' + currentPath.split('/')[2]) === path : false;
  return (
    <Pressable
      className={`rounded-md flex-row items-center px-4 py-2 ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'} active:bg-gray-200`}
      onPress={() => path && navigate(path)}
    >
      <Text className={`text-sm ${isActive ? 'text-blue-600 font-medium' : 'text-gray-900'}`}>{title}</Text>
    </Pressable>
  );
}

export function Sidebar({ routes }: { routes: StackRouteProps[] }) {
  const [currentPath, setCurrentPath] = React.useState('');

  React.useEffect(() => {
    // 订阅导航状态变化
    const unsubscribe = navigationRef.addListener('state', () => {
      if (navigationRef.isReady()) {
        const route = navigationRef.getCurrentRoute();
        setCurrentPath(route?.name || '');
      }
    });

    // 初始化当前路径
    if (navigationRef.isReady()) {
      const route = navigationRef.getCurrentRoute();
      setCurrentPath(route?.name || '');
    }

    return unsubscribe;
  }, []);

  const menuItems = createMenuStructure(routes, currentPath);

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <View className="w-[220px] p-[10px] pt-[60px]">
      <ScrollView>
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} currentPath={currentPath} />
        ))}      
      </ScrollView>
    </View>
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

export default Sidebar;