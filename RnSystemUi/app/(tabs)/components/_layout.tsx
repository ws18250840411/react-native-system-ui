import { Stack } from 'expo-router'

export default function ComponentsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '400',
        },
      }}
    />
  )
}
