import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAyjs7tEQ5DyZcW9eGCJO8Lg5KqtItjVag",
  authDomain: "beyati-472504.firebaseapp.com",
  projectId: "beyati-472504",
  storageBucket: "beyati-472504.firebasestorage.app",
  messagingSenderId: "318401058440",
  appId: "1:318401058440:web:490f86242c9b61919ff13d",
  measurementId: "G-2F9P2XN2SS",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    await Notification.requestPermission();
    const fcmToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (fcmToken) {
      return fcmToken;
    } else {
      throw new Error("No registration token available");
    }
  } catch (error) {
    throw new Error(`Notification permission error: ${error}`);
  }
};

export const onMessageListener = () => {
  return new Promise((resolve, reject) => {
    onMessage(messaging, (payload: any) => {
      if (Notification.permission === "granted") {
        new Notification(payload?.notification?.title, {
          body: payload?.notification?.body,
          icon: payload?.notification?.icon,
        });
        resolve(payload);
      } else {
        reject("Notification permission not granted.");
      }
    });
  });
};
