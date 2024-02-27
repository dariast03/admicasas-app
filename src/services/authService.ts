import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { IAccount, IFormLogin, IFormRegister } from "../types/user";

import { IUser } from "../types/user/index";
import { firestoreErrors } from "@/helpers/firestoreErrors";

const FirestoreKey = "Users";

const login = async (data: IFormLogin): Promise<IUser> => {
  const { email, password } = data;
  try {
    const account = await getAccountEmail(email);

    if (account && account.rol === "propietario") {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password
        );

        const user = response.user;
        return {
          id: user.uid,
          email: user.email || "",
          displayName: user.displayName || "",
          account: account,
        };
      } catch (error: any) {
        console.log("🚀 ~ login ~ error:", error);

        if (error.code === "auth/wrong-password") {
          return {
            error:
              "La contraseña ingresada es incorrecta. Por favor, intenta de nuevo.",
          };
        } else if (error.code === "auth/invalid-login") {
          return {
            error:
              "La combinación de correo electrónico y contraseña es inválida. Por favor, verifica la información e intenta de nuevo.",
          };
        } else {
          throw new Error(error.code);
        }
      }
    } else {
      return {
        error:
          "Lo sentimos, esta cuenta es inválida. Por favor, verifica la información e intenta de nuevo.",
      };
    }
  } catch (error: any) {
    throw new Error(error.code);
  }
};

// TODO: CHANGE TYPE IFORMLOGIN BY IFORMREGISTER
const register = async (data: IFormRegister) => {
  const { email, password, name } = data;

  try {
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password
    );

    const user = response.user;

    // const { user } = await auth().signInAnonymously();

    await firestore()
      .collection(FirestoreKey)
      .doc(user.uid)
      .set({ rol: "propietario", email, name });
    // auth().signOut();

    // auth().signInWithCustomToken(await user.getIdToken());
    return {
      id: user.uid,
      email: user.email || "",
      displayName: user.displayName || "",
      account: await getAccount(user.uid),
    };
  } catch (error: any) {
    throw new Error(error.code);
  }
};

const getAccount = async (id: string) => {
  try {
    const docRef = firestore().doc(`${FirestoreKey}/${id}`);
    const docSnap = await docRef.get();
    const data = {
      ...(docSnap.data() as IAccount),
      id: docSnap.id,
    } as IAccount;
    return data;
  } catch (e: any) {
    console.log(e);
    console.warn(e.message);
    return {} as IAccount;
  }
};
const getAccountEmail = async (email: string) => {
  console.log("🚀 ~ getAccountEmail ~ email:", email);
  try {
    const querySnapshot = await firestore()
      .collection(FirestoreKey)
      .where("email", "==", email)
      .get();
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      const data = docSnap.data() as IAccount;
      return {
        ...data,
        id: docSnap.id,
      } as IAccount;
    }
    return null;
  } catch (e) {
    console.error("Error al obtener la cuenta:", e);
    return null;
  }
};
const refresh = async (user: FirebaseAuthTypes.User): Promise<IUser> => {
  return {
    id: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    account: await getAccount(user.uid),
  };
};

const logout = async () => {
  try {
    await auth().signOut();
  } catch (error: any) {
    throw new Error(error.code);
  }
};

export default { login, register, getAccount, refresh, logout };
