import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { RouteProp, ParamListBase } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import { getArticleById } from '@/services/health';
import Header from '@/components/Header';
import Loading from '@/components/Loading';

export default function Detail() {
    const route = useRoute<RouteProp<ParamListBase, 'Detail'>>();
    const { id } = route.params;
    const { loading, data: article } = useRequest(() => getArticleById(id));
    if (loading) return <Loading />;

    return (
        <SafeAreaView className='flex-1 bg-[#F8F8FB]'>
            <Header title="详情" />
            <ScrollView className='p-4'>
                <Text className='m-4 text-xl text-gray-900 font-bold'>{article?.data.title}</Text>
                <View className='p-4 mt-4' key={article?.data.id}>
                    <View className='flex-row items-center justify-between'>
                        <View className='flex-1 flex-row items-center'>
                            <Image className='w-[40px] h-[40px] rounded-full mr-4' source={article?.data.avatar ? { uri: article.data.avatar } : require('@/assets/images/layout/avatar1.png')} />
                            <Text className='text-[#ABAFB3]'>{article?.data.author}</Text>
                        </View>
                        <View className='w-[80px] h-[30px] rounded-full border border-[#ABAFB3] items-center justify-center'>
                            <Text className='text-[#FF4C4C]'>收藏</Text>
                        </View>
                    </View>
                    <TouchableOpacity className='w-full h-[210px] rounded-md mt-4'>
                        <Image className='w-full h-[210px] rounded-md' source={article?.data.image ? { uri: article.data.image } : require('@/assets/images/layout/post1.png')} />
                    </TouchableOpacity>
                    <Text className='py-4 text-[#0A0A0A]'>{article?.data.content}</Text>
                    <View className='flex-row items-center justify-between px-4 mt-4'>
                        <View className='flex justify-center items-center'>
                            <Image className='w-[34px] h-[34px] mb-1' source={require('@/assets/images/layout/collect.png')} />
                            <Text className='text-[#ABAFB3] text-[12px]'>收藏</Text>
                        </View>
                        <View className='flex justify-center items-center'>
                            <Image className='w-[34px] h-[34px] mb-1' source={require('@/assets/images/layout/wechat.png')} />
                            <Text className='text-[#ABAFB3] text-[12px]'>分享到微信</Text>
                        </View>
                        <View className='flex justify-center items-center'>
                            <Image className='w-[34px] h-[34px] mb-1' source={require('@/assets/images/layout/moments.png')} />
                            <Text className='text-[#ABAFB3] text-[12px]'>分享到朋友圈</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}