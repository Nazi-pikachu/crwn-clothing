import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// configuration settings for firebase
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
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // We want to execute this block of code only if the user sign in and when the user is not in the database
  if (!userAuth) return;

  //Created a document Reference of the user
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  //created the snapshot of the document reference
  const snapShot = await userRef.get();

  //Here we will first check that user exist in the database if not then we will add it in the user collection asynchronously

  if (!snapShot.exists) {
    //Here we will destructure displayName and email from userAuth
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    //we will user set() to add content using a document reference
    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  //we have passed the userRef for further user in App.js to store the data of the user in the state of the app
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
