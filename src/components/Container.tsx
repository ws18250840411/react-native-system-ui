import React from 'react';
import { ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export function Container({children}: {children: React.ReactNode}) {
  return (
    <SafeAreaView>
        <ScrollView className='pt-[60px]'>
        {children}
        </ScrollView>
    </SafeAreaView>
  );
}

