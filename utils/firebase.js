// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "showcase-24650.firebaseapp.com",
  projectId: "showcase-24650",
  storageBucket: "showcase-24650.appspot.com",
  messagingSenderId: "464561537357",
  appId: "1:464561537357:web:34d0ad2bc5a018ab583704",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
