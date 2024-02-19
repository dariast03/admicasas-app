import firestore from "@react-native-firebase/firestore";
import { IArea } from "../types/area/area";

const FirestoreKey = "Area";

const getAllData = async () => {
  try {
    const dataRef = firestore().collection(FirestoreKey);
    const querySnapshot = await dataRef.get();
    const data = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as IArea),
      id: doc.id,
    }));

    return data;
  } catch (e) {
    console.log(e);
  }
};

const getData = async (id: string) => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    const docSnap = await docRef.get();
    const data = { ...(docSnap.data() as IArea), id: docSnap.id } as IArea;
    return data;
  } catch (e) {
    console.log(e);
  }
};

type GetDataQueryParams = {
  idcondominium: string;
  q?: string;
  limitResults?: number;
};

const getDataQuery = async ({
  idcondominium,
  q,
  limitResults,
}: GetDataQueryParams) => {
  try {
    let queryRef = firestore()
      .collection(FirestoreKey)
      .where("idcondominium", "==", idcondominium);

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
    const data: IArea[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as IArea),
      id: doc.id,
    }));

    return data;
  } catch (e) {
    console.log(e);
  }
};

const insertData = async (data: IArea) => {
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

const updateData = async (data: IArea) => {
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
  getAllData,
  getData,
  getDataQuery,
  insertData,
  updateData,
  deleteData,
};
