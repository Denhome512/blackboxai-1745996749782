// Firebase initialization (reuse config from auth.js or separate config file)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  // TODO: Replace with your Firebase project config
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const requestAccountForm = document.getElementById("requestAccountForm");

requestAccountForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = requestAccountForm.name.value.trim();
  const email = requestAccountForm.email.value.trim();

  if (!name || !email) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    await addDoc(collection(db, "accountRequests"), {
      name,
      email,
      status: "Pending",
      requestedAt: serverTimestamp(),
    });
    alert("Your account request has been submitted. Please wait for approval.");
    requestAccountForm.reset();
  } catch (error) {
    alert("Failed to submit request: " + error.message);
  }
});
