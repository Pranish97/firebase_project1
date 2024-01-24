// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB92N3NiKsyGuA9inLSoUfPmgn0YbVFo-g",
  authDomain: "react-firebase-69497.firebaseapp.com",
  projectId: "react-firebase-69497",
  storageBucket: "react-firebase-69497.appspot.com",
  messagingSenderId: "788677118550",
  appId: "1:788677118550:web:49aa51d89797310e29c9f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();