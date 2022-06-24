import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCepsj13xylbEhPLOKSN4gszZxxhQ1IRw4",
    authDomain: "todo-list-4347e.firebaseapp.com",
    projectId: "todo-list-4347e",
    storageBucket: "todo-list-4347e.appspot.com",
    messagingSenderId: "38735636901",
    appId: "1:38735636901:web:d866b83f5e79c84e18a04c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
