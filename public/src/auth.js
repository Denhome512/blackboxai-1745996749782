// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAI0NLTFotWX4uRbcKMn3PCe-8-jB5I-Iw",
  authDomain: "tdst-hoa-system-b6029.firebaseapp.com",
  projectId: "tdst-hoa-system-b6029",
  storageBucket: "tdst-hoa-system-b6029.firebasestorage.app",
  messagingSenderId: "589053380799",
  appId: "1:589053380799:web:e15f85149866e22d4e9e0a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Redirect based on role - for now redirect to dashboard.html
    // Role-based redirect logic to be implemented
    window.location.href = "/dashboard.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// Optional: Monitor auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user.email);
  } else {
    console.log("User logged out");
  }
});
