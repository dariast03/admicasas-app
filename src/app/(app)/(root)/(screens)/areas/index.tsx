import { View, Text, FlatList, Pressable, useWindowDimensions } from 'react-native'
import React from 'react'
import { useAreas } from '../../../../../hooks/useAreas'
import { Image } from 'expo-image';
import { Link } from 'expo-router';

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const Areas = () => {
    const { areaCommonsAllQuery } = useAreas()
    const { width } = useWindowDimensions()
    return (
        <>
            <FlatList
                data={areaCommonsAllQuery.data}
                renderItem={({ item }) => (
                    <>
                        <Link href={`/areas/${item.id}`} asChild>
                            <Pressable>
                                <View>
                                    <Image source={item.urlimg}
                                        placeholder={blurhash}
                                        style={{ width, height: 200 }}

                                    />
                                    <Text>{item.name}</Text>
                                </View>
                            </Pressable>
                        </Link>

                    </>
                )}
            />
        </>
    )
}

export default Areas