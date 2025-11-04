import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { View, Text, StyleSheet } from 'react-native'
import { Button} from 'react-native-system-ui'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <View style={styles.container}>
        <Text>Hello React Native Web!</Text>
      </View>
      <Button text="Click me" onPress={() => console.log('Button pressed')} />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
