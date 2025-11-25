importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyAyjs7tEQ5DyZcW9eGCJO8Lg5KqtItjVag",
  authDomain: "beyati-472504.firebaseapp.com",
  projectId: "beyati-472504",
  storageBucket: "beyati-472504.firebasestorage.app",
  messagingSenderId: "318401058440",
  appId: "1:318401058440:web:490f86242c9b61919ff13d",
  measurementId: "G-2F9P2XN2SS",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // self.registration.showNotification(payload.data.title, {
  //   body: payload.data.body,
  //   icon: payload.data.icon,
  // });
});
