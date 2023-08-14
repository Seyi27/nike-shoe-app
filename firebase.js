import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9mjcFwlKth59yPxf1xWfKtal0rdOnxGU",
  authDomain: "nike-shoe-app.firebaseapp.com",
  projectId: "nike-shoe-app",
  storageBucket: "nike-shoe-app.appspot.com",
  messagingSenderId: "104224496464",
  appId: "1:104224496464:web:6b0f11576394e934d5ea55"
};

// Initialize Firebase
const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();

export default db;