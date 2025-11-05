import './App.css'
import { View, Text, StyleSheet } from 'react-native'
// import { Button } from 'react-native-system-ui'
import MdContent from './demo.md'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function App() {
  return (
    <>
      <View style={styles.container}>
        <Text>Hello React Native Web!</Text>
      </View>
      {/* <Button text="Click me" onPress={() => console.log('Button pressed')} /> */}
      <h1>Vite + React</h1>
      <MdContent />
    </>
  )
}

export default App
