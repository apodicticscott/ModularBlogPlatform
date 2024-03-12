import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent as firebaseLogEvent } from 'firebase/analytics';
import firebase_app from "../config"

const analytics = getAnalytics(firebase_app)

export const logPageView = () => {
  const pagePath = window.location.pathname;
  console.log(pagePath)
  firebaseLogEvent(analytics, 'page_view', { page_path: pagePath });
};