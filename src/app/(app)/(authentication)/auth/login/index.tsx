import { View, Text, TextInput, TouchableOpacity } from "react-native";

/* import { useForm, Controller } from "react-hook-form"; */
import useAuth from "../../../../../hooks/useAuth";
import { IFormLogin } from "../../../../../types/user";

const Login = () => {
  const { onLogin, isLoading } = useAuth();

  /*   const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormLogin>();

  const onSubmit = (data: IFormLogin) => {
    console.log(data);
    return;
    onLogin(data);
  }; */

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
            Bienvenido
          </Text>
          {/* <Image source={logo} style={{ height: 150, width: 150, marginBottom: 10 }} /> */}
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Inicia sesión con tu cuenta
          </Text>
        </View>

        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
            Email:
          </Text>
          <TextInput
            placeholder="Ingrese su email"
            /*   {...register("email", { required: "El email es requerido" })} */
            style={{
              borderBottomWidth: 1,
              //   borderColor: errors?.email ? "red" : "black",
              marginBottom: 10,
            }}
          />
          {/*   {errors?.email && (
            <Text style={{ color: "red" }}>{errors.email?.message}</Text>
          )} */}
        </View>

        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
            Contraseña:
          </Text>
          <TextInput
            placeholder="Ingrese su contraseña"
            secureTextEntry
            /*    {...register("password", {
              required: "La contraseña es requerida",
            })} */
            /*  style={{
              borderBottomWidth: 1,
              borderColor: errors?.password ? "red" : "black",
              marginBottom: 10,
            }} */
          />
          {/*    {errors?.password && (
            <Text style={{ color: "red" }}>{errors.password?.message}</Text>
          )} */}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {/* <Controller
            name="rememberEmail"
            control={control}
            defaultValue={false}
            render={({ field: { value, onChange } }) => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {          <Checkbox.Android
                  status={value ? "checked" : "unchecked"}
                  onPress={() => onChange(!value)}
                /> }
                <Text>Recordarme</Text>
              </View>
            )}
          /> */}
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold", color: "blue" }}>
              Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
          //   onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "white",
            marginTop: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          //  onPress={onLoginWithEmail}
          disabled={isLoading}
        >
          <Text>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
