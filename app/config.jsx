// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCUCqe-HUoJZREp41rdBgVaGYMjOAtfkFw',
  authDomain: 'pet-channeling.firebaseapp.com',
  projectId: 'pet-channeling',
  storageBucket: 'pet-channeling.appspot.com',
  messagingSenderId: '157058397891',
  appId: '1:157058397891:web:af3d740ca4aed367c29476',
  measurementId: 'G-B0DQKK1959',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);
