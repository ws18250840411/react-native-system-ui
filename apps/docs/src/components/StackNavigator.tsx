import { NavigationContainer, DefaultTheme, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Loading } from '@/components/Loading';
import { NotFound } from '@/components/NotFound';
import { stackRoutes } from '@/routes';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// 根据动态路由配置生成linking配置
const generateLinkingConfig = () => {
    // 生成Stack路由配置
    const stackScreens = stackRoutes.reduce((acc, route) => {
        acc[route.name] = route.path;
        return acc;
    }, {} as Record<string, string>);

    return {
        screens: {
            ...stackScreens,
            NotFound: '*',
        },
    };
};

// 配置deep linking
const linking: LinkingOptions<{}> = {
    prefixes: [],
    config: generateLinkingConfig(),
    // 过滤函数，避免处理某些特定路径
    filter: (url: string) => {
        // 过滤掉不需要处理的路径
        return !url.includes('expo-auth-session') && !url.includes('auth');
    },
};

export function RootNavigator() {
    const authRoutes = stackRoutes.filter(({ authRequired }) => authRequired !== false);
    const unauthorizedRoutes = stackRoutes.filter(({ authRequired }) => authRequired === false);

    console.log('需要认证的路由:', authRoutes.map(r => r.name));
    console.log('无需认证的路由:', unauthorizedRoutes.map(r => r.name));

    return (
        <NavigationContainer
            theme={DefaultTheme}
            fallback={<Loading />}
            linking={linking}
        >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {authRoutes.map(({ path, name, component, options = {} }) => (
                    <Stack.Screen
                        key={path}
                        name={name}
                        component={component}
                        options={options as NativeStackNavigationOptions}
                    />
                ))}
                <Stack.Screen name="NotFound" component={NotFound} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootNavigator;