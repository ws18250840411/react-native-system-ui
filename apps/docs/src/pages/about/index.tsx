import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function About() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <Text>About 关于我们页</Text>
            <Button title="首页" onPress={() => {
                navigation.navigate('Home' as never);
            }} />
        </SafeAreaView>
    )
}