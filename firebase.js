// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore ,collection, addDoc,getDocs ,doc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD465b7siEzDvYfsWiA1Hs2doHHb6bhcPE",
  authDomain: "hackathon-firebase-7646d.firebaseapp.com",
  projectId: "hackathon-firebase-7646d",
  storageBucket: "hackathon-firebase-7646d.appspot.com",
  messagingSenderId: "659862286417",
  appId: "1:659862286417:web:bcd86d7ad481567ba90870"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app,auth,getFirestore ,collection, addDoc, db, getDocs , doc, deleteDoc }