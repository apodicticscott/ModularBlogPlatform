import { gapi } from 'gapi-script';

const CLIENT_ID = '243243244928-om8sopt16c9a9on1l80lubjagbdbrkra.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly';

// Function to load gapi client and auth2 library
const loadGapiAndAuth2 = () => {
  return new Promise((resolve, reject) => {
    gapi.load('client:auth2', {
      callback: resolve,
      onerror: reject,
      timeout: 5000, // 5 seconds.
      ontimeout: reject
    });
  });
};

// Function to initialize the Google API client
const initGapiClient = async () => {
  await gapi.client.init({
    clientId: CLIENT_ID,
    scope: SCOPES,
  });
};

// Function to initialize authentication instance (if not already initialized)
const initAuthInstance = async () => {
  if (!gapi.auth2.getAuthInstance()) {
    await gapi.auth2.init({ client_id: CLIENT_ID });
  }
};

// Function to sign in
export const ApiSignIn = async () => {
  try {
    await initAuthInstance(); // Ensure auth2 instance is initialized
    await gapi.auth2.getAuthInstance().signIn();
    console.log("Signed in successfully");
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

// Function to run the Google Analytics report
const runReport = async (propertyId, reportRequest) => {
  try {
    const response = await gapi.client.request({
      path: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`,
      method: 'POST',
      body: reportRequest,
    });
    return { report: response.result, error: null };
  } catch (err) {
    return { report: null, error: err };
  }
};

// Function to fetch Google Analytics report
export const fetchGoogleAnalyticsReport = async (propertyId, reportRequest) => {
  try {
    await loadGapiAndAuth2();
    await initGapiClient();
    const result = await runReport(propertyId, reportRequest);
    return result;
  } catch (error) {
    console.error("Error fetching the report:", error);
    return { report: null, error };
  }
};

// Initial load of gapi client and auth libraries
loadGapiAndAuth2().then(initGapiClient).catch(console.error);
