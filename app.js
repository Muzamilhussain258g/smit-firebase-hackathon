
import { getDoc, updateDoc, app, auth, db, collection, addDoc, getDocs, doc, deleteDoc } from "./firebase.js"
// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
// import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"; 
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// target section blog start
let blogSection = document.querySelector("#blog-section")
let delBlogBtn = document.querySelector("#del_blog_btn")
let editBlog = document.querySelector("#edit_blog")
let editBlogbtn = document.querySelector('#editBlogBtn')

let selectBlogId = "";
// target section blog end

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

document.querySelector("#sign_out").addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("// Sign-out successful.")
    document.querySelector("#section-dashboard").classList.add("display_none")
    document.querySelector(".before-signIn").classList.remove("display_none")
  }).catch((error) => {
    console.log("// An error happened.")

    // An error happened.
  })
})

// sign out end 

// dashboard input fields
let blogTitle = document.querySelector(".inpTitle")
let blogDiscription = document.querySelector(".inpBlogDiscription")
let addBlogBtn = document.querySelector("#addBlogBtn")
// console.log(blogTitle, blogDiscription, addBlogBtn)

// dashboard functionality start
let addBlog = async () => {

  // add data in firestore db start
  let blog = {
    title: blogTitle.value.trim(),
    discription: blogDiscription.value.trim()
  }

  try {
    const docRef = await addDoc(collection(db, "blog"), blog);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  // read data from firestore db start
  fetchBlogs()


  blogTitle.value = ""
  blogDiscription.value = ""
}
addBlogBtn.addEventListener("click", addBlog)



// the function that delete blog on click
window.deleteBlog = async (blogId) => {
  await deleteDoc(doc(db, "blog", blogId));
  console.log("deleted", blogId)
  fetchBlogs()
}


// the function that edit blog when click on edit
window.editBlog = async (blogId) => {
  addBlogBtn.style.display = 'none';
  editBlogbtn.style.display = 'block';
  selectBlogId = blogId
  try {
    const docRef = doc(db, "blog", blogId);
    const docSnap = await getDoc(docRef);

    blogTitle.value = docSnap.data().title;
    blogDiscription.value = docSnap.data().discription;
  } catch (e) {
    console.log(e)
  }
}

editBlogbtn.addEventListener("click", async () => {
  console.log("editblogbtn")
  // console.log(selectBlogId)
  const blogRef = doc(db, "blog", selectBlogId);

  // Set the "capital" field of the city 'DC'
  await updateDoc(blogRef, {
    title: blogTitle.value.trim(),
    discription: blogDiscription.value.trim()
  });

  addBlogBtn.style.display = 'block';
  editBlogbtn.style.display = 'none';
  blogTitle.value = ""
  blogDiscription.value = ""

  fetchBlogs()
})


// the function that fetch data from fire db and show to the index page when page reload
let fetchBlogs = async () => {
  blogSection.innerHTML = ""
  // read data from firestore db start
  try {
    const querySnapshot = await getDocs(collection(db, "blog"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data().title}`);
      blogSection.innerHTML +=
        `<div class="card">
        <h2 class="card-title">${doc.data().title}</h2>
        <p class="card-discription">${doc.data().discription}</p>
        <div class="card-date">14-August-1947</div>
        <div class="more_options">
          <p id="edit_blog" onclick="editBlog('${doc.id}')">Edit</p>
          <i class="fa-solid fa-trash-can " id="del_blog_btn" onclick="deleteBlog('${doc.id}')"></i>
        </div>
      </div>`
    })

    addBlogBtn.innerHTML = "Add"
  } catch (e) {
    console.log(e)
    blogSection.innerHTML = `<h1>Connection Error</h1>`
  }
  ;
  // read data from firestore db end

}

fetchBlogs()


