import { IHousing } from "@/types/housing/housing";
import firestore from "@react-native-firebase/firestore";

type GetDataQueryParams = {
  idcondominium?: string;
  idproprietary?: string;
  q?: string;
  limitResults?: number;
};

const getAllData = async ({
  idcondominium,
  idproprietary,
}: GetDataQueryParams) => {
  try {
    if (!idproprietary && !idproprietary)
      throw new Error("Enviar al menos idcondominum o idpropietary");

    let dataRef = firestore().collection("Housing").orderBy("code");

    if (idcondominium) {
      dataRef = dataRef.where("idcondominium", "==", idcondominium);
    }

    if (idproprietary) {
      dataRef = dataRef.where("idproprietary", "==", idproprietary);
    }

    const querySnapshot = await dataRef.get();
    const data = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as IHousing),
      id: doc.id,
    }));

    return data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export default {
  getAllData,
};
