import { IPayments } from "@/types/payments/payments";
import firestore from "@react-native-firebase/firestore";

const FirestoreKey = "Payments";

const insertData = async (data: IPayments) => {
  try {
    const doc = await firestore().collection(FirestoreKey).add(data);
    return doc.id;
  } catch (e: any) {
    console.log(e);
  }
};

export default {
  insertData,
};
