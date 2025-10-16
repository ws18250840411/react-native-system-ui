import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export function Loading() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="#fbaa19" />
    </View>
  );
}
export default Loading;