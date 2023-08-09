import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

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

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const storage = firebase.storage();
