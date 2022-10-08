// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-Y5PUr4hgkb6j3pGdXnXBoMkEmhLUvRo",
    authDomain: "fir-reduxstorybox.firebaseapp.com",
    projectId: "fir-reduxstorybox",
    storageBucket: "fir-reduxstorybox.appspot.com",
    messagingSenderId: "1065366240057",
    appId: "1:1065366240057:web:86f2be85da4a8e7eb746e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;