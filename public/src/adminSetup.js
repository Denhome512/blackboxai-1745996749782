// This script demonstrates how to create an admin user and assign role in Firestore.
// This code is intended to be run in a Node.js environment with Firebase Admin SDK.

const admin = require("firebase-admin");

// Path to your Firebase service account key JSON file
const serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

async function createAdminUser(email, password, name) {
  try {
    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name,
    });
    console.log("Successfully created new user:", userRecord.uid);

    // Assign role in Firestore
    await db.collection("residents").doc(userRecord.uid).set({
      name: name,
      email: email,
      role: "Admin",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Admin role assigned in Firestore.");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Example usage:
createAdminUser("admin@tdst.com", "AdminPassword123", "TDST Admin");
