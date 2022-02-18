  // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCAaEZLL2XTmRYsyfHaCGzeDkM8n3q2Zg4",
    authDomain: "writereadtrial.firebaseapp.com",
    databaseURL: "https://writereadtrial-default-rtdb.firebaseio.com",
    projectId: "writereadtrial",
    storageBucket: "writereadtrial.appspot.com",
    messagingSenderId: "892636068322",
    appId: "1:892636068322:web:2141cd17c4789e3845a1bb"
  };

  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);


// ......................firebase authentication (signup)...............................

auth = firebase.auth();
// function to manage signup when we click sign up button

function sign_up(){
    // initializing variables for the different inputs we have
    email = document.getElementById('user_email').value;
    
    password = document.getElementById('user_pass').value;

    userName = document.getElementById('user_name').value;

    // statement to alert user that he has not put an email

    if(email == ""){
        alert("mail cant be empty!");
    }

    
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      alert("sucess!");
      var user = userCredential.user;

    //   code to save userName in Firebase aUth
      user.updateProfile({
          displayName: userName
      }).then(() => {
          //   ......................push user to the main or shop part when he has signed up successfully............................
        window.location.href="mainshop.html";


      })
    
      // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // incase it fails
        alert("creating failed"+ errorMessage);
     
      // ..
    });


} 



// the code for log in

function login_in(){
    email = document.getElementById('user_mail').value;
    
    password = document.getElementById('user_password').value;

    // statement to alert user that he has not put an email

    if(email == ""){
        alert("mail cant be empty!");
    }

    
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      alert("sucess!");
      var user = userCredential.user;
    //   ......................push user to the main or shop part when he has signed up successfully............................
        window.location.href="mainshop.html";

      // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // incase it fails
        alert("login failed"+ errorMessage);
     
      // ..
    });


} 


// forgot password implementation

function forgot_pass(){
    email=document.getElementById('email_to_reset').value;

    auth.sendPasswordResetEmail(email);
    alert("check your email");

    window.location.href="login.html";

}




