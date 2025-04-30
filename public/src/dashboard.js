// Firebase initialization (reuse config from auth.js or separate config file)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
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
const auth = getAuth(app);
const db = getFirestore(app);

const userNameElem = document.getElementById("userName");
const userRoleElem = document.getElementById("userRole");
const residentDashboard = document.getElementById("residentDashboard");
const adminDashboard = document.getElementById("adminDashboard");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "/index.html";
});

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Fetch user role and name from Firestore
    const userDoc = await getDoc(doc(db, "residents", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      userNameElem.textContent = userData.name || user.email;
      userRoleElem.textContent = userData.role || "Resident";

      if (userData.role === "Admin" || userData.role === "Treasurer" || userData.role === "Cashier") {
        adminDashboard.classList.remove("hidden");
      } else {
        residentDashboard.classList.remove("hidden");

        // Fetch billing statements for resident
        const billingQuerySnapshot = await getDocs(collection(db, "billingStatements"));
        const billingTableBody = document.getElementById("billingTableBody");
        billingTableBody.innerHTML = "";
        billingQuerySnapshot.forEach((doc) => {
          const billing = doc.data();
          if (billing.residentId === user.uid) {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td class="border border-gray-300 px-4 py-2">${billing.month}</td>
              <td class="border border-gray-300 px-4 py-2">${billing.amountDue}</td>
              <td class="border border-gray-300 px-4 py-2">${billing.status}</td>
            `;
            billingTableBody.appendChild(row);
          }
        });

        // Fetch service requests for resident
        const serviceRequestsSnapshot = await getDocs(collection(db, "serviceRequests"));
        const serviceRequestsTableBody = document.getElementById("serviceRequestsTableBody");
        serviceRequestsTableBody.innerHTML = "";
        serviceRequestsSnapshot.forEach((doc) => {
          const request = doc.data();
          if (request.residentId === user.uid) {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td class="border border-gray-300 px-4 py-2">${new Date(request.requestDate.seconds * 1000).toLocaleDateString()}</td>
              <td class="border border-gray-300 px-4 py-2">${request.issue}</td>
              <td class="border border-gray-300 px-4 py-2">${request.status}</td>
              <td class="border border-gray-300 px-4 py-2">${request.adminReply || ""}</td>
            `;
            serviceRequestsTableBody.appendChild(row);
          }
        });
      }
    } else {
      userNameElem.textContent = user.email;
      userRoleElem.textContent = "Resident";
      residentDashboard.classList.remove("hidden");
    }
  } else {
    window.location.href = "/index.html";
  }
});
