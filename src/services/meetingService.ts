import { IMeeting } from "../types/meeting/meeting";
import firestore from "@react-native-firebase/firestore";

const FirestoreKey = "Meetings";

type GetAllDataQueryParams = {
  idcondominium?: string;
};

const getAllData = async ({ idcondominium }: GetAllDataQueryParams = {}) => {
  try {
    if (!idcondominium) {
    }
    let queryRef = firestore()
      .collection(FirestoreKey)
      .where("idcondominium", "==", idcondominium);

    const querySnapshot = await queryRef.get();

    const data: IMeeting[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as IMeeting;

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
    throw new Error("No se pudo obtener all");
  }
};

const getData = async (id: string): Promise<IMeeting> => {
  console.log("🚀 ~ getData ~ id:", id);

  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    const docSnap = await docRef.get();

    const data = docSnap.data() as IMeeting;

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

const updateData = async (data: Partial<IMeeting>) => {
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

const insertData = async (data: IMeeting) => {
  try {
    const doc = await firestore().collection(FirestoreKey).add(data);
    return doc.id;
  } catch (e: any) {
    console.log(e);
  }
};

export default {
  getAllData,
  getData,
  insertData,
  updateData,
};
