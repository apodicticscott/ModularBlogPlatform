import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent as firebaseLogEvent } from 'firebase/analytics';
import firebase_app from "../config"

let analytics;

isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(firebase_app);
  }
});

export const logPageView = (pagePath) => {
  if (analytics) {
    firebaseLogEvent(analytics, 'page_view', { page_path: pagePath });
  }
};
