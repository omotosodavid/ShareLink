// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcop1jHqntLE0kHnBvSGz4iGS7_uk07JI",
  authDomain: "sharelink-c895d.firebaseapp.com",
  projectId: "sharelink-c895d",
  storageBucket: "sharelink-c895d.appspot.com",
  messagingSenderId: "973769484959",
  appId: "1:973769484959:web:6f4d87095a941ba08e90aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();