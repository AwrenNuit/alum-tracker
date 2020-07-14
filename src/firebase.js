import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { DATABASE_URL, API_KEY } from "./.env.js";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();

export function getCurrentUser() {
  return new Promise((resolve, reject) => {
    return firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
}

export async function loginUser(email, password) {
  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return result;
  } catch (error) {
    return false;
  }
}

export function logoutUser() {
  return firebase.auth().signOut();
}

export async function registerUser(email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    return false;
  }
}
