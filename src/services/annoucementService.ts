import firestore from "@react-native-firebase/firestore";

import { IAnnouncement } from "../types/announcement/announcement";

type GetAllDataQueryParams = {
  idcondominium: string;
  q?: string;
  limitResults?: number;
};

// const getAllData = async ({
//   idcondominium,
//   q,
//   limitResults,
// }: GetAllDataQueryParams) => {
//   try {
//     const dataRef = firestore().collection("Announcements");

//     let queryFilters = dataRef.where(
//       "idcondominiums",
//       "array-contains",
//       idcondominium
//     );

//     if (q) {
//       queryFilters = queryFilters
//         .orderBy("name")
//         .startAt(q)
//         .endAt(q + "\uf8ff");
//     }

//     if (limitResults) {
//       queryFilters = queryFilters.limit(limitResults);
//     }

//     const querySnapshot = await queryFilters.get();
//     const data: IAnnouncement[] = querySnapshot.docs.map((doc: any) => {
//       const data = doc.data() as IAnnouncement;

//       return {
//         ...data,
//         start: new Date(data.start),
//         end: new Date(data.end),
//         id: doc.id,
//       };
//     });

//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// };

const getAllData = async (
  { idcondominium, q, limitResults }: GetAllDataQueryParams = {
    idcondominium: "",
  }
) => {
  try {
    if (!idcondominium) {
      return [];
    }
    let queryRef = firestore()
      .collection("Announcements")
      .where("idcondominiums", "array-contains", idcondominium);

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
    const data: IAnnouncement[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as IAnnouncement),
      id: doc.id,
    }));
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getAll = async () => {
  try {
    const querySnapshot = await firestore().collection("announcements").get();
    const data: IAnnouncement[] = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as IAnnouncement),
      id: doc.id,
    }));

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default {
  getAll,
  getAllData,
};
