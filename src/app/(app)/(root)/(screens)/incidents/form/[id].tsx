import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { IIncident } from '@/types/Incidents/incidents'
import DefaultLayout from '@/layout/DefaultLayout'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker';

const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
}

const FormIncident = () => {
    const { id } = useLocalSearchParams<{ id: string }>()

    const isCreate = id == "create"

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IIncident>({
        mode: "onChange",
        defaultValues: {
            date: new Date()
        }
    });


    return (
        <DefaultLayout>
            {/* 
         <DefaultLayout>
            <View className='p-2 flex-1'>
                <View className="bg-white p-4 rounded-lg">
                    <View className="items-center mb-4">
                        <Text className="text-2xl font-bold mb-2">Registra un incidente</Text>
                       
                        <Text className="text-lg  text-center">Por favor, completa el formulario para reportar un incidente</Text>
                    </View>

                    <View>
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required: "La descripcion es requerida",
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Text className="text-xl font-bold mb-1">Descripcion:</Text>
                                    <TextInput
                                        {...field}
                                        placeholder="Descripcion del incidente"

                                        className="border-b-2 py-2 px-4 mb-2 w-full"
                                    />

                                    {error && (
                                        <Text style={{ color: "red" }}>{error.message}</Text>
                                    )}
                                </>
                            )}
                        />
                   
                    </View>

                    <View>
                        <Text className="text-xl font-bold mb-1">Email:</Text>
                        <Controller
                            name="date"
                            control={control}
                            rules={{
                                required: "Email required",
                            }}
                            render={({ field, formState }) => (
                                <>
                                    <TextInput
                                        {...field}
                                        placeholder="Ingrese su email"
                                        value={field.value.toString()}
                                        onChangeText={(e) => field.onChange(e)}
                                        className="border-b-2 py-2 px-4 mb-2 w-full"
                                    />
                                </>
                            )}
                        />
                 
                    </View>

                    <View>
                        <Text className="text-xl font-bold mb-1">Contraseña:</Text>
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required: "password required",
                            }}
                            render={({ field, formState }) => (
                                <>
                                    <TextInput
                                        {...field}
                                        placeholder="Ingrese su pass"
                                        value={field.value}
                                        secureTextEntry
                                        onChangeText={(e) => field.onChange(e)}
                                        className="border-b-2 py-2 px-4 mb-2 w-full"
                                    />
                                </>
                            )}
                        />
           
                    </View>

                    <View className="flex-row items-center mb-4">
                        <TouchableOpacity>
                            <Text className="font-bold text-blue-500">
                                Olvidaste tu contraseña?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                    // onPress={handleSubmit(onSubmit)}
                    //    disabled={isLoading}
                    >
                        <View className="bg-blue-500 p-3 rounded-md items-center">
                            <Text className="text-white text-xl">Login</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    //     onPress={promptAsync}
                    //onPress={() => promptAsync()}
                    //   disabled={isLoading}

                    >
                        <View className="bg-white mt-2 p-3 border-2 border-gray-500 rounded-md flex-row items-center justify-center">
                            <Text>Login with Google</Text>
                        </View>
                    </TouchableOpacity>


                </View>
            </View>
        </DefaultLayout>

        
        */}
            <View className="flex-1 justify-center  p-4">
                <View className="bg-white p-4 rounded-lg">
                    <View className="items-center mb-4">
                        <Text className="text-2xl font-bold mb-2">Bienvenido</Text>
                        {/* <Image source={logo} className="h-24 w-24 mb-2" /> */}
                        <Text className="text-lg font-bold">Inicia sesión con tu cuenta</Text>
                    </View>

                    <View>
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required: "La descripcion es requerida",
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Text className="text-xl font-bold mb-1">Descripcion:</Text>
                                    <TextInput
                                        {...field}
                                        placeholder="Descripcion del incidente"

                                        className="border-b-2 py-2 px-4 mb-2 w-full"
                                    />

                                    {error && (
                                        <Text style={{ color: "red" }}>{error.message}</Text>
                                    )}
                                </>
                            )}
                        />

                    </View>

                    <View>
                        <Controller
                            name="date"
                            control={control}
                            rules={{
                                required: "La descripcion es requerida",
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Text className="text-xl font-bold mb-1">Descripcion:</Text>
                                    <DateTimePicker
                                        value={field.value}
                                        onChange={(e, date) => field.onChange(date)}
                                    />

                                    {error && (
                                        <Text style={{ color: "red" }}>{error.message}</Text>
                                    )}
                                </>
                            )}
                        />

                    </View>

                    <View>
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required: "La descripcion es requerida",
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Text className="text-xl font-bold mb-1">Descripcion:</Text>
                                    <TextInput
                                        {...field}
                                        placeholder="Descripcion del incidente"

                                        className="border-b-2 py-2 px-4 mb-2 w-full"
                                    />

                                    {error && (
                                        <Text style={{ color: "red" }}>{error.message}</Text>
                                    )}
                                </>
                            )}
                        />

                    </View>

                    <View>
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required: "La descripcion es requerida",
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Text className="text-xl font-bold mb-1">Descripcion:</Text>
                                    <TextInput
                                        {...field}
                                        placeholder="Descripcion del incidente"

                                        className="border-b-2 py-2 px-4 mb-2 w-full"
                                    />

                                    {error && (
                                        <Text style={{ color: "red" }}>{error.message}</Text>
                                    )}
                                </>
                            )}
                        />

                    </View>
                    <View>
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required: "La descripcion es requerida",
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <>
                                    <Text className="text-xl font-bold mb-1">Descripcion:</Text>
                                    <TextInput
                                        {...field}
                                        placeholder="Descripcion del incidente"

                                        className="border-b-2 py-2 px-4 mb-2 w-full"
                                    />

                                    {error && (
                                        <Text style={{ color: "red" }}>{error.message}</Text>
                                    )}
                                </>
                            )}
                        />

                    </View>
                </View>
            </View>

        </DefaultLayout>



    )
}

export default FormIncident