import { View, Text } from 'react-native'
import React from 'react'
import DefaultLayout from './DefaultLayout'
import { DrawerToggleButton } from '@react-navigation/drawer';
import { Link } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const LayoutWithTopBar: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <DefaultLayout withSafeArea>
            <View className='bg-green-300 flex-row justify-between items-center p-2'>
                <DrawerToggleButton tintColor="#fff" pressColor='red' />

                <View className='flex-row items-center'>
                    <Link href='/notifications' >
                        <View className='p-2 '>
                            <MaterialIcons name="notifications" color={'#FFF'} size={23} />

                        </View>
                    </Link>

                    <Link href='/profile'>
                        <View className='mr-4 p-2 '>
                            <FontAwesome name='user-circle-o' size={20} color="#fff" />
                        </View>
                    </Link>

                </View>
            </View>


            {children}

        </DefaultLayout>
    )
}

export default LayoutWithTopBar