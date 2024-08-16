
import { app, auth } from "./firebase.js"
// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";


// on auth state change
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log("user login", uid)
    document.querySelector("#section-dashboard").classList.remove("display_none")
    document.querySelector(".before-signIn").classList.add("display_none")
    // ...
  } else {
    // User is signed out
    // ...
  }
});
// on auth state change

// sign out start

document.querySelector("#sign_out").addEventListener("click", ()=>{
  signOut(auth).then(() => {
    console.log( "// Sign-out successful.")
    document.querySelector("#section-dashboard").classList.add("display_none")
    document.querySelector(".before-signIn").classList.remove("display_none")
   }).catch((error) => {
    console.log( "// An error happened.")
   
     // An error happened.
   })
})

// sign out end 

// dashboard input fields
let blogTitle = document.querySelector(".inpTitle")
let blogDiscription = document.querySelector(".inpBlogDiscription")
let addBlogBtn = document.querySelector("#addBlogBtn")
console.log(blogTitle, blogDiscription, addBlogBtn)

// dashboard functionality start
let addBlog = () => {
  // let obj ={
  //     title: blogTitle.value,
  //     discription: blogDiscription.value
  // }
  // try {
  //     const docRef = await addDoc(collection(db, "obj"), obj);
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }

  let carddiv = document.createElement("div")
  carddiv.className = "card";

  let h1 = document.createElement("h2")
  h1.className = "card-title";
  h1.innerText = blogTitle.value;

  let cardPara = document.createElement("p")
  cardPara.className = "card-discription"
  cardPara.innerText = blogDiscription.value;

  let cardDateDiv = document.createElement("div")
  cardDateDiv.className = "card-date"
  cardDateDiv.innerText = "14-August-1947"

  carddiv.append(h1)
  carddiv.append(cardPara)
  carddiv.append(cardDateDiv)

  document.querySelector("#blog-section").append(carddiv)
  blogTitle.value = ""
  blogDiscription.value = ""



}

addBlogBtn.addEventListener("click", addBlog)
// dashboard functionality end

// sign up authentication start
// signupBtn.addEventListener("click", () => {
//     console.log("working")
//     // const auth = getAuth();
//     createUserWithEmailAndPassword(auth, signupEmail.value, signupPass.value)
//     console.log(signupEmail.value,signupPass.value)
//     .then((userCredential) => {
//         // Signed up
//         const user = userCredential.user;
//         console.log(user)
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorCode, errorMessage)
//         // ..
//     });
// })
// sign up authentication end
