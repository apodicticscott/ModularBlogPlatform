// Ensure you've installed gapi-script for this to work, e.g., via npm or yarn
// npm install gapi-script --save
// or
// yarn add gapi-script

import { gapi } from 'gapi-script';

const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com'; // Replace with your actual client ID
const SCOPES = 'email profile'; // Define scopes here, e.g., 'email profile'

// Function to load the auth2 library and API client library
function loadGapiClientAndAuth2() {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', {
      callback: resolve,
      onerror: reject,
      timeout: 5000, // 5 seconds.
      ontimeout: reject
    });
  });
}

// Function to initialize the Google API client
async function initGapiClient() {
  await gapi.client.init({
    clientId: CLIENT_ID,
    scope: SCOPES,
  });
  await gapi.auth2.init({ client_id: CLIENT_ID }); // Ensure auth2 library is initialized with the client
}

// Function to sign in and get authentication instance
export async function AdminSignIn() {
  console.log("Attempting to sign in...");
  
  try {
    await loadGapiClientAndAuth2(); // Load the client and auth2 libraries
    await initGapiClient(); // Initialize the client with your API key and the People API, and initialize auth2

    const authInstance = gapi.auth2.getAuthInstance();
    await authInstance.signIn(); // Trigger the sign-in flow
    
    console.log("Sign-in successful");
    // After sign in, you can get user information like this:
    // const user = authInstance.currentUser.get();
    // console.log(user.getBasicProfile().getName());
  } catch (error) {
    console.error("Error signing in", error);
  }
}
