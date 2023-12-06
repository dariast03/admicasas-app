import { useState } from "react";
import {
  GoogleAuthProvider,
  User,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseAuth, FirebaseDB } from "../config/firebase";
import { IAccount, IFormLogin, IUser } from "../types/user";
import { doc, getDoc } from "firebase/firestore";

const login = async (data: IFormLogin): Promise<IUser> => {
  const { email, password } = data;

  try {
    const response = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );
    const user = response.user;
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

/* const onRegister = async (data: {
  email: string;
  password: string;
  nombre: string;
}): Promise<void | string> => {
  const { email, password, nombre } = data;

  try {
    const response = await toast.promise(
      createUserWithEmailAndPassword(FirebaseAuth, email, password),
      {
        loading: "Autenticando",
        success: "Te has registrado correctamente!",
        error: (e) => {
          return firebaseErrors[e.message || ""];
        },
      }
    );
    const { uid } = response.user;

    await updateProfile(response.user, { displayName: nombre });

    setLogin({
      ...response.user,
      id: uid,
      displayName: nombre,
    });
  } catch (error) {
    console.log(error, "ERRORRR");
    return (error as any).code;
  }
};
 */
const getAccount = async (id: string) => {
  const docRef = doc(FirebaseDB, "Users", id + "");
  const docSnap = await getDoc(docRef);
  const data = { ...(docSnap.data() as IAccount), id: docSnap.id } as IAccount;
  return data;
};

const refresh = async (user: User): Promise<IUser> => {
  return {
    id: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    account: await getAccount(user.uid),
  };
};

const logout = async () => {
  try {
    await FirebaseAuth.signOut();
  } catch (error: any) {
    throw new Error(error.code);
  }
};

// export const logout = async () => {
//     try {
//         return await FirebaseAuth.signOut()
//     } catch (error) {
//         throw new Error(error.code)
//     }
// }

const loginWithEmail = async (): Promise<IUser> => {
  try {
    const googleProvider = new GoogleAuthProvider();
    const response = await signInWithPopup(FirebaseAuth, googleProvider);
    const user = response.user;
    console.log(response);
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

export default {
  login,
  refresh,
  logout,
  loginWithEmail,
};
