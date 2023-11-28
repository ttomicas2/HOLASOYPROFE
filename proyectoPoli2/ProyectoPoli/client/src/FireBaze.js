// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9MEDCwG8X000TjcXLvE_76cY8MxBaxDk",
  authDomain: "proyectopoli-84001.firebaseapp.com",
  projectId: "proyectopoli-84001",
  storageBucket: "proyectopoli-84001.appspot.com",
  messagingSenderId: "912412860135",
  appId: "1:912412860135:web:7309edd036a42a74c30c42",
  measurementId: "G-KS0ZTGZP1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

