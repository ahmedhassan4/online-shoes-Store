import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
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
const user = auth.currentUser;

function update(user) {
  const userName = user.displayName;
  document.getElementById("username").textContent = `Hello ${userName}`;
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    update(user);
    const uid = user.uid;
    return uid;
  } else {
    alert("please create an account and login");
    window.location.href = "login.html";
  }
});
