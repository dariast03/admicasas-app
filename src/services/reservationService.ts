import { IReservation } from "../types/reserve/reserve";
import { isWithinInterval, startOfMonth } from "date-fns";
import firestore from "@react-native-firebase/firestore";

const FirestoreKey = "Reservation";

type GetAllDataQueryParams = {
  idcondominium: string;
  selectedDate?: Date;
};

const getAllData = async (
  { idcondominium, selectedDate }: GetAllDataQueryParams = { idcondominium: "" }
) => {
  try {
    let queryRef = firestore()
      .collection(FirestoreKey)
      .where("idcondominium", "==", idcondominium);

    const querySnapshot = await queryRef.get();

    const data: IReservation[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as IReservation;

      return {
        ...data,
        id: doc.id,
        //@ts-ignore
        start: new Date(data.start.toDate()),
        //@ts-ignore
        end: new Date(data.end.toDate()),
      };
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default {
  getAllData,
};
