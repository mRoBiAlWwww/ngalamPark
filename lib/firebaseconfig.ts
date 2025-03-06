import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD8xDSfX8TOHmX3tug7mLlFOo8ZawYu0ro",
    authDomain: "ngalampark-4bfa5.firebaseapp.com",
    projectId: "ngalampark-4bfa5",
    storageBucket: "ngalampark-4bfa5.firebasestorage.app",
    messagingSenderId: "399102937749",
    appId: "1:399102937749:web:978343fd86e7648516299c",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
