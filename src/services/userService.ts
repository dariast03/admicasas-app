import { IUser, IUserAccount } from "../types/user";
import firestore from "@react-native-firebase/firestore";

const FirestoreKey = "Users";

const updateData = async (data: Partial<IUserAccount>) => {
  try {
    const id = data.id;
    delete data.id;

    const docRef = firestore().collection(FirestoreKey).doc(id);
    await docRef.update(data);
  } catch (e: any) {
    console.error("Error al actualizar", e);
    throw new Error("No se pudo actualizar");
  }
};

export default {
  updateData,
};
