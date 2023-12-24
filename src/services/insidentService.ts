import { IIncident } from "@/types/Incidents/incidents";
import firestore from "@react-native-firebase/firestore";

const FirestoreKey = "Incidents";

const getData = async (id: string) => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    const docSnap = await docRef.get();

    const data = docSnap.data() as IIncident;

    return {
      ...data,
      //@ts-ignore
      date: new Date(data.date.toDate()),
      id: docSnap.id,
    };
  } catch (e) {
    console.log(e);
  }
};

type GetDataQueryParams = {
  idhousing: string;
  q?: string;
  limitResults?: number;
};

const getAllDataQuery = async ({
  idhousing,
  q,
  limitResults,
}: GetDataQueryParams) => {
  try {
    let queryRef = firestore()
      .collection(FirestoreKey)
      .where("idhousing", "==", idhousing);
    // .where("idcondominium", "==", idcondominium);

    if (q) {
      queryRef = queryRef
        .orderBy("name")
        .startAt(q)
        .endAt(q + "\uf8ff");
    }

    if (limitResults) {
      queryRef = queryRef.limit(limitResults);
    }

    const querySnapshot = await queryRef.get();
    const data: IIncident[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as IIncident;

      return {
        ...data,
        //@ts-ignore
        date: new Date(data.date.toDate()),
        id: doc.id,
      };
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

const insertData = async (data: IIncident) => {
  try {
    const doc = await firestore().collection(FirestoreKey).add(data);
    return doc.id;
  } catch (e: any) {
    console.log(e);
  }
};

const deleteData = async (id: string) => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    await docRef.delete();
  } catch (e: any) {
    console.error("Error al eliminar:", e);
    throw new Error("No se pudo eliminar");
  }
};

const updateData = async (data: IIncident) => {
  try {
    const id = data.id;
    delete data.id;

    const docRef = firestore().collection(FirestoreKey).doc(id);
    await docRef.update(data);
  } catch (e: any) {
    console.error("Error al actualizar", e);
    throw new Error("No se pudo actualizar");
  }
};

export default {
  getAllDataQuery,
  getData,
  insertData,
  updateData,
  deleteData,
};
