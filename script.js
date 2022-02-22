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
db = firebase.firestore();
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

    window.location.href="index.html";

}







//....................................log out fmction ..................................


function logout(){
// import { getAuth, signOut } from "firebase/auth";

auth = firebase.auth(); 
auth.signOut().then(() => {


  // Sign-out successful.
  window.location.href="index.html";
}).catch((error) => {
    alert("login failed"+ errorMessage);
  // An error happened.
});

}



//............................state observer to always prevrnt user from accessing other pages ifnot signed in............................

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    } else {
      if (window.location.pathname=="/mainshop.html" ){

        window.location.href="index.html";
      }
      // No user is signed in.
    }
  });



  // for sending data to the bd ...................... in the damin hml


  function upload_to_db(){
    // Add a new document with a generated id.


    // remember to initialize db up in the initialize function 
 db.collection("Products").add({

  // to be used when calling form the db 
  item_name: document.getElementById('iten').value,
  item_price: document.getElementById('price').value,
  maker:document.getElementById('maker').value


})
.then((docRef) => {
  console.log("Document written with ID: ", docRef.id);
  alert('success');
})
.catch((error) => {
  alert('fail'+errorMessage);

  console.error("Error adding document: ", error);
});
  }


  // read them into table and then main shop
  // for table...................................

  function read()
  {


    db.collection("Products")

    .onSnapshot((querySnapshot) => {

        querySnapshot.forEach((doc) => {
 product = doc.data();
          // regrence to your table
         table_ref = document.getElementById('admin_table').getElementsByTagName('tbody')[0];
// inser row after the last index always
         newRow = table_ref.insertRow(-1);

        //  INSTRUCT THE JS ON HOW TO FILL IN THE ROW
         //  key names that we used wheninputing in the db iin upload function
         newRow.innerHTML = `<tr> 
       
         <td> `+ product["item_name"] + `</td>
         <td>`+ product["item_price"] +`</td>
          <td>`+product["maker"] +`</td>
          <td></td>
         <td>
          
           <button class="btn" onClick="delete_itens('`+ doc.id +`')"><img src="trash.png">  </button>
         </td>
        </tr>`


        });
    });
  }


  // for the main shop 

  function   read_main(){
    db.collection("Products")
    .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("yeh");
          product = doc.data();
          div_ref = document.getElementById('items');

          div_ref.innerHTML+= `<div lass="item_card" ><img src="" alt="to hold the image">
          <h3>`+ product["item_name"] + `</h3>
          <h5>`+ product["item_price"] +`</h5>
          <h6>`+product["maker"] +`</h6></div>`;

        });
    });

  }


  // delete data in the table (admin side)

  function delete_itens(id){
    db.collection("Products").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });

  }



