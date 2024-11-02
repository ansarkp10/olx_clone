import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // Import Firestore
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBeJuFTW9U7rXJWlOLCxBOkKbFHNsdUp5w",
  authDomain: "olx-clone-86323.firebaseapp.com",
  projectId: "olx-clone-86323",
  storageBucket: "olx-clone-86323.appspot.com",
  messagingSenderId: "751536640094",
  appId: "1:751536640094:web:586b27470edd42ea1b64cf",
  measurementId: "G-CSSTV190G5"
};

// Initialize Firebase app and export it
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore(); // Initialize Firestore

export { firebaseApp, firestore };
