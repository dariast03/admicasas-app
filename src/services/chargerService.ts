// import firestore from "@react-native-firebase/firestore";
// import { ICharge } from "@/types/charges/charges";

//   type GetDataQueryParams = {
//     idcondominium: string;
//     q?: string;
//     limitResults?: number;
//   };

//   const getData = async (id: string) => {
//     const docRef = firestore().collection("Charges").doc(id);
//     const docSnap = await docRef.get();

//     const data = docSnap.data() as ICharge;

//     return {
//       ...data,
//       //@ts-ignore
//       start: new Date(data.start.toDate()),
//       //@ts-ignore
//       end: new Date(data.end.toDate()),
//       id: docSnap.id,
//     };
//   };

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

//   export default {

//     getData,

//   };
