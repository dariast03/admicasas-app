import { IPayments } from "@/types/payments/payments";
import firestore from "@react-native-firebase/firestore";

const FirestoreKey = "Payments";

const getData = async (id: string) => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    const docSnap = await docRef.get();

    const data = docSnap.data() as IPayments;

    return {
      ...data,
      id: docSnap.id,
      //@ts-ignore
      date: new Date(data.date.toDate()),
    };
  } catch (e) {
    console.log(e);
  }
};
const getAllData = async (idhousing: string) => {
  try {
    let queryRef = firestore()
      .collection(FirestoreKey)
      .where("idhousing", "==", idhousing);
    const querySnapshot = await queryRef.get();

    const data: IPayments[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as IPayments;

      return {
        ...data,
        id: doc.id,
        //@ts-ignore
        date: new Date(data.date.toDate()),
      };
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

const getDataAnnouncement = async (idcharge: string, idhousing: string) => {
  try {
    let queryRef = firestore()
      .collection(FirestoreKey)
      .where("idcharge", "==", idcharge)
      .where("idhousing", "==", idhousing);

    const querySnapshot = await queryRef.get();

    const data: IPayments[] = querySnapshot.docs.map((doc) => {
      return {
        ...(doc.data() as IPayments),
        id: doc.id,
      };
    });

    if (data.length) {
      return {
        ...data[0],
      };
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
};

const insertData = async (data: IPayments) => {
  try {
    const doc = await firestore().collection(FirestoreKey).add(data);
    return doc.id;
  } catch (e: any) {
    console.log(e);
  }
};

const updateData = async (data: IPayments) => {
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
  getDataAnnouncement,
  insertData,
  updateData,
};
