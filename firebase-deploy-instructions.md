# Firebase Hosting Deployment Instructions for TDST HOA System

## Prerequisites
- Node.js and npm installed on your machine.
- Firebase CLI installed globally:
  ```
  npm install -g firebase-tools
  ```
- A Firebase project created in the Firebase Console.

## Steps to Deploy

1. **Login to Firebase**
   ```
   firebase login
   ```

2. **Initialize Firebase Hosting**
   In your project root directory (where the `public` folder is located), run:
   ```
   firebase init hosting
   ```
   - Select your Firebase project.
   - Set `public` as the public directory.
   - Choose to configure as a single-page app (yes).
   - Do not overwrite your existing `index.html` if prompted.

3. **Deploy to Firebase Hosting**
   ```
   firebase deploy
   ```

4. **Access Your App**
   After deployment, Firebase will provide a hosting URL. Open this URL in your browser to access the TDST HOA System.

## Notes
- Make sure your Firebase configuration in your frontend JavaScript files (`auth.js`, `dashboard.js`, etc.) matches your Firebase project settings.
- You can update and redeploy anytime by running `firebase deploy` again.

If you encounter any issues during deployment, please let me know.
