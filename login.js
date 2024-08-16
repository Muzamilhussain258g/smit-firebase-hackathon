import { auth } from "./firebase.js"
import { signInWithEmailAndPassword , onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// login page input fields
let login_pg_inpEmail = document.querySelector("#floatingInput")
let login_pg_inpPass = document.querySelector("#floatingPassword")
let login_btn = document.querySelector("#login")
// login page input fields end


login_btn.addEventListener("click", () => {
    console.log(login_pg_inpEmail.value)
    console.log(login_pg_inpPass.value)

    signInWithEmailAndPassword(auth, login_pg_inpEmail.value, login_pg_inpPass.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            window.location ="./index.html"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode,errorMessage)
        })
        
    })