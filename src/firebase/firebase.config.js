// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcEaQKbOtELUBTJdtFx-C-6_xZHUGpEBA",
  authDomain: "medi-camp-6a87f.firebaseapp.com",
  projectId: "medi-camp-6a87f",
  storageBucket: "medi-camp-6a87f.firebasestorage.app",
  messagingSenderId: "1087885974624",
  appId: "1:1087885974624:web:a1796e87d6bb8908b07705"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);