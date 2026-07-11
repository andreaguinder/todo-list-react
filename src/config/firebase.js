// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZG2RHIvGfYZFyOLm2zsPeCfby5pI1NsI",
  authDomain: "zylos-f9a69.firebaseapp.com",
  projectId: "zylos-f9a69",
  storageBucket: "zylos-f9a69.firebasestorage.app",
  messagingSenderId: "518774071045",
  appId: "1:518774071045:web:da58819997faebdbf6e16c",
  measurementId: "G-YV70R8MMLR"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos lo que necesitamos
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);