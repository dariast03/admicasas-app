import { IPaymentTypes } from "@/types/paymentTypes/paymentTypes";
import firestore from "@react-native-firebase/firestore";

type GetDataQueryParams = {
  idhousing: string;
  q?: string;
  limitResults?: number;
};

const FirestoreKey = "PaymentTypes";

const getData = async (id: string) => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    const docSnap = await docRef.get();
    const data = docSnap.data() as IPaymentTypes;
    return {
      ...data,
      id: docSnap.id,
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  getData,
};
