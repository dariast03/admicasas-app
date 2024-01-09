import { IVisit } from "@/types/visits/visits";
import firestore from "@react-native-firebase/firestore";

const FirestoreKey = "Visits";

const getData = async (id: string) => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    const docSnap = await docRef.get();

    const data = docSnap.data() as IVisit;

    return {
      ...data,
      //@ts-ignore
      datevisit: new Date(data.datevisit.toDate()),
      id: docSnap.id,
    };
  } catch (e) {
    console.log("🚀 ~ getData ~ e:", e);
    throw new Error("No se pudo obtener");
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

    if (q) {
      queryRef = queryRef
        .orderBy("name") // Replace "name" with the actual field you want to order by
        .startAt(q)
        .endAt(q + "\uf8ff");
    }

    if (limitResults) {
      queryRef = queryRef.limit(limitResults);
    }

    const querySnapshot = await queryRef.get();
    const data: IVisit[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as IVisit;

      return {
        ...data,
        //@ts-ignore
        datevisit: new Date(data.datevisit.toDate()),
        id: doc.id,
      };
    });

    return data;
  } catch (e) {
    console.error("Error al obtener:");
    console.log("🚀 ~ getAllDataQuery ~ e:", e);
    throw new Error("No se pudo obtener");
  }
};

const insertData = async (data: IVisit) => {
  try {
    const doc = await firestore().collection(FirestoreKey).add(data);
    return doc.id;
  } catch (e: any) {
    console.error("Error al insertar:");
    console.log("🚀 ~ insertData ~ e:", e);
    throw new Error("No se pudo insertar");
  }
};

const deleteData = async (id: string) => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    await docRef.delete();
  } catch (e: any) {
    console.error("Error al eliminar:");
    console.log("🚀 ~ deleteData ~ e:", e);
    throw new Error("No se pudo eliminar");
  }
};

const updateData = async (data: Partial<IVisit>) => {
  try {
    const id = data.id;
    delete data.id;

    const docRef = firestore().collection(FirestoreKey).doc(id);
    await docRef.update(data);
  } catch (e: any) {
    console.error("Error al actualizar");
    console.log("🚀 ~ updateData ~ e:", e);
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
