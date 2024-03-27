import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent as firebaseLogEvent } from 'firebase/analytics';
import firebase_app from "../config"



export const logPageView = (pagePath) => {
  const analytics = getAnalytics(firebase_app)
  firebaseLogEvent(analytics, 'page_view', { page_path: pagePath });
};