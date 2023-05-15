// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9pypDqmV1KUUGKWZX3FE-_PEqMiExVfM",
  authDomain: "simply-chat-398c4.firebaseapp.com",
  projectId: "simply-chat-398c4",
  storageBucket: "simply-chat-398c4.appspot.com",
  messagingSenderId: "605773866272",
  appId: "1:605773866272:web:b5f0c57ad5aca35aa1a345"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
