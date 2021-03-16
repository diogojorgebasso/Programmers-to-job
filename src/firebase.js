import firebase from "firebase/app";
import "firebase/storage";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/remote-config";
import "firebase/auth";
import "firebase/performance";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDveLdtFIYdPbbSltuUNgC9ED2dGIfu_o8",
  authDomain: "diogobasso-site.firebaseapp.com",
  projectId: "diogobasso-site",
  storageBucket: "diogobasso-site.appspot.com",
  messagingSenderId: "990521298107",
  appId: "1:990521298107:web:1b50af11599356ce3d2d9e",
  measurementId: "G-5R4JHYNCCB",
});
// Initialize Firebase
export const analytics = firebase.analytics(); //Done!
export const auth = app.auth();
firebase.performance(); //Done!
export const remoteConfig = firebase.remoteConfig();
const firestore = app.firestore();
export const database = {
  users: firestore.collection("users"),
  getTime: firebase.firestore.FieldValue.serverTimestamp,
};
export default app;
