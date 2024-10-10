// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAxDinVSU4VnHEZljFYvOBi3peDJRc2fc",
  authDomain: "chatapp-f06cd.firebaseapp.com",
  projectId: "chatapp-f06cd",
  storageBucket: "chatapp-f06cd.appspot.com",
  messagingSenderId: "875698880556",
  appId: "1:875698880556:web:406abf99eb374363059189",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);