import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectAuthEmulator } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator } from "firebase/firestore";
import * as ServiceAccount from "./todos/todoslist-adminsdk.json";
export let admin = require("firebase-admin");

export const firebaseConfig = {
  apiKey: "AIzaSyAO0vD-h9xhDoFOkSojdNyjHNTCVlu5agw",
  authDomain: "todoslist-c4530.firebaseapp.com",
  projectId: "todoslist-c4530",
  storageBucket: "todoslist-c4530.appspot.com",
  messagingSenderId: "943090214915",
  appId: "1:943090214915:web:096ffde8456904abdd0636",
};
initializeApp(firebaseConfig);
admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
});
export let db = getFirestore();
export let auth = getAuth();
connectFirestoreEmulator(db, "localhost", 8080);
connectAuthEmulator(auth, "http://localhost:9099");
