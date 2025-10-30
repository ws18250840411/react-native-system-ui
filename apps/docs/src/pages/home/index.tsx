import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button } from 'react-native-system-ui';

export default function About() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <Text>Home 首页</Text>
            <View style={{ marginVertical: 16, alignItems: 'center' }}>
                <Avatar name="React Native System" />
            </View>
            <Button title="关于我们" onPress={() => {
                navigation.navigate('About' as never);
            }} />
        </SafeAreaView>
    )
}
