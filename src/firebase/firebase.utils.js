import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyCfIVmHFduPjmsuPv_vwtbdCfuvNSFHfuc",
  authDomain: "crwn-db-e461d.firebaseapp.com",
  databaseURL: "https://crwn-db-e461d.firebaseio.com",
  projectId: "crwn-db-e461d",
  storageBucket: "crwn-db-e461d.appspot.com",
  messagingSenderId: "393917293512",
  appId: "1:393917293512:web:21dd3356d64d635636d6fd",
  measurementId: "G-M20P01KHC0",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
