// src/firebaseInit.js
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDfND4jTbo2FyfcCVg2phUqGY45euNuQdU",
    authDomain: "sysaut-581a8.firebaseapp.com",
    projectId: "sysaut-581a8",
    storageBucket: "sysaut-581a8.appspot.com",
    messagingSenderId: "281534621983",
    appId: "1:281534621983:web:e98f707ff6124fa9aca82a",
    measurementId: "G-BH2N1785B3"
  };

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;