import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCULEElK8GTuqMPPZ44S4vDaVnWeUvSnBo",
  authDomain: "katkot-65ebd.firebaseapp.com",
  projectId: "katkot-65ebd",
  storageBucket: "katkot-65ebd.appspot.com",
  messagingSenderId: "424344176002",
  appId: "1:424344176002:web:15e23529b6953950107b9b",
  measurementId: "G-RB6CF9G1XC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new FacebookAuthProvider();
const auth = getAuth();
const facebookLogin = document.getElementById("facebookLogin");

facebookLogin.addEventListener("click", function () {
  console.log("clicked");
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      // IdP data available using getAdditionalUserInfo(result)
      // ...   console.log(user);
      console.log(user);
      window.location.href = "./loggedUser.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
});

function update(user) {
  const userName = user.displayName;
  document.getElementById("username").textContent = userName;
}

update();
