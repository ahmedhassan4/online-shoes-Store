import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const auth = getAuth(app);
auth.languageCode = "it";
const provider = new GoogleAuthProvider();

const facebookLogin = document.getElementById("facebookLogin");
const googleLogin = document.getElementById("google");

googleLogin.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      console.log(user);
      window.location.href = "./loggedUser.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

function update(user) {
  const userName = user.displayName;
  document.getElementById("username").textContent = userName;
}

update();
