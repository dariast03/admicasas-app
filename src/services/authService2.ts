import { useState } from "react";
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';
import { IAccount, IFormLogin, IUser } from "../types/user";

const login = async (data: IFormLogin): Promise<IUser> => {
  const { email, password } = data;

  try {
    const response = await auth().signInWithEmailAndPassword(email, password);
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

const getAccount = async (id: string) => {
  /*  const docRef = firestore().doc(`Users/${id}`);
   const docSnap = await docRef.get();
   const data = { ...(docSnap.data() as IAccount), id: docSnap.id } as IAccount; */
  return {} as IAccount;
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

export default { login, getAccount, refresh, logout };
