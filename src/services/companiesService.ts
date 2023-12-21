import { ICompany } from "../types/companies/ICompany";
import firestore from "@react-native-firebase/firestore";

// const getAllData = async () => {
//   const dataRef = collection(FirebaseDB, "Companies");
//   const querySnapshot = await getDocs(dataRef);
//   const data = querySnapshot.docs.map((doc) => {
//     return {
//       ...(doc.data() as ICompany),
//       id: doc.id,
//     };
//   });
//   return data;
// };

const getAllData = async () => {
  try {
    const dataRef = firestore().collection("Companies");
    const querySnapshot = await dataRef.get();
    const data = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as ICompany),
      id: doc.id,
    }));

    return data;
  } catch (e) {
    console.log(e);
  }
};

// const getData = async (id: string) => {
//   const docRef = doc(FirebaseDB, "Companies", id + "");
//   const docSnap = await getDoc(docRef);
//   const data = { ...(docSnap.data() as ICompany), id: docSnap.id } as ICompany;
//   return data;
// };

export default { getAllData };
