// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBygYFcIWdCmxnfP4Aczamtu32nldPf6Uo",
    authDomain: "duantotnghiep-87d19.firebaseapp.com",
    projectId: "duantotnghiep-87d19",
    storageBucket: "duantotnghiep-87d19.appspot.com",
    messagingSenderId: "937427295315",
    appId: "1:937427295315:web:4d08cdefe8b9dcf6423aa6"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };