import { IReservation } from "../types/reserve/reserve";
import { isWithinInterval, startOfMonth } from "date-fns";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import areaService from "./areaService";
import { IArea } from "@/types/area/area";
import { QueryFunctionContext } from "@tanstack/react-query";

const FirestoreKey = "Reservation";

type GetAllDataQueryParams = {
  idhousing?: string;
  idcondominium: string;
  selectedDate?: Date;
  limitResults?: number;
};

// type contextType= {
//   queryKey: (string | {
//       idcondominium: string;
//       selectedDate?: Date | undefined;
//       limitResults?: number | undefined;
//   } | undefined)[];

//   pageParam: null | FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>;

// }

type QueryContext = QueryFunctionContext<
  (string | GetAllDataQueryParams)[],
  any
>;

export const getAllData = async (context: any) => {
  try {
    //const Filter = firestore.Filter;
    const { pageParam = undefined, queryKey } = context;
    const [, , args] = queryKey;
    const { selectedDate, limitResults, idhousing } =
      args as GetAllDataQueryParams;

    let queryRef = firestore()
      .collection(FirestoreKey)
      .where("idhousing", "==", idhousing);

    if (pageParam) {
      queryRef = queryRef.startAfter(pageParam);
    }

    queryRef = queryRef.limit(limitResults || 3);

    const querySnapshot = await queryRef.get();

    const dataPromises: Promise<IReservation>[] = querySnapshot.docs.map(
      async (doc) => {
        const dataRef = doc.data() as IReservation;

        const area = await areaService.getData(dataRef.idarea);

        return {
          ...dataRef,
          areaName: area?.name,
          id: doc.id,
          //@ts-ignore
          start: new Date(dataRef.start.toDate()),
          //@ts-ignore
          end: new Date(dataRef.end.toDate()),
        } as IReservation;
      }
    );

    const data = await Promise.all(dataPromises);
    data.sort((a, b) => a.end.getTime() - b.end.getTime());

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      data,
      lastDoc,
    };
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

// const getAllData = async (
//   { idcondominium, selectedDate }: GetAllDataQueryParams = { idcondominium: "" }
// ) => {
//   try {
//     let queryRef = firestore()
//       .collection(FirestoreKey)
//       .where("idcondominium", "==", idcondominium);

//     const querySnapshot = await queryRef.get();

//     const dataPromises: Promise<IReservation>[] = querySnapshot.docs.map(
//       async (doc) => {
//         const dataRef = doc.data() as IReservation;

//         const area = await areaService.getData(dataRef.idarea);

//         return {
//           ...dataRef,
//           areaName: area?.name,
//           id: doc.id,
//           //@ts-ignore
//           start: new Date(dataRef.start.toDate()),
//           //@ts-ignore
//           end: new Date(dataRef.end.toDate()),
//         } as IReservation;
//       }
//     );

//     const data = await Promise.all(dataPromises);
//     data.sort((a, b) => a.end.getTime() - b.end.getTime());
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// };

// const getAllDayData = async (
//   { idcondominium, selectedDate }: GetAllDataQueryParams = { idcondominium: "" }
// ) => {
//   try {
//     let queryRef = firestore()
//       .collection(FirestoreKey)
//       .where("idcondominium", "==", idcondominium)
//       .where("start", "==", selectedDate)
//       .where("end", "==", selectedDate);

//     const querySnapshot = await queryRef.get();

//     const data: IReservation[] = querySnapshot.docs.map((doc) => {
//       const data = doc.data() as IReservation;

//       return {
//         ...data,
//         id: doc.id,
//         //@ts-ignore
//         start: new Date(data.start.toDate()),
//         //@ts-ignore
//         end: new Date(data.end.toDate()),
//       };
//     });

//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// };

const getData = async (id: string) => {
  try {
    const docRef = firestore().collection(FirestoreKey).doc(id);
    const docSnap = await docRef.get();

    const data = docSnap.data() as IReservation;

    return {
      ...data,
      //@ts-ignore
      start: new Date(data.start.toDate()),
      //@ts-ignore
      end: new Date(data.end.toDate()),
      id: docSnap.id,
    };
  } catch (e) {
    console.log(e);
  }
};

const checkSameAreaInDate = async (data: IReservation, isUpdate = false) => {
  console.log({
    data,
    isUpdate,
  });
  let queryRef = firestore()
    .collection(FirestoreKey)
    .where("idcondominium", "==", data.idcondominium)
    .where("idarea", "==", data.idarea)
    .where("startDetail.year", "==", data.startDetail.year)
    .where("startDetail.month", "==", data.startDetail.month);

  const areaReservations = await queryRef.get();

  //  * Check if there is a reservation with the same area in same date
  // const areaReservationQuery = query(
  //   reservationsRef,
  //   where("idcondominium", '==', data.idcondominium),
  //   where("idarea", "==", data.idarea),
  //   where("startDetail.year", "==", data.startDetail.year),
  //   where("startDetail.month", "==", data.startDetail.month)
  // );

  // const areaReservations = await getDocs(areaReservationQuery);

  if (areaReservations.size) {
    const isDateOverlap = areaReservations.docs.some((doc) => {
      if (isUpdate) {
        if (data.id === doc.id) return false;
      }

      const dataReserva = doc.data() as IReservation;
      console.log(dataReserva, "FECHA");
      //@ts-ignore
      const reservaInicio = new Date(dataReserva.start.toDate());
      //@ts-ignore
      const reservaFin = new Date(dataReserva.end.toDate());

      return (
        isWithinInterval(data.start, {
          start: reservaInicio,
          end: reservaFin,
        }) ||
        isWithinInterval(data.end, { start: reservaInicio, end: reservaFin })
      );
    });

    if (isDateOverlap)
      throw new Error(
        "El area seleccionada ya cuenta con una reservacion en el misma dia/hora seleccionado"
      );
  }
};

const validateReservation = async (data: IReservation, isUpdate = false) => {
  await checkSameAreaInDate(data, isUpdate);
};

// const insertData = async (data: IReservation) => {
//   if (!data.idcondominium) {
//     throw new Error("idcondominium invalid or empty");
//   }

//   await validateReservation(data);

//   const document = await addDoc(collection(FirebaseDB, "Reservation"), data);
//   return document.id;
// };

const updateData = async (
  data: Partial<IReservation>,
  ignoreValidations = false
) => {
  if (!data.idcondominium) {
    throw new Error("idcondominium invalid or empty");
  }

  if (!ignoreValidations) await validateReservation(data as IReservation, true);

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

const insertData = async (data: IReservation) => {
  console.log("🚀 ~ insertData ~ data:", data);
  await validateReservation(data);
  try {
    const doc = await firestore().collection(FirestoreKey).add(data);
    return doc.id;
  } catch (e: any) {
    console.log(e);
  }
};

export default {
  getAllData,
  // getAllDayData,
  getData,
  insertData,
  updateData,
};
