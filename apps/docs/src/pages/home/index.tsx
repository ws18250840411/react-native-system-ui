import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function About() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <Text>Home 首页</Text>
            <Button title="关于我们" onPress={() => {
                navigation.navigate('About' as never);
            }} />
        </SafeAreaView>
    )
}