import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export function NotFound() {
  return (
    <>
      <View style={styles.container}>
        <Text>404 页面未找到</Text>
      </View>
    </>
  );
}
export default NotFound;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
