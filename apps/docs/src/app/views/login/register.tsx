import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Text, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Toast } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserInfoStore } from '@/stores/userInfo';
import { register } from '@/services/user';


export default function Register() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userInfoStore = useUserInfoStore();
    const handleRegister = async () => {
        if (!username || !email || !password) {
            Toast.show('请填写完整信息');
            return;
        }

        // 简单的邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show('请输入有效的邮箱地址');
            return;
        }

        // 密码长度验证
        if (password.length < 6) {
            Toast.show('密码至少需要6位');
            return;
        }

        try {
            const res = await register({ username, email, password });
            console.log('注册响应', res);
            if (res.success) {
                userInfoStore.setState({
                    userInfo: {
                        id: res?.data?.userInfo?.id,
                        name: res?.data?.userInfo?.name,
                        email: res?.data?.userInfo?.email,
                    }
                });
                Toast.show({
                    content: '注册成功',
                    onClose: () => navigation.navigate('Login' as never),
                });
            }
        } catch (error: any) {
            console.error('注册错误:', error);
            Toast.show('注册失败');
        }
    };

    const handleWechatRegister = () => {
        // 微信注册逻辑
        console.log('微信注册');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <TouchableOpacity className="p-4 bg-white flex-row items-center" onPress={() => navigation.goBack()}>
                <Image className='w-[24px] h-[24px] mr-4' source={require('@/assets/images/layout/back.png')} />
                <Text className='text-lg font-bold text-gray-600'>注册</Text>
            </TouchableOpacity>
            <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
                <View className="w-full flex justify-center items-center">
                    <Image className='w-[286px] h-[300px]' source={require('@/assets/images/login/figure.png')} />
                </View>
                {/* 输入表单 */}
                <View className="mt-4">
                    <View className="flex-row justify-center w-full h-[50px] bg-[#ECF2FF] rounded-full mb-4">
                        <View className="w-[50px] h-[50px] flex justify-center items-center">
                            <Image className='w-[32px] h-[32px]' source={require('@/assets/images/login/phone.png')} />
                        </View>
                        <TextInput
                            className="flex-1 h-[50px] text-base text-gray-600"
                            placeholder="用户名"
                            value={username}
                            onChangeText={setUsername}
                        />
                    </View>
                    <View className="flex-row justify-center w-full h-[50px] bg-[#ECF2FF] rounded-full mb-4">
                        <View className="w-[50px] h-[50px] flex justify-center items-center">
                            <Image className='w-[32px] h-[32px]' source={require('@/assets/images/login/email.png')} />
                        </View>
                        <TextInput
                            className="flex-1 h-[50px] text-base text-gray-600"
                            placeholder="邮箱"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"         // 邮箱不需要自动大写
                            autoCorrect={false}           // 关闭自动纠正
                            textContentType="emailAddress" // 提示系统这是邮箱输入（辅助自动填充）
                        />
                    </View>
                    <View className="flex-row justify-center w-full h-[50px] bg-[#ECF2FF] rounded-full mb-4">
                        <View className="w-[50px] h-[50px] flex justify-center items-center">
                            <Image className='w-[32px] h-[32px]' source={require('@/assets/images/login/password.png')} />
                        </View>
                        <TextInput
                            className="flex-1 h-[50px] text-base text-gray-600"
                            placeholder="密码"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    <View className="mt-4">
                        <TouchableOpacity className="flex-row items-center justify-center bg-[#191C32] h-[50px] rounded-full" onPress={handleRegister}>
                            <Text className="text-lg font-bold text-white">注册</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 微信注册按钮 */}
                <View className="mt-6 flex-row items-center justify-center">
                    <TouchableOpacity className='w-[64px] h-[64px] border border-[#ECF2FF] flex items-center justify-center rounded-full' onPress={handleWechatRegister} >
                        <Image className='w-[25px] h-[26px]' source={require('@/assets/images/login/qq.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity className='w-[64px] h-[64px] border border-[#ECF2FF] flex items-center justify-center rounded-full ml-8' onPress={handleWechatRegister} >
                        <Image className='w-[31px] h-[26px]' source={require('@/assets/images/login/wechat.png')} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}