import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
    withSafeArea?: boolean
}

const DefaultLayout: React.FC<React.PropsWithChildren<Props>> = ({ children, withSafeArea = false }) => {
    return (
        <>
            {withSafeArea ?
                <SafeAreaView className='flex-1'>
                    <View className='h-full bg-white dark:bg-red-400'>
                        {children}
                    </View>
                </SafeAreaView>
                :
                <View className='flex-1'>
                    <View className='flex-1 bg-white  dark:bg-red-400'>
                        {children}
                    </View>
                </View>}
        </>
    )
}

export default DefaultLayout