import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const DefaultLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <SafeAreaView className='flex-1'>
            <View className='h-full bg-orange-200'>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default DefaultLayout