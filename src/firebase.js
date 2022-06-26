import firebase from 'firebase/compat/app';
import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAxFwmC_X1AIa0V630fVAVlWnAYgEz9Uus",
    authDomain: "tennis-site.firebaseapp.com",
    projectId: "tennis-site",
    storageBucket: "tennis-site.appspot.com",
    messagingSenderId: "621123843277",
    appId: "1:621123843277:web:2d4d869bab72649f232584"
  });

const fb = firebase;
export const auth = fb.auth()

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  signOut(auth);
};

export default fb;

