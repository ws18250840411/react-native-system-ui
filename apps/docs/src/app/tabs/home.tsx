import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, ActivityIndicator, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import { getArticles } from '@/services/health';
import Loading from '@/components/Loading';

export default function Home() {
    const navigation = useNavigation();
    const { loading, data } = useRequest(getArticles);
    const articleList = data?.data?.articles || [];

    if (loading) return <Loading />;

    return (
        <SafeAreaView className="flex-1 bg-[#F8F8FB]">
            <StatusBar barStyle="dark-content" backgroundColor="#F8F8FB" />
            <View className="p-4">
                <View className='flex-row items-center justify-between bg-white h-[50px] px-6 rounded-full text-base text-gray-900'>
                    <Image className='w-[26px] h-[22px] mr-4' source={require('@/assets/images/layout/search.png')} />
                    <TextInput
                        className="flex-1 h-full"
                        placeholder="搜索信息"
                    />
                </View>
            </View>
            <FlatList
                className='flex-1 p-4 overflow-auto'
                data={articleList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className='bg-white rounded-md p-4 mb-4' key={item.id}>
                        <View className='flex-row items-center justify-between'>
                            <View className='flex-1 flex-row items-center'>
                                <Image className='w-[40px] h-[40px] rounded-full mr-4' source={item.avatar ? { uri: item.avatar } : require('@/assets/images/layout/avatar1.png')} />
                                <Text className='text-[#ABAFB3]'>{item.author}</Text>
                            </View>
                            <View className='w-[80px] h-[30px] rounded-full border border-[#ABAFB3] items-center justify-center'>
                                <Text className='text-[#FF4C4C]'>收藏</Text>
                            </View>
                        </View>
                        <View className='mt-4'>
                            <Text className='text-[#0A0A0A]'>{item.title}</Text>
                        </View>

                        <TouchableOpacity className='w-full h-[192px] rounded-md mt-4' onPress={() => navigation.navigate('Detail', { id: item.id })}>
                            <Image className='w-full h-[192px] rounded-md' source={item.image ? { uri: item.image } : require('@/assets/images/layout/post1.png')} />
                        </TouchableOpacity>
                        <View className='flex-row items-center justify-between px-4 mt-4'>
                            <View className='flex-row items-center'>
                                <Image className='w-[24px] h-[24px] mr-2' source={require('@/assets/images/layout/like.png')} />
                                <Text className='text-[#ABAFB3]'>{item.likes}</Text>
                            </View>
                            <View className='flex-row items-center'>
                                <Image className='w-[24px] h-[24px] mr-2' source={require('@/assets/images/layout/share.png')} />
                                <Text className='text-[#ABAFB3]'>分享</Text>
                            </View>
                            <View className='flex-row items-center'>
                                <Image className='w-[24px] h-[24px] mr-2' source={require('@/assets/images/layout/message.png')} />
                                <Text className='text-[#ABAFB3]'>评论</Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}