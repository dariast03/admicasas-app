import firestore from "@react-native-firebase/firestore";

import { IAnnouncement } from "../types/announcement/announcement";
import chargerService from "./chargerService";
import paymentService from "./paymentService";

type GetAllDataQueryParams = {
  iduser?: string;
  idcondominium: string;
  idhousing?: string;
  idcharge?: string;
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
  { idcondominium, q, limitResults, idhousing }: GetAllDataQueryParams = {
    idcondominium: "",
    iduser: "",
  }
) => {
  try {
    if (!idcondominium) {
      return [];
    }
    const currentDate = new Date();

    let queryRef = firestore()
      .collection("Announcements")
      .where("idcondominiums", "array-contains", idcondominium)
      .where("end", ">=", currentDate);

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
    const data: IAnnouncement[] = querySnapshot.docs.map((doc) => {
      // const dataFilter = doc.data() as IAnnouncement;
      //const datf = dataFilter(announcement => announcement.idhousings.includes(idhousing));
      return {
        ...(doc.data() as IAnnouncement),
        id: doc.id,
      };
    });
    const dataFilter = data.filter(
      (announcement) =>
        (announcement.idcondominiums && !announcement.idhousings) ||
        announcement.idhousings.some((item) => item.idhousing === idhousing)
    );

    return dataFilter;
  } catch (e) {
    console.log(e);
  }
};

const getData = async (
  id: string,
  { idcharge, idhousing }: GetAllDataQueryParams
): Promise<IAnnouncement> => {
  const docRef = firestore().collection("Announcements").doc(id);
  const docSnap = await docRef.get();
  //const data = docSnap.data() as IAnnouncement;

  const data = docSnap.data() as IAnnouncement;
  const charge = await chargerService.getData(data.idcharge || "", {
    idhousing: idhousing || "",
  });

  return {
    ...data,
    charge: data.type === "charge" ? charge : undefined,

    //@ts-ignore
    start: new Date(data.start.toDate()),
    //@ts-ignore
    end: new Date(data.end.toDate()),
    id: docSnap.id,
  };
};

const getDataDetail = async ({
  idcharge,
}: GetAllDataQueryParams): Promise<IAnnouncement | null> => {
  const queryRef = firestore()
    .collection("Announcements")
    .where("idcharge", "==", idcharge);

  const querySnapshot = await queryRef.get();

  if (querySnapshot.empty) {
    return null;
  }
  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data() as IAnnouncement;

  return {
    ...data,
    id: docSnap.id,
    //@ts-ignore
    start: new Date(data.start.toDate()),
    //@ts-ignore
    end: new Date(data.end.toDate()),
  };
};

// const getDataDetail = async ({
//   idcharge,
// }: GetAllDataQueryParams): Promise<IAnnouncement> => {
//   let queryRef = firestore()
//     .collection("Announcements")
//     .where("idcharge", "==", idcharge);

//   const querySnapshot = await queryRef.get();

//   const data: IAnnouncement[] = querySnapshot.docs.map((doc) => {
//     return {
//       ...(doc.data() as IAnnouncement),
//       id: doc.id,
//       //@ts-ignore
//       start: new Date(data.start.toDate()),
//       //@ts-ignore
//       end: new Date(data.end.toDate()),
//     };
//   });
//   console.log(
//     "🚀 ~ constdata:IAnnouncement[]=querySnapshot.docs.map ~ data:",
//     data
//   );

//   return data.length > 0 ? data[0] : ({} as IAnnouncement);
// };

// const getData = async (id: string) => {
//   const docRef = doc("Announcements", id + "");
//   const docSnap = await getDoc(docRef);

//   const data = docSnap.data() as IAnnouncement;
//   return {
//       ...data,
//       //@ts-ignore
//       start: new Date(data.start.toDate()),
//       //@ts-ignore
//       end: new Date(data.end.toDate()),
//       id: docSnap.id,
//   };
// };

export default {
  getDataDetail,
  getAllData,
  getData,
};
