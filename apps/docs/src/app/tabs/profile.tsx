import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View, ScrollView, StatusBar, Image, Switch, Alert } from 'react-native';

// 导入图标
import accountIcon from '@/assets/images/profile/account.png';
import notifyIcon from '@/assets/images/profile/notify.png';
import deleteIcon from '@/assets/images/profile/delete.png';
import fontIcon from '@/assets/images/profile/font.png';
import scoreIcon from '@/assets/images/profile/score.png';
import policyIcon from '@/assets/images/profile/policy.png';
import versionIcon from '@/assets/images/profile/version.png';
import arrowIcon from '@/assets/images/profile/arrow.png';

export default function Profile() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleSwitchAccount = () => {
        Alert.alert('切换账户', '确定要切换账户吗？', [
            { text: '取消', style: 'cancel' },
            { text: '确定', onPress: () => Alert.alert('成功', '已切换到其他账户') }
        ]);
    };

    const handleLogout = () => {
        Alert.alert('退出登录', '确定要退出登录吗？', [
            { text: '取消', style: 'cancel' },
            { text: '确定', onPress: () => Alert.alert('成功', '已退出登录') }
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F2F2F2]">
            <StatusBar barStyle="dark-content" backgroundColor="#F2F2F2" />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className='p-4'>
                    <View className='p-6 flex-row items-center'>
                        <Image className='w-[62px] h-[62px] rounded-full mr-4' source={require('@/assets/images/layout/avatar7.png')} />
                        <View>
                            <Text className='text-base text-[#0A0A0A]'>垵沫璇</Text>
                            <Text className='mt-1 text-[12px] text-[#ABAFB3]'>摄影师 | 愚昧的购车人</Text>
                        </View>
                    </View>
                </View>

                <View className='mx-4 mb-4 bg-white rounded-lg'>
                    <View className='flex-row items-center justify-between px-4 py-3 border-b border-[#F7F8FA]'>
                        <View className='flex-row items-center'>
                            <Image source={accountIcon} className='w-6 h-6 mr-3' />
                            <Text className='text-[#0A0A0A] text-[15px]'>账户管理</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={arrowIcon} className='w-[10px] h-[14px] ml-3' />
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row items-center justify-between px-4 py-3 border-b border-[#F7F8FA]'>
                        <View className='flex-row items-center'>
                            <Image source={notifyIcon} className='w-6 h-6 mr-3' />
                            <Text className='text-[#0A0A0A] text-[15px]'>通知提醒</Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{ false: '#E5E5E5', true: '#34C759' }}
                            thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
                        />
                    </View>
                    <View className='flex-row items-center justify-between px-4 py-3 border-b border-[#F7F8FA]'>
                        <View className='flex-row items-center'>
                            <Image source={deleteIcon} className='w-6 h-6 mr-3' />
                            <Text className='text-[#0A0A0A] text-[15px]'>清除缓存</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Text className='text-[#8E8E93] text-sm'>1.02 GB</Text>
                            <TouchableOpacity>
                                <Image source={arrowIcon} className='w-[10px] h-[14px] ml-3' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='flex-row items-center justify-between px-4 py-3 border-b border-[#F7F8FA]'>
                        <View className='flex-row items-center'>
                            <Image source={fontIcon} className='w-6 h-6 mr-3' />
                            <Text className='text-[#0A0A0A] text-[15px]'>字体大小</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Text className='text-[#8E8E93] text-sm'>中</Text>
                            <TouchableOpacity>
                                <Image source={arrowIcon} className='w-[10px] h-[14px] ml-3' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className='mx-4 mb-4 bg-white rounded-lg'>
                    <View className='flex-row items-center justify-between px-4 py-3 border-b border-[#F7F8FA]'>
                        <View className='flex-row items-center'>
                            <Image source={scoreIcon} className='w-6 h-6 mr-3' />
                            <Text className='text-[#0A0A0A] text-[15px]'>给我们打分</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={arrowIcon} className='w-[10px] h-[14px] ml-3' />
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row items-center justify-between px-4 py-3 border-b border-[#F7F8FA]'>
                        <View className='flex-row items-center'>
                            <Image source={policyIcon} className='w-6 h-6 mr-3' />
                            <Text className='text-[#0A0A0A] text-[15px]'>隐私政策</Text>
                        </View>
                        <TouchableOpacity>
                            <Image source={arrowIcon} className='w-[10px] h-[14px] ml-3' />
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row items-center justify-between px-4 py-3 border-b border-[#F7F8FA]'>
                        <View className='flex-row items-center'>
                            <Image source={versionIcon} className='w-6 h-6 mr-3' />
                            <Text className='text-[#0A0A0A] text-[15px]'>版本</Text>
                        </View>
                        <View className='flex-row items-center'>
                            <Text className='text-[#8E8E93] text-sm'>v8.6.1</Text>
                            <TouchableOpacity>
                                <Image source={arrowIcon} className='w-[10px] h-[14px] ml-3' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className='mx-4 mb-4 bg-white rounded-lg'>
                    <TouchableOpacity 
                        className='px-4 py-3 border-b border-[#F7F8FA]'
                        onPress={handleSwitchAccount}
                    >
                        <Text className='text-center text-[#0A0A0A] text-[15px] font-medium'>切换账户</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className='px-4 py-3'
                        onPress={handleLogout}
                    >
                        <Text className='text-center text-[#0A0A0A] text-[15px] font-medium'>退出登录</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}