// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4NYk0PLJoDNc5YMmIB7oTHgm_HTdzuOU",
  authDomain: "tinder-clone-19c44.firebaseapp.com",
  projectId: "tinder-clone-19c44",
  storageBucket: "tinder-clone-19c44.appspot.com",
  messagingSenderId: "71749600959",
  appId: "1:71749600959:web:ebdb2b505ff3709da2a80a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
