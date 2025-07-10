// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5XTh3WbxTgsUxyMS2mPzd-ygUQs_feT4",
    authDomain: "backend-for-proj.firebaseapp.com",
    projectId: "backend-for-proj",
    storageBucket: "backend-for-proj.firebasestorage.app",
    messagingSenderId: "191246862189",
    appId: "1:191246862189:web:9df91958a4abf30296bc64",
    measurementId: "G-KFXFTY3ZCS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
