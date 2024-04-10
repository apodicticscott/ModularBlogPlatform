const admin = require('firebase-admin');

// Check if the firebase-admin app has already been initialized to prevent re-initialization errors.
const firebaseAdminApp = admin.apps.length 
  ? admin.app('admin_app_1') // Use the existing app instance if already initialized.
  : admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_KEY.replace(/\\n/g, '\n'),
      }),
    }, 'admin_app_1'); // Provide a unique name for the app.

// Export the initialized app.
export const authAdmin = firebaseAdminApp;