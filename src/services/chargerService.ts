import firestore from "@react-native-firebase/firestore";
import { ICharge } from "@/types/charges/charges";

type GetDataQueryParams = {
  idhousing: string;
  q?: string;
  limitResults?: number;
};

const FirestoreKey = "Charges";
const getAllData = async ({
  idhousing,
  q,
  limitResults,
}: GetDataQueryParams) => {
  console.log("🚀 ~ idhousing:", idhousing);
  try {
    let queryRef = firestore()
      .collection(FirestoreKey)
      .where("idhousings", "array-contains", idhousing);
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
    const data: ICharge[] = querySnapshot.docs.map((doc) => {
      const data = doc.data() as ICharge;
      return {
        ...data,
        //@ts-ignore
        start: new Date(data.start.toDate()),
        //@ts-ignore
        end: new Date(data.end.toDate()),
        id: doc.id,
      };
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

const getData = async (id: string) => {
  const docRef = firestore().collection(FirestoreKey).doc(id);
  const docSnap = await docRef.get();

  const data = docSnap.data() as ICharge;

  return {
    ...data,
    //@ts-ignore
    start: new Date(data.start.toDate()),
    //@ts-ignore
    end: new Date(data.end.toDate()),
    id: docSnap.id,
  };
};

//   const getData = async (id: string) => {
//     const docRef = doc(FirebaseDB, "Charges", id + "");
//     const docSnap = await getDoc(docRef);

//     const data = docSnap.data() as ICharge;

//     const housingsPromise = data.idhousings.map(async (house) => {
//       return await housingService.getData(house)
//     })

//     const housings = await Promise.all(housingsPromise)

//     return {
//       ...data,
//       //@ts-ignore
//       start: new Date(data.start.toDate()),
//       //@ts-ignore
//       end: new Date(data.end.toDate()),
//       housings,
//       id: docSnap.id,
//     };
//   };

export default {
  getData,
  getAllData,
};
