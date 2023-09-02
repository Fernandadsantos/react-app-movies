import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD3kHv8C8K6pD-87JdZHGQ-OflSlj2laYw",
  authDomain: "app-movies-catalog.firebaseapp.com",
  projectId: "app-movies-catalog",
  storageBucket: "app-movies-catalog.appspot.com",
  messagingSenderId: "617489542625",
  appId: "1:617489542625:web:46cbba4c98ccdfb68976a0",
  measurementId: "G-MC9044960L",

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

export {app, auth};