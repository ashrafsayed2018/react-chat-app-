// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDx6YK32k4Dz0plXM5GCKHy2f0fNfAVgPw",
  authDomain: "react-chat-8dae0.firebaseapp.com",
  projectId: "react-chat-8dae0",
  storageBucket: "react-chat-8dae0.appspot.com",
  messagingSenderId: "1090846838657",
  appId: "1:1090846838657:web:b377cf61cef9af5b656280",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// Create a root reference
export const storage = getStorage();
export const db = getFirestore();
