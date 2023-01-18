// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjyLUSxSOROikcsmM2WTMLoeFHEuq4pZQ",
  authDomain: "web-demo-24e16.firebaseapp.com",
  projectId: "web-demo-24e16",
  storageBucket: "web-demo-24e16.appspot.com",
  messagingSenderId: "49630067247",
  appId: "1:49630067247:web:01299319fa3d1c2be9a4da",
  measurementId: "G-K09VK80NJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const storage = getStorage(app);

export const db = getFirestore();
