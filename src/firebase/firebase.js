// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2db5dTjbjpnMKm4Jc6lV3ljS41TWu4CY",
  authDomain: "aquaponics-d8dcc.firebaseapp.com",
  projectId: "aquaponics-d8dcc",
  storageBucket: "aquaponics-d8dcc.firebasestorage.app",
  messagingSenderId: "668521570694",
  appId: "1:668521570694:web:b655ef519aa7590169cc07",
  measurementId: "G-HQN5BX1TMY",
  databaseURL: "https://aquaponics-d8dcc-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, app, database };