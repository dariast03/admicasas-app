import firestore from "@react-native-firebase/firestore";
import { IQuestions } from "@/types/questions/questions";

const FirestoreKey = "Questions";

const getAllData = async () => {
  try {
    let dataRef = firestore().collection(FirestoreKey);

    const querySnapshot = await dataRef.get();
    const data = querySnapshot.docs.map((doc) => ({
      ...(doc.data() as IQuestions),
      id: doc.id,
    }));

    return data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
};

export default { getAllData };
