import { View, Text, Button, StyleSheet } from "react-native";
import { useSessionContext } from "../../../../hooks/useSessionContext";
import Dropdown from "@/components/DropDown";
import { IconType } from "@/components/Icon";
import { useCompanies } from "@/hooks/useCompanies";
import { useState } from "react";
import { useCondominiums } from "@/hooks/useCondominiums";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useUsers } from "@/hooks/useUsers";
import { useHousing } from "@/hooks/useHousing";

const ConfigurationCondominium = () => {
  const { user, updateCompanyCondominium } = useSessionContext();
  const { companiesQuery } = useCompanies();
  const [companies, setCompanies] = useState("");
  const [condominium, setCondominium] = useState("");
  const [housing, setHousing] = useState("");
  const { condominiumsQuery } = useCondominiums({ idcompany: companies });
  const { housingsQuery } = useHousing({
    params: { idcondominium: condominium, idproprietary: user.id },
  });
  const { userUpdateMutation } = useUsers();
  const [errorCompany, setErrorCompany] = useState("");
  const [errorCondominium, setErrorCondominium] = useState("");

  const updateUser = async () => {
    if (!companies) {
      setErrorCompany("Debes seleccionar una compañía");
      return;
    }

    if (!condominium) {
      setErrorCondominium("Debes seleccionar un condominio");
      return;
    }
    const data = {
      id: user.id,
      idcompany: companies,
      idcondominium: condominium,
    };

    await userUpdateMutation.mutateAsync({ data });
    updateCompanyCondominium(companies, condominium);
  };

  return (
    <View className="p-5 bg-white rounded" style={styles.shadowCard}>
      <Text className="mb-4 text-lg font-semibold text-gray-900">
        {user.email}
      </Text>
      <Text className="mb-4 text-md text-gray-700 my-2 bg-yellow-200 p-4 rounded-lg">
        No cuentas con una empresa y condominio asignado; te recomendaría que
        busques uno.
      </Text>
      <View className="my-2">
        <Dropdown
          withAsterisk
          placeholder="Selecciona una compañia"
          label="Compañia"
          valueField={"id"}
          labelField={"name"}
          error={errorCompany}
          value={companies}
          data={companiesQuery.data || []}
          onChange={(e) => setCompanies(e.id)}
          icon={{
            type: IconType.FontAweomseIcon,
            name: "building-o",
          }}
        />
      </View>
      <View className="my-2">
        {companies && (
          <Dropdown
            withAsterisk
            placeholder="Selecciona una condominio"
            label="Condominio"
            valueField={"id"}
            error={errorCondominium}
            labelField={"name"}
            value={condominium}
            data={condominiumsQuery.data || []}
            onChange={(e) => setCondominium(e.id)}
            icon={{
              type: IconType.AntDesign,
              name: "home",
            }}
          />
        )}
      </View>
      <View className="my-2">
        {condominium && (
          <Dropdown
            withAsterisk
            placeholder="Selecciona una vivienda"
            label="Viviend"
            valueField={"id"}
            labelField={"name"}
            value={housing}
            data={housingsQuery.data || []}
            onChange={(e) => setHousing(e.id)}
            icon={{
              type: IconType.AntDesign,
              name: "home",
            }}
          />
        )}
      </View>

      <View className="mt-5 rounded-xl bg-indigo-600 p-3 shadow-lg">
        <TouchableOpacity className="items-center" onPress={updateUser}>
          <Text className="text-white text-center text-xl font-bold">
            Guardar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  shadowCard: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
});
export default ConfigurationCondominium;
