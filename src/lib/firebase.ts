'use client';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { Capacitor } from '@capacitor/core';
import {
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { updateUserProfile } from './firestore';

const firebaseConfig = {
  "projectId": "kashflow-1ik2o",
  "appId": "1:580808467572:web:a7498a9a5d8e5799ae1d21",
  "storageBucket": "kashflow-1ik2o.firebasestorage.app",
  "apiKey": "AIzaSyAkJ5NHmJRRQBjd8mJH9lR1_KslyyIpYHg",
  "authDomain": "kashflow-1ik2o.firebaseapp.com",
  "messagingSenderId": "580808467572"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// SIMULATED USER ID - In a real app, this would come from your auth system
const MOCK_USER_ID = 'user123'; 

export const initPushNotifications = async () => {
  if (!Capacitor.isNativePlatform()) {
    console.log('Push notifications not available on web.');
    return;
  }

  // Request permission to use push notifications
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  // Register with Apple / Google to receive push via APNS/FCM
  await PushNotifications.register();

  // On success, we should be able to receive notifications
  PushNotifications.addListener('registration', (token: Token) => {
    console.info('FCM token:', token.value);
    // Save the FCM token to the user's profile in Firestore
    updateUserProfile(MOCK_USER_ID, { fcmToken: token.value })
      .then(() => console.log("Successfully saved FCM token to Firestore."))
      .catch(err => console.error("Failed to save FCM token:", err));
  });

  // Some issue with our setup and push will not work
  PushNotifications.addListener('registrationError', (error: any) => {
    console.error('Error on registration: ' + JSON.stringify(error));
  });

  console.log('Push notifications initialized');
};

export default app;
