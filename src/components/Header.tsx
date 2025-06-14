import { navigate } from "@/utils/navigation";
import React from 'react';
import { Image, Text, View } from 'react-native';

export function Header() {
  return (
    <View className='fixed top-0 right-0 left-0 bg-[#f6f8fc07] backdrop-blur-sm backdrop-saturate-50 z-50 h-15 box-border select-none px-3 md:px-6 py-0'>
        <View className='flex items-center flex-wrap flex-row'>
            <Text className='flex items-center mr-16' onPress={()=> navigate('/')}>
                <Image style={{ width: 40, height: 40 }} source={require('@/assets/images/react-logo.png')} />
                <Text className='inline-block ml-2 font-medium no-underline text-[22px] leading-none'>RN System UI</Text>
            </Text>
            <View className='flex items-center flex-wrap flex-row'>
                <Text onPress={()=> navigate('/')}>
                    <Text className='flex items-center h-[60px] p-0 mr-8 text-[16px] font-bold relative cursor-pointer'>首页</Text>
                </Text>
                <Text onPress={()=> navigate('/guide/introduce')}>
                    <Text className='flex items-center h-[60px] p-0 mr-8 text-[16px] font-bold relative cursor-pointer'>文档</Text>
                </Text>
                <Text onPress={()=> navigate('/components/button')}>
                    <Text className='flex items-center h-[60px] p-0 mr-8 text-[16px] font-bold relative cursor-pointer'>组件</Text>
                </Text>
            </View>
        </View>
    </View>
  );
}

