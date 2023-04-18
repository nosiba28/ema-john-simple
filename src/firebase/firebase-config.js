// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD-8W3Agot228D2sH2aqjtlVqAuZY3aYs",
  authDomain: "ema-john-with-firebase-a-bbc9b.firebaseapp.com",
  projectId: "ema-john-with-firebase-a-bbc9b",
  storageBucket: "ema-john-with-firebase-a-bbc9b.appspot.com",
  messagingSenderId: "153587654884",
  appId: "1:153587654884:web:4ab7f5dfffa81a9e8c0cf1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;