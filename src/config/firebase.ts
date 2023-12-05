import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5vq5ZSfXOrFfjLMSkssewb6wFMXDFU9k",
  authDomain: "admicasas-ae666.firebaseapp.com",
  projectId: "admicasas-ae666",
  storageBucket: "admicasas-ae666.appspot.com",
  messagingSenderId: "302500073375",
  appId: "1:302500073375:web:9da33654116439d845f7aa"
};


const app = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(app)
export const FirebaseDB = getFirestore(app)