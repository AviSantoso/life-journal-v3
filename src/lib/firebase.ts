// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArIc4vZoEPx6QDWGIBceyHIUXQbWATosM",
  authDomain: "life-journal-v3.firebaseapp.com",
  projectId: "life-journal-v3",
  storageBucket: "life-journal-v3.firebasestorage.app",
  messagingSenderId: "1038580603217",
  appId: "1:1038580603217:web:f3f85658145f35842a9b70",
  measurementId: "G-FL5BECJXCP",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp);
export const realtimeDb = getDatabase(
  firebaseApp,
  "https://life-journal-v3-default-rtdb.asia-southeast1.firebasedatabase.app"
);
