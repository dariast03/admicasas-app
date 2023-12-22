import { IHousing } from "@/types/housing/housing";
import firestore from "@react-native-firebase/firestore";

type GetDataQueryParams = {
  idcondominium: string;
  idproprietary?: string;
  q?: string;
  limitResults?: number;
};

const getAllData = async ({
  idcondominium,
  idproprietary,
}: GetDataQueryParams) => {
  try {
    let dataRef = firestore()
      .collection("Housing")
      .where("idcondominium", "==", idcondominium);

    if (idproprietary) {
      dataRef = dataRef.where("idproprietary", "==", idproprietary);
    }

    const querySnapshot = await dataRef.get();
    const data = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as IHousing),
      id: doc.id,
    }));

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default {
  getAllData,
};
