# TDST HOA System

## Overview
This is a comprehensive Homeowners Association (HOA) system for Terrazza de Sto. Tomas (TDST). It includes resident authentication, dashboards for residents and admins, amenity booking, service requests, accounting, and content management.

## Technologies Used
- Frontend: HTML, JavaScript, Tailwind CSS, Font Awesome
- Backend: Firebase Authentication, Firestore, Firebase Hosting
- Optional: Google Sheets integration, EmailJS, PDF export, GCash payment validation

## Setup Instructions

### Firebase Setup
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password provider).
3. Create Firestore database in production or test mode.
4. Download the Firebase service account key JSON file for admin SDK usage.
5. Update `src/auth.js` and `src/dashboard.js` with your Firebase project configuration.
6. Use the provided `src/adminSetup.js` Node.js script to create admin users and assign roles:
   - Replace the path to your service account key JSON file in `src/adminSetup.js`.
   - Run the script with Node.js: `node src/adminSetup.js`
   - This will create an admin user (default: admin@tdst.com / AdminPassword123).

### Running the Project Locally
- Serve the `public` directory using a static server, e.g.:
  ```
  python3 -m http.server 8000 -d public
  ```
- Open `http://localhost:8000` in your browser.
- Login with your Firebase user credentials.

## Next Steps
- Implement detailed features for dashboards.
- Add amenity booking, service request, and accounting modules.
- Integrate email notifications and PDF exports.
- Deploy to Firebase Hosting or preferred platform.

## Notes
- Ensure Firebase rules are configured to secure data access based on user roles.
- Customize UI and features as per your HOA requirements.

Feel free to reach out for further assistance or feature additions.
