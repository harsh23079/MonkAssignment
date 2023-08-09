// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_UlrK1lQkkJn_D7XIQSHP_lXbtv-DsWs",
  authDomain: "monk-aa710.firebaseapp.com",
  databaseURL: "https://monk-aa710-default-rtdb.firebaseio.com",
  projectId: "monk-aa710",
  storageBucket: "monk-aa710.appspot.com",
  messagingSenderId: "198514802635",
  appId: "1:198514802635:web:b377443be19e5cb4df404e",
  measurementId: "G-J5R31X04HP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const database = firebase.database();
export const storage = firebase.storage();
