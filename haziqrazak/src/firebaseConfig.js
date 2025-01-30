// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwlyCHU...",
  authDomain: "haziqrazak-c85d2.firebaseapp.com",
  projectId: "haziqrazak-c85d2",
  storageBucket: "haziqrazak-c85d2.appspot.com",
  messagingSenderId: "165439587786",
  appId: "1:165439587786:web:1de816c31a5179efe3fb33",
  measurementId: "G-WV17VJBCGB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export
export const db = getFirestore(app);
