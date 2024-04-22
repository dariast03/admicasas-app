import { INotification } from "../types/notification/notification";
import firestore from "@react-native-firebase/firestore";

const FirestoreKey = "Notifications";

type GetAllDataQueryParams = {
  idhousing?: string;
  idcondominium?: string;
  iduser?: string;
};

const getDataByCondominium = async (
  idcondominium: string
): Promise<INotification[]> => {
  try {
    const queryRef = firestore()
      .collection(FirestoreKey)
      .where("idcondominiums", "array-contains", idcondominium);

    const querySnapshot = await queryRef.get();

    const data: INotification[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as INotification;

      return {
        ...data,
        id: doc.id,
        //@ts-expect-error
        date: new Date(data.date.toDate()),
      };
    });

    return data;
  } catch (e) {
    console.log(e);
    throw new Error("No se pudo obtener data por condominio");
  }
};

const getDataByHousing = async (idhousing: string) => {
  try {
    const queryRef = firestore()
      .collection(FirestoreKey)
      .where("idhousings", "array-contains", idhousing);

    const querySnapshot = await queryRef.get();

    const data: INotification[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as INotification;

      return {
        ...data,
        id: doc.id,
        //@ts-expect-error
        date: new Date(data.date.toDate()),
      };
    });

    return data;
  } catch (e) {
    console.log(e);
    throw new Error("No se pudo obtener data por condominio");
  }
};

const getDataByUser = async (
  idcondominium: string
): Promise<INotification[]> => {
  try {
    const queryRef = firestore()
      .collection(FirestoreKey)
      .where("iduser", "==", idcondominium);

    const querySnapshot = await queryRef.get();

    const data: INotification[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as INotification;

      return {
        ...data,
        id: doc.id,
        //@ts-expect-error
        date: new Date(data.date.toDate()),
      };
    });

    return data;
  } catch (e) {
    console.log(e);
    throw new Error("No se pudo obtener data por condominio");
  }
};

const getAllData = async ({
  idhousing,
  idcondominium,
  iduser,
}: GetAllDataQueryParams = {}) => {
  try {
    if (!idcondominium && !iduser) {
      throw new Error("idCondominium or idUser is required");
    }

    const data = [
      ...(await getDataByHousing(idhousing || "")),
      ...(await getDataByCondominium(idcondominium || "")),
      ...(await getDataByUser(iduser || "")),
    ];

    return data.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (e) {
    console.log(e);
    throw new Error("No se pudo obtener all");
  }
};

const getData = async (id: string): Promise<INotification> => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    const docSnap = await docRef.get();

    const data = docSnap.data() as INotification;

    return {
      ...data,
      id: docSnap.id,
      //@ts-expect-error
      date: new Date(data.date.toDate()),
    };
  } catch (e) {
    console.log(e);
    throw new Error("No se pudo obtener");
  }
};

const updateData = async (data: Partial<INotification>) => {
  try {
    const id = data.id;
    delete data.id;
    const docRef = firestore().collection(FirestoreKey).doc(id);
    await docRef.update(data);
  } catch (error: any) {
    console.error("Error al actualizar", error);
    throw new Error("No se pudo actualizar");
  }
};

/* const insertData = async (data: INotification) => {
  try {
    const doc = await firestore().collection(FirestoreKey).add(data);
    return doc.id;
  } catch (e: any) {
    console.log(e);
  }
}; */

export default {
  getAllData,
  getData,
  /*   insertData, */
  updateData,
};
