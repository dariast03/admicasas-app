import firestore from "@react-native-firebase/firestore";
import { ICharge } from "@/types/charges/charges";
import paymentService from "./paymentService";
import paymentTypeService from "./paymentTypeService";
import housingService from "./housingService";

type GetDataQueryParams = {
  idhousing: string;
  idreservation?: string;
  q?: string;
  limitResults?: number;
  type?: "History" | "Payments";
};

const FirestoreKey = "Chargesx";

// const getAllData = async ({
//   idhousing,
//   q,
//   limitResults,
// }: GetDataQueryParams) => {
//   try {
//     let queryRef = firestore()
//       .collection(FirestoreKey)
//       .where("idhousing", "==", idhousing)
//       .where("paymentstatus", "!=", "Pendiente")
//       .orderBy("end", "desc");

//     // if (q) {
//     //   queryRef = queryRef
//     //     .orderBy("name")
//     //     .startAt(q)
//     //     .endAt(q + "\uf8ff");
//     // }

//     // if (limitResults) {
//     //   queryRef = queryRef.limit(limitResults);
//     // }

//     const querySnapshot = await queryRef.get();

//     const data: ICharge[] = [];

//     for (const doc of querySnapshot.docs) {
//       const chargeData = doc.data() as ICharge;

//       const paymentTypes = await paymentTypeService.getData(
//         chargeData.idpaymenttypes
//       );
//       if (paymentTypes?.type === "expensa") {
//         const housing = await housingService.getData(idhousing);
//         chargeData.amount = housing?.amount;
//       }

//       const paymentQuerySnapshot = await firestore()
//         .collection("Payments")
//         .where("idcharge", "==", doc.id)
//         .where("idhousing", "==", idhousing)
//         .get();

//       const paymentExists = paymentQuerySnapshot.docs.some((paymentDoc) => {
//         if (
//           paymentDoc.data().state === "Aprobado" ||
//           paymentDoc.data().state === "Pendiente"
//         ) {
//           const paymentData = paymentDoc.data();
//           return paymentData;
//         }
//       });

//       if (!paymentExists) {
//         data.push({
//           ...chargeData,
//           //@ts-ignore
//           //start: new Date(chargeData.start.toDate()),
//           //@ts-ignore
//           end: new Date(chargeData.end.toDate()),
//           id: doc.id,
//         });
//       }
//     }

//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// };

//TODO GETALL: Funcion antes de cambiar Charges
// const getAllDataByPage = async (context: any) => {
//   try {
//     const { pageParam = undefined, queryKey } = context;
//     const [, , args] = queryKey;
//     const { limitResults, idhousing = "" } = args as GetDataQueryParams;

//     if (!idhousing) throw new Error("idcondominium is required");

//     let queryRef = firestore()
//       .collection(FirestoreKey)
//       .where("idhousings", "array-contains", idhousing)
//       .orderBy("end", "desc");

//     if (pageParam) {
//       queryRef = queryRef.startAfter(pageParam);
//     }

//     queryRef = queryRef.limit(limitResults || 2);

//     const querySnapshot = await queryRef.get();

//     const dataPromises: Promise<ICharge | null>[] = querySnapshot.docs.map(
//       async (doc) => {
//         const chargeData = doc.data() as ICharge;

//         const paymentTypes = await paymentTypeService.getData(
//           chargeData.idpaymenttypes
//         );
//         if (paymentTypes?.type === "expensa") {
//           const housing = await housingService.getData(idhousing);
//           chargeData.amount = housing?.amount;
//         }

//         const paymentQuerySnapshot = await firestore()
//           .collection("Payments")
//           .where("idcharge", "==", doc.id)
//           .where("idhousing", "==", idhousing)
//           .get();

//         const paymentExists = paymentQuerySnapshot.docs.some((paymentDoc) => {
//           if (
//             paymentDoc.data().state === "Aprobado" ||
//             paymentDoc.data().state === "Pendiente"
//           ) {
//             const paymentData = paymentDoc.data();
//             return paymentData;
//           }
//         });

//         if (!paymentExists) {
//           // data.push({
//           //   ...chargeData,
//           //   //@ts-ignore
//           //   //start: new Date(chargeData.start.toDate()),
//           //   //@ts-ignore
//           //   end: new Date(chargeData.end.toDate()),
//           //   id: doc.id,
//           // });
//           return {
//             ...chargeData,
//             //@ts-ignore
//             //start: new Date(chargeData.start.toDate()),
//             //@ts-ignore
//             end: new Date(chargeData.end.toDate()),
//             id: doc.id,
//           };
//         }
//         return null;
//       }
//     );

//     const data = await Promise.all(dataPromises);

//     const datafilter = data.filter((item) => item != null);

//     const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

//     return {
//       data: datafilter,
//       lastDoc,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

const getAllDataByPage = async (context: any) => {
  try {
    const { pageParam = undefined, queryKey } = context;

    const [, , args] = queryKey;
    const { limitResults, idhousing = "", type } = args as GetDataQueryParams;
    console.log("🚀 ~ getAllDataByPage ~ type:", type);

    if (!idhousing) throw new Error("idcondominium is required");
    let queryRef = firestore()
      .collection(FirestoreKey)
      .where("idhousing", "==", idhousing)
      .where("paymentstatus", "in", ["Pendiente", "Rechazado"])
      .orderBy("end", "desc");

    if (type === "Payments") {
      queryRef = firestore()
        .collection(FirestoreKey)
        .where("idhousing", "==", idhousing)
        .where("paymentstatus", "in", ["Aprobado", "Pendiente"])
        .orderBy("end", "desc");
    }
    console.log("🚀 ~ getAllDataByPage ~ queryRef:", queryRef);

    if (pageParam) {
      queryRef = queryRef.startAfter(pageParam);
    }

    queryRef = queryRef.limit(limitResults || 2);

    const querySnapshot = await queryRef.get();

    const dataPromises: Promise<ICharge>[] = querySnapshot.docs.map(
      async (doc) => {
        const chargeData = doc.data() as ICharge;

        const paymentTypes = await paymentTypeService.getData(
          chargeData.idpaymenttypes
        );

        if (paymentTypes?.type === "expensa") {
          const housing = await housingService.getData(idhousing);
          chargeData.amount = housing?.amount;
        }

        return {
          id: doc.id,
          ...chargeData,
          //@ts-ignore
          //start: new Date(chargeData.start.toDate()),
          //@ts-ignore
          end: new Date(chargeData.end.toDate()),
          //@ts-ignore
          // date: new Date(chargeData.date.toDate()),
        };
      }
    );

    const data = await Promise.all(dataPromises);

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      data,
      lastDoc,
    };
  } catch (error) {
    console.log(error);
  }
};

const getDataByReservation = async ({
  idhousing,
  idreservation,
}: GetDataQueryParams) => {
  try {
    let docRef = firestore()
      .collection(FirestoreKey)
      .where("idhousing", "==", idhousing)
      .where("idreserve", "==", idreservation);
    const docSnap = await docRef.get();

    const data = docSnap.docs.map((doc) => ({
      ...(doc.data() as ICharge),
      id: doc.id,
    }));

    return data[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getData = async (id: string, { idhousing }: GetDataQueryParams) => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    const docSnap = await docRef.get();

    const data = docSnap.data() as ICharge;

    const dataTypes = await paymentTypeService.getData(data.idpaymenttypes);

    if (dataTypes?.type == "expensa") {
      const hounsing = await housingService.getData(idhousing);
      data.amount = hounsing?.amount;
    }

    return {
      ...data,
      id: data.id,
      //@ts-ignore
      //start: new Date(data.start.toDate()),
      //@ts-ignore
      //end: new Date(data.end.toDate()),
    };
  } catch (error) {
    console.log(error);
  }
};

export default {
  getData,
  //getAllData,
  getDataByReservation,
  getAllDataByPage,
};
