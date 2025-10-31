import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Text, ScrollView, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '@/stores/userInfo';
import { login } from '@/services/user';
import { useRequest } from 'ahooks';
import { Button } from '@ant-design/react-native';

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('提示', '请输入邮箱和密码');
            return;
        }
        const result = await login({ email, password });
        console.log('登录结果', result);
        if (result?.success) {
            useUserInfoStore.setState({
                token: result?.data?.token || '',
            });
            navigation.navigate('MainTabs' as never);
        }
    };

    const handleWechatLogin = () => {
        // 微信登录逻辑
        console.log('微信登录');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                {/* 欢迎文本 */}
                <View className="mt-12">
                    <Text className="text-4xl font-bold text-gray-900">嗨～</Text>
                    <Text className="text-4xl font-bold text-gray-900 mt-1">现在加入我们吧!</Text>
                </View>

                <View className="mt-6">
                    <Text className="text-sm text-gray-500">欢迎来到i健康，</Text>
                    <Text className="text-sm text-gray-500">有很多人在期盼你的到来呢</Text>
                </View>
                {/* 输入表单 */}
                <View className="mt-12">
                    <TextInput
                        className="bg-[#ECF2FF] h-[50px] px-6 mb-4 rounded-full text-base text-gray-900"
                        placeholder="邮箱"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"         // 邮箱不需要自动大写
                        autoCorrect={false}           // 关闭自动纠正
                        textContentType="emailAddress" // 提示系统这是邮箱输入（辅助自动填充）
                    />
                    <View className="flex-row justify-center">
                        <TextInput
                            secureTextEntry
                            className="flex-1 bg-[#ECF2FF] h-[50px] px-6 mb-4 rounded-full text-base text-gray-900"
                            placeholder="密码"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity className="flex-row items-center justify-center bg-[#ECF2FF] h-[50px] w-[50px] rounded-full ml-4" onPress={handleLogin} >
                            <Image className='w-[22px] h-[22px]' source={require('@/assets/images/login/fingerprint.png')} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 注册按钮 */}
                <View className="mt-12">
                    <TouchableOpacity
                        className="flex-row items-center justify-center bg-[#585CE5] h-[50px] rounded-full"
                        onPress={() => navigation.navigate('Register' as never)}
                    >
                        <Text className="text-lg font-bold text-white">去注册</Text>
                    </TouchableOpacity>
                </View>

                {/* 第三方登录分隔线 */}
                <View className="flex-row items-center mt-12">
                    <View className="flex-1 h-px bg-gray-200" />
                    <Text className="px-4 text-sm text-gray-500">第三方账号登录</Text>
                    <View className="flex-1 h-px bg-gray-200" />
                </View>

                {/* 微信登录按钮 */}
                <View className="mt-8">
                    <TouchableOpacity className="flex-row items-center justify-center border border-[#ECF2FF] h-[50px] rounded-full" onPress={handleWechatLogin} >
                        <Image className='w-[26px] h-[22px] mr-4' source={require('@/assets/images/login/wechat.png')} />
                        <Text className="text-base text-gray-900">使用微信账号登录</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}