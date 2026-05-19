
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCpCESWqJVVDpBqcD9UalgrV_TxbqJPLVY",
    authDomain: "travella-f5876.firebaseapp.com",
    projectId: "travella-f5876",
    storageBucket: "travella-f5876.firebasestorage.app",
    messagingSenderId: "740932330275",
    appId: "1:740932330275:web:f0412e43b7b3e8945ce296",
    measurementId: "G-EPG0074SKV"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});


googleProvider.setCustomParameters({
    prompt: 'select_account'
});