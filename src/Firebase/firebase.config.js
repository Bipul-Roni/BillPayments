// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQ_21MZbbc_eyomujDq_jVMWK3frcyGkE",
  authDomain: "bill-payment-85968.firebaseapp.com",
  projectId: "bill-payment-85968",
  storageBucket: "bill-payment-85968.appspot.com", // fixed
  messagingSenderId: "1080730550490",
  appId: "1:1080730550490:web:e94f7b502ab2c514ac25e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };